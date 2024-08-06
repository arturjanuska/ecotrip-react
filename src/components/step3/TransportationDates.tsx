/* eslint-disable @typescript-eslint/no-explicit-any */
import Step from '../Step';
import Datepicker from '../Datepicker';
import './step3.css';
import { FieldErrors, UseFormReturn } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import useDeliveryDate from '../../utils/useDeliveryDate';
import useDateOptions from '../../utils/useDateOptions';

type TransportationDatesProps = {
	methods: UseFormReturn<FormType, any, undefined>;
	formErrors: FieldErrors<FormType>;
	direction: 'LT-UK' | 'UK-LT' | null;
};

const TransportationDates = ({
	methods,
	formErrors,
	direction,
}: TransportationDatesProps) => {
	const { watch, setValue } = methods;

	const yearFrom = watch('dates.from.year.value');
	const monthFrom = watch('dates.from.month.value');
	const dayFrom = watch('dates.from.day.value');

	const resetToDates = () => {
		setValue('dates.to.year', null);
		setValue('dates.to.month', null);
		setValue('dates.to.day', null);
	};

	const pickupDate =
		yearFrom && monthFrom && dayFrom
			? `${yearFrom}/${monthFrom}/${dayFrom}`
			: '';

	useDeliveryDate({
		pickupDate,
		direction,
		setValue,
		dayFrom,
	});

	const options = useDateOptions({
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
						// className='w-half'
						fiedsDisabled={false}
						label='Siuntos paėmimo data'
						options={options}
						control={methods.control}
						name='from'
						formErrors={formErrors}
						resetToDates={resetToDates}
						setValue={setValue}
					/>
					<Datepicker
						// className='w-half'
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
