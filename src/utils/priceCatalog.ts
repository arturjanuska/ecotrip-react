// Catalog types are a copy of Ecotrip CMS `lib/price-types.ts` (GET /api/prices):
// keep them in sync and change both together.
import { isArrayOf, isNumber, isObject, isOptional, isString } from './guards';

export const DIRECTIONS = ['UK-LT', 'LT-UK'] as const;
export type Direction = (typeof DIRECTIONS)[number];

// UK-LT is charged in GBP, LT-UK in EUR.
export type Money = Record<Direction, number>;

// A Select option on the site. `value` never changes once created (orders
// store it); `label` is an i18n key or a literal such as "<R18".
export type PriceOption = { value: string; label: string };

// Exact texts of one row of the price list spreadsheet. Rows are matched by
// them on import, and the CMS table shows them.
export type SheetKey = { type: string; size: string; spec: string };

export type Variant = {
  sheet: SheetKey;
  size: PriceOption | null;
  specification: PriceOption | null;
  // One item, for logistics only: they do not change the price.
  volume: number | null;
  weight: number | null;
  price: Money;
};

export type Tier = {
  sheet: SheetKey;
  // Inclusive upper limit (kg or m3); null only on the last tier.
  upTo: number | null;
  price: Money;
  // true: price per kg or m3; false: price per parcel.
  perUnit: boolean;
};

export type FixedPricing = { type: 'fixed'; variants: Variant[] };

// The price is the larger of the weight price and the volume price.
export type MeasuredPricing = {
  type: 'measured';
  byWeight: Tier[] | null;
  byVolume: Tier[] | null;
};

export type Pricing = FixedPricing | MeasuredPricing | { type: 'callManager' };

export type SubCategory = PriceOption & { pricing: Pricing };

export type Category = PriceOption & {
  // "Siuntos kategorija" text in the spreadsheet.
  sheet: string;
  order: number;
  // Array order is the Select order. Empty: the site hides Sub Category.
  subCategories: SubCategory[];
  // Set only when subCategories is empty.
  pricing: Pricing | null;
};

// A category as GET /api/prices returns it.
export type StoredCategory = Category & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type PriceCatalog = { categories: StoredCategory[] };

const isOption = (value: unknown): value is PriceOption =>
  isObject(value) && isString(value.value) && isString(value.label);

const isMoney = (value: unknown): value is Money =>
  isObject(value) &&
  DIRECTIONS.every((direction) => isNumber(value[direction]));

const isTier = (value: unknown): value is Tier =>
  isObject(value) &&
  (value.upTo === null || isNumber(value.upTo)) &&
  isMoney(value.price) &&
  typeof value.perUnit === 'boolean';

const isVariant = (value: unknown): value is Variant =>
  isObject(value) &&
  isOptional(isOption)(value.size) &&
  isOptional(isOption)(value.specification) &&
  isOptional(isNumber)(value.volume) &&
  isOptional(isNumber)(value.weight) &&
  isMoney(value.price);

const isPricing = (value: unknown): value is Pricing => {
  if (!isObject(value)) return false;
  switch (value.type) {
    case 'fixed':
      return isArrayOf(isVariant)(value.variants);
    case 'measured':
      return (
        isOptional(isArrayOf(isTier))(value.byWeight) &&
        isOptional(isArrayOf(isTier))(value.byVolume)
      );
    case 'callManager':
      return true;
    default:
      return false;
  }
};

const isSubCategory = (value: unknown): value is SubCategory =>
  isObject(value) && isPricing(value.pricing) && isOption(value);

const isCategory = (value: unknown): value is StoredCategory =>
  isObject(value) &&
  isNumber(value.order) &&
  isArrayOf(isSubCategory)(value.subCategories) &&
  isOptional(isPricing)(value.pricing) &&
  isOption(value);

// GET /api/prices as the site reads it. An empty catalog is rejected too: the
// form would offer nothing to price, and orders would go out at 0.
export const isPriceCatalog = (value: unknown): value is PriceCatalog =>
  isObject(value) &&
  isArrayOf(isCategory)(value.categories) &&
  value.categories.length > 0;

// Same expression as `route` in transformFormDataToEndpoint.ts, so the price
// is taken for the direction the order is sent with. The catalog has no LT-LT
// prices: an unset or LT-LT direction is priced as UK-LT.
export const priceDirection = (
  service: string,
  direction: string | null
): Direction =>
  service === 'shipmentWithAddressService' || direction !== 'LT-UK'
    ? 'UK-LT'
    : 'LT-UK';

const toOption = ({ value, label }: PriceOption): PriceOption => ({
  value,
  label,
});

