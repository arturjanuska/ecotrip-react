import ClientInformationForm from '../step4/ClientInformationForm';
import Step from '../Step';
import '../step4/step4.css';
import { Control, FieldErrors } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';

type Props = {
	control: Control<FormType, any>;
	formErrors: FieldErrors<FormType>;
};

const RecipientInformation = ({ control, formErrors }: Props) => {
	return (
		<Step
			title='Siuntos pristatymo / gavėjo informacija'
			step={5}>
			<ClientInformationForm
				client='recipient'
				control={control}
				subName='recipientInformation'
			/>
		</Step>
	);
};

export default RecipientInformation;
