import dayjs, { Dayjs } from 'dayjs';
import { describe, expect, it } from 'vitest';
import {
  DateOverride,
  findTrip,
  getDateOptions,
  getDeliveryValues,
  getTrips,
  HORIZON_MONTHS,
  isDateOverrideList,
  isEvenWeek,
  RouteDirection,
  Trip,
} from './transportDates';
import { legacyDateOptions, legacyDeliveryDate } from './transportDates.legacy';

const DIRECTIONS: RouteDirection[] = ['UK-LT', 'LT-UK'];
const CALENDARS = ['', 'Odd', 'Even'];
const SERVICES = ['addressService', 'parcelForceShipment'];

const daysOf = (from: string, to: string) => {
  const days: Dayjs[] = [];
  for (let d = dayjs(from); !d.isAfter(dayjs(to)); d = d.add(1, 'day')) {
    days.push(d);
  }
  return days;
};

// The pickup selects a trip shows as.
const selectsOf = (trip: Trip) => {
  const pickup = dayjs(trip.pickup.from);
  const year = String(pickup.year());
  const month = String(pickup.month() + 1);
  const { days } = getDateOptions([trip], year, month);
  return { year, month, day: days[0]! };
};

describe('same dates as before the refactor', () => {
  // Every day of 2026, the year the old code was written for. It only offered
  // the current year, so only trips picked up this year are compared.
  for (const direction of DIRECTIONS) {
    for (const calendar of CALENDARS) {
      it(`${direction}, calendar "${calendar}"`, () => {
        const differences: [string, Trip[]][] = [];
        let compared = 0;

        for (const today of daysOf('2026-01-01', '2026-12-31')) {
          const horizonEnd = today.add(HORIZON_MONTHS, 'month');
          const trips = getTrips({ direction, today, calendar });

          const before = new Map<string, string>();
          for (let month = today.month() + 1; month <= 12; month++) {
            const { days } = legacyDateOptions({
              now: today,
              selectedMonth: String(month),
              direction,
              calendar,
            });
            for (const day of days) {
              const start = dayjs(
                `${today.year()}-${month}-${day.value.split(' - ')[0]}`
              );
              if (start.isBefore(horizonEnd, 'day')) {
                before.set(`${month}/${day.value}`, JSON.stringify(day));
              }
            }
          }

          const after = new Map<string, Trip>();
          for (const trip of trips) {
            const selects = selectsOf(trip);
            if (selects.year === String(today.year())) {
              after.set(`${selects.month}/${selects.day!.value}`, trip);
            }
          }

          for (const [key, trip] of after) {
            const old = before.get(key);
            if (old === undefined) {
              differences.push([
                `${today.format('YYYY-MM-DD')}|new|${key}`,
                trips,
              ]);
              continue;
            }
            expect(JSON.stringify(selectsOf(trip).day), key).toBe(old);

            const [month, value] = key.split('/');
            for (const service of SERVICES) {
              compared++;
              expect(getDeliveryValues(trip, service), key).toEqual(
                legacyDeliveryDate({
                  now: today,
                  pickupDate: `${today.year()}/${month}/${value.split(' - ')[0]}`,
                  direction,
                  dayRangeFrom: value,
                  service,
                })
              );
            }
          }
          for (const key of before.keys()) {
            if (!after.has(key)) {
              differences.push([
                `${today.format('YYYY-MM-DD')}|old|${key}`,
                trips,
              ]);
            }
          }
        }

        expect(compared).toBeGreaterThan(1000);
        // Each difference is one of the fixes, see below.
        for (const [difference, trips] of differences) {
          expect(difference, difference).toSatisfy(
            isKnownFix(
              direction,
              differences.map(([other]) => other),
              trips
            )
          );
        }
      });
    }
  }

  // The old code also offered the rest of a window that crossed into the next
  // month as a trip of its own ("31 - 2" in July and "1 - 2" in August, or
  // "1 - 1" hidden by a hardcode, so on the 1st nothing was left of it),
  // labelled a window that had started by today to the wrong end day ("30 - 1"
  // for Saturday 30 - Sunday 31 May) and hid UK-LT 17-19 July 2026 by hand.
  const isKnownFix =
    (direction: RouteDirection, differences: string[], trips: Trip[]) =>
    (difference: string): boolean => {
      const [today, side, key] = difference.split('|');
      const [month, value] = key.split('/');
      const [from] = value.split(' - ').map(Number);
      const firstOfMonth = dayjs(`${today.slice(0, 4)}-${month}-01`);

      const tailOfLastMonthWindow =
        from === 1 &&
        trips.some(
          (trip) =>
            trip.pickup.from < firstOfMonth.format('YYYY-MM-DD') &&
            trip.pickup.to >= firstOfMonth.format('YYYY-MM-DD')
        );
      const duplicateTail = side === 'old' && tailOfLastMonthWindow;
      const restOfWindowOnThe1st =
        side === 'new' && value === '1 - 1' && dayjs(today).date() === 1;
      const startedByToday =
        dayjs(today).date() === from &&
        differences.some((other) => {
          const [otherToday, otherSide, otherKey] = other.split('|');
          return (
            otherToday === today &&
            otherSide !== side &&
            otherKey.startsWith(`${month}/${from} - `)
          );
        });
      const julyHardcode =
        side === 'new' &&
        direction === 'UK-LT' &&
        key === '7/17 - 19' &&
        today <= '2026-07-17';

      return (
        duplicateTail || restOfWindowOnThe1st || startedByToday || julyHardcode
      );
    };
});

