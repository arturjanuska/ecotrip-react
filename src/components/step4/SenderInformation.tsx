import { Control, FieldErrors } from 'react-hook-form';
import Step from '../Step';
import ClientInformationForm from './ClientInformationForm';
import { FormType } from '../../utils/formTypes';

type SenderInformationProps = {
	control: Control<FormType, any>;
	stepLabel: string;
	formErrors: FieldErrors<FormType>;
};

const SenderInformation = ({
	control,
	stepLabel,
	formErrors,
}: SenderInformationProps) => {
	return (
		<Step
			title={stepLabel}
			step={4}>
			<ClientInformationForm
				client='sender'
				control={control}
				subName='senderInformation'
				formErrors={formErrors}
			/>
		</Step>
	);
};

export default SenderInformation;
