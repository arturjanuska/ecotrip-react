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

type Props = {
	control: Control<FormType, any>;
	step: number;
	stepLabel: string;
	formErrors: FieldErrors<FormType>;
	methods: UseFormReturn<FormType, any, undefined>;
	currency: '€' | '£';
	errorMessages: Record<string, string>;
	submitErrorMessage: string | null;
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

	const shipmentsWithEmptyEstimatedPrice = shipments.filter((item) => {
		if (item.estimatedPrice === '0.00' || !item.estimatedPrice) {
			return true;
		}
	});

	const validationRules = useCustomValidation({});

	const getDiscountPercentage = (itemsCount: number) => {
		if (itemsCount === 0 || itemsCount === 1) return 1;

		if (itemsCount === 2) return 0.95;
		if (itemsCount === 3) return 0.9;
		if (itemsCount === 4) return 0.85;
		if (itemsCount > 4) return 0.8;
		return 1;
	};

	const getOrderPrice = (shipmentsArray: ShipmentProps[]) => {
		let price = 0;

		for (let i = 0; i < shipmentsArray.length; i++) {
			const shipmentPrice = shipmentsArray[i].estimatedPrice;
			price += Number(shipmentPrice);
		}

		if (service === 'shipmentWithAddressService') {
			price = price + 5;
		}

		if (service === 'productPurchaseService') {
			// is savu
			if (payer === 'thePayerIsTheSender') {
				const threePercentOfThePrice = (price * 3) / 100;
				if (threePercentOfThePrice < 5) {
					price = price + 5;
				} else {
					price = price + threePercentOfThePrice;
				}
			}
			// klientas
			if (payer === 'thePayerIsTheRecipient') {
				const twoPercentOfThePrice = (price * 2) / 100;
				if (twoPercentOfThePrice < 15) {
					price = price + 15;
				} else if (twoPercentOfThePrice > 50) {
					price = price + 50;
				} else {
					price = price + twoPercentOfThePrice;
				}
			}
		}

		if (service === 'productSalesService') {
			const twoPercentOfThePrice = (price * 2) / 100;
			if (twoPercentOfThePrice < 15) {
				price = price + 15;
			} else if (twoPercentOfThePrice > 50) {
				price = price + 50;
			} else {
				price = price + twoPercentOfThePrice;
			}
		}

		const discountPercentage = getDiscountPercentage(
			shipmentsArray.length || 0
		);

		const finalPrice = price * discountPercentage;

		methods.setValue('estimatedShipmentPrice', finalPrice.toFixed(2) ?? '0.00');
	};

	useEffect(() => {
		getOrderPrice(shipments);
	}, [shipments.length, JSON.stringify(shipments), payer, service]);

	const orderPrice = methods.watch('estimatedShipmentPrice');

	const isDisabled =
		Object.keys(errorMessages).length > 0 ||
		shipmentsWithEmptyEstimatedPrice.length > 0 ||
		shipments.length === 0;

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
				<div className='columns'>
					<div className='left-column empty'></div>
					<div className='right-column discount-section'>
						<UncontrolledInput
							placeholder='Iveskite nuolaidos koda'
							isError={false}
							onChange={(e) => {
								setDiscountCode(e.target.value);
							}}
							value={discountCode}
						/>
						<SecondaryButton>
							<FontAwesomeIcon icon={faCheck} />
						</SecondaryButton>
					</div>
				</div>
				<OrderPrice
					sum={orderPrice}
					currency={currency}
					control={control}
					formErrors={formErrors}
					methods={methods}
				/>
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
						justifyContent: 'flex-end',
					}}>
					<SecondaryButton
						type={`${isDisabled ? 'button' : 'submit'}`}
						disabled={isDisabled}>
						<span>PatvirtinTi užsakymą</span>
					</SecondaryButton>
					{submitErrorMessage ? (
						<div className='errors'>
							<div className='error'>
								<span>{submitErrorMessage}</span>
							</div>
						</div>
					) : null}
				</div>
			</>
		</Step>
	);
};

export default PayerInformation;
