/* eslint-disable @typescript-eslint/no-explicit-any */
import Step from '../Step';
import FieldContainer from '../FieldContainer';
import CustomInput from '../CustomInput';
import OrderPrice from './OrderPrice';
import SecondaryButton from '../SecondaryButton';
import './step6.css';
import Link from '../Link';
import { Control, FieldErrors, UseFormReturn } from 'react-hook-form';
import { FormType, ShipmentProps } from '../../utils/formTypes';
import ControlledStyledSelect from '../ControlledStyledSelect';
import ControlledCheckboxWithLabel from '../ControlledCheckboxWithLabel';
import { useEffect } from 'react';
import { useCustomValidation } from '../../utils/validation/useCustomValidation';

type Props = {
	control: Control<FormType, any>;
	step: number;
	stepLabel: string;
	formErrors: FieldErrors<FormType>;
	methods: UseFormReturn<FormType, any, undefined>;
	currency: '€' | '£';
	errorMessages: Record<string, string>;
};

const PayerInformation = ({
	control,
	step,
	stepLabel,
	formErrors,
	methods,
	currency,
	errorMessages,
}: Props) => {
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

	const shipmentsWithEmptyEstimatedPrice = shipments.filter((item) => {
		if (item.estimatedPrice === '0.00' || !item.estimatedPrice) {
			return true;
		}
	});

	const validationRules = useCustomValidation({});

	const getOrderPrice = (shipmentsArray: ShipmentProps[]) => {
		let price = 0;

		for (let i = 0; i < shipmentsArray.length; i++) {
			const shipmentPrice = shipmentsArray[i].estimatedPrice;
			price += Number(shipmentPrice);
		}

		methods.setValue('estimatedShipmentPrice', price ?? 0);
	};

	useEffect(() => {
		getOrderPrice(shipments);
	}, [shipments.length, shipments]);

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
				<div className='payer-email'>
					<FieldContainer
						label='Mokėtojo el. paštas'
						description='Užsakymo ir mokėjimo patvirtinimai bus išsiųsti į šį elektroninį paštą.'
						width='full'>
						<CustomInput
							placeholder='Įveskite mokėtojo el. paštą *'
							type='text'
							control={control}
							name='customerInformation.email'
							errorMessage={formErrors.customerInformation?.email?.message}
							rules={validationRules.customerInformation.email}
						/>
					</FieldContainer>
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
				</div>
			</>
		</Step>
	);
};

export default PayerInformation;
