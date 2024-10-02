/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Step from '../Step';
import FieldContainer from '../FieldContainer';
import OrderPrice from './OrderPrice';
import SecondaryButton from '../SecondaryButton';
import './step6.css';
import Link from '../Link';
import { Control, FieldErrors, UseFormReturn } from 'react-hook-form';
import { FormType, ShipmentProps } from '../../utils/formTypes';
import ControlledStyledSelect from '../ControlledStyledSelect';
import ControlledCheckboxWithLabel from '../ControlledCheckboxWithLabel';
import { useEffect, useState } from 'react';
import { useCustomValidation } from '../../utils/validation/useCustomValidation';
import UncontrolledInput from '../UncontrolledInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CustomAlert from '../CustomAlert';
import { convertValue } from '../../utils/convertCurrency';

type Props = {
	control: Control<FormType, any>;
	step: number;
	stepLabel: string;
	formErrors: FieldErrors<FormType>;
	methods: UseFormReturn<FormType, any, undefined>;
	currency: '€' | '£';
	errorMessages: Record<string, string>;
	submitErrorMessage: string | null;
	postCodeObject: any;
	priceDescription: { title: string; price: string }[];
	setPriceDescription: React.Dispatch<
		React.SetStateAction<
			{
				title: string;
				price: string;
			}[]
		>
	>;
	rate: number;
};

