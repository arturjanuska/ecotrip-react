import Step from '../Step';
import Datepicker from '../Datepicker';
import getDateOptions from '../../utils/getDateOptions';
import './step3.css';
import { FieldErrors, UseFormReturn } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';

type TransportationDatesProps = {
	methods: UseFormReturn<FormType, any, undefined>;
	formErrors: FieldErrors<FormType>;
};

const TransportationDates = ({
	methods,
	formErrors,
}: TransportationDatesProps) => {
	const selectedMonth = methods.watch('dates.from.month');

	const options = getDateOptions(selectedMonth?.value || null);

	// const setValue = methods.setValue;

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
					/>
					<Datepicker
						className='w-half'
						fiedsDisabled={true}
						label='Siuntos pristatymo data (numatoma)'
						control={methods.control}
						name='to'
						formErrors={formErrors}
					/>
				</div>
			</>
		</Step>
	);
};

export default TransportationDates;
