import { useEffect, useState } from 'react';
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
// An answer `isValid` rejects counts as a failure.
const useCmsResource = <T>(
  name: string,
  path: string,
  snapshot: T,
  isValid: (value: unknown) => value is T
) => {
  const { data, isError } = useQuery({
    queryKey: [name],
    queryFn: async () => {
      const answer = await getCmsJson<unknown>(path);
      if (!isValid(answer)) {
        throw new Error(`GET ${path}: unexpected answer`);
      }
      return answer;
    },
    staleTime: 5 * 60 * 1000,
    // One retry: the form waits for the answer, so an unreachable CMS should
    // fall back to the snapshot quickly.
    retry: 1,
    // A component mounting later (a shipment, the payer step) must not
    // refetch a failed resource: the refetch clears the error and would hide
    // the form again.
    retryOnMount: false,
  });
  const waitExpired = useWaitExpired(name);
  const usesSnapshot = data === undefined && (isError || waitExpired);
  const isReady = data !== undefined || usesSnapshot;

  // Once ready, stays ready: hiding the form again would unmount its steps
  // and lose what the customer entered.
  const [wasReady, setWasReady] = useState(false);
  useEffect(() => {
    if (isReady) {
      setWasReady(true);
    }
  }, [isReady]);

  useEffect(() => {
    if (usesSnapshot) {
      console.warn(`${name}: CMS unavailable, using the bundled snapshot`);
    }
  }, [name, usesSnapshot]);

  return {
    data: data ?? snapshot,
    isReady: isReady || wasReady,
  };
};

export default useCmsResource;