const PayerInformation = ({
	control,
	step,
	stepLabel,
	formErrors,
	methods,
	currency,
	errorMessages,
	submitErrorMessage,
	postCodeObject,
	setPriceDescription,
	priceDescription,
	rate,
}: Props) => {
	const [discountCode, setDiscountCode] = useState<string>('');

	const payerOptions = [
		{
			label: 'Mokėtojas yra siuntėjas',
			value: 'thePayerIsTheSender',
		},
		{
			label: 'Mokėtojas yra gavėjas',
			value: 'thePayerIsTheRecipient',
		},
	];

	const paymentMethodOptions = [
		{
			label: 'Grynais',
			value: 'cash',
		},
		{
			label: 'Kortele',
			value: 'card',
		},
		{
			label: 'Bankiniu pavedimu (juridiniams asmenims)',
			value: 'bankTransfer',
		},
	];

	const shipments = methods.watch('shipments');

	const service = methods.watch('service');

	const payer = methods.watch('customerInformation.payerOfTheShipment.value');

	// const shipmentsWithEmptyEstimatedPrice = shipments.filter((item) => {
	// 	if (item.estimatedPrice === '0.00' || !item.estimatedPrice) {
	// 		return true;
	// 	}
	// });

	const validationRules = useCustomValidation({ service });

	const getDiscountPercentage = (itemsCount: number) => {
		if (itemsCount === 0 || itemsCount === 1) return 1;

		if (itemsCount === 2) return 0.95;
		if (itemsCount === 3) return 0.9;
		if (itemsCount === 4) return 0.85;
		if (itemsCount > 4) return 0.8;
		return 1;
	};

	const getOrderPrice = (
		shipmentsArray: ShipmentProps[],
		postCodeObject: any
	) => {
		let price = 0;
		const priceDescription: { title: string; price: string }[] = [];

		for (let i = 0; i < shipmentsArray.length; i++) {
			const shipment = shipmentsArray[i];
			const shipmentWeight = Number(shipment.weight) ?? 0;
			const shipmentLenght = Number(shipment.length) ?? 0;
			const shipmentWidth = Number(shipment.width) ?? 0;
			const shipmentHeight = Number(shipment.height) ?? 0;

			let parcelForceAdditionalCharges = 0;
			if (service === 'parcelForceShipment') {
				if (
					(shipmentLenght <= 45 ||
						shipmentWidth <= 45 ||
						shipmentHeight <= 45) &&
					shipmentWeight <= 2
				) {
					parcelForceAdditionalCharges = 4.19;
				} else if (
					(shipmentLenght <= 61 ||
						shipmentWidth <= 61 ||
						shipmentHeight <= 61) &&
					shipmentWeight <= 20
				) {
					if (shipmentWeight <= 2) {
						parcelForceAdditionalCharges = 5.89;
					} else if (shipmentWeight > 2 && shipmentWeight <= 10) {
						parcelForceAdditionalCharges = 7.59;
					} else if (shipmentWeight > 10 && shipmentWeight <= 20) {
						parcelForceAdditionalCharges = 11.69;
					}
				} else if (
					postCodeObject?.additionalCharges === 'Parcel force pricelist'
				) {
					const zones = [
						{
							title: 'Zone 1',
							value: 9,
						},
						{
							title: 'Zone 2',
							value: 19,
						},
						{
							title: 'Zone 3',
							value: 23,
						},
					];

					const zone = postCodeObject?.parcelForceZone || '';

					zones.forEach((item) => {
						if (item.title === zone) {
							parcelForceAdditionalCharges = item.value;
						}
					});
				}
			}

			const shipmentPrice =
				Number(shipment.estimatedPrice) + parcelForceAdditionalCharges;

			price += shipmentPrice;

			if (shipment.category?.label) {
				priceDescription.push({
					title: `Siunta nr. ${i + 1}: ${
						shipment.productType?.label
							? `${shipment.productType?.label} ${
									parcelForceAdditionalCharges !== 0
										? '+ Persiuntimo paslauga'
										: ''
							  }`
							: `${shipment.category?.label} ${
									parcelForceAdditionalCharges !== 0
										? '+ Persiuntimo paslauga'
										: ''
							  }`
					}:`,
					price:
						`${currency}${shipmentPrice.toFixed(2)} - ${convertValue(
							currency,
							shipmentPrice,
							rate
						)}` || '0.00',
				});
			}
		}

		const purchaseServiceShipmentsPrices =
			shipmentsArray
				.filter((item) => item.shipmentPrice)
				.reduce((acc, curr) => {
					return acc + Number(curr.shipmentPrice);
				}, 0) || 0;

		const salesServiceShipmentsPrices =
			shipmentsArray
				.filter((item) => item.purchasePriceOfTheItem)
				.reduce((acc, curr) => acc + Number(curr.purchasePriceOfTheItem), 0) ||
			0;

		if (service === 'shipmentWithAddressService') {
			price += 0;
		}

		if (service === 'productPurchaseService') {
			// is savu
			if (purchaseServiceShipmentsPrices < 250) {
				const threePercentOfThePrice =
					(purchaseServiceShipmentsPrices / 100) * 3;
				if (threePercentOfThePrice < 5) {
					price += 5;
					priceDescription.push({
						title: 'Prekės nupirkimo paslauga:',
						price: `${currency}5.00 - ${convertValue(currency, 5, rate)}`,
					});
				} else {
					price += threePercentOfThePrice;
					priceDescription.push({
						title: 'Prekės nupirkimo paslauga:',
						price: `${currency}${threePercentOfThePrice.toFixed(
							2
						)} - ${convertValue(currency, threePercentOfThePrice, rate)}`,
					});
				}
			}
			// klientas
			if (purchaseServiceShipmentsPrices >= 250) {
				const twoPercentOfThePrice = (purchaseServiceShipmentsPrices / 100) * 2;
				if (twoPercentOfThePrice < 15) {
					price += 15;
					priceDescription.push({
						title: `Prekės nupirkimo paslauga:`,
						price: `${currency}15.00 - ${convertValue(currency, 15, rate)}`,
					});
				} else if (twoPercentOfThePrice > 50) {
					price += 50;
					priceDescription.push({
						title: `Prekės nupirkimo paslauga:`,
						price: `${currency}50.00 - ${convertValue(currency, 50, rate)}`,
					});
				} else {
					price += twoPercentOfThePrice;
					priceDescription.push({
						title: `Prekės nupirkimo paslauga:`,
						price: `${currency}${twoPercentOfThePrice.toFixed(
							2
						)} - ${convertValue(currency, twoPercentOfThePrice, rate)}`,
					});
				}
			}

			if (purchaseServiceShipmentsPrices < 250) {
				price += purchaseServiceShipmentsPrices;
				priceDescription.push({
					title: 'Prekių nupirkimo suma:',
					price: `${currency}${purchaseServiceShipmentsPrices.toFixed(
						2
					)}  - ${convertValue(
						currency,
						purchaseServiceShipmentsPrices,
						rate
					)}`,
				});
			}
		}

		if (service === 'productSalesService') {
			const twoPercentOfThePrice = (salesServiceShipmentsPrices * 2) / 100;
			if (twoPercentOfThePrice < 15) {
				price += 15;
				priceDescription.push({
					title: 'Prekės pardavimo paslauga:',
					price: `${currency}15.00  - ${convertValue(currency, 15, rate)}`,
				});
			} else if (twoPercentOfThePrice > 50) {
				price += 50;
				priceDescription.push({
					title: 'Prekių pardavimo suma:',
					price: `${currency}50.00  - ${convertValue(currency, 50, rate)}`,
				});
			} else {
				price += twoPercentOfThePrice;
				priceDescription.push({
					title: 'Prekių pardavimo suma:',
					price: `${currency}${twoPercentOfThePrice.toFixed(
						2
					)}  - ${convertValue(currency, twoPercentOfThePrice, rate)}`,
				});
			}
		}

		if (
			postCodeObject?.additionalCharges &&
			!isNaN(Number(postCodeObject?.additionalCharges)) &&
			service !== 'shipmentWithAddressService'
		) {
			price += Number(postCodeObject?.additionalCharges) || 0;
			priceDescription.push({
				title: 'Adreso papildomas mokestis:',
				price: `${currency}${Number(postCodeObject.additionalCharges).toFixed(
					2
				)} - ${convertValue(
					currency,
					Number(postCodeObject.additionalCharges),
					rate
				)}`,
			});
		}

		const discountPercentage = getDiscountPercentage(
			shipmentsArray.length || 0
		);

		const percentage =
			discountPercentage === 0.8
				? '20%'
				: discountPercentage === 0.85
				? '15%'
				: discountPercentage === 0.9
				? '10%'
				: discountPercentage === 0.95
				? '5%'
				: null;

		if (percentage) {
			priceDescription.push({
				title: `Nuolaida už siuntų kiekį:`,
				price: `${percentage}`,
			});
		}
		const secondDiscountPercentage =
			postCodeObject?.discount === '10%' &&
			service !== 'shipmentWithAddressService'
				? 0.9
				: 1;

		if (secondDiscountPercentage === 0.9) {
			priceDescription.push({
				title: `Adreso nuolaida:`,
				price: `10%`,
			});
		}

		const finalPrice = price * discountPercentage * secondDiscountPercentage;

		setPriceDescription(priceDescription);
		methods.setValue('estimatedShipmentPrice', finalPrice.toFixed(2) ?? '0.00');
	};

	useEffect(() => {
		getOrderPrice(shipments, postCodeObject);
	}, [
		shipments,
		shipments.length,
		JSON.stringify(shipments),
		payer,
		service,
		JSON.stringify(postCodeObject),
	]);

	const orderPrice = methods.watch('estimatedShipmentPrice');

	const shipmentErrorMessage = shipments.some((item) => {
		if (!item?.category || item?.category?.value === 'shipments') {
			if (
				item.estimatedPrice === '0.00' ||
				!item.height ||
				!item.length ||
				!item.width ||
				!item.weight
			) {
				return true;
			}
			return false;
		}
		return false;
	})
		? 'Nesuvesti siuntos duomenys'
		: null;

	const isDisabled =
		Object.keys(errorMessages).length > 0 || shipments.length === 0;

	const errorMessagesArray = Object.keys(errorMessages) ?? [];

	return (
		<Step
			step={step}
			title={stepLabel}>
			<>
				<div className='payer-info-container'>
					<FieldContainer
						label='Kas yra siuntos užsakovas?'
						description='Prašome iš anksto nurodyti, kas bus atsakingas už siuntos apmokėjimą, kad vėliau nebūtų nesusipratimų ar papildomų klausimų po užsakymo.'>
						<ControlledStyledSelect
							placeholder='Kas yra siuntos užsakovas?'
							isDisabled={
								service === 'shipmentWithAddressService' ||
								service === 'productPurchaseService'
							}
							name='customerInformation.payerOfTheShipment'
							options={payerOptions}
							control={control}
							errorMessage={
								formErrors.customerInformation?.payerOfTheShipment?.message
							}
							rules={validationRules.customerInformation.payerOfTheShipment}
						/>
					</FieldContainer>
					<FieldContainer
						label='Pasirinkite apmokėjimo būdą'
						description='Prašome pasirinkti ir nurodyti atsiskaitymo būdą, kuris jums yra patogus ir teisingas.'>
						<ControlledStyledSelect
							placeholder='Pasirinkite apmokėjimo būdą'
							name='customerInformation.paymentMethod'
							options={paymentMethodOptions}
							control={control}
							errorMessage={
								formErrors.customerInformation?.paymentMethod?.message
							}
							rules={validationRules.customerInformation.paymentMethod}
						/>
					</FieldContainer>
				</div>
				{/* <div className='columns'>
					<div className='left-column empty'></div>
					<div className='right-column discount-section'>
						<UncontrolledInput
							placeholder='Įveskite nuolaidos kodą'
							isError={false}
							onChange={(e) => {
								setDiscountCode(e.target.value);
							}}
							value={discountCode}
						/>
						<SecondaryButton
							type='button'
							disabled={!discountCode}>
							<FontAwesomeIcon icon={faCheck} />
						</SecondaryButton>
					</div>
				</div> */}
				<div className='columns'>
					<div className='left-column empty'></div>
					<div className='right-column'>
						<OrderPrice
							sum={orderPrice}
							currency={currency}
							control={control}
							formErrors={formErrors}
							methods={methods}
							priceDescription={priceDescription}
							rate={rate}
						/>
					</div>
				</div>
				<div className='checkboxes-container'>
					<ControlledCheckboxWithLabel
						control={control}
						errorMessage={formErrors.packagingAndLabelingRules?.message}
						name='packagingAndLabelingRules'
						rules={validationRules.packagingAndLabelingRules}>
						<>
							<span>
								Aš esu susipažinęs(-usi) ir sutinku su{' '}
								<Link
									href='https://ecotrip.lt/siuntos-pakavimo-ir-zenklinimo-taisykles/'
									text='EcoTrip siuntos pakavimo ir ženklinimo taisyklėmis *'
								/>
							</span>
						</>
					</ControlledCheckboxWithLabel>
					<ControlledCheckboxWithLabel
						control={control}
						errorMessage={formErrors.transportRules?.message}
						name='transportRules'
						rules={validationRules.transportRules}>
						<span>
							Aš esu susipažinęs(-usi) ir sutinku su{' '}
							<Link
								href='https://ecotrip.lt/vezimo-taisykles/'
								text='EcoTrip vežimo taisyklėmis *'
							/>
						</span>
					</ControlledCheckboxWithLabel>
				</div>
				<div
					style={{
						width: '100%',
						display: 'flex',
						alignItems: 'flex-end',
						flexDirection: 'column',
					}}>
					<CustomAlert
						messages={[
							...(submitErrorMessage ? [submitErrorMessage] : []),
							...(shipmentErrorMessage ? [shipmentErrorMessage] : []),
							...errorMessagesArray,
						]}
					/>
					<SecondaryButton
						type={`${isDisabled ? 'button' : 'submit'}`}
						disabled={isDisabled}>
						<span>Patvirtinti užsakymą</span>
					</SecondaryButton>
				</div>
			</>
		</Step>
	);
};

export default PayerInformation;
