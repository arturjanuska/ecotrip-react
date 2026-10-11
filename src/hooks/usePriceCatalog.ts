import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PriceCatalog } from '../utils/priceCatalog';
import snapshot from '../data/priceCatalog.snapshot.json';
import useWaitExpired from './useWaitExpired';

// Bundled at build time (see scripts/update-cms-snapshots.mjs): the form
// works on it when the CMS fails or is too slow to answer.
const priceCatalogSnapshot = snapshot as unknown as PriceCatalog;

export const getPriceCatalog = async (): Promise<PriceCatalog> => {
  const response = await fetch(`${import.meta.env.VITE_CMS_URL}/api/prices`);
  if (!response.ok) {
    throw new Error(`GET /api/prices failed: ${response.status}`);
  }
  return response.json();
};

// isReady: the CMS answered, failed, or the wait expired; until then the
// form is not shown.
const usePriceCatalog = (): { catalog: PriceCatalog; isReady: boolean } => {
  const { data, isError } = useQuery({
    queryKey: ['priceCatalog'],
    queryFn: getPriceCatalog,
    staleTime: 5 * 60 * 1000,
    // One retry: the form waits for the answer, so an unreachable CMS
    // should fall back to the snapshot quickly.
    retry: 1,
  });
  const waitExpired = useWaitExpired('priceCatalog');
  const usesSnapshot = data === undefined && (isError || waitExpired);

  useEffect(() => {
    if (usesSnapshot) {
      console.warn('Prices: CMS unavailable, using the bundled snapshot');
    }
  }, [usesSnapshot]);

  return {
    catalog: data ?? priceCatalogSnapshot,
    isReady: data !== undefined || usesSnapshot,
  };
};

export default usePriceCatalog;
