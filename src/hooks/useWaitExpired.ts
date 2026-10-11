import { useEffect, useState } from 'react';

// How long the form waits for the CMS before it goes on with the bundled
// snapshot.
export const CMS_WAIT_MS = 5000;

// true once `ms` have passed since `key` last changed.
const useWaitExpired = (key: string, ms = CMS_WAIT_MS) => {
  const [expiredKey, setExpiredKey] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setExpiredKey(key), ms);
    return () => clearTimeout(timer);
  }, [key, ms]);

  return expiredKey === key;
};

export default useWaitExpired;
