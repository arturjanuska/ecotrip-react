export const CONSENT_VERSION = 2;
export const CONSENT_MAX_AGE_MS = 180 * 86400000;

export type ConsentChoice = {
  version: 2;
  savedAt: number;
  analytics: boolean;
  marketing: boolean;
  meta: boolean;
};

export function parseChoice(value: unknown, now: number): ConsentChoice | null {
  if (!value || typeof value !== 'object') return null;
  const v = value as Record<string, unknown>;
  if (v.version !== CONSENT_VERSION) return null;
  if (typeof v.savedAt !== 'number' || !Number.isFinite(v.savedAt)) return null;
  if (v.savedAt > now || now - v.savedAt >= CONSENT_MAX_AGE_MS) return null;
  if (
    typeof v.analytics !== 'boolean' ||
    typeof v.marketing !== 'boolean' ||
    typeof v.meta !== 'boolean'
  ) {
    return null;
  }
  return {
    version: CONSENT_VERSION,
    savedAt: v.savedAt,
    analytics: v.analytics,
    marketing: v.analytics && v.marketing,
    meta: v.meta,
  };
}

export type ConsentState = Record<
  'analytics_storage' | 'ad_storage' | 'ad_user_data' | 'ad_personalization',
  'granted' | 'denied'
>;

export function consentState(choice: ConsentChoice | null): ConsentState {
  const analytics = choice?.analytics === true;
  const marketing = analytics && choice?.marketing === true;
  return {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: 'denied',
  };
}

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_id',
  'utm_content',
];
const CLICK_KEYS = ['gclid', 'gbraid', 'wbraid'];
const UTM_VALUE = /^[A-Za-z0-9][A-Za-z0-9_-]{0,99}$/;
const CLICK_VALUE = /^[A-Za-z0-9_-]{10,256}$/;
const LONG_DIGITS = /\d{9}/;

export function cleanPageLocation(href: string, marketing: boolean): string {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return '';
  }
  const kept = new URLSearchParams();
  url.searchParams.forEach((val, key) => {
    if (kept.has(key)) return;
    if (
      UTM_KEYS.includes(key) &&
      UTM_VALUE.test(val) &&
      !LONG_DIGITS.test(val)
    ) {
      kept.set(key, val);
    } else if (marketing && CLICK_KEYS.includes(key) && CLICK_VALUE.test(val)) {
      kept.set(key, val);
    }
  });
  const query = kept.toString();
  return url.origin + url.pathname + (query ? `?${query}` : '');
}

export type OrderSummary = {
  service: string;
  direction: string;
  currency: 'EUR' | 'GBP';
  value?: number;
};

export function buildOrderSummary(input: {
  service: string;
  direction: string | null;
  currency: string;
  price?: string | null;
}): OrderSummary | null {
  if (!input.service) return null;
  const direction =
    input.service === 'shipmentWithAddressService'
      ? 'UK-LT'
      : input.direction || 'unknown';
  const summary: OrderSummary = {
    service: input.service,
    direction,
    currency: input.currency === '£' ? 'GBP' : 'EUR',
  };
  if (input.price != null && input.price.trim() !== '') {
    const n = Number(input.price);
    if (Number.isFinite(n) && n >= 0) summary.value = Math.round(n * 100) / 100;
  }
  return summary;
}

function items(s: OrderSummary) {
  return [
    { item_id: s.service, item_name: s.service, item_category: s.direction },
  ];
}

export function beginCheckoutPayload(s: OrderSummary) {
  return {
    event: 'begin_checkout',
    ecommerce: {
      currency: s.currency,
      ...(s.value !== undefined ? { value: s.value } : {}),
      items: items(s),
    },
  };
}

export function orderCreatedPayload(s: OrderSummary, orderId: string) {
  return {
    event: 'order_created',
    transaction_id: orderId,
    ...(s.value !== undefined ? { value: s.value } : {}),
    currency: s.currency,
    service: s.service,
    direction: s.direction,
  };
}

export function purchasePayload(s: OrderSummary, orderId: string) {
  return {
    event: 'purchase',
    ecommerce: {
      transaction_id: orderId,
      ...(s.value !== undefined ? { value: s.value } : {}),
      currency: s.currency,
      items: items(s),
    },
  };
}
