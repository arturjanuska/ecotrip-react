// Refreshes src/data/priceCatalog.snapshot.json from the CMS before a build.
// The snapshot is the site's fallback when the CMS is unreachable, so a
// failed download must not fail the build: the previous snapshot stays.
import { writeFile } from 'node:fs/promises';
import { loadEnv } from 'vite';

const SNAPSHOT = new URL(
  '../src/data/priceCatalog.snapshot.json',
  import.meta.url
);
const TIMEOUT_MS = 10_000;

const mode =
  process.env.NODE_ENV === 'development' ? 'development' : 'production';
const { VITE_CMS_URL } = {
  ...loadEnv(mode, process.cwd(), 'VITE_'),
  ...process.env,
};

const warn = (reason) =>
  console.warn(
    `[prices] snapshot not updated (${reason}), keeping the old one`
  );

if (!VITE_CMS_URL) {
  warn('VITE_CMS_URL is not set');
} else {
  try {
    const response = await fetch(`${VITE_CMS_URL}/api/prices`, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const catalog = await response.json();
    if (
      !Array.isArray(catalog?.categories) ||
      catalog.categories.length === 0
    ) {
      throw new Error('response has no categories');
    }
    await writeFile(SNAPSHOT, `${JSON.stringify(catalog, null, 2)}\n`);
    console.log(
      `[prices] snapshot updated: ${catalog.categories.length} categories`
    );
  } catch (error) {
    warn(error instanceof Error ? error.message : String(error));
  }
}
