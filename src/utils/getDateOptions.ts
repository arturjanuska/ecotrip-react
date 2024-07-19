import dayjs from 'dayjs';

const getDateOptions = (selectedMonth: string | null) => {
  const now = dayjs();
  const currentYear = now.year();

  const years = Array.from({ length: 10 }, (_, i) =>
    (currentYear + i).toString()
  );
  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, '0')
  );

  let days: any[] = [];

  if (selectedMonth) {
    const daysInMonth =
      dayjs(`${currentYear}-${selectedMonth}`).daysInMonth() ?? 31;

    days = Array.from({ length: daysInMonth }, (_, i) =>
      (i + 1).toString().padStart(2, '0')
    );
  }

  return {
    years: years.map((year) => ({ label: year, value: year })),
    months: months.map((month) => ({ label: month, value: month })),
    days:
      selectedMonth && days
        ? days.map((day) => ({ label: day, value: day }))
        : [],
  };
};

export default getDateOptions;
