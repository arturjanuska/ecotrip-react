/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
// import generateOrderID from '../utils/generateOrderId';
import ProductPurchaseServiceInformation from '../components/step6-7/ProductPurchaseServiceInformation';
import { transformFormDataToEndpoint } from '../utils/transformFormDataToEndpoint';

const Form = () => {
	const methods = useForm<FormType>({
		defaultValues: {
			invoiceRequired: false,
			packagingAndLabelingRules: false,
			transportRules: false,
			currency: '€',
			customerInformation: {
				paymentMethod: {
					label: 'Grynais',
					value: 'cash',
				},
				payerOfTheShipment: {
					label: 'Mokėtojas yra siuntėjas',
					value: 'thePayerIsTheSender',
				},
			},
		},
		shouldUnregister: true,
	});

	const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
		{}
	);

	const currency = methods.watch('currency');

	const service = methods.watch('service');

	const direction = methods.watch('direction');

	const formErrors = methods.formState.errors;

	const selectedService = methods.watch('service');
	const pickupAddressZipCode = methods.watch('pickupAddressZipCode');
	const deliveryAddressZipCode = methods.watch('deliveryAddressZipCode');

	// const orderId = generateOrderID(direction);

	// const formData = methods.watch();

	useEffect(() => {
		methods.setValue('service', '');
	}, [pickupAddressZipCode, deliveryAddressZipCode]);

	const onSubmit = async (data: FormType) => {
		console.log('data ===', data);
		const transformedData = transformFormDataToEndpoint(data);

		const response = await fetch(
			'https://api.uzsakymas.ecotrip.lt/api/orders',
			{
				method: 'POST', // Specify the request method
				headers: {
					'Content-Type': 'application/json', // Set the content type to JSON
				},
				body: JSON.stringify(transformedData), // Co
			}
		);

		console.log('response ===> ', response);
	};

	useEffect(() => {
		if (direction) {
			const value = direction === 'LT-UK' ? '€' : '£';
			methods.setValue('currency', value);
		}
	}, [direction]);

	return (
		<form
			className='main'
			onSubmit={methods.handleSubmit(onSubmit)}>
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
					currency={currency}
					formErrors={formErrors}
				/>
				<Divider />
				{!!selectedService && (
					<>
						<Shipments
							control={methods.control}
							selectedService={selectedService}
							methods={methods}
							currency={currency}
							formErrors={formErrors}
							errorMessages={errorMessages}
							setErrorMessages={setErrorMessages}
						/>
						<Divider />
						<TransportationDates
							methods={methods}
							formErrors={formErrors}
							direction={direction}
						/>
						<Divider />
						<SenderInformation
							control={methods.control}
							stepLabel={
								selectedService === 'productSalesService'
									? 'Siuntos paėmimo / pardavėjo informacija'
									: 'Siuntos paėmimo / siuntėjo informacija'
							}
							formErrors={formErrors}
							setValue={methods.setValue}
							selectedService={service}
						/>
						<Divider />
						<RecipientInformation
							control={methods.control}
							formErrors={formErrors}
						/>
						{selectedService === 'productSalesService' && (
							<>
								<Divider />
								<RansomPayeeInformation
									control={methods.control}
									formErrors={formErrors}
									selectedService={service}
								/>
							</>
						)}
						{selectedService === 'productPurchaseService' && (
							<>
								<Divider />
								<ProductPurchaseServiceInformation
									control={methods.control}
									formErrors={formErrors}
									selectedService={service}
								/>
							</>
						)}

						<Divider />
						<PayerInformation
							control={methods.control}
							step={
								selectedService === 'productSalesService' ||
								selectedService === 'productPurchaseService'
									? 7
									: 6
							}
							stepLabel={'Užsakovo informacija'}
							formErrors={formErrors}
							methods={methods}
							currency={currency}
							errorMessages={errorMessages}
						/>
					</>
				)}
			</div>
		</form>
	);
};

export default Form;
