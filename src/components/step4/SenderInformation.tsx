/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import Step from '../Step';
import ClientInformationForm from './ClientInformationForm';
import { FormType } from '../../utils/formTypes';
import { useEffect } from 'react';
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
	setValue,
}: SenderInformationProps) => {
	useEffect(() => {
		if (selectedService === 'shipmentWithAddressService') {
			setValue(`senderInformation.firstName`, 'EcoTrip UK');
			setValue(`senderInformation.lastName`, '-');
			setValue(`senderInformation.phoneNumber`, '+44 7456 739633');
			setValue(`senderInformation.email`, 'info@ecotrip.lt');
			setValue(
				`senderInformation.address`,
				'EcoTrip UK, 216 Halbutt St, Dagenham, UK'
			);
			setValue(`senderInformation.zipCode`, 'RM9 5AA');
		} else {
			setValue(`senderInformation.firstName`, '');
			setValue(`senderInformation.lastName`, '');
			setValue(`senderInformation.phoneNumber`, '');
			setValue(`senderInformation.email`, '');
			setValue(`senderInformation.address`, '');
			setValue(`senderInformation.zipCode`, '');
		}
	}, [selectedService]);

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
