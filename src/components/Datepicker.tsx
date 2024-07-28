import FieldContainer from './FieldContainer';
import ControlledStyledSelect from './ControlledStyledSelect';
import { Control, FieldErrors } from 'react-hook-form';
import { FormType } from '../utils/formTypes';

type Props = {
	fiedsDisabled: boolean;
	label: string;
	options?: {
		years: { label: string; value: string }[];
		months: { label: string; value: string }[];
		days: { label: string; value: string }[];
	};
	className?: string;
	control: Control<FormType, any>;
	name: string;
	formErrors: FieldErrors<FormType>;
};

const Datepicker = ({
	fiedsDisabled,
	label,
	options,
	className,
	control,
	name,
	formErrors,
}: Props) => {
	const getError = (name: string, errors: FieldErrors<FormType>) => {
		const result = name
			.split('.')
			.reduce((acc, part) => acc && acc[part], errors)?.message;

		console.log('result ===', result);

		return result ?? undefined;
	};

	return (
		<FieldContainer
			label={label}
			className={className}>
			<div className='date-picker-wrapper'>
				<div
					style={{
						flex: '1 1 0%',
					}}>
					<ControlledStyledSelect
						placeholder='YYYY'
						options={options?.years || []}
						isDisabled={fiedsDisabled}
						control={control}
						name={`dates.${name}.year`}
						errorMessage={getError(`dates.${name}.year.value`, formErrors)}
					/>
				</div>
				<div
					style={{
						flex: '1 1 0%',
					}}>
					<ControlledStyledSelect
						placeholder='MM'
						options={options?.months || []}
						isDisabled={fiedsDisabled}
						control={control}
						name={`dates.${name}.month`}
						errorMessage={`${formErrors}.dates.${name}.month.value.message`}
					/>
				</div>
				<div
					style={{
						flex: '1 1 0%',
					}}>
					<ControlledStyledSelect
						placeholder='DD'
						options={options?.days || []}
						isDisabled={fiedsDisabled}
						control={control}
						name={`dates.${name}.day`}
						errorMessage={`${formErrors}.dates.${name}.day.value.message`}
					/>
				</div>
			</div>
		</FieldContainer>
	);
};

export default Datepicker;
