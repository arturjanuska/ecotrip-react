import { PriceCatalog } from '../utils/priceCatalog';
import snapshot from '../data/priceCatalog.snapshot.json';
import useCmsResource from './useCmsResource';

const usePriceCatalog = () => {
  const { data, isReady } = useCmsResource(
    'priceCatalog',
    '/api/prices',
    snapshot as unknown as PriceCatalog
  );
  return { catalog: data, isReady };
};

export default usePriceCatalog;