export const categoryOptions = (catalog: PriceCatalog): PriceOption[] =>
  [...catalog.categories].sort((a, b) => a.order - b.order).map(toOption);

export const findCategory = (
  catalog: PriceCatalog,
  value?: string | null
): StoredCategory | null =>
  (value && catalog.categories.find((c) => c.value === value)) || null;

export const findSubCategory = (
  category?: Category | null,
  value?: string | null
): SubCategory | null =>
  (value && category?.subCategories.find((s) => s.value === value)) || null;

export const pricingFor = (
  category?: Category | null,
  subCategory?: SubCategory | null
): Pricing | null => {
  if (!category) return null;
  if (category.subCategories.length === 0) return category.pricing;
  return subCategory?.pricing ?? null;
};

export const subCategoryOptions = (
  category?: Category | null
): PriceOption[] => (category ? category.subCategories.map(toOption) : []);

const uniqueOptions = (options: (PriceOption | null)[]): PriceOption[] => {
  const seen = new Map<string, PriceOption>();
  options.forEach((option) => {
    if (option && !seen.has(option.value))
      seen.set(option.value, toOption(option));
  });
  return [...seen.values()];
};

// A single option is chosen silently and its select hidden, hence [].
const selectable = (options: PriceOption[]) =>
  options.length < 2 ? [] : options;

export const sizeOptions = (pricing?: Pricing | null): PriceOption[] =>
  pricing?.type === 'fixed'
    ? selectable(uniqueOptions(pricing.variants.map((v) => v.size)))
    : [];

export const specificationOptions = (
  pricing?: Pricing | null,
  size?: string | null
): PriceOption[] => {
  if (pricing?.type !== 'fixed') return [];
  const variants = size
    ? pricing.variants.filter((v) => v.size?.value === size)
    : pricing.variants;
  return selectable(uniqueOptions(variants.map((v) => v.specification)));
};

// An empty size or specification matches any variant, so hidden single-option
// selects still resolve; an ambiguous selection gives no variant.
export const findVariant = (
  pricing?: Pricing | null,
  size?: string | null,
  specification?: string | null
): Variant | null => {
  if (pricing?.type !== 'fixed') return null;
  const matches = pricing.variants.filter(
    (v) =>
      (!size || v.size?.value === size) &&
      (!specification || v.specification?.value === specification)
  );
  return matches.length === 1 ? matches[0] : null;
};

export type PriceInput = {
  size?: string | null;
  specification?: string | null;
  amount: number;
  // kg
  weight?: number | null;
  // cm
  length?: number | null;
  width?: number | null;
  height?: number | null;
};

export type PriceResult = {
  price: number | null;
  // m3
  volume: number | null;
  // kg
  weight: number | null;
};

const isMissing = (n?: number | null): n is null | undefined =>
  n === null || n === undefined || Number.isNaN(n);

const tierPrice = (tiers: Tier[], value: number, direction: Direction) => {
  // Weight or volume 0 is priced at 0, like the old calculateShipmentPrice.
  if (value <= 0 || tiers.length === 0) return 0;
  const tier =
    tiers.find((t) => t.upTo === null || value <= t.upTo) ??
    tiers[tiers.length - 1];
  const rate = tier.price[direction];
  return tier.perUnit ? rate * value : rate;
};

const measuredPrice = (
  pricing: MeasuredPricing,
  input: PriceInput,
  direction: Direction
): PriceResult => {
  const { amount, weight, length, width, height } = input;
  const volume =
    isMissing(length) || isMissing(width) || isMissing(height)
      ? null
      : (length * width * height) / 1e6;
  const result = { volume, weight: isMissing(weight) ? null : weight };

  // Each base is priced from the input it has, so a partly filled form
  // still shows a price; with no usable input at all the price is 0.
  const byWeight =
    pricing.byWeight && result.weight !== null
      ? tierPrice(pricing.byWeight, result.weight, direction)
      : 0;
  const byVolume =
    pricing.byVolume && volume !== null
      ? tierPrice(pricing.byVolume, volume, direction)
      : 0;
  return { ...result, price: Math.max(byWeight, byVolume) * amount };
};

// Not rounded: callers format with toFixed(2).
export const calculatePrice = (
  pricing: Pricing,
  input: PriceInput,
  direction: Direction
): PriceResult => {
  switch (pricing.type) {
    case 'callManager':
      return { price: null, volume: null, weight: null };
    case 'fixed': {
      const variant = findVariant(pricing, input.size, input.specification);
      return variant
        ? {
            price: variant.price[direction] * input.amount,
            volume: variant.volume,
            weight: variant.weight,
          }
        : { price: 0, volume: null, weight: null };
    }
    case 'measured':
      return measuredPrice(pricing, input, direction);
  }
};
