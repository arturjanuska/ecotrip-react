// Pickup and delivery dates of step 3, as pure functions: the hook
// (hooks/useTransportationDates.ts) only feeds them the form state.
//
// A trip is a pickup window and the delivery window that follows it. The form
// shows a trip as year / month / day selects, and the order sends the same
// strings as before ("30 - 1": the days of the window, in the month of its
// first day).
import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import i18next from 'i18next';
import {
  monthNamesForDaySelect,
  monthNamesForMonthSelect,
} from '../components/step3/monthNames';
import { DateDayType } from './formTypes';
import { OptionType } from './types';
import { isDeliveryWeek } from './postcodes';

dayjs.extend(isoWeek);

export type RouteDirection = 'UK-LT' | 'LT-UK';

// Both ends included, as YYYY-MM-DD.
export type DateRange = { from: string; to: string };

// parcelForceDelivery: set in the CMS for a ParcelForce order; without it
// ParcelForce delivers a week after `delivery`.
export type Trip = {
  pickup: DateRange;
  delivery: DateRange;
  parcelForceDelivery?: DateRange;
};

// Ecotrip CMS (GET /api/date-overrides): the trips of one month and direction,
// set by hand. They replace the calculated trips of that month.
export type DateOverride = {
  direction: RouteDirection;
  year: number;
  // 1-12: the month the pickups start in.
  month: number;
  trips: Trip[];
};

// Trips are offered this far ahead of today.
export const HORIZON_MONTHS = 6;

// ParcelForce delivers a week after the usual delivery.
const PARCEL_FORCE_DELAY_DAYS = 7;

// Days from the Monday of the pickup week. UK-LT: picked up Friday-Sunday,
// delivered Wednesday-Thursday the week after. LT-UK: picked up
// Tuesday-Wednesday, delivered Friday-Sunday the same week.
const ROUTES: Record<
  RouteDirection,
  { pickup: [number, number]; delivery: [number, number] }
> = {
  'UK-LT': { pickup: [4, 6], delivery: [9, 10] },
  'LT-UK': { pickup: [1, 2], delivery: [4, 6] },
};

// Monday of ISO week 1 of 2026. Weeks are counted from it, so odd and even
// weeks alternate across New Year; ISO week numbers do not (2026 has 53
// weeks: week 53 and week 1 of 2027 are both odd). Through 2026 the two agree.
const PARITY_ANCHOR = dayjs('2025-12-29');

const DATE_FORMAT = 'YYYY-MM-DD';

const format = (date: Dayjs) => date.format(DATE_FORMAT);

export const isEvenWeek = (date: string | Dayjs) => {
  const days = dayjs(date).startOf('isoWeek').diff(PARITY_ANCHOR, 'day');
  return Math.abs(Math.floor(days / 7)) % 2 === 1;
};

