import ClientInformationForm from '../step4/ClientInformationForm';
import Step from '../Step';
import '../step4/step4.css';

type Props = {};

const RecipientInformation = (props: Props) => {
	return (
		<Step
			title='Siuntos pristatymo / gavėjo informacija'
			step={5}>
			<ClientInformationForm client='recipient' />
		</Step>
	);
};

export default RecipientInformation;
