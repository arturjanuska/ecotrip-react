import dayjs from 'dayjs';
import { monthNames } from '../components/step3/TransportationDates';

const getDateOptions = ({
	selectedMonth,
	direction,
}: {
	selectedMonth: string | null;
	direction: 'LT-UK' | 'UK-LT' | null;
}) => {
	if (!direction) return;
	// UK penktadienis sestadienis (ir surinkimas ir pristatymas)
	// LT Antradienis trieciadienis (ir surinkimas ir pristatymas)

	// UK-LT paemimo datos bus penkt/sest, pristatymo antr/trec
	// LT-UK paemimo datos bus antr/trec, pristatymo penkt/sest

	const now = dayjs();
	const currentYear = now.year();

	const currentMonthIndex = now.month();

	const currentDayInWeek = now.day();

	const currentDay = new Date().getDate();

	console.log('currentDay ===', currentDay);

	const years = Array.from({ length: 1 }, (_, i) =>
		(currentYear + i).toString()
	);

	const months = Array.from(
		{ length: 12 - currentMonthIndex + 1 },
		(_, i) => currentMonthIndex + 1 + i + 1
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
		months: months.map((month) => ({
			label: monthNames[month - 1],
			value: month,
		})),
		days:
			selectedMonth && days
				? days.map((day) => ({ label: day, value: day }))
				: [],
	};
};

export default getDateOptions;