const isValidDate = (date: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(date) && format(dayjs(date)) === date;

const isValidRange = ({ from, to }: DateRange) =>
  isValidDate(from) && isValidDate(to) && from <= to;

const isValidTrip = ({ pickup, delivery, parcelForceDelivery }: Trip) =>
  isValidRange(pickup) &&
  isValidRange(delivery) &&
  (!parcelForceDelivery || isValidRange(parcelForceDelivery));

const calculatedTrips = (
  direction: RouteDirection,
  firstMonday: Dayjs,
  weeks: number
): Trip[] => {
  const { pickup, delivery } = ROUTES[direction];

  return Array.from({ length: weeks }, (_, week) => {
    const monday = firstMonday.add(week, 'week');
    return {
      pickup: {
        from: format(monday.add(pickup[0], 'day')),
        to: format(monday.add(pickup[1], 'day')),
      },
      delivery: {
        from: format(monday.add(delivery[0], 'day')),
        to: format(monday.add(delivery[1], 'day')),
      },
    };
  });
};

const monthKey = (date: string) => date.slice(0, 7);

const overrideMonthKey = ({ year, month }: DateOverride) =>
  `${year}-${String(month).padStart(2, '0')}`;

/**
 * The trips a customer can book, by pickup date. A pickup window that has
 * started is offered from today on. `calendar` ("Odd" / "Even") keeps the
 * trips of the postcode's weeks only, also in months set by hand.
 */
export const getTrips = ({
  direction,
  today,
  calendar,
  overrides = [],
}: {
  direction: RouteDirection;
  today: Dayjs;
  calendar?: string;
  overrides?: DateOverride[];
}): Trip[] => {
  const start = format(today);
  const horizon = today.add(HORIZON_MONTHS, 'month');
  const horizonEnd = format(horizon);

  const overridden = overrides.filter(
    (override) => override.direction === direction
  );
  const overriddenMonths = new Set(overridden.map(overrideMonthKey));

  // One more week: a window that started last week can still be open.
  const calculated = calculatedTrips(
    direction,
    today.startOf('isoWeek').subtract(1, 'week'),
    Math.ceil(horizon.diff(today, 'day') / 7) + 2
  ).filter((trip) => !overriddenMonths.has(monthKey(trip.pickup.from)));

  const byHand = overridden.flatMap((override) =>
    override.trips.filter(
      (trip) =>
        isValidTrip(trip) &&
        monthKey(trip.pickup.from) === overrideMonthKey(override)
    )
  );

  return [...calculated, ...byHand]
    .filter(
      (trip) =>
        trip.pickup.to >= start &&
        isDeliveryWeek(isEvenWeek(trip.pickup.from), calendar)
    )
    .map((trip) =>
      trip.pickup.from < start
        ? { ...trip, pickup: { ...trip.pickup, from: start } }
        : trip
    )
    .filter((trip) => trip.pickup.from < horizonEnd)
    .sort((a, b) => a.pickup.from.localeCompare(b.pickup.from));
};

// "Gruodžio 30 - Sausio 1" / "30 - 1".
export const toDayOption = ({ from, to }: DateRange): DateDayType => {
  const start = dayjs(from);
  const end = dayjs(to);
  const one = monthNamesForDaySelect[start.month()];
  const two = monthNamesForDaySelect[end.month()];

  return {
    label: `${i18next.t(one)} ${start.date()} - ${i18next.t(two)} ${end.date()}`,
    value: `${start.date()} - ${end.date()}`,
    key: { one, two },
  };
};

const yearOf = (trip: Trip) => String(dayjs(trip.pickup.from).year());

// Not zero-padded: "9", as the order has always sent it.
const monthOf = (trip: Trip) => String(dayjs(trip.pickup.from).month() + 1);

const unique = (values: string[]) => [...new Set(values)];

export type DateOptions = {
  years: OptionType[];
  months: OptionType[];
  days: DateDayType[];
};

// Options of the pickup selects: the months of the chosen year, the trips of
// the chosen month.
export const getDateOptions = (
  trips: Trip[],
  year: string | null | undefined,
  month: string | null | undefined
): DateOptions => {
  const ofYear = trips.filter((trip) => yearOf(trip) === year);
  const ofMonth = ofYear.filter((trip) => monthOf(trip) === month);

  return {
    years: unique(trips.map(yearOf)).map((value) => ({ label: value, value })),
    months: unique(ofYear.map(monthOf)).map((value) => ({
      label: i18next.t(monthNamesForMonthSelect[Number(value) - 1]),
      value,
    })),
    days: ofMonth.map((trip) => toDayOption(trip.pickup)),
  };
};

// The trip behind the chosen pickup selects, if it is still offered.
export const findTrip = (
  trips: Trip[],
  year: string | null | undefined,
  month: string | null | undefined,
  day: string | null | undefined
) =>
  trips.find(
    (trip) =>
      yearOf(trip) === year &&
      monthOf(trip) === month &&
      toDayOption(trip.pickup)?.value === day
  ) ?? null;

// The delivery of a trip for the service: ParcelForce gets its own dates
// from the CMS, else a week after the usual delivery.
const deliveryOf = (trip: Trip, service?: string): DateRange => {
  if (service !== 'parcelForceShipment') {
    return trip.delivery;
  }
  if (trip.parcelForceDelivery) {
    return trip.parcelForceDelivery;
  }
  return {
    from: format(dayjs(trip.delivery.from).add(PARCEL_FORCE_DELAY_DAYS, 'day')),
    to: format(dayjs(trip.delivery.to).add(PARCEL_FORCE_DELAY_DAYS, 'day')),
  };
};

// Values of the delivery selects. The month is zero-padded ("09"), as the
// order has always sent it.
export const getDeliveryValues = (trip: Trip, service?: string) => {
  const delivery = deliveryOf(trip, service);
  const from = dayjs(delivery.from);

  return {
    year: { label: from.format('YYYY'), value: from.format('YYYY') },
    month: {
      label: i18next.t(monthNamesForMonthSelect[from.month()]),
      value: from.format('MM'),
    },
    day: toDayOption(delivery),
  };
};
