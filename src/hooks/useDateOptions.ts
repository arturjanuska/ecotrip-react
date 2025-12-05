import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  monthNamesForDaySelect,
  monthNamesForMonthSelect,
} from '../components/step3/monthNames';
import { OptionType } from '../utils/types';
import { DateDayType, DirectionType } from '../utils/formTypes';
import i18next from 'i18next';
import { PostCodeObject } from '../utils/checkPostCodes';
import isoWeek from 'dayjs/plugin/isoWeek';
import {
  evenWeeksDeliveryPostcodes,
  oddWeeksDeliveryPostcodes,
} from '../utils/blockedDates';
import { getDecemberPickupDays } from '../utils/hardcodedDays/december';
import { getJanuaryPickupDays } from '../utils/hardcodedDays/january';
import { getFebruaryPickupDays } from '../utils/hardcodedDays/february';

dayjs.extend(isoWeek);

export const getPickupDay = (
  pickupStartDay: number,
  pickupEndDay: number,
  selectedMonth: number,
  diff: 1 | 2 | 0
) => {
  const currentYear = dayjs().year();

  const selectedMonthDate = dayjs(`${currentYear}-${selectedMonth}-01`);
  const daysInMonth = selectedMonthDate.daysInMonth();

  if (pickupStartDay + diff > daysInMonth) {
    const dayDifference = pickupStartDay + diff - daysInMonth;
    return {
      label: `${i18next.t(
        monthNamesForDaySelect[selectedMonth - 1]
      )} ${pickupStartDay} - ${i18next.t(
        monthNamesForDaySelect[selectedMonth === 12 ? 0 : selectedMonth]
      )} ${dayDifference}`,
      value: `${pickupStartDay} - ${dayDifference}`,
      key: {
        one: monthNamesForDaySelect[selectedMonth - 1],
        two: monthNamesForDaySelect[selectedMonth === 12 ? 0 : selectedMonth],
      },
    };
  }
  return {
    label: `${i18next.t(
      monthNamesForDaySelect[selectedMonth - 1]
    )} ${pickupStartDay} - ${i18next.t(
      monthNamesForDaySelect[selectedMonth - 1]
    )} ${pickupEndDay}`,
    value: `${pickupStartDay} - ${pickupEndDay}`,
    key: {
      one: monthNamesForDaySelect[selectedMonth - 1],
      two: monthNamesForDaySelect[selectedMonth - 1],
    },
  };
};

const shouldIncludeDateRange = (
  isEvenWeek: boolean,
  postcode?: string
): boolean => {
  if (!postcode) return true;

  if (oddWeeksDeliveryPostcodes.includes(postcode)) {
    return !isEvenWeek;
  }

  if (evenWeeksDeliveryPostcodes.includes(postcode)) {
    return isEvenWeek;
  }

  return true;
};

const useDateOptions = ({
  selectedYear,
  selectedMonth,
  direction,
  service,
  postcodeDetails,
}: {
  selectedYear: string | null;
  selectedMonth: string | null;
  direction: DirectionType;
  service: string;
  postcodeDetails: PostCodeObject;
}) => {
  const currentLanguage = i18next.language;

  const postcode = postcodeDetails?.postcode;

  const [dateOptions, setDateOptions] = useState<{
    years: OptionType[]; // OptionType is { label: string, value: string }
    months: OptionType[];
    days: DateDayType[];
  }>({
    years: [],
    months: [],
    days: [],
  });

  useEffect(() => {
    if (direction === 'LT-LT') return;

    const calculateDateOptions = () => {
      const is_UK_LT = direction === 'UK-LT';
      const pickupDays = is_UK_LT
        ? [0, 5, 6] // Sunday (0), Friday (5), Saturday (6)
        : [2, 3]; // Tuesday (2), Wednesday (3)

      const now = dayjs();
      const currentYear = now.year();
      const nextYear = currentYear + 1;
      const currentMonthIndex = now.month() + 1; // Day.js months are 0-indexed

      const years = [
        { label: currentYear.toString(), value: currentYear.toString() },
        { label: nextYear.toString(), value: nextYear.toString() },
      ];

      const months =
        selectedYear && parseInt(selectedYear) === currentYear
          ? Array.from(
              { length: 12 - currentMonthIndex + 1 },
              (_, i) => currentMonthIndex + i
            ).map((month) => ({
              label: i18next.t(monthNamesForMonthSelect[month - 1]),
              value: month.toString(),
            }))
          : Array.from({ length: 2 }, (_, i) => i + 1).map((month) => ({
              label: i18next.t(monthNamesForMonthSelect[month - 1]),
              value: month.toString(),
            }));
      const days: DateDayType[] = [];

      if (selectedMonth && selectedMonth !== '12') {
        const selectedMonthIndex = parseInt(selectedMonth, 10);
        // Start from the first day of the selected month
        let date = dayjs(`${currentYear}-${selectedMonth}-01`);
        // Set endDate to the end of the selected month
        const endDate = date.endOf('month');
        while (date.isBefore(endDate) || date.isSame(endDate, 'day')) {
          // Skip past dates
          if (
            date.isBefore(now, 'day') ||
            (selectedMonthIndex === currentMonthIndex &&
              date.date() < now.date())
          ) {
            date = date.add(1, 'day');
            continue;
          }

          if (pickupDays.includes(date.day())) {
            const startDateRange = date.clone();
            let endDateRange = date.clone();

            // Extend the range while the next days are also pickup days
            // eslint-disable-next-line no-constant-condition
            while (true) {
              const nextDate = endDateRange.add(1, 'day');
              if (
                pickupDays.includes(nextDate.day()) &&
                (nextDate.isBefore(endDate) || nextDate.isSame(endDate, 'day'))
              ) {
                endDateRange = nextDate.clone();
              } else {
                break;
              }
            }

            const weekNumber = startDateRange.isoWeek();
            const isEvenWeek = weekNumber % 2 === 0;

            const shouldInclude = shouldIncludeDateRange(isEvenWeek, postcode);

            if (shouldInclude) {
              // Format the label
              const startDay = startDateRange.date();
              const endDay = endDateRange.date();

              const day = getPickupDay(
                startDay,
                endDay,
                selectedMonthIndex,
                is_UK_LT ? 2 : 1
              );
              // TODO: HARDCODED FOR DECEMBER MONTH, PROBABLY NEED TO REMOVE AFTER NY
              if (day.value !== '1 - 1') {
                days.push(day);
              }
            }

            // Move the date pointer to the day after the end of this range
            date = endDateRange.add(1, 'day');
          } else {
            date = date.add(1, 'day');
          }
        }
      }

      if (selectedMonth === '12') {
        // December hardcoded days
        setDateOptions({
          years,
          months,
          days: getDecemberPickupDays(direction),
        });
      } else if (selectedMonth === '1') {
        // January hardcoded days
        setDateOptions({
          years,
          months,
          days: getJanuaryPickupDays(direction),
        });
      } else if (selectedMonth === '2') {
        // February hardcoded days
        setDateOptions({
          years,
          months,
          days: getFebruaryPickupDays(direction),
        });
      } else {
        // Default logic
        setDateOptions({ years, months, days });
      }
    };

    calculateDateOptions();
  }, [selectedMonth, selectedYear, direction, service, currentLanguage]);

  return dateOptions;
};

export default useDateOptions;
