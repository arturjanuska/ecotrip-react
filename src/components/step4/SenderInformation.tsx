import Step from '../Step';
import ClientInformationForm from './ClientInformationForm';

type SenderInformationProps = {};

const SenderInformation = (props: SenderInformationProps) => {
	return (
		<Step
			title='Siuntos paėmimo / siuntėjo informacija'
			step={4}>
			<ClientInformationForm client='sender' />
		</Step>
	);
};

export default SenderInformation;
