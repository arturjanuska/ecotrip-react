import { useState } from 'react';
import Step from '../Step';
import Datepicker from '../Datepicker';
import getDateOptions from '../../utils/getDateOptions';
import './step3.css';

type TransportationDatesProps = {};

const TransportationDates = ({}: TransportationDatesProps) => {
	const [selectedYear, setSelectedYear] = useState<string>('');
	const [selectedMonth, setSelectedMonth] = useState<string>('');
	const [selectedDay, setSelectedDay] = useState<string>('');

	const options = getDateOptions(selectedMonth);

	const handleDateChange = (date: 'year' | 'month' | 'day', value: string) => {
		switch (date) {
			case 'year':
				setSelectedYear(value);
				break;
			case 'month':
				setSelectedMonth(value);
				break;
			case 'day':
				setSelectedDay(value);
				break;
			default:
				break;
		}
	};

	return (
		<Step
			step={3}
			title='Siuntos pervežimo datos'>
			<>
				<div className='date-fields-container'>
					<Datepicker
						className='w-half'
						fiedsDisabled={false}
						label='Siuntos paėmimo data'
						handleDateChange={handleDateChange}
						options={options}
					/>
					<Datepicker
						className='w-half'
						fiedsDisabled={true}
						label='Siuntos pristatymo data (numatoma)'
					/>
				</div>
			</>
		</Step>
	);
};

export default TransportationDates;