describe('odd and even weeks', () => {
  it('agree with ISO week numbers through 2026', () => {
    for (const day of daysOf('2026-01-01', '2026-12-31')) {
      expect(isEvenWeek(day), day.format('YYYY-MM-DD')).toBe(
        day.isoWeek() % 2 === 0
      );
    }
  });

  it('alternate across New Year', () => {
    const trips = getTrips({ direction: 'LT-UK', today: dayjs('2026-12-14') });
    expect(
      trips
        .slice(0, 5)
        .map((trip) => [trip.pickup.from, isEvenWeek(trip.pickup.from)])
    ).toEqual([
      ['2026-12-15', false],
      ['2026-12-22', true],
      ['2026-12-29', false],
      ['2027-01-05', true],
      ['2027-01-12', false],
    ]);
  });

  it('keep the trips of the postcode weeks', () => {
    const odd = getTrips({
      direction: 'UK-LT',
      today: dayjs('2026-12-14'),
      calendar: 'Odd',
    });
    expect(odd.slice(0, 3).map((trip) => trip.pickup.from)).toEqual([
      '2026-12-18',
      '2027-01-01',
      '2027-01-15',
    ]);
  });
});

describe('getTrips', () => {
  it(`offers ${HORIZON_MONTHS} months ahead, also into next year`, () => {
    const trips = getTrips({ direction: 'UK-LT', today: dayjs('2026-12-01') });
    expect(trips[0].pickup).toEqual({ from: '2026-12-04', to: '2026-12-06' });
    // The last pickup starting before 1 June 2027.
    expect(trips.at(-1)!.pickup).toEqual({
      from: '2027-05-28',
      to: '2027-05-30',
    });
    expect(trips).toHaveLength(26);
  });

  it('stops at the end of the horizon', () => {
    const trips = getTrips({ direction: 'LT-UK', today: dayjs('2026-10-12') });
    // 12 April 2027 is a Monday: the last pickup is Tuesday 6 April.
    expect(trips.at(-1)!.pickup.from).toBe('2027-04-06');
  });

  it('offers a window that has started from today', () => {
    const [trip] = getTrips({ direction: 'UK-LT', today: dayjs('2026-10-31') });
    expect(trip).toEqual({
      pickup: { from: '2026-10-31', to: '2026-11-01' },
      delivery: { from: '2026-11-04', to: '2026-11-05' },
    });
  });

  it('delivers LT-UK the same week', () => {
    const [trip] = getTrips({ direction: 'LT-UK', today: dayjs('2026-10-12') });
    expect(trip).toEqual({
      pickup: { from: '2026-10-13', to: '2026-10-14' },
      delivery: { from: '2026-10-16', to: '2026-10-18' },
    });
  });
});

