import { useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import {
  findPostcodeRecord,
  isPostcodeList,
  outcodeOf,
  PostcodeRecord,
  PostcodeSnapshot,
  summarizePostcodes,
} from '../utils/postcodes';
import snapshot from '../data/postcodes.snapshot.json';
import useWaitExpired from './useWaitExpired';

// Bundled at build time (see scripts/update-cms-snapshots.mjs): answers when
// the CMS fails or is too slow.
const postcodeSnapshot = (snapshot as PostcodeSnapshot).items;

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
// or from the snapshot after a failure or the wait); until then the services
// and the rest of the form are not shown.
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
  const usesSnapshot = answered.some(
    (isAnswered, i) => !isAnswered && (queries[i].isError || waitExpired)
  );

  useEffect(() => {
    if (usesSnapshot) {
      console.warn('Postcodes: CMS unavailable, using the bundled snapshot');
    }
  }, [usesSnapshot]);

  const records = outcodes.map((outcode, i) =>
    queries[i].data !== undefined
      ? queries[i].data
      : findPostcodeRecord(postcodeSnapshot, outcode)
  );

  return {
    ...summarizePostcodes(records),
    isReady: answered.every(
      (isAnswered, i) => isAnswered || queries[i].isError || waitExpired
    ),
  };
};

export default usePostcodeDetails;
