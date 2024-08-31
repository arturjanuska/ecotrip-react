import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { monthNames } from '../components/step3/monthNames';

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
    years: {
      value: string;
      label: string;
    }[];
    months: {
      value: string;
      label: string;
    }[];
    days: {
      value: string;
      label: string;
    }[];
  }>({
    years: [],
    months: [],
    days: [],
  });

  useEffect(() => {
    if (direction === 'LT-LT') return;

    const calculateDateOptions = () => {
      const pickupDays =
        direction === 'UK-LT' || service === 'shipmentWithAddressService'
          ? [5, 6]
          : [2, 3];

      const now = dayjs();
      const currentYear = now.year();
      const currentMonthIndex = now.month() + 1;

      const years = [
        { label: currentYear.toString(), value: currentYear.toString() },
      ];

      const months = Array.from(
        { length: 12 - currentMonthIndex + 1 },
        (_, i) => currentMonthIndex + i
      ).map((month) => ({
        label: monthNames[month - 1],
        value: month.toString(),
      }));

      const days = [];

      if (selectedMonth) {
        const daysInMonth = dayjs(
          `${currentYear}-${selectedMonth}`
        ).daysInMonth();
        const selectedMonthIndex = parseInt(selectedMonth, 10);

        for (let day = 1; day <= daysInMonth; day++) {
          const date = dayjs(
            `${currentYear}-${selectedMonth}-${day.toString().padStart(2, '0')}`
          );
          if (pickupDays.includes(date.day())) {
            const nextDay = date.add(1, 'day').day();
            if (pickupDays.includes(nextDay)) {
              if (
                selectedMonthIndex > currentMonthIndex ||
                (selectedMonthIndex === currentMonthIndex && day >= now.date())
              ) {
                days.push({
                  label: `${day} - ${day + 1}`,
                  value: `${day} - ${day + 1}`,
                });
              }
            }
          }
        }
      }

      setDateOptions({ years, months, days });
    };

    calculateDateOptions();
  }, [selectedMonth, direction, service]);

  return dateOptions;
};

export default useDateOptions;
