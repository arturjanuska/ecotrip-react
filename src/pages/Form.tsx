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
import { useEffect, useState } from 'react';
import generateOrderID from '../utils/generateOrderId';

const Form = () => {
	const [direction, setDirection] = useState<'LT-UK' | 'UK-LT' | null>(null);

	const [currency, setCurrency] = useState<'€' | '£'>('€');

	useEffect(() => {
		if (direction) {
			const value = direction === 'LT-UK' ? '€' : '£';
			setCurrency(value);
		}
	}, [direction]);

	const methods = useForm<FormType>({
		defaultValues: {
			shipments: [
				{
					amount: 1,
					category: {
						label: 'Siuntos',
						value: 'shipments',
					},
				},
			],
		},
		shouldUnregister: true,
	});

	const selectedService = methods.watch('service');
	const pickupAddressZipCode = methods.watch('pickupAddressZipCode');
	const deliveryAddressZipCode = methods.watch('deliveryAddressZipCode');

	const orderId = generateOrderID(direction);

	const formData = methods.watch();

	console.log('formData ===> ', formData);

	const dirtyFields = methods.formState.dirtyFields;

	useEffect(() => {
		methods.setValue('service', '');
	}, [pickupAddressZipCode, deliveryAddressZipCode]);

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
					selectedService={selectedService}
					methods={methods}
					direction={direction}
					setDirection={setDirection}
					currency={currency}
				/>
				<Divider />
				{!!selectedService && (
					<>
						<Shipments
							control={methods.control}
							selectedService={selectedService}
							methods={methods}
							currency={currency}
						/>
						<Divider />
						<TransportationDates methods={methods} />
						<Divider />
						<SenderInformation
							control={methods.control}
							stepLabel={
								selectedService === 'productSalesService'
									? 'Siuntos paėmimo / pardavėjo informacija'
									: 'Siuntos paėmimo / siuntėjo informacija'
							}
						/>
						<Divider />
						<RecipientInformation control={methods.control} />
						{selectedService === 'productSalesService' && (
							<>
								<Divider />
								<RansomPayeeInformation control={methods.control} />
							</>
						)}

						<Divider />
						<PayerInformation
							control={methods.control}
							step={selectedService === 'productSalesService' ? 7 : 6}
							stepLabel={'Užsakovo informacija'}
						/>
					</>
				)}
			</div>
		</form>
	);
};

export default Form;
