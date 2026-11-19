import i18n from 'i18next';
import { choiceCookie, clearingCookies, readChoice } from './consentCookie';
import {
  beginCheckoutPayload,
  cleanPageLocation,
  consentState,
  orderCreatedPayload,
  purchasePayload,
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

/** Sends one payload; returns false when it was dropped for lack of consent. */
function push(payload: Record<string, unknown>): boolean {
  if (snapshot.choice?.analytics !== true) return false;
  if (!isProduction()) {
    console.debug('[measurement]', payload);
    window.dispatchEvent(new CustomEvent(PREVIEW_EVENT, { detail: payload }));
    return true;
  }
  const dataLayer = ensureDataLayer();
  if ('ecommerce' in payload) dataLayer.push({ ecommerce: null });
  dataLayer.push(payload);
  return true;
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

export function trackOrderSaved(s: OrderSummary, orderId: string): void {
  if (!orderId || orderTracked(orderId)) return;
  if (!push(orderCreatedPayload(s, orderId))) return;
  push(purchasePayload(s, orderId));
  markOrderTracked(orderId);
}
