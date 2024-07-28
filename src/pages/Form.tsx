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
import { schema } from '../utils/validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';

const Form = () => {
	const [currency, setCurrency] = useState<'€' | '£'>('€');

	const methods = useForm<FormType>({
		defaultValues: {
			packagingAndLabelingRules: false,
			transportRules: false,
		},
		shouldUnregister: true,
		resolver: yupResolver(schema),
	});

	const direction = methods.watch('direction');

	const formErrors = methods.formState.errors;

	console.log('formErrors ===', formErrors);

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

	const onSubmit = (data: FormType) => {
		console.log('data ===', data);
	};

	useEffect(() => {
		if (direction) {
			const value = direction === 'LT-UK' ? '€' : '£';
			setCurrency(value);
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
						/>
						<Divider />
						<TransportationDates
							methods={methods}
							formErrors={formErrors}
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
								/>
							</>
						)}

						<Divider />
						<PayerInformation
							control={methods.control}
							step={selectedService === 'productSalesService' ? 7 : 6}
							stepLabel={'Užsakovo informacija'}
							formErrors={formErrors}
						/>
					</>
				)}
			</div>
		</form>
	);
};

export default Form;
