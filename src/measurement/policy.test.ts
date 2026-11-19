import { describe, expect, it } from 'vitest';
import {
  CONSENT_MAX_AGE_MS,
  beginCheckoutPayload,
  buildOrderSummary,
  cleanPageLocation,
  consentState,
  orderCreatedPayload,
  parseChoice,
  purchasePayload,
} from './policy';

const now = Date.UTC(2026, 10, 19);
const ok = {
  version: 2 as const,
  savedAt: now - 1000,
  analytics: true,
  marketing: true,
  meta: false,
};

describe('measurement policy', () => {
  it('parseChoice accepts a valid choice and forces marketing off without analytics', () => {
    expect(parseChoice(ok, now)).toEqual(ok);
    expect(parseChoice({ ...ok, analytics: false }, now)?.marketing).toBe(
      false
    );
  });
  it('parseChoice rejects wrong version, expired, future and malformed values', () => {
    expect(parseChoice({ ...ok, version: 1 }, now)).toBeNull();
    expect(
      parseChoice({ ...ok, savedAt: now - CONSENT_MAX_AGE_MS }, now)
    ).toBeNull();
    expect(parseChoice({ ...ok, savedAt: now + 1 }, now)).toBeNull();
    expect(parseChoice({ ...ok, meta: 'yes' }, now)).toBeNull();
    expect(parseChoice(null, now)).toBeNull();
  });
  it('consentState never grants ad_personalization', () => {
    expect(consentState(null)).toEqual({
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    expect(consentState(ok)).toEqual({
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'denied',
    });
  });
  it('cleanPageLocation keeps only valid campaign labels', () => {
    const href =
      'https://uzsakymas.ecotrip.lt/?utm_source=google&utm_campaign=a b&email=x@y.lt&gclid=Abc_123-xyz';
    expect(cleanPageLocation(href, false)).toBe(
      'https://uzsakymas.ecotrip.lt/?utm_source=google'
    );
    expect(cleanPageLocation(href, true)).toBe(
      'https://uzsakymas.ecotrip.lt/?utm_source=google&gclid=Abc_123-xyz'
    );
    expect(
      cleanPageLocation(
        'https://uzsakymas.ecotrip.lt/?utm_source=370612345678',
        false
      )
    ).toBe('https://uzsakymas.ecotrip.lt/');
  });
  it('buildOrderSummary maps currency, direction and price', () => {
    expect(
      buildOrderSummary({
        service: 'productSalesService',
        direction: 'LT-UK',
        currency: '£',
        price: '42.5',
      })
    ).toEqual({
      service: 'productSalesService',
      direction: 'LT-UK',
      currency: 'GBP',
      value: 42.5,
    });
    expect(
      buildOrderSummary({
        service: 'shipmentWithAddressService',
        direction: null,
        currency: '€',
        price: 'NaN',
      })
    ).toEqual({
      service: 'shipmentWithAddressService',
      direction: 'UK-LT',
      currency: 'EUR',
    });
    expect(
      buildOrderSummary({ service: '', direction: 'LT-UK', currency: '€' })
    ).toBeNull();
  });
  it('payloads have the GA4 shapes and nothing else', () => {
    const s = {
      service: 'productSalesService',
      direction: 'LT-UK',
      currency: 'EUR' as const,
      value: 30,
    };
    const item = {
      item_id: 'productSalesService',
      item_name: 'productSalesService',
      item_category: 'LT-UK',
    };
    expect(beginCheckoutPayload(s)).toEqual({
      event: 'begin_checkout',
      ecommerce: { currency: 'EUR', value: 30, items: [item] },
    });
    expect(orderCreatedPayload(s, 'A1')).toEqual({
      event: 'order_created',
      transaction_id: 'A1',
      value: 30,
      currency: 'EUR',
      service: 'productSalesService',
      direction: 'LT-UK',
    });
    expect(purchasePayload(s, 'A1')).toEqual({
      event: 'purchase',
      ecommerce: {
        transaction_id: 'A1',
        value: 30,
        currency: 'EUR',
        items: [item],
      },
    });
    expect(
      purchasePayload({ ...s, value: undefined }, 'A1').ecommerce
    ).not.toHaveProperty('value');
  });
});
