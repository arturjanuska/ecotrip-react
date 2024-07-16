import AddressForm from '../components/step1/AddressForm';
import Breadcrumds from '../components/Breadcrumds';
import Divider from '../components/Divider';
import PayerInformation from '../components/step6/PayerInformation';
import SenderInformation from '../components/step4/SenderInformation';
import TransportationDates from '../components/step3/TransportationDates';
import Shipments from '../components/step2/Shipments';
import RecipientInformation from '../components/step5/RecipientInformation';

const Form = () => {
	return (
		<div className='main'>
			<div
				style={{
					marginBottom: '70px',
				}}>
				<Breadcrumds />
				<Divider />
				<AddressForm />
				<Divider />
				<Shipments />
				<Divider />
				<TransportationDates />
				<Divider />
				<SenderInformation />
				<Divider />
				<RecipientInformation />
				<Divider />
				<PayerInformation />
			</div>
		</div>
	);
};

export default Form;