describe('dates set by hand', () => {
  const december: DateOverride = {
    direction: 'LT-UK',
    year: 2026,
    month: 12,
    trips: [
      {
        pickup: { from: '2026-12-01', to: '2026-12-02' },
        delivery: { from: '2026-12-04', to: '2026-12-06' },
      },
      {
        pickup: { from: '2026-12-08', to: '2026-12-09' },
        delivery: { from: '2026-12-11', to: '2026-12-13' },
      },
      {
        pickup: { from: '2026-12-17', to: '2026-12-18' },
        delivery: { from: '2026-12-20', to: '2026-12-22' },
      },
    ],
  };
  const today = dayjs('2026-11-20');
  const pickups = (trips: Trip[]) => trips.map((trip) => trip.pickup.from);

  it('replace the calculated trips of their month and direction', () => {
    const trips = getTrips({
      direction: 'LT-UK',
      today,
      overrides: [december],
    });
    expect(pickups(trips).slice(0, 6)).toEqual([
      '2026-11-24',
      '2026-12-01',
      '2026-12-08',
      '2026-12-17',
      '2027-01-05',
      '2027-01-12',
    ]);
    expect(trips[3].delivery).toEqual({ from: '2026-12-20', to: '2026-12-22' });

    const otherDirection = getTrips({
      direction: 'UK-LT',
      today,
      overrides: [december],
    });
    expect(pickups(otherDirection)).toContain('2026-12-04');
  });

  it('keep the trips of the postcode weeks', () => {
    const even = getTrips({
      direction: 'LT-UK',
      today,
      calendar: 'Even',
      overrides: [december],
    });
    // 1 Dec: odd week; 8 Dec: even; 17 Dec: odd.
    expect(pickups(even).filter((day) => day.startsWith('2026-12'))).toEqual([
      '2026-12-08',
    ]);
  });

  it('with no trips close the month', () => {
    const trips = getTrips({
      direction: 'LT-UK',
      today,
      overrides: [{ ...december, trips: [] }],
    });
    expect(pickups(trips).some((day) => day.startsWith('2026-12'))).toBe(false);
  });

  it('ignore a trip that starts outside its month or ends before it starts', () => {
    const trips = getTrips({
      direction: 'LT-UK',
      today,
      overrides: [
        {
          ...december,
          trips: [
            {
              pickup: { from: '2027-01-05', to: '2027-01-06' },
              delivery: { from: '2027-01-08', to: '2027-01-10' },
            },
            {
              pickup: { from: '2026-12-09', to: '2026-12-08' },
              delivery: { from: '2026-12-11', to: '2026-12-13' },
            },
          ],
        },
      ],
    });
    expect(pickups(trips).some((day) => day.startsWith('2026-12'))).toBe(false);
  });

  it('give ParcelForce its own delivery dates when set', () => {
    const trip: Trip = {
      pickup: { from: '2026-12-18', to: '2026-12-20' },
      delivery: { from: '2026-12-22', to: '2026-12-24' },
      parcelForceDelivery: { from: '2026-12-23', to: '2026-12-24' },
    };
    expect(getDeliveryValues(trip, 'parcelForceShipment').day).toMatchObject({
      value: '23 - 24',
    });
    expect(getDeliveryValues(trip, 'standartShipment').day).toMatchObject({
      value: '22 - 24',
    });
  });

  it('ignore a trip whose ParcelForce dates end before they start', () => {
    const trips = getTrips({
      direction: 'LT-UK',
      today,
      overrides: [
        {
          ...december,
          trips: [
            {
              ...december.trips[0],
              parcelForceDelivery: { from: '2026-12-12', to: '2026-12-11' },
            },
          ],
        },
      ],
    });
    expect(pickups(trips).some((day) => day.startsWith('2026-12'))).toBe(false);
  });

  it('are delivered a week later by ParcelForce without its own dates', () => {
    const trip = december.trips[2];
    expect(getDeliveryValues(trip, 'parcelForceShipment')).toMatchObject({
      year: { value: '2026' },
      month: { value: '12' },
      day: { value: '27 - 29' },
    });
  });
});

describe('selects', () => {
  const trips = getTrips({ direction: 'UK-LT', today: dayjs('2026-12-20') });

  it('list the years, the months of the year and the trips of the month', () => {
    const options = getDateOptions(trips, '2027', '1');
    expect(options.years.map((o) => o.value)).toEqual(['2026', '2027']);
    expect(options.months.map((o) => o.value)).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
    ]);
    expect(options.days.map((o) => o?.value)).toEqual([
      '1 - 3',
      '8 - 10',
      '15 - 17',
      '22 - 24',
      '29 - 31',
    ]);
    expect(getDateOptions(trips, null, null).months).toEqual([]);
  });

  it('find the chosen trip', () => {
    expect(findTrip(trips, '2027', '1', '8 - 10')?.pickup.from).toBe(
      '2027-01-08'
    );
    expect(findTrip(trips, '2027', '1', '9 - 10')).toBeNull();
  });

  it('give the delivery in the next year after a December pickup', () => {
    const trip = findTrip(trips, '2026', '12', '25 - 27')!;
    expect(getDeliveryValues(trip)).toMatchObject({
      year: { value: '2026' },
      month: { value: '12' },
      day: { value: '30 - 31' },
    });
    expect(getDeliveryValues(trip, 'parcelForceShipment')).toMatchObject({
      year: { value: '2027' },
      month: { value: '01' },
      day: { value: '6 - 7' },
    });
  });
});

describe('isDateOverrideList', () => {
  const trip = {
    pickup: { from: '2026-12-04', to: '2026-12-06' },
    delivery: { from: '2026-12-09', to: '2026-12-10' },
  };
  const month = { direction: 'UK-LT', year: 2026, month: 12, trips: [trip] };

  it('accepts months set in the CMS, and none', () => {
    expect(isDateOverrideList({ items: [] })).toBe(true);
    expect(isDateOverrideList({ items: [month] })).toBe(true);
    expect(
      isDateOverrideList({
        items: [
          {
            ...month,
            trips: [
              {
                ...trip,
                parcelForceDelivery: { from: '2026-12-16', to: '2026-12-17' },
              },
            ],
          },
        ],
      })
    ).toBe(true);
  });

  it('rejects answers getTrips cannot read', () => {
    expect(isDateOverrideList({ data: 123 })).toBe(false);
    expect(isDateOverrideList({ items: [{ ...month, trips: [{}] }] })).toBe(
      false
    );
    expect(
      isDateOverrideList({ items: [{ ...month, direction: 'LT-LT' }] })
    ).toBe(false);
  });
});
