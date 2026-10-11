import { FeeSettings } from '../utils/orderFees';
import snapshot from '../data/feeSettings.snapshot.json';
import useCmsResource from './useCmsResource';

const useFeeSettings = () => {
  const { data, isReady } = useCmsResource(
    'feeSettings',
    '/api/fees',
    snapshot as unknown as FeeSettings
  );
  return { fees: data, isReady };
};

export default useFeeSettings;
