import { describe, expect, it } from 'vitest';
import snapshot from '../data/postcodes.snapshot.json';
import {
  findPostcodeRecord,
  isDeliveryWeek,
  outcodeOf,
  PostcodeRecord,
  PostcodeSnapshot,
  summarizePostcodes,
} from './postcodes';
// Old implementation, kept deprecated, for the parity checks below.
import { checkParcelForcePostcodes } from './checkPostCodes';
import {
  evenWeeksDeliveryPostcodes,
  oddWeeksDeliveryPostcodes,
} from './ukPostCodesv2';

const records = (snapshot as PostcodeSnapshot).items;
const lookup = (postcode: string | null) =>
  findPostcodeRecord(records, outcodeOf(postcode));

const record = (fields: Partial<PostcodeRecord>): PostcodeRecord => ({
  postcode: 'AB1',
  town: '',
  region: '',
  country: 'ENG',
  countryString: '',
  basicPrice: '',
  additionalCharges: '',
  isParcelForce: false,
  parcelForceZone: '',
  discount: '',
  calendar: '',
  ...fields,
});

describe('outcodeOf', () => {
  it('takes the outward code of a full or partial postcode', () => {
    expect(outcodeOf('FY1 1AA')).toBe('FY1');
    expect(outcodeOf('SW1A 1AA')).toBe('SW1A');
    expect(outcodeOf('M40')).toBe('M40');
  });

  it('gives null for empty or non-UK postcodes', () => {
    expect(outcodeOf('')).toBeNull();
    expect(outcodeOf(null)).toBeNull();
    expect(outcodeOf('LT-01100')).toBeNull();
    expect(outcodeOf('01100')).toBeNull();
  });
});

describe('findPostcodeRecord', () => {
  it('matches the exact outward code, not a prefix', () => {
    const list = [record({ postcode: 'M40' }), record({ postcode: 'M4' })];
    expect(findPostcodeRecord(list, 'M4')?.postcode).toBe('M4');
    expect(findPostcodeRecord(list, 'M41')).toBeNull();
    expect(findPostcodeRecord(list, null)).toBeNull();
  });
});

describe('summarizePostcodes', () => {
  const plain = record({ postcode: 'AB1' });
  const parcelForce = record({
    postcode: 'PF1',
    isParcelForce: true,
  });

  it('is ParcelForce when any postcode is in a ParcelForce area', () => {
    expect(summarizePostcodes([plain, parcelForce]).isParcelForce).toBe(true);
    expect(summarizePostcodes([plain, null]).isParcelForce).toBe(false);
    expect(summarizePostcodes([]).isParcelForce).toBe(false);
  });

  it('takes the details of the first known postcode', () => {
    expect(summarizePostcodes([null, parcelForce]).postcodeDetails).toBe(
      parcelForce
    );
    expect(summarizePostcodes([null, null]).postcodeDetails).toBeNull();
  });
});

describe('isDeliveryWeek', () => {
  it('follows the calendar of the area', () => {
    expect(isDeliveryWeek(true, 'Even')).toBe(true);
    expect(isDeliveryWeek(false, 'Even')).toBe(false);
    expect(isDeliveryWeek(true, 'Odd')).toBe(false);
    expect(isDeliveryWeek(false, 'Odd')).toBe(true);
    expect(isDeliveryWeek(true, '')).toBe(true);
    expect(isDeliveryWeek(false, undefined)).toBe(true);
  });
});

// The old list marked ParcelForce areas in additionalCharges; the CMS has
// isParcelForce for that and keeps additionalCharges a number.
const fromOldShape = (old: object | null | undefined) => {
  if (!old) return null;
  const { additionalCharges, ...rest } = old as PostcodeRecord;
  const isParcelForce = /^parcel force pricelist$/i.test(additionalCharges);
  return {
    ...rest,
    additionalCharges: isParcelForce ? '' : additionalCharges,
    isParcelForce,
  };
};

const sortedJson = (value: object | null) =>
  JSON.stringify(value && Object.fromEntries(Object.entries(value).sort()));

// Marked "parcel force pricelist" in lower case, so the old code did not take
// them as ParcelForce areas; now they are.
const NOW_PARCEL_FORCE = ['TQ1', 'TQ2', 'TQ3', 'TQ4', 'TQ5'];

describe('parity with the old hardcoded postcodes', () => {
  const samples = [
    ...records.flatMap((r) => [r.postcode, `${r.postcode} 1AA`]),
    'LT-01100',
    '',
    'ZZ9 9ZZ',
  ];

  it('gives the same ParcelForce flag and details for every area', () => {
    const mismatches = samples.filter((postcode) => {
      const old = checkParcelForcePostcodes({ postcodes: [postcode] });
      const now = summarizePostcodes([lookup(postcode)]);
      return (
        old.isParcelForce !== now.isParcelForce ||
        sortedJson(fromOldShape(old.postcodeDetails)) !==
          sortedJson(now.postcodeDetails)
      );
    });
    expect(mismatches).toEqual(
      NOW_PARCEL_FORCE.flatMap((postcode) => [postcode, `${postcode} 1AA`])
    );
  });

  it('gives the same answer for pairs of pickup and delivery postcodes', () => {
    const pairs = [
      ['FY1 1AA', 'ZZ9 9ZZ'],
      ['ZZ9 9ZZ', 'FY1 1AA'],
      ['', records[records.length - 1].postcode],
    ];
    pairs.forEach((postcodes) => {
      const old = checkParcelForcePostcodes({ postcodes });
      const now = summarizePostcodes(postcodes.map(lookup));
      expect(now.isParcelForce).toBe(old.isParcelForce);
      expect(now.postcodeDetails).toEqual(fromOldShape(old.postcodeDetails));
    });
  });

  it('gives the same delivery weeks for every area', () => {
    const oldWeek = (isEvenWeek: boolean, postcode: string) => {
      if (oddWeeksDeliveryPostcodes.includes(postcode)) return !isEvenWeek;
      if (evenWeeksDeliveryPostcodes.includes(postcode)) return isEvenWeek;
      return true;
    };
    records.forEach((r) => {
      [true, false].forEach((isEvenWeek) => {
        expect(isDeliveryWeek(isEvenWeek, r.calendar)).toBe(
          oldWeek(isEvenWeek, r.postcode)
        );
      });
    });
  });
});
