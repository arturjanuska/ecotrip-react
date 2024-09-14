import React from 'react';
import FieldContainer from '../../FieldContainer';
import { productTypesWithRequiredManagerCall } from '../SingleShimpentForm';
import ControlledStyledSelect from '../../ControlledStyledSelect';
import { Control } from 'react-hook-form';
import { FormType } from '../../../utils/formTypes';
import { OptionType } from '../../../utils/types';

type Props = {
	shipmentNumber: number;
	selectedProductTypeValue?: string;
	index: number;
	control: Control<FormType>;
	validationRules: {
		required: string;
	};
	options: OptionType[];
	onChange: () => void;
	errorMessage?: string;
};

const TypeSelect = ({
	shipmentNumber,
	selectedProductTypeValue,
	index,
	control,
	validationRules,
	options,
	onChange,
	errorMessage,
}: Props) => {
	return (
		<FieldContainer
			label={`Nr. ${shipmentNumber} siuntos tipas`}
			description={`${
				productTypesWithRequiredManagerCall.includes(
					selectedProductTypeValue ?? ''
				)
					? 'Susisiekite su vadybininku'
					: ''
			}`}>
			<ControlledStyledSelect
				name={`shipments.${index}.productType`}
				control={control}
				isClearable
				rules={validationRules}
				errorMessage={errorMessage}
				options={options}
				placeholder='Siuntos tipas'
				onChange={onChange}
			/>
		</FieldContainer>
	);
};

export default TypeSelect;
