// Order fees and discounts from Ecotrip CMS (GET /api/fees). The types are a
// copy of Ecotrip CMS `lib/fee-types.ts`: keep them in sync and change both
// together. Every amount is one number, used as £ or € by the order currency.

// A percentage of an amount, kept within optional bounds.
export type PercentFee = {
  percent: number;
  min: number | null;
  max: number | null;
};

export const PARCEL_FORCE_ZONES = ['Zone 1', 'Zone 2', 'Zone 3'] as const;
export type ParcelForceZone = (typeof PARCEL_FORCE_ZONES)[number];

export type FeeSettings = {
  addressService: { fee: number };
  purchaseService: {
    // Below: ownMoney, item prices added to the order; from it: clientMoney.
    threshold: number;
    ownMoney: PercentFee;
    clientMoney: PercentFee;
  };
  salesService: PercentFee;
  parcelForce: {
    small: { maxSide: number; maxWeight: number; fee: number };
    medium: { maxSide: number; tiers: { upToWeight: number; fee: number }[] };
    zones: { zone: ParcelForceZone; fee: number }[];
  };
  // fromParcels ascending, first is 1; the last row covers "and more".
  quantityDiscounts: { fromParcels: number; percent: number }[];
};

export type StoredFeeSettings = FeeSettings & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export const percentFee = (amount: number, rule: PercentFee) => {
  const fee = (amount * rule.percent) / 100;
  if (rule.min !== null && fee < rule.min) return rule.min;
  if (rule.max !== null && fee > rule.max) return rule.max;
  return fee;
};

// Below the threshold we buy with our money, so the item prices are part of
// the order too.
export const purchaseServiceFee = (
  itemsTotal: number,
  settings: FeeSettings
) => {
  const { threshold, ownMoney, clientMoney } = settings.purchaseService;
  const ourMoney = itemsTotal < threshold;
  return {
    fee: percentFee(itemsTotal, ourMoney ? ownMoney : clientMoney),
    addsItemPrices: ourMoney,
  };
};

export type ParcelSize = {
  length: number;
  width: number;
  height: number;
  weight: number;
};

// Per parcel of the ParcelForce service: small rule, then medium weight
// tiers, then the zone of the postcode when it is a ParcelForce area.
export const parcelForceSurcharge = (
  { length, width, height, weight }: ParcelSize,
  postcode: { isParcelForceArea: boolean; zone: string } | null,
  settings: FeeSettings
) => {
  const { small, medium, zones } = settings.parcelForce;
  const anySideUpTo = (limit: number) =>
    length <= limit || width <= limit || height <= limit;

  if (anySideUpTo(small.maxSide) && weight <= small.maxWeight) {
    return small.fee;
  }
  const tier = medium.tiers.find((t) => weight <= t.upToWeight);
  if (anySideUpTo(medium.maxSide) && tier) {
    return tier.fee;
  }
  if (postcode?.isParcelForceArea) {
    return zones.find((z) => z.zone === postcode.zone)?.fee ?? 0;
  }
  return 0;
};

// The row with the largest fromParcels not above the count; no parcels
// counts as one.
export const quantityDiscountPercent = (
  parcels: number,
  settings: FeeSettings
) => {
  const count = Math.max(parcels, 1);
  return settings.quantityDiscounts.reduce(
    (percent, row) => (row.fromParcels <= count ? row.percent : percent),
    0
  );
};
