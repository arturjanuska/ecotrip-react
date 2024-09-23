/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */
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
import { FormType, ShipmentProps } from '../utils/formTypes';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import ProductPurchaseServiceInformation from '../components/step6-7/ProductPurchaseServiceInformation';
import { transformFormDataToEndpoint } from '../utils/transformFormDataToEndpoint';
import useCurrencyConverter from '../utils/useCurrencyConverter';

const Form = ({ setOrderId }: { setOrderId: (id: string) => void }) => {
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
			},
		},
		shouldUnregister: true,
	});

	const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
		{}
	);

	const [priceDescription, setPriceDescription] = useState<
		{ title: string; price: string }[]
	>([]);

	const [postCodeObject, setPostCodeObject] = useState<any>(null);

	const [submitErrorMessage, setShowSubmitError] = useState<string | null>(
		null
	);
	const currency = methods.watch('currency') ?? '€';
	const rate = useCurrencyConverter({ currency });

	const service = methods.watch('service');

	const direction = methods.watch('direction');

	const formErrors = methods.formState.errors;

	const selectedService = methods.watch('service');
	const pickupAddressZipCode = methods.watch('pickupAddressZipCode');
	const deliveryAddressZipCode = methods.watch('deliveryAddressZipCode');

	// @ts-ignore
	const formData = methods.watch();

	// @ts-ignore
	const orderPrice = methods.watch('estimatedShipmentPrice');

	const shipments = methods.watch('shipments');

	const sumOfPurchasePrice = (items: ShipmentProps[]) => {
		let price = 0;
		for (const element of items) {
			const priceOfTheItem = Number(element.shipmentPrice)
				? Number(element.shipmentPrice)
				: 0;

			price += priceOfTheItem;
		}
		return price;
	};

	// const pricesOfItems = sumOfPurchasePrice(shipments ?? []);

	useEffect(() => {
		if (service !== 'shipmentWithAddressService') {
			methods.setValue('service', '');
		}
	}, [pickupAddressZipCode, deliveryAddressZipCode]);

	const onSubmit = async (data: FormType) => {
		const transformedData = transformFormDataToEndpoint(data);

		const response = await fetch(
			`https://api.uzsakymas.ecotrip.lt/api/orders`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(transformedData),
			}
		);

		if (response.ok) {
			const data = await response.json();
			const orderId = data.orderId;
			setShowSubmitError(null);
			setOrderId(orderId);
			methods.reset();
		} else {
			setShowSubmitError(
				'Serverio klaida. Susisiekite su vadybininku +370 601 22060'
			);
		}
	};

	const showPurchaseInformation =
		selectedService === 'productPurchaseService' &&
		sumOfPurchasePrice(shipments) > 249;

	useEffect(() => {

		if (direction && direction !== 'LT-LT') {
			methods.setValue('dates.from.day', null);
			methods.setValue('dates.from.month', null);
			methods.setValue('dates.from.year', null);

			const value = direction === 'LT-UK' ? '€' : '£';
			methods.setValue('currency', value);
		}
	}, [direction]);

	const setPostCodeObjectFn = (obj: any) => {
		setPostCodeObject(obj);
	};

	return (
		<form
			className='main'
			onSubmit={methods.handleSubmit(onSubmit)}
			autoComplete='off'>
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
					setPostCodeObject={setPostCodeObjectFn}
					rate={rate}
				/>
				<Divider />
				{direction === 'LT-LT' ? (
					<div className='direction-message'>
						<p>Susisiekite su vadybininku +370 601 22060</p>
						<p>Info@ecotrip.lt</p>
					</div>
				) : (
					<>
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
									rate={rate}
								/>
								<Divider />
								<TransportationDates
									methods={methods}
									formErrors={formErrors}
									direction={direction}
								/>
								{showPurchaseInformation && (
									<>
										<Divider />
										<ProductPurchaseServiceInformation
											control={methods.control}
											formErrors={formErrors}
											selectedService={service}
											methods={methods}
										/>
									</>
								)}
								<Divider />
								<SenderInformation
									control={methods.control}
									stepLabel={
										selectedService === 'productSalesService' ||
										selectedService === 'productPurchaseService'
											? 'Siuntos paėmimo / pardavėjo informacija'
											: selectedService === 'shipmentWithAddressService'
											? 'EcoTrip sandėlio duomenys, kuriuos turite nurodyti užsakydami siuntą iš tiekėjo'
											: 'Siuntos paėmimo / siuntėjo informacija'
									}
									formErrors={formErrors}
									setValue={methods.setValue}
									selectedService={service}
									methods={methods}
									step={showPurchaseInformation ? 5 : 4}
								/>
								<Divider />
								<RecipientInformation
									control={methods.control}
									formErrors={formErrors}
									methods={methods}
									stepLabel={
										selectedService === 'productSalesService'
											? 'Prekės pristatymo / gavėjo informacija'
											: 'Siuntos pristatymo / gavėjo informacija'
									}
									step={showPurchaseInformation ? 6 : 5}
								/>
								{selectedService === 'productSalesService' && (
									<>
										<Divider />
										<RansomPayeeInformation
											control={methods.control}
											formErrors={formErrors}
											selectedService={service}
											methods={methods}
										/>
									</>
								)}
								<Divider />
								<PayerInformation
									control={methods.control}
									step={
										selectedService === 'productSalesService'
											? 7
											: showPurchaseInformation
											? 7
											: 6
									}
									stepLabel={'Užsakovo informacija'}
									formErrors={formErrors}
									methods={methods}
									currency={currency}
									errorMessages={errorMessages}
									submitErrorMessage={submitErrorMessage}
									postCodeObject={postCodeObject}
									setPriceDescription={setPriceDescription}
									priceDescription={priceDescription}
									rate={rate}
								/>
							</>
						)}
					</>
				)}
			</div>
		</form>
	);
};

export default Form;
