import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  monthNamesForDaySelect,
  monthNamesForMonthSelect,
} from '../components/step3/monthNames';
import { OptionType } from './types';
import { getDecemberPickupDays } from './hardcodedDays/december';

export const getPickupDay = (
  pickupStartDay: number,
  pickupEndDay: number,
  selectedMonthIndex: number,
  diff: 1 | 2 | 0
) => {
  const currentYear = dayjs().year();

  const selectedMonthDate = dayjs(`${currentYear}-${selectedMonthIndex}-01`);
  const daysInMonth = selectedMonthDate.daysInMonth();

  if (pickupStartDay + diff > daysInMonth) {
    const dayDifference = pickupStartDay + diff - daysInMonth;
    return {
      label: `${
        monthNamesForDaySelect[selectedMonthIndex - 1]
      } ${pickupStartDay} - ${
        monthNamesForDaySelect[
          selectedMonthIndex === 12 ? 0 : selectedMonthIndex
        ]
      } ${dayDifference}`,
      value: `${pickupStartDay} - ${dayDifference}`,
    };
  }
  return {
    label: `${
      monthNamesForDaySelect[selectedMonthIndex - 1]
    } ${pickupStartDay} - ${
      monthNamesForDaySelect[selectedMonthIndex - 1]
    } ${pickupEndDay}`,
    value: `${pickupStartDay} - ${pickupEndDay}`,
  };
};

const useDateOptions = ({
  selectedMonth,
  direction,
  service,
}: {
  selectedMonth: string | null;
  direction: 'LT-UK' | 'UK-LT' | 'LT-LT' | null;
  service: string;
}) => {
  const [dateOptions, setDateOptions] = useState<{
    years: OptionType[]; // OptionType is { label: string, value: string }
    months: OptionType[];
    days: OptionType[];
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
      const currentMonthIndex = now.month() + 1; // Day.js months are 0-indexed

      const years = [
        { label: currentYear.toString(), value: currentYear.toString() },
      ];

      const months = Array.from(
        { length: 12 - currentMonthIndex + 1 },
        (_, i) => currentMonthIndex + i
      ).map((month) => ({
        label: monthNamesForMonthSelect[month - 1],
        value: month.toString(),
      }));

      let days: OptionType[] = [];

      if (selectedMonth) {
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

            // Move the date pointer to the day after the end of this range
            date = endDateRange.add(1, 'day');
          } else {
            date = date.add(1, 'day');
          }
        }
      }
      if (selectedMonth === '12') {
        days = getDecemberPickupDays(direction);
        setDateOptions({ years, months, days });
      } else {
        setDateOptions({ years, months, days });
      }
    };

    calculateDateOptions();
  }, [selectedMonth, direction, service]);

  return dateOptions;
};

export default useDateOptions;
