import i18n from 'i18next';
import { choiceCookie, clearingCookies, readChoice } from './consentCookie';
import { revokeMeta, startMeta, trackMetaOrderConfirmation } from './meta';
import {
  beginCheckoutPayload,
  cleanPageLocation,
  consentState,
  orderCreatedPayload,
  type ConsentChoice,
  type OrderSummary,
} from './policy';

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

const PRODUCTION_HOSTNAME = 'uzsakymas.ecotrip.lt';
const GTM_ID = 'GTM-TDDPFVS';
const GA_DISABLE_KEY = 'ga-disable-G-XNCGY4H0DG';
const SITE_ID = 'uzsakymas-v1';
const LANGUAGES = ['lt', 'en', 'ru'];
const PREVIEW_EVENT = 'ecotrip:measurement-preview';
const ORDER_KEY_PREFIX = 'ecotrip_tracked_order_';
// Longest wait for GTM before leaving the site after an order.
const REDIRECT_WAIT_MS = 2000;

export type MeasurementSnapshot = {
  choice: ConsentChoice | null;
  settingsOpen: boolean;
};

let snapshot: MeasurementSnapshot = { choice: null, settingsOpen: false };
const listeners = new Set<() => void>();

let initialized = false;
let started = false;
let gtmLoaded = false;
let beginCheckoutSent = false;
// begin_checkout asked for before analytics consent; sent once consent starts.
let pendingBeginCheckout: OrderSummary | null = null;
const trackedOrders = new Set<string>();
// Order saved on this page load whose confirmation page Meta has not seen yet.
let pendingMetaConfirmation: string | null = null;

function setSnapshot(next: Partial<MeasurementSnapshot>): void {
  const merged = { ...snapshot, ...next };
  if (
    merged.choice === snapshot.choice &&
    merged.settingsOpen === snapshot.settingsOpen
  ) {
    return;
  }
  snapshot = merged;
  listeners.forEach((listener) => listener());
}

function isProduction(): boolean {
  return window.location.hostname === PRODUCTION_HOSTNAME;
}

function ensureDataLayer(): unknown[] {
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

// Consent commands must reach the dataLayer as an Arguments object, exactly
// as gtag.js pushes them, or GTM ignores them.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]): void {
  // eslint-disable-next-line prefer-rest-params
  ensureDataLayer().push(arguments);
}

function language(): string {
  const lang = (i18n.language || '').slice(0, 2).toLowerCase();
  return LANGUAGES.includes(lang) ? lang : 'lt';
}

function referrer(): string {
  if (!document.referrer) return '';
  try {
    return `${new URL(document.referrer).origin}/`;
  } catch {
    return '';
  }
}

function metadata(choice: ConsentChoice) {
  return {
    ecotrip_site: SITE_ID,
    ecotrip_language: language(),
    ecotrip_path: window.location.pathname,
    ecotrip_page_location: cleanPageLocation(
      window.location.href,
      choice.marketing
    ),
    ecotrip_page_title: document.title,
    ecotrip_page_referrer: referrer(),
    ecotrip_analytics: true,
    ecotrip_marketing: choice.marketing,
  };
}

function start(choice: ConsentChoice): void {
  if (started || !choice.analytics) return;
  started = true;
  gtag('consent', 'update', consentState(choice));
  if (!isProduction()) {
    document.documentElement.dataset.ecotripMeasurement = 'dry-run';
    sendPendingBeginCheckout();
    return;
  }
  const meta = metadata(choice);
  const dataLayer = ensureDataLayer();
  dataLayer.push(meta);
  dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
  gtmLoaded = true;
  dataLayer.push({ event: 'ecotrip_measurement_ready', ...meta });
  document.documentElement.dataset.ecotripMeasurement = 'enabled';
  sendPendingBeginCheckout();
}

function clearDisallowedCookies(choice: ConsentChoice): void {
  try {
    for (const assignment of clearingCookies(
      document.cookie,
      choice,
      window.location.hostname
    )) {
      document.cookie = assignment;
    }
  } catch {
    // Cookies unavailable: nothing to clear.
  }
}

/**
 * Sends one payload; returns false when it was dropped for lack of consent.
 * With GTM loaded, `eventCallback` is called once GTM has fired its tags
 * for this event (or after `REDIRECT_WAIT_MS` if they take longer).
 */
function push(
  payload: Record<string, unknown>,
  eventCallback?: () => void
): boolean {
  if (snapshot.choice?.analytics !== true) return false;
  if (!isProduction()) {
    console.debug('[measurement]', payload);
    window.dispatchEvent(new CustomEvent(PREVIEW_EVENT, { detail: payload }));
    return true;
  }
  const dataLayer = ensureDataLayer();
  if ('ecommerce' in payload) dataLayer.push({ ecommerce: null });
  dataLayer.push(
    eventCallback && gtmLoaded
      ? { ...payload, eventCallback, eventTimeout: REDIRECT_WAIT_MS }
      : payload
  );
  return true;
}

