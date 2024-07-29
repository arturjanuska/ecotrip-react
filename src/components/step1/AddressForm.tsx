import {
	Control,
	FieldErrors,
	UseFormReturn,
	UseFormSetValue,
} from 'react-hook-form';
import Step from '../Step';
import FieldContainer from '../FieldContainer';
import CustomInput from '../CustomInput';
import { SearchBox } from './SearchBox';
import './step1.css';
import ServiceSection from './ServiceSection';
import { FormType } from '../../utils/formTypes';
import { useEffect } from 'react';
import { checkParcelForcePostcodes } from '../../utils/checkPostCodes';

const AddressForm = ({
	setValue,
	control,
	selectedService,
	methods,
	direction,
	currency,
	formErrors,
}: {
	setValue: UseFormSetValue<FormType>;
	control: Control<FormType, any>;
	selectedService: string;
	methods: UseFormReturn<FormType, any, undefined>;
	direction: 'LT-UK' | 'UK-LT' | null;
	currency: '€' | '£';
	formErrors: FieldErrors<FormType>;
}) => {
	const onChange = (
		name: 'pickupAddress' | 'deliveryAddress',
		value: string
	) => {
		if (name === 'pickupAddress') {
			setValue('pickupAddressZipCode', '');
		}
		if (name === 'deliveryAddress') {
			setValue('deliveryAddressZipCode', '');
		}
		setValue(name, value);
	};

	const handleOnClear = (name: 'pickupAddress' | 'deliveryAddress') => {
		if (name === 'pickupAddress') {
			setValue('pickupAddressZipCode', '');
		}
		if (name === 'deliveryAddress') {
			setValue('deliveryAddressZipCode', '');
		}
	};

	const findPostcode = (address: string) => {
		function findUKPostcode(address: string) {
			const postcodePattern = /\b[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}\b/;

			const match = address.match(postcodePattern);

			if (match) {
				return match[0];
			} else {
				return null;
			}
		}

		function findLithuanianPostcode(address: string) {
			const postcodePattern = /\b\d{5}\b/;

			const match = address.match(postcodePattern);

			if (match) {
				return match[0];
			} else {
				return null;
			}
		}

		const ukPostcode = findUKPostcode(address);
		const ltPostcode = findLithuanianPostcode(address);

		if (ukPostcode) {
			return ukPostcode;
		} else if (ltPostcode) {
			return ltPostcode;
		} else {
			return null;
		}
	};

	const selectedPickupAddress = methods.watch('pickupAddress');
	const selectedPickupAddressPostcode = methods.watch('pickupAddressZipCode');

	const selectedDeliveryAddress = methods.watch('deliveryAddress');
	const selectedDeliveryAddressPostcode = methods.watch(
		'deliveryAddressZipCode'
	);

	const isParcelForce =
		checkParcelForcePostcodes(
			direction
				? [
						selectedPickupAddressPostcode as string,
						selectedDeliveryAddressPostcode as string,
				  ]
				: []
		) || false;

	const getDirection = (pickupPostcode: string, deliveryPostcode: string) => {
		const ukPostcodePattern = /\b[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}\b/;
		const ltPostcodePattern = /\b\d{5}\b/;

		if (
			pickupPostcode.match(ukPostcodePattern) &&
			deliveryPostcode.match(ltPostcodePattern)
		) {
			return 'UK-LT';
		}

		if (
			pickupPostcode.match(ltPostcodePattern) &&
			deliveryPostcode.match(ukPostcodePattern)
		) {
			return 'LT-UK';
		}

		return null;
	};

	useEffect(() => {
		if (selectedPickupAddress) {
			const postCode = findPostcode(selectedPickupAddress);
			setValue('pickupAddressZipCode', postCode);
		}
	}, [selectedPickupAddress]);

	useEffect(() => {
		if (selectedDeliveryAddress) {
			const postCode = findPostcode(selectedDeliveryAddress);
			setValue('deliveryAddressZipCode', postCode);
		}
	}, [selectedDeliveryAddress]);

	useEffect(() => {
		if (
			selectedPickupAddress &&
			selectedDeliveryAddress &&
			selectedPickupAddressPostcode &&
			selectedDeliveryAddressPostcode
		) {
			const dir: 'LT-UK' | 'UK-LT' | null = getDirection(
				selectedPickupAddressPostcode,
				selectedDeliveryAddressPostcode
			);
			setValue('direction', dir);
		} else {
			setValue('direction', null);
		}
	}, [
		selectedPickupAddress,
		selectedDeliveryAddress,
		selectedPickupAddressPostcode,
		selectedDeliveryAddressPostcode,
	]);

	return (
		<Step
			title='Paėmimo ir pristatymo adresai'
			step={1}>
			<div className='address-form-section-wrapper'>
				<FieldContainer
					label='Paėmimo adresas:'
					description='Adresas iš kur paįmama siunta arba perduodama EcoTrip komandai.'>
					<SearchBox
						name={'pickupAddress'}
						defaultValue=''
						onChange={onChange}
						placeholder='Įveskite gatvę, namo numerį, miestą'
						onClear={handleOnClear}
						errorMessage={formErrors.pickupAddress}
					/>
				</FieldContainer>
				<FieldContainer
					label='Paėmimo pašto kodas:'
					description='Pašto kodas sugeneruojamas automatiškai, suvedus tikslų adresą. Pasitikrinkite ar teisingas pašto kodas.'>
					<CustomInput
						type='text'
						placeholder='Pašto kodas'
						name='pickupAddressZipCode'
						control={control}
						errorMessage={formErrors.pickupAddressZipCode}
					/>
				</FieldContainer>
			</div>

			<div className='address-form-section-wrapper'>
				<FieldContainer
					label='Pristatymo adresas:'
					description='Adresas, kuriame gavėjas galės atsiimti siuntą arba kuriame siunta bus palikta po pristatymo.'>
					<SearchBox
						name={'deliveryAddress'}
						defaultValue=''
						onChange={onChange}
						placeholder='Įveskite gatvę, namo numerį, miestą'
						onClear={handleOnClear}
						errorMessage={formErrors.deliveryAddress}
					/>
				</FieldContainer>
				<FieldContainer
					label='Pristatymo pašto kodas:'
					description='Pašto kodas sugeneruojamas automatiškai, suvedus tikslų adresą. Pasitikrinkite ar teisingas pašto kodas.'>
					<CustomInput
						type='text'
						placeholder='Pašto kodas'
						name='deliveryAddressZipCode'
						control={control}
						errorMessage={formErrors.deliveryAddressZipCode}
					/>
				</FieldContainer>
			</div>

			{!!direction && (
				<ServiceSection
					setValue={setValue}
					selectedService={selectedService}
					isParcelForce={isParcelForce}
					currency={currency}
				/>
			)}
		</Step>
	);
};

export default AddressForm;
