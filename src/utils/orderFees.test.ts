import { describe, expect, it } from 'vitest';
import snapshot from '../data/feeSettings.snapshot.json';
import {
  FeeSettings,
  parcelForceSurcharge,
  percentFee,
  purchaseServiceFee,
  quantityDiscountPercent,
} from './orderFees';

const fees = snapshot as FeeSettings;
const pfArea = (zone: string) => ({ isParcelForceArea: true, zone });

// The examples are the ones shown next to the fields in the CMS.
describe('percentFee', () => {
  it('applies the percent within min and max', () => {
    const rule = { percent: 2, min: 15, max: 50 };
    expect(percentFee(500, rule)).toBe(15);
    expect(percentFee(1000, rule)).toBe(20);
    expect(percentFee(3000, rule)).toBe(50);
  });

  it('has no limit where min or max is null', () => {
    expect(percentFee(10000, { percent: 3, min: 5, max: null })).toBe(300);
    expect(percentFee(0, { percent: 3, min: null, max: null })).toBe(0);
  });
});

describe('purchaseServiceFee', () => {
  it('uses our money below the threshold and adds the item prices', () => {
    expect(purchaseServiceFee(100, fees)).toEqual({
      fee: 5,
      addsItemPrices: true,
    });
    expect(purchaseServiceFee(200, fees).fee).toBeCloseTo(6);
    expect(purchaseServiceFee(249, fees).addsItemPrices).toBe(true);
  });

  it("uses the client's money from the threshold", () => {
    expect(purchaseServiceFee(250, fees)).toEqual({
      fee: 15,
      addsItemPrices: false,
    });
    expect(purchaseServiceFee(1000, fees).fee).toBe(20);
    expect(purchaseServiceFee(3000, fees).fee).toBe(50);
  });
});

describe('parcelForceSurcharge', () => {
  it('charges a small parcel', () => {
    expect(
      parcelForceSurcharge(
        { length: 40, width: 50, height: 60, weight: 1.5 },
        null,
        fees
      )
    ).toBe(4.19);
  });

  it('charges a medium parcel by weight tier', () => {
    const size = { length: 60, width: 70, height: 80 };
    expect(parcelForceSurcharge({ ...size, weight: 2 }, null, fees)).toBe(5.89);
    expect(parcelForceSurcharge({ ...size, weight: 8 }, null, fees)).toBe(7.59);
    expect(parcelForceSurcharge({ ...size, weight: 20 }, null, fees)).toBe(
      11.69
    );
  });

  it('falls back to the zone of a ParcelForce area', () => {
    const heavy = { length: 60, width: 70, height: 80, weight: 25 };
    expect(parcelForceSurcharge(heavy, pfArea('Zone 2'), fees)).toBe(19);
    expect(parcelForceSurcharge(heavy, pfArea(''), fees)).toBe(0);
    expect(
      parcelForceSurcharge(
        heavy,
        { isParcelForceArea: false, zone: 'Zone 2' },
        fees
      )
    ).toBe(0);
    expect(parcelForceSurcharge(heavy, null, fees)).toBe(0);
  });
});

describe('quantityDiscountPercent', () => {
  it('takes the row of the largest count not above the parcels', () => {
    expect(
      [0, 1, 2, 3, 4, 5, 9].map((n) => quantityDiscountPercent(n, fees))
    ).toEqual([0, 0, 0, 5, 10, 15, 15]);
  });
});
