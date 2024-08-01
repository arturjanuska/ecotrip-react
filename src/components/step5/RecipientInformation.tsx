/* eslint-disable @typescript-eslint/no-explicit-any */
import ClientInformationForm from '../step4/ClientInformationForm';
import Step from '../Step';
import '../step4/step4.css';
import { Control, FieldErrors } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { useCustomValidation } from '../../utils/validation/useCustomValidation';

type Props = {
	control: Control<FormType, any>;
	formErrors: FieldErrors<FormType>;
};

const RecipientInformation = ({ control, formErrors }: Props) => {
	const validationRules = useCustomValidation({});

	const recipientValidationRules = validationRules.recipientInformation;

	return (
		<Step
			title='Siuntos pristatymo / gavėjo informacija'
			step={5}>
			<ClientInformationForm
				client='recipient'
				control={control}
				subName='recipientInformation'
				formErrors={formErrors}
				validationRules={recipientValidationRules}
			/>
		</Step>
	);
};

export default RecipientInformation;
