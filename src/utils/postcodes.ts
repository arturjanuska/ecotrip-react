// UK postcode areas from Ecotrip CMS (GET /api/postcodes). The fields are a
// copy of the CMS postcode record: keep them in sync.
export type PostcodeRecord = {
  // Outward code: "FY1", "SW1A".
  postcode: string;
  town: string;
  region: string;
  country: string;
  countryString: string;
  basicPrice: string;
  // An amount added to the order: "0", "15", "-5".
  additionalCharges: string;
  // A ParcelForce area: ParcelForce service, surcharges and delivery dates.
  isParcelForce: boolean;
  parcelForceZone: string;
  // A percentage: "0", "7.5".
  discount: string;
  // "", "Odd" or "Even": weeks of delivery.
  calendar: string;
};

export type PostcodeSnapshot = { items: PostcodeRecord[] };

// Outward code at the start of a full postcode: "FY1 1AA" → "FY1".
export const outcodeOf = (postcode?: string | null): string | null =>
  postcode?.match(/^[A-Z]{1,2}\d{1,2}[A-Z]?/)?.[0] ?? null;

export const findPostcodeRecord = (
  records: PostcodeRecord[],
  outcode: string | null
): PostcodeRecord | null =>
  (outcode && records.find((record) => record.postcode === outcode)) || null;

export const isParcelForceArea = (record: PostcodeRecord | null) =>
  record?.isParcelForce === true;

// The order is ParcelForce when any of its postcodes is in a ParcelForce area;
// the details of the first known postcode drive dates, zone and discount.
export const summarizePostcodes = (records: (PostcodeRecord | null)[]) => ({
  isParcelForce: records.some(isParcelForceArea),
  postcodeDetails: records.find((record) => record !== null) ?? null,
});

// Pickup dates for an area delivered on odd or even weeks only.
export const isDeliveryWeek = (isEvenWeek: boolean, calendar?: string) => {
  if (calendar === 'Odd') return !isEvenWeek;
  if (calendar === 'Even') return isEvenWeek;
  return true;
};
