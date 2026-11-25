// Consent-gated Meta Pixel: a browser-only PageView, the same setup as the
// ecotrip.lt plugin (meta.js). No Conversions API, user data or form events.
import { metaPageAllowed } from './policy';

export const META_PIXEL_ID = '1158726481773480';

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
  disablePushState?: boolean;
};

type MetaWindow = Window & { fbq?: Fbq; _fbq?: Fbq };

// Account-side features the remote pixel config can switch on; this
// PageView-only setup must not inherit them.
const OPTED_OUT_FEATURES = [
  'OpenBridge',
  'AutomaticMatching',
  'AutomaticMatchingForPartnerIntegrations',
  'AutomaticMatchingRegex',
  'AutomaticMatchingAI',
  'InferredEvents',
  'Microdata',
  'MicrodataFieldTransmission',
  'SmartSetupTotalPriceExtraction',
];

let started = false;
let owned = false;
let revoked = false;

function mark(state: string): void {
  document.documentElement.dataset.ecotripMeta = state;
}

/**
 * Starts the pixel once, only with Meta consent given by the caller. A grant
 * after a withdrawal on the same page turns the started pixel back on.
 */
export function startMeta(href: string): void {
  if (started) {
    if (owned && revoked) {
      revoked = false;
      (window as MetaWindow).fbq?.('consent', 'grant');
      mark('requested');
    }
    return;
  }
  if (!metaPageAllowed(href)) return;
  const win = window as MetaWindow;
  // Never initialise a pixel someone else already loaded.
  if (win.fbq) {
    mark('existing-integration');
    return;
  }
  const fbq = function (...args: unknown[]) {
    // The SDK's callMethod reads `this`, as in Meta's own snippet.
    // eslint-disable-next-line prefer-spread
    if (fbq.callMethod) fbq.callMethod.apply(fbq, args);
    else fbq.queue.push(args);
  } as Fbq;
  win.fbq = fbq;
  if (!win._fbq) win._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  fbq.disablePushState = true;
  // Grant first: a queued revoke before the SDK arrives can lock the queue.
  fbq('consent', 'grant');
  fbq('set', 'autoConfig', false, META_PIXEL_ID);
  fbq('set', 'smartSetup', false, META_PIXEL_ID);
  fbq('skipOpenbridge', META_PIXEL_ID);
  for (const feature of OPTED_OUT_FEATURES) {
    fbq('optOut', META_PIXEL_ID, feature);
  }
  fbq('init', META_PIXEL_ID);
  fbq('trackSingle', META_PIXEL_ID, 'PageView');
  started = true;
  owned = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  script.referrerPolicy = 'strict-origin-when-cross-origin';
  document.head.appendChild(script);
  mark('requested');
}

/** Stops the pixel this module started when Meta consent is withdrawn. */
export function revokeMeta(): void {
  const fbq = (window as MetaWindow).fbq;
  if (!owned || !fbq) return;
  // Drop a queued PageView if the SDK has not arrived yet.
  if (!fbq.callMethod) fbq.queue = [];
  fbq('consent', 'revoke');
  revoked = true;
  mark('revoked');
}

/**
 * The order confirmation page (/success) is a route change, not a page load,
 * and the pixel does not follow route changes on its own: send its PageView
 * here, with the CompleteRegistration conversion.
 */
export function trackMetaOrderConfirmation(): void {
  const fbq = (window as MetaWindow).fbq;
  if (!owned || revoked || !fbq) return;
  fbq('trackSingle', META_PIXEL_ID, 'PageView');
  fbq('trackSingle', META_PIXEL_ID, 'CompleteRegistration');
}
