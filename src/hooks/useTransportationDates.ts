/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { DateDayType, DirectionType, FormType } from '../utils/formTypes';
import { OptionType } from '../utils/types';
import {
  DateOverride,
  findTrip,
  getDateOptions,
  getDeliveryValues,
  getTrips,
} from '../utils/transportDates';

type Props = {
  methods: UseFormReturn<FormType, any, undefined>;
  direction: DirectionType;
  service: string;
  // "Odd" / "Even" of the UK postcode, "" or undefined for every week.
  calendar?: string;
  overrides: DateOverride[];
};

// The option of `options` with the value of `selected`: null when it is no
// longer offered.
const findOption = <T extends OptionType | DateDayType>(
  selected: T | null,
  options: T[]
) =>
  (selected && options.find((option) => option?.value === selected.value)) ??
  null;

/**
 * Options of the pickup selects, and the delivery that follows the chosen
 * pickup. The chosen pickup is kept among the options: they change with the
 * postcode's weeks, the dates set in the CMS and the language.
 */
const useTransportationDates = ({
  methods,
  direction,
  service,
  calendar,
  overrides,
}: Props) => {
  const { watch, setValue, clearErrors } = methods;
  const { i18n } = useTranslation();

  const year = watch('dates.from.year');
  const month = watch('dates.from.month');
  const day = watch('dates.from.day');
  const today = dayjs().format('YYYY-MM-DD');

  const trips = useMemo(
    () =>
      direction === 'UK-LT' || direction === 'LT-UK'
        ? getTrips({ direction, today: dayjs(today), calendar, overrides })
        : [],
    [direction, today, calendar, overrides]
  );

  const options = useMemo(
    () => getDateOptions(trips, year?.value, month?.value),
    // The labels are in the current language.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trips, year?.value, month?.value, i18n.language]
  );

  useEffect(() => {
    const keep = <T extends OptionType | DateDayType>(
      name: 'dates.from.year' | 'dates.from.month' | 'dates.from.day',
      selected: T | null,
      choices: T[]
    ) => {
      const option = findOption(selected, choices);
      if (selected && option?.label !== selected.label) {
        setValue(name, option);
      }
      return option;
    };

    // No months without a year offered, no days without a month: emptying a
    // select empties the ones after it.
    const keptYear = keep('dates.from.year', year, options.years);
    const keptMonth = keep('dates.from.month', month, options.months);
    const keptDay = keep('dates.from.day', day, options.days);

    const trip =
      keptYear && keptMonth && keptDay
        ? findTrip(trips, keptYear.value, keptMonth.value, keptDay.value)
        : null;

    if (trip) {
      const delivery = getDeliveryValues(trip, service);
      setValue('dates.to.year', delivery.year);
      setValue('dates.to.month', delivery.month);
      setValue('dates.to.day', delivery.day);
      clearErrors('dates.to');
    } else {
      setValue('dates.to.year', null);
      setValue('dates.to.month', null);
      setValue('dates.to.day', null);
    }
  }, [trips, options, year, month, day, service, setValue, clearErrors]);

  return options;
};

export default useTransportationDates;
