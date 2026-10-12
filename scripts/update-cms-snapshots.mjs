// Refreshes the CMS snapshots in src/data before a build. They are the site's
// fallback when the CMS is unreachable, so a failed download must not fail
// the build: the previous snapshot stays.
import { writeFile } from 'node:fs/promises';
import { loadEnv } from 'vite';

const TIMEOUT_MS = 10_000;
// GET /api/postcodes returns at most 500 records per page.
const POSTCODES_PAGE_SIZE = 500;
// Only the fields the site reads; ids and timestamps would just grow the bundle.
const POSTCODE_FIELDS = [
  'postcode',
  'town',
  'region',
  'country',
  'countryString',
  'basicPrice',
  'additionalCharges',
  'parcelForceZone',
  'discount',
  'calendar',
];

const mode =
  process.env.NODE_ENV === 'development' ? 'development' : 'production';
const { VITE_CMS_URL } = {
  ...loadEnv(mode, process.cwd(), 'VITE_'),
  ...process.env,
};

const getJson = async (path) => {
  const response = await fetch(`${VITE_CMS_URL}${path}`, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`GET ${path}: HTTP ${response.status}`);
  }
  return response.json();
};

const getPriceCatalog = async () => {
  const catalog = await getJson('/api/prices');
  if (!Array.isArray(catalog?.categories) || catalog.categories.length === 0) {
    throw new Error('GET /api/prices: no categories');
  }
  return { data: catalog, count: catalog.categories.length };
};

const getPostcodes = async () => {
  const items = [];
  for (let page = 1; ; page++) {
    const list = await getJson(
      `/api/postcodes?limit=${POSTCODES_PAGE_SIZE}&page=${page}`
    );
    if (!Array.isArray(list?.items)) {
      throw new Error('GET /api/postcodes: no items');
    }
    items.push(...list.items);
    if (list.items.length < POSTCODES_PAGE_SIZE || items.length >= list.total) {
      break;
    }
  }
  if (items.length === 0) {
    throw new Error('GET /api/postcodes: empty list');
  }
  const data = {
    items: items.map((item) =>
      Object.fromEntries(POSTCODE_FIELDS.map((f) => [f, item[f] ?? '']))
    ),
  };
  return { data, count: items.length };
};

const FEE_FIELDS = [
  'addressService',
  'purchaseService',
  'salesService',
  'parcelForce',
  'quantityDiscounts',
];

const getFeeSettings = async () => {
  const fees = await getJson('/api/fees');
  if (!Array.isArray(fees?.quantityDiscounts) || !fees.parcelForce) {
    throw new Error('GET /api/fees: unexpected answer');
  }
  const data = Object.fromEntries(FEE_FIELDS.map((f) => [f, fees[f]]));
  return { data, count: 1 };
};

const DATE_OVERRIDE_FIELDS = ['direction', 'year', 'month', 'trips'];

// An empty list is a valid answer: no month is set by hand.
const getDateOverrides = async () => {
  const list = await getJson('/api/date-overrides');
  if (!Array.isArray(list?.items)) {
    throw new Error('GET /api/date-overrides: no items');
  }
  const data = {
    items: list.items.map((item) =>
      Object.fromEntries(DATE_OVERRIDE_FIELDS.map((f) => [f, item[f]]))
    ),
  };
  return { data, count: list.items.length };
};

const SNAPSHOTS = [
  {
    name: 'prices',
    file: '../src/data/priceCatalog.snapshot.json',
    load: getPriceCatalog,
  },
  {
    name: 'postcodes',
    file: '../src/data/postcodes.snapshot.json',
    load: getPostcodes,
  },
  {
    name: 'fees',
    file: '../src/data/feeSettings.snapshot.json',
    load: getFeeSettings,
  },
  {
    name: 'date overrides',
    file: '../src/data/dateOverrides.snapshot.json',
    load: getDateOverrides,
  },
];

for (const { name, file, load } of SNAPSHOTS) {
  const warn = (reason) =>
    console.warn(
      `[${name}] snapshot not updated (${reason}), keeping the old one`
    );

  if (!VITE_CMS_URL) {
    warn('VITE_CMS_URL is not set');
    continue;
  }
  try {
    const { data, count } = await load();
    await writeFile(
      new URL(file, import.meta.url),
      `${JSON.stringify(data, null, 2)}\n`
    );
    console.log(`[${name}] snapshot updated: ${count} records`);
  } catch (error) {
    warn(error instanceof Error ? error.message : String(error));
  }
}
