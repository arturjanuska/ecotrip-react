/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import FieldContainer from './FieldContainer';
import ControlledStyledSelect from './ControlledStyledSelect';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { FormType } from '../utils/formTypes';
import { getError } from '../utils/validation/getError';

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
	resetToDates: () => void;
	setValue?: UseFormSetValue<FormType>;
};

const Datepicker = ({
	fiedsDisabled,
	label,
	options,
	className,
	control,
	name,
	formErrors,
	resetToDates,
	setValue,
}: Props) => {
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
						needMargin={true}
						// @ts-ignore
						onChange={() => {
							setValue?.('dates.from.day', null);
							setValue?.('dates.from.month', null);
							resetToDates();
						}}
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
						errorMessage={getError(`dates.${name}.month.value`, formErrors)}
						needMargin={true}
						onChange={() => {
							setValue?.('dates.from.day', null);
							resetToDates();
						}}
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
						errorMessage={getError(`dates.${name}.day.value`, formErrors)}
						needMargin={true}
					/>
				</div>
			</div>
		</FieldContainer>
	);
};

export default Datepicker;
