import { useEffect } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import {
  findPostcodeRecord,
  isPostcodeList,
  outcodeOf,
  PostcodeRecord,
  PostcodeSnapshot,
  summarizePostcodes,
} from '../utils/postcodes';
import useWaitExpired from './useWaitExpired';

// Saved at build time (see scripts/update-cms-snapshots.mjs): answers when
// the CMS fails or is too slow. About 1 MB, so it is a separate file that the
// browser downloads only when it is needed.
const loadPostcodeSnapshot = async () => {
  const module = await import('../data/postcodes.snapshot.json');
  return (module.default as PostcodeSnapshot).items;
};

// The API matches by prefix ("M4" also finds "M40"), so pick the exact one.
// null: the area is unknown or was deleted in the CMS.
export const getPostcode = async (
  outcode: string
): Promise<PostcodeRecord | null> => {
  const response = await fetch(
    `${import.meta.env.VITE_CMS_URL}/api/postcodes?postcode=${encodeURIComponent(
      outcode
    )}&limit=500`
  );
  if (!response.ok) {
    throw new Error(`GET /api/postcodes failed: ${response.status}`);
  }
  const list: unknown = await response.json();
  if (!isPostcodeList(list)) {
    throw new Error('GET /api/postcodes: unexpected answer');
  }
  return findPostcodeRecord(list.items, outcode);
};

// isReady: every postcode has an answer (from the CMS, also an earlier one,
// or from the snapshot after a failure or the wait, once the snapshot is
// downloaded); until then the services and the rest of the form are not
// shown.
const usePostcodeDetails = (postcodes: (string | null | undefined)[]) => {
  const outcodes = postcodes.map(outcodeOf);

  const queries = useQueries({
    queries: outcodes.map((outcode) => ({
      queryKey: ['postcode', outcode],
      queryFn: () => getPostcode(outcode as string),
      enabled: outcode !== null,
      staleTime: 5 * 60 * 1000,
      // One retry: the form waits for the answer, so an unreachable CMS
      // should fall back to the snapshot quickly.
      retry: 1,
    })),
  });
  const waitExpired = useWaitExpired(`postcodes:${outcodes.join(',')}`);

  const answered = queries.map(
    (query, i) => outcodes[i] === null || query.data !== undefined
  );
  const gaveUp = queries.map((query) => query.isError || waitExpired);
  const usesSnapshot = answered.some(
    (isAnswered, i) => !isAnswered && gaveUp[i]
  );

  const snapshotQuery = useQuery({
    queryKey: ['postcodeSnapshot'],
    queryFn: loadPostcodeSnapshot,
    enabled: usesSnapshot,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const snapshot = snapshotQuery.data;
  // A snapshot that failed to download as well: go on without the details
  // rather than keep the form hidden.
  const snapshotSettled = snapshot !== undefined || snapshotQuery.isError;

  useEffect(() => {
    if (usesSnapshot) {
      console.warn('Postcodes: CMS unavailable, using the bundled snapshot');
    }
  }, [usesSnapshot]);

  const records = outcodes.map((outcode, i) =>
    queries[i].data !== undefined
      ? queries[i].data
      : snapshot
        ? findPostcodeRecord(snapshot, outcode)
        : null
  );

  return {
    ...summarizePostcodes(records),
    isReady: answered.every(
      (isAnswered, i) => isAnswered || (gaveUp[i] && snapshotSettled)
    ),
  };
};

export default usePostcodeDetails;
