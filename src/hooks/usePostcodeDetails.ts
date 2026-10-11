import { useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import {
  findPostcodeRecord,
  outcodeOf,
  PostcodeRecord,
  PostcodeSnapshot,
  summarizePostcodes,
} from '../utils/postcodes';
import snapshot from '../data/postcodes.snapshot.json';

// Bundled at build time (see scripts/update-cms-snapshots.mjs): answers at
// once and keeps working when the CMS is down.
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
  const { items } = (await response.json()) as { items: PostcodeRecord[] };
  return findPostcodeRecord(items, outcode);
};

const usePostcodeDetails = (postcodes: (string | null | undefined)[]) => {
  const outcodes = postcodes.map(outcodeOf);

  const queries = useQueries({
    queries: outcodes.map((outcode) => ({
      queryKey: ['postcode', outcode],
      queryFn: () => getPostcode(outcode as string),
      enabled: outcode !== null,
      staleTime: 5 * 60 * 1000,
    })),
  });

  const failed = queries.some((query) => query.isError);
  useEffect(() => {
    if (failed) {
      console.warn('Postcodes: CMS unavailable, using the bundled snapshot');
    }
  }, [failed]);

  // Until the CMS answers, and if it fails, the snapshot answers.
  const records = outcodes.map((outcode, i) =>
    queries[i].data !== undefined
      ? queries[i].data
      : findPostcodeRecord(postcodeSnapshot, outcode)
  );

  return summarizePostcodes(records);
};

export default usePostcodeDetails;
