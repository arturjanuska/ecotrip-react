import AddressForm from '../components/step1/AddressForm';
import Breadcrumds from '../components/Breadcrumds';
import Divider from '../components/Divider';
import SenderInformation from '../components/step4/SenderInformation';
import TransportationDates from '../components/step3/TransportationDates';
import Shipments from '../components/step2/Shipments';
import RecipientInformation from '../components/step5/RecipientInformation';
import RansomPayeeInformation from '../components/step6-7/RansomPayeeInformation';
import PayerInformation from '../components/step6-7/PayerInformation';
import { FormType } from '../utils/formTypes';
import { useForm } from 'react-hook-form';

const Form = () => {
	const methods = useForm<FormType>({
		shouldUnregister: true,
		defaultValues: {},
	});

	const formData = methods.watch();
	console.log('formData ===', formData);

	return (
		<form className='main'>
			<div
				style={{
					marginBottom: '70px',
				}}>
				<Breadcrumds />
				<Divider />
				<AddressForm
					setValue={methods.setValue}
					control={methods.control}
				/>
				<Divider />
				<Shipments />
				<Divider />
				<TransportationDates />
				<Divider />
				<SenderInformation control={methods.control} />
				<Divider />
				<RecipientInformation control={methods.control} />
				<Divider />
				<RansomPayeeInformation control={methods.control} />
				<Divider />
				<PayerInformation control={methods.control} />
			</div>
		</form>
	);
};

export default Form;
