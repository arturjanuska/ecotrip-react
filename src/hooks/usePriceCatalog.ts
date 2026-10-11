import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PriceCatalog } from '../utils/priceCatalog';
import snapshot from '../data/priceCatalog.snapshot.json';

// Bundled at build time (see scripts/update-price-snapshot.mjs): the form
// renders with it at once and keeps working on it when the CMS is down.
const priceCatalogSnapshot = snapshot as unknown as PriceCatalog;

export const getPriceCatalog = async (): Promise<PriceCatalog> => {
  const response = await fetch(`${import.meta.env.VITE_CMS_URL}/api/prices`);
  if (!response.ok) {
    throw new Error(`GET /api/prices failed: ${response.status}`);
  }
  return response.json();
};

const usePriceCatalog = (): PriceCatalog => {
  const { data, error } = useQuery({
    queryKey: ['priceCatalog'],
    queryFn: getPriceCatalog,
    staleTime: 5 * 60 * 1000,
    placeholderData: priceCatalogSnapshot,
  });

  useEffect(() => {
    if (error) {
      console.warn(
        'Prices: CMS unavailable, using the bundled snapshot',
        error
      );
    }
  }, [error]);

  return data ?? priceCatalogSnapshot;
};

export default usePriceCatalog;