function syncMeta(previous: ConsentChoice | null, choice: ConsentChoice) {
  if (choice.meta) {
    startMeta(window.location.href);
  } else if (previous?.meta) {
    revokeMeta();
  }
}

export function initMeasurement(): void {
  if (initialized) return;
  initialized = true;
  ensureDataLayer();
  let choice: ConsentChoice | null = null;
  try {
    choice = readChoice(document.cookie, Date.now());
  } catch {
    choice = null;
  }
  if (!choice) return;
  clearDisallowedCookies(choice);
  setSnapshot({ choice });
  syncMeta(null, choice);
  start(choice);
}

export function getChoice(): ConsentChoice | null {
  return snapshot.choice;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): MeasurementSnapshot {
  return snapshot;
}

export function saveChoice(
  analytics: boolean,
  marketing: boolean,
  meta: boolean
): void {
  const previous = snapshot.choice;
  const choice: ConsentChoice = {
    version: 2,
    savedAt: Date.now(),
    analytics,
    marketing: analytics && marketing,
    meta,
  };
  const withdrawn =
    previous !== null &&
    ((previous.analytics && !choice.analytics) ||
      (previous.marketing && !choice.marketing));
  const googleConsentChanged =
    previous !== null &&
    (previous.analytics !== choice.analytics ||
      previous.marketing !== choice.marketing);

  try {
    document.cookie = choiceCookie(choice, window.location.hostname);
  } catch {
    // Cookie not writable: keep the choice in memory for this page.
  }
  clearDisallowedCookies(choice);
  setSnapshot({ choice, settingsOpen: false });
  syncMeta(previous, choice);

  if (gtmLoaded && withdrawn) {
    // GTM tags cannot be unloaded: stop GA, then reload into the new state.
    (window as unknown as Record<string, unknown>)[GA_DISABLE_KEY] = true;
    gtag('consent', 'update', consentState(choice));
    window.location.reload();
    return;
  }
  if (started) {
    // Already measuring: a grant (or a withdrawal in dry-run) updates the
    // consent state in place; a Meta-only change needs nothing from Google.
    if (googleConsentChanged) {
      gtag('consent', 'update', consentState(choice));
      if (gtmLoaded) {
        ensureDataLayer().push({
          ecotrip_marketing: choice.marketing,
          ecotrip_page_location: cleanPageLocation(
            window.location.href,
            choice.marketing
          ),
        });
      }
      sendPendingBeginCheckout();
    }
    return;
  }
  start(choice);
}

export function openCookieSettings(): void {
  setSnapshot({ settingsOpen: true });
}

export function closeCookieSettings(): void {
  setSnapshot({ settingsOpen: false });
}

export function trackBeginCheckout(s: OrderSummary): void {
  if (beginCheckoutSent) return;
  if (push(beginCheckoutPayload(s))) {
    beginCheckoutSent = true;
    pendingBeginCheckout = null;
  } else {
    // No analytics consent yet: keep the latest service for when it starts.
    pendingBeginCheckout = s;
  }
}

function sendPendingBeginCheckout(): void {
  const pending = pendingBeginCheckout;
  if (!pending) return;
  pendingBeginCheckout = null;
  trackBeginCheckout(pending);
}

function orderTracked(orderId: string): boolean {
  if (trackedOrders.has(orderId)) return true;
  try {
    return window.sessionStorage.getItem(ORDER_KEY_PREFIX + orderId) !== null;
  } catch {
    return false;
  }
}

function markOrderTracked(orderId: string): void {
  trackedOrders.add(orderId);
  try {
    window.sessionStorage.setItem(ORDER_KEY_PREFIX + orderId, '1');
  } catch {
    // sessionStorage unavailable: the in-memory Set guards this page.
  }
}

/**
 * Sends order_created once per order id. The promise resolves when GTM has
 * fired the tags for it, at once when nothing goes to GTM, and after at most
 * `REDIRECT_WAIT_MS` otherwise (GTM blocked or slow), so a redirect to an
 * external page can wait for it without ever getting stuck.
 */
export function trackOrderSaved(
  s: OrderSummary,
  orderId: string
): Promise<void> {
  if (!orderId) return Promise.resolve();
  pendingMetaConfirmation = orderId;
  if (orderTracked(orderId)) return Promise.resolve();
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    if (!push(orderCreatedPayload(s, orderId), finish)) {
      finish();
      return;
    }
    markOrderTracked(orderId);
    if (!gtmLoaded) {
      finish();
      return;
    }
    setTimeout(finish, REDIRECT_WAIT_MS);
  });
}

/**
 * Called by the confirmation page. Sends Meta's PageView and
 * CompleteRegistration once, only for an order saved on this page load (a
 * reload of /success sends nothing more) and only with Meta consent.
 */
export function trackOrderConfirmationView(orderId: string | null): void {
  if (!orderId || orderId !== pendingMetaConfirmation) return;
  pendingMetaConfirmation = null;
  if (snapshot.choice?.meta !== true) return;
  trackMetaOrderConfirmation();
}
