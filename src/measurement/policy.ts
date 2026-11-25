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

// One GA4 item per parcel of the order. Keys come from the CMS catalog
// (`householdAppliances`, `fridge`), not the translated labels, so a parcel
// reports the same whatever language the visitor uses.
export type OrderItem = {
  item_id: string;
  item_name: string;
  item_category: string;
  item_category2?: string;
  item_variant?: string;
  quantity: number;
  price?: number;
};

export type OrderSummary = {
  service: string;
  direction: string;
  currency: 'EUR' | 'GBP';
  value?: number;
  items?: OrderItem[];
};

// The parts of a form parcel that describe it. Never the ordered shipment
// number or the item's purchase price: those belong to the customer.
export type ParcelInput = {
  category?: unknown;
  productType?: unknown;
  size?: unknown;
  specification?: unknown;
  amount?: number | string | null;
  estimatedPrice?: string | null;
};

// The catalog key of a select option, if the option has one.
const key = (option: unknown): string | undefined => {
  const value =
    typeof option === 'object' && option !== null && 'value' in option
      ? option.value
      : undefined;
  return typeof value === 'string' && value !== '' ? value : undefined;
};

const money = (value: number): number => Math.round(value * 100) / 100;

export function parcelItems(parcels: ParcelInput[]): OrderItem[] {
  const result: OrderItem[] = [];
  for (const parcel of parcels) {
    const category = key(parcel.category);
    if (!category) continue;
    const productType = key(parcel.productType);
    const variant = key(parcel.size) ?? key(parcel.specification);
    const amount = Math.floor(Number(parcel.amount));
    const quantity = Number.isFinite(amount) && amount >= 1 ? amount : 1;
    // The form prices a parcel line for its whole amount; GA4 wants a unit
    // price. 0 means the price is unknown (e.g. "call the manager").
    const linePrice = Number(parcel.estimatedPrice);
    const item: OrderItem = {
      item_id: productType ?? category,
      item_name: productType ?? category,
      item_category: category,
      quantity,
    };
    if (productType) item.item_category2 = productType;
    if (variant) item.item_variant = variant;
    if (Number.isFinite(linePrice) && linePrice > 0) {
      item.price = money(linePrice / quantity);
    }
    result.push(item);
  }
  return result;
}

export function buildOrderSummary(input: {
  service: string;
  direction: string | null;
  currency: string;
  price?: string | null;
  parcels?: ParcelInput[];
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
    if (Number.isFinite(n) && n >= 0) summary.value = money(n);
  }
  if (input.parcels) summary.items = parcelItems(input.parcels);
  return summary;
}

// No parcels exist yet when the service is chosen: the service is the item.
export function beginCheckoutPayload(s: OrderSummary) {
  return {
    event: 'begin_checkout',
    service: s.service,
    direction: s.direction,
    ecommerce: {
      currency: s.currency,
      ...(s.value !== undefined ? { value: s.value } : {}),
      items: [{ item_id: s.service, item_name: s.service }],
    },
  };
}

// The only event of a saved order. It carries the full GA4 ecommerce block,
// so GTM can send it to GA4 as `purchase` if the analyst wants revenue
// reports.
export function orderCreatedPayload(s: OrderSummary, orderId: string) {
  return {
    event: 'order_created',
    service: s.service,
    direction: s.direction,
    ecommerce: {
      transaction_id: orderId,
      ...(s.value !== undefined ? { value: s.value } : {}),
      currency: s.currency,
      items: s.items ?? [],
    },
  };
}

/**
 * Whether the Meta pixel may run on this page: any page of the production
 * order form, whatever campaign parameters (gclid, gad_source, _gl, utm_*)
 * the link added. The form's own URLs carry no personal data.
 */
export function metaPageAllowed(href: string): boolean {
  try {
    const url = new URL(href);
    return url.protocol === 'https:' && url.hostname === 'uzsakymas.ecotrip.lt';
  } catch {
    return false;
  }
}
