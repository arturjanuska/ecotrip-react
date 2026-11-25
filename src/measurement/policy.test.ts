import { describe, expect, it } from 'vitest';
import {
  CONSENT_MAX_AGE_MS,
  beginCheckoutPayload,
  buildOrderSummary,
  cleanPageLocation,
  consentState,
  orderCreatedPayload,
  parseChoice,
  parcelItems,
  metaPageAllowed,
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
    const items = [
      {
        item_id: 'fridge',
        item_name: 'fridge',
        item_category: 'household',
        quantity: 1,
      },
    ];
    const s = {
      service: 'productSalesService',
      direction: 'LT-UK',
      currency: 'EUR' as const,
      value: 30,
      items,
    };
    expect(beginCheckoutPayload(s)).toEqual({
      event: 'begin_checkout',
      service: 'productSalesService',
      direction: 'LT-UK',
      ecommerce: {
        currency: 'EUR',
        value: 30,
        items: [
          { item_id: 'productSalesService', item_name: 'productSalesService' },
        ],
      },
    });
    expect(orderCreatedPayload(s, 'A1')).toEqual({
      event: 'order_created',
      service: 'productSalesService',
      direction: 'LT-UK',
      ecommerce: {
        transaction_id: 'A1',
        value: 30,
        currency: 'EUR',
        items,
      },
    });
    const bare = orderCreatedPayload(
      { ...s, value: undefined, items: undefined },
      'A1'
    ).ecommerce;
    expect(bare).not.toHaveProperty('value');
    expect(bare.items).toEqual([]);
  });

  it('parcelItems makes one item per parcel from catalog keys', () => {
    expect(
      parcelItems([
        {
          category: { value: 'householdAppliances' },
          productType: { value: 'fridge' },
          size: { value: 'large' },
          amount: 2,
          estimatedPrice: '90.00',
        },
        {
          category: { value: 'shipments' },
          specification: { value: 'fragile' },
          amount: '1',
          estimatedPrice: '12.5',
        },
      ])
    ).toEqual([
      {
        item_id: 'fridge',
        item_name: 'fridge',
        item_category: 'householdAppliances',
        item_category2: 'fridge',
        item_variant: 'large',
        quantity: 2,
        price: 45,
      },
      {
        item_id: 'shipments',
        item_name: 'shipments',
        item_category: 'shipments',
        item_variant: 'fragile',
        quantity: 1,
        price: 12.5,
      },
    ]);
  });

  it('parcelItems skips parcels without a category and unknown prices', () => {
    expect(
      parcelItems([
        { category: null, amount: 1, estimatedPrice: '5' },
        {
          category: { value: 'palettes' },
          size: { value: { from: 1, to: 2 } },
          amount: 0,
          estimatedPrice: '0.00',
        },
      ])
    ).toEqual([
      {
        item_id: 'palettes',
        item_name: 'palettes',
        item_category: 'palettes',
        quantity: 1,
      },
    ]);
  });

  it('buildOrderSummary adds parcel items only when parcels are given', () => {
    expect(
      buildOrderSummary({
        service: 'standartShipment',
        direction: 'UK-LT',
        currency: '€',
        parcels: [{ category: { value: 'shipments' }, amount: 1 }],
      })?.items
    ).toEqual([
      {
        item_id: 'shipments',
        item_name: 'shipments',
        item_category: 'shipments',
        quantity: 1,
      },
    ]);
    expect(
      buildOrderSummary({
        service: 'standartShipment',
        direction: 'UK-LT',
        currency: '€',
      })
    ).not.toHaveProperty('items');
  });

  it('metaPageAllowed on any production form page, with any campaign params', () => {
    const base = 'https://uzsakymas.ecotrip.lt/';
    expect(metaPageAllowed(base)).toBe(true);
    expect(
      metaPageAllowed(`${base}?gad_source=1&gclid=abc&_gl=1*x&utm_term=fridge`)
    ).toBe(true);
    expect(metaPageAllowed(`${base}success?orderId=1`)).toBe(true);
    expect(metaPageAllowed('http://localhost:5173/')).toBe(false);
    expect(metaPageAllowed('https://ecotrip.lt/')).toBe(false);
    expect(metaPageAllowed('not a url')).toBe(false);
  });
});
