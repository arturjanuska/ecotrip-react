import { DateOverride, isDateOverrideList } from '../utils/transportDates';
import snapshot from '../data/dateOverrides.snapshot.json';
import useCmsResource from './useCmsResource';

export type DateOverrideList = { items: DateOverride[] };

const useDateOverrides = () => {
  const { data, isReady } = useCmsResource(
    'dateOverrides',
    '/api/date-overrides',
    snapshot as DateOverrideList,
    isDateOverrideList
  );
  return { overrides: data.items, isReady };
};

export default useDateOverrides;
