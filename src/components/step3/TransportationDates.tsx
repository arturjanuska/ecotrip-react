/* eslint-disable @typescript-eslint/no-explicit-any */
import Step from '../Step';
import Datepicker from '../Datepicker';
import './step3.css';
import { FieldErrors, UseFormReturn } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import useDeliveryDate from '../../hooks/useDeliveryDate';
import useDateOptions from '../../hooks/useDateOptions';

type TransportationDatesProps = {
	methods: UseFormReturn<FormType, any, undefined>;
	formErrors: FieldErrors<FormType>;
	direction: 'LT-UK' | 'UK-LT' | 'LT-LT' | null;
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

	const service = methods.watch('service');

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
		service,
	});

	const options = useDateOptions({
		selectedMonth: monthFrom || null,
		direction,
		service,
	});

	return (
		<Step
			step={3}
			title='Siuntos pervežimo datos'>
			<>
				<div className='date-fields-container'>
					<Datepicker
						fiedsDisabled={false}
						label='Siuntos paėmimo data'
						options={options}
						control={methods.control}
						name='from'
						formErrors={formErrors}
						resetToDates={resetToDates}
						setValue={setValue}
						service={service}
					/>
					<Datepicker
						fiedsDisabled={true}
						label='Siuntos pristatymo data (numatoma)'
						control={methods.control}
						name='to'
						formErrors={formErrors}
						resetToDates={resetToDates}
						service={service}
					/>
				</div>
			</>
		</Step>
	);
};

export default TransportationDates;
