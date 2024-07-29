import Step from '../Step';
import Datepicker from '../Datepicker';
import getDateOptions from '../../utils/getDateOptions';
import './step3.css';
import { FieldErrors, UseFormReturn } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { OptionType } from '../../utils/types';

type TransportationDatesProps = {
	methods: UseFormReturn<FormType, any, undefined>;
	formErrors: FieldErrors<FormType>;
	direction: 'LT-UK' | 'UK-LT';
};

export const monthNames = [
	'sausio',
	'vasario',
	'kovo',
	'balandžio',
	'gegužės',
	'birželio',
	'liepos',
	'rugpjūčio',
	'rugsėjo',
	'spalio',
	'lapkričio',
	'gruodžio',
];

const TransportationDates = ({
	methods,
	formErrors,
	direction,
}: TransportationDatesProps) => {
	const { watch, setValue } = methods;

	const yearFrom = watch('dates.from.year.value');
	const monthFrom = watch('dates.from.month.value');
	const dayFrom = watch('dates.from.day.value');

	const yearTo = watch('dates.to.year.value');
	const monthTo = watch('dates.to.month.value');
	const dayTo = watch('dates.to.day.value');

	const resetToDates = () => {
		setValue('dates.to.year', null);
		setValue('dates.to.month', null);
		setValue('dates.to.day', null);
	};

	const calculateDeliveryDates = (selectedDay: string) => {
		console.log('yearFrom ===', yearFrom);
		console.log('monthFrom ===', monthFrom);
		console.log('selectedDay ===', selectedDay);
	};

	const options = getDateOptions({
		selectedMonth: monthFrom || null,
		direction,
	});

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
						options={options}
						control={methods.control}
						name='from'
						formErrors={formErrors}
						resetToDates={resetToDates}
						calculateDeliveryDates={calculateDeliveryDates}
						setValue={setValue}
					/>
					<Datepicker
						className='w-half'
						fiedsDisabled={true}
						label='Siuntos pristatymo data (numatoma)'
						control={methods.control}
						name='to'
						formErrors={formErrors}
						resetToDates={resetToDates}
					/>
				</div>
			</>
		</Step>
	);
};

export default TransportationDates;
