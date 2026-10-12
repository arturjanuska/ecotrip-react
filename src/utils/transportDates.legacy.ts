// Frozen copy of the date logic before the refactor (hooks/useDateOptions.ts
// and hooks/useDeliveryDate.ts on feature/cms), as pure functions of `now`.
// Only transportDates.test.ts uses it: the new code must give the same
// options and delivery dates, apart from the fixes the test lists.
import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import i18next from 'i18next';
import {
  monthNamesForDaySelect,
  monthNamesForMonthSelect,
} from '../components/step3/monthNames';
import { isDeliveryWeek } from './postcodes';

dayjs.extend(isoWeek);

type Direction = 'UK-LT' | 'LT-UK';

const getPickupDay = (
  now: Dayjs,
  pickupStartDay: number,
  pickupEndDay: number,
  selectedMonthIndex: number,
  diff: 1 | 2
) => {
  const currentYear = now.year();
  const selectedMonthDate = dayjs(`${currentYear}-${selectedMonthIndex}-01`);
  const daysInMonth = selectedMonthDate.daysInMonth();

  if (pickupStartDay + diff > daysInMonth) {
    const dayDifference = pickupStartDay + diff - daysInMonth;
    const two =
      monthNamesForDaySelect[
        selectedMonthIndex === 12 ? 0 : selectedMonthIndex
      ];
    return {
      label: `${i18next.t(
        monthNamesForDaySelect[selectedMonthIndex - 1]
      )} ${pickupStartDay} - ${i18next.t(two)} ${dayDifference}`,
      value: `${pickupStartDay} - ${dayDifference}`,
      key: { one: monthNamesForDaySelect[selectedMonthIndex - 1], two },
    };
  }
  return {
    label: `${i18next.t(
      monthNamesForDaySelect[selectedMonthIndex - 1]
    )} ${pickupStartDay} - ${i18next.t(
      monthNamesForDaySelect[selectedMonthIndex - 1]
    )} ${pickupEndDay}`,
    value: `${pickupStartDay} - ${pickupEndDay}`,
    key: {
      one: monthNamesForDaySelect[selectedMonthIndex - 1],
      two: monthNamesForDaySelect[selectedMonthIndex - 1],
    },
  };
};

export const legacyDateOptions = ({
  now,
  selectedMonth,
  direction,
  calendar,
}: {
  now: Dayjs;
  selectedMonth: string | null;
  direction: Direction;
  calendar?: string;
}) => {
  const is_UK_LT = direction === 'UK-LT';
  const pickupDays = is_UK_LT ? [0, 5, 6] : [2, 3];

  const currentYear = now.year();
  const currentMonthIndex = now.month() + 1;

  const years = [
    { label: currentYear.toString(), value: currentYear.toString() },
  ];

  const months = Array.from(
    { length: 12 - currentMonthIndex + 1 },
    (_, i) => currentMonthIndex + i
  ).map((month) => ({
    label: i18next.t(monthNamesForMonthSelect[month - 1]),
    value: month.toString(),
  }));

  const days: ReturnType<typeof getPickupDay>[] = [];

  if (selectedMonth) {
    const selectedMonthIndex = parseInt(selectedMonth, 10);
    let date = dayjs(`${currentYear}-${selectedMonth}-01`);
    const endDate = date.endOf('month');
    while (date.isBefore(endDate) || date.isSame(endDate, 'day')) {
      if (
        date.isBefore(now, 'day') ||
        (selectedMonthIndex === currentMonthIndex && date.date() < now.date())
      ) {
        date = date.add(1, 'day');
        continue;
      }

      if (pickupDays.includes(date.day())) {
        const startDateRange = date.clone();
        let endDateRange = date.clone();

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

        const isEvenWeek = startDateRange.isoWeek() % 2 === 0;

        if (isDeliveryWeek(isEvenWeek, calendar)) {
          const day = getPickupDay(
            now,
            startDateRange.date(),
            endDateRange.date(),
            selectedMonthIndex,
            is_UK_LT ? 2 : 1
          );

          const isHardcodedExcludedNYDay = day.value === '1 - 1';
          const isHardcodedExcludedJulyDay =
            is_UK_LT && selectedMonthIndex === 7 && day.value === '17 - 19';

          if (!isHardcodedExcludedNYDay && !isHardcodedExcludedJulyDay) {
            days.push(day);
          }
        }

        date = endDateRange.add(1, 'day');
      } else {
        date = date.add(1, 'day');
      }
    }
  }
  return { years, months, days };
};

export const legacyDeliveryDate = ({
  now,
  pickupDate,
  direction,
  dayRangeFrom,
  service,
}: {
  now: Dayjs;
  pickupDate: string;
  direction: Direction;
  dayRangeFrom: string;
  service?: string;
}) => {
  const pickupEndDay = dayRangeFrom.split(' - ')[1];
  const pickupMonth = parseInt(pickupDate.split('/')[1], 10);
  const is_UK_LT = direction === 'UK-LT';
  const deliveryDays = is_UK_LT ? [3, 4] : [0, 5, 6];

  const pickupStartDay = parseInt(dayRangeFrom.split(' - ')[0], 10);
  const pickupEndDayNum = parseInt(pickupEndDay, 10);
  const isMonthWrap = pickupEndDayNum < pickupStartDay;

  const deliveryYear =
    pickupMonth === 12 && isMonthWrap ? now.year() + 1 : now.year();
  const deliveryMonth = !isMonthWrap
    ? pickupMonth
    : pickupMonth + 1 < 13
      ? pickupMonth + 1
      : 1;

  const findNextValidDay = (date: Dayjs, validDays: number[]) => {
    while (!validDays.includes(date.day())) {
      date = date.add(1, 'day');
    }
    return date;
  };

  const findNextAfterNextValidDay = (date: Dayjs, validDays: number[]) => {
    date = findNextValidDay(date, validDays);
    date = date.add(7, 'day');
    return findNextValidDay(date, validDays);
  };

  const pickupEndDate = dayjs(
    `${deliveryYear}-${deliveryMonth}-${pickupEndDay}`
  ).add(1, 'day');

  const deliveryStartDate =
    service === 'parcelForceShipment'
      ? findNextAfterNextValidDay(pickupEndDate, deliveryDays)
      : findNextValidDay(pickupEndDate, deliveryDays);

  const deliveryEndDate = deliveryStartDate.add(is_UK_LT ? 1 : 2, 'day');

  const startDay = deliveryStartDate.format('D');
  const endDay = deliveryEndDate.format('D');

  return {
    year: {
      label: deliveryStartDate.format('YYYY'),
      value: deliveryStartDate.format('YYYY'),
    },
    month: {
      label: i18next.t(monthNamesForMonthSelect[deliveryStartDate.month()]),
      value: deliveryStartDate.format('MM'),
    },
    day: {
      label: `${i18next.t(
        monthNamesForDaySelect[deliveryStartDate.month()]
      )} ${startDay} - ${i18next.t(
        monthNamesForDaySelect[deliveryEndDate.month()]
      )} ${endDay}`,
      value: `${startDay} - ${endDay}`,
      key: {
        one: monthNamesForDaySelect[deliveryStartDate.month()],
        two: monthNamesForDaySelect[deliveryEndDate.month()],
      },
    },
  };
};
