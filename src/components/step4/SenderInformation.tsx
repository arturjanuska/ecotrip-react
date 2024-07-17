import { Control } from 'react-hook-form';
import Step from '../Step';
import ClientInformationForm from './ClientInformationForm';
import { FormType } from '../../utils/formTypes';

type SenderInformationProps = {
	control: Control<FormType, any>;
};

const SenderInformation = ({ control }: SenderInformationProps) => {
	return (
		<Step
			title='Siuntos paėmimo / siuntėjo informacija'
			step={4}>
			<ClientInformationForm
				client='sender'
				control={control}
				subName='senderInformation'
			/>
		</Step>
	);
};

export default SenderInformation;
