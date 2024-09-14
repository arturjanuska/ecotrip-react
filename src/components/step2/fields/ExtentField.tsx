/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import FieldContainer from '../../FieldContainer';
import { CustomValidationReturn } from '../../../utils/validation/useCustomValidation';
import { Control } from 'react-hook-form';
import { FormType } from '../../../utils/formTypes';
import CustomInput from '../../CustomInput';

type Props = {
	shipmentNumber: number;
	index: number;
	control: Control<FormType>;
	validationRules: CustomValidationReturn;
	onChange: (e: any) => void;
	onFocus: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
	errorMessage?: string;
};

const ExtentField = ({
	shipmentNumber,
	index,
	control,
	validationRules,
	onChange,
	onFocus,
	errorMessage,
}: Props) => {
	return (
		<FieldContainer
			label={`Nr. ${shipmentNumber} siuntos apimtis (max 300 cm)`}>
			<CustomInput
				name={`shipments.${index}.extent`}
				control={control}
				type='number'
				onFocus={onFocus}
				placeholder='Apimtis'
				onChange={onChange}
				rules={validationRules.shipments.extent}
				errorMessage={errorMessage}
			/>
		</FieldContainer>
	);
};

export default ExtentField;
