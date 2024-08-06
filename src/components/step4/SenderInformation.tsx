/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import Step from '../Step';
import ClientInformationForm from './ClientInformationForm';
import { FormType } from '../../utils/formTypes';
import { useCustomValidation } from '../../utils/validation/useCustomValidation';

type SenderInformationProps = {
	control: Control<FormType, any>;
	stepLabel: string;
	formErrors: FieldErrors<FormType>;
	selectedService?: string;
	setValue: UseFormSetValue<FormType>;
};

const SenderInformation = ({
	control,
	stepLabel,
	formErrors,
	selectedService,
}: SenderInformationProps) => {
	const validationRules = useCustomValidation({});

	const senderValidationRules = validationRules.senderInformation;

	return (
		<Step
			title={stepLabel}
			step={4}>
			<ClientInformationForm
				client='sender'
				control={control}
				subName='senderInformation'
				formErrors={formErrors}
				isShipmentWithAddressServiceSelected={
					selectedService === 'shipmentWithAddressService'
				}
				validationRules={senderValidationRules}
			/>
		</Step>
	);
};

export default SenderInformation;
