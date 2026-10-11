import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useWaitExpired from './useWaitExpired';

export const getCmsJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${import.meta.env.VITE_CMS_URL}${path}`);
  if (!response.ok) {
    throw new Error(`GET ${path} failed: ${response.status}`);
  }
  return response.json();
};

// A CMS resource with a snapshot bundled at build time (see
// scripts/update-cms-snapshots.mjs). isReady: the CMS answered, failed, or
// the wait expired; from then on `data` is the CMS answer or the snapshot.
const useCmsResource = <T>(name: string, path: string, snapshot: T) => {
  const { data, isError } = useQuery({
    queryKey: [name],
    queryFn: () => getCmsJson<T>(path),
    staleTime: 5 * 60 * 1000,
    // One retry: the form waits for the answer, so an unreachable CMS should
    // fall back to the snapshot quickly.
    retry: 1,
  });
  const waitExpired = useWaitExpired(name);
  const usesSnapshot = data === undefined && (isError || waitExpired);

  useEffect(() => {
    if (usesSnapshot) {
      console.warn(`${name}: CMS unavailable, using the bundled snapshot`);
    }
  }, [name, usesSnapshot]);

  return {
    data: data ?? snapshot,
    isReady: data !== undefined || usesSnapshot,
  };
};

export default useCmsResource;
