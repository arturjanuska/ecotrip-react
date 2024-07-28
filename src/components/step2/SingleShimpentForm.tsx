import { useState } from 'react';
import FieldContainer from '../FieldContainer';
import CustomInput from '../CustomInput';
import {
	automotiveGoodsCategoryProductTypesOptions,
	bicyclesAndScootersCategoryProductTypesOptions,
	categoriesOptions,
	gardenEquipmentCategoryProductTypesOptions,
	getSizeOptionsBySelectedProductType,
	getSpecificationOptionsBySelectedProduct,
	goodsForChildrenCategoryProductTypesOptions,
	householdAppliancesCategoryProductTypesOptions,
	motorcyclesAndAccessoriesCategoryProductTypesOptions,
} from '../../utils/products';
import ControlledStyledSelect from '../ControlledStyledSelect';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { OptionType } from '../../utils/types';
import PrimaryButton from '../PrimaryButton';
import useCalculatePrice from './useCalculatePrice';

type Props = {
	shipmentNumber: number;
	control: Control<FormType>;
	index: number;
	removeShipment: (index: number) => void;
	selectedService: string;
	setValue: UseFormSetValue<FormType>;
	currency: '€' | '£';
};

const SingleShimpentForm = ({
	shipmentNumber,
	control,
	index,
	removeShipment,
	selectedService,
	setValue,
	currency,
}: Props) => {
	const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
		{}
	);

	const categoriesWithProductType = [
		'automotiveGoods',
		'householdAppliances',
		'bicyclesAndScooters',
		'motorcyclesAndAccessories',
		'goodsForChildren',
		'gardenEquipment',
	];

	const productTypesThatNeedsPriceCalculation = ['fridge', 'freezer'];

	const getOptionsBySelectedCategory = (
		selectedCategory: OptionType | null
	): OptionType[] => {
		if (
			!!selectedCategory &&
			categoriesWithProductType.includes(selectedCategory.value)
		) {
			switch (selectedCategory.value) {
				case 'automotiveGoods':
					return automotiveGoodsCategoryProductTypesOptions as OptionType[];
				case 'householdAppliances':
					return householdAppliancesCategoryProductTypesOptions as OptionType[];
				case 'bicyclesAndScooters':
					return bicyclesAndScootersCategoryProductTypesOptions as OptionType[];
				case 'motorcyclesAndAccessories':
					return motorcyclesAndAccessoriesCategoryProductTypesOptions as OptionType[];
				case 'goodsForChildren':
					return goodsForChildrenCategoryProductTypesOptions as OptionType[];
				case 'gardenEquipment':
					return gardenEquipmentCategoryProductTypesOptions as OptionType[];
				default:
					return [];
			}
		} else {
			return [];
		}
	};

	const handleValidation = (field: string, value: string) => {
		const getErrorMessage = (field: string, value: string) => {
			switch (field) {
				case 'length':
					if (Number(value) > 420)
						return 'Apgailestaujame, tačiau į mūsų automobilius telpa ne ilgesni kaip 420 cm kroviniai.';
					break;
				case 'width':
					if (Number(value) > 200)
						return 'Apgailestaujame, tačiau į mūsų automobilius telpa ne platesni kaip 200 cm kroviniai.';
					break;
				case 'height':
					if (Number(value) > 200)
						return 'Apgailestaujame, tačiau į mūsų automobilius telpa ne aukstesni kaip 200 cm kroviniai.';
					break;
				case 'orderedShipmentNumber':
					if (!value)
						return 'Naudojatės EcoTrip adreso paslauga, nurodykite savo užsakytos siuntos numerį, kuri siunčiama per EcoTrip UK būstinę.';
					break;
				case 'shipmentPrice':
					if (!value)
						return 'Prekės kainai viršijus £300 GBP, reikalingas pinigų perdavimas EcoTrip kurjeriui iki prekės nupirkimo. Atvykstame nurodytu pinigus perduodačio asmens adresu.';
					break;
				case 'purchasePriceOfTheItem':
					if (!value)
						return 'Suveskite parduodamos prekės kainą, kurią EcoTrip kurjeriui perduos siuntos gavėjas.';
					break;
				default:
					return '';
			}
			return '';
		};

		setErrorMessages((prevErrors) => {
			const newErrors = { ...prevErrors };
			const errorMessage = getErrorMessage(field, value);

			if (errorMessage) {
				newErrors[field] = errorMessage;
			} else {
				delete newErrors[field];
			}

			return newErrors;
		});
	};

	const selectedCategory = useWatch({
		control,
		name: `shipments.${index}.category`,
	});

	const productTypeOptions = getOptionsBySelectedCategory(selectedCategory);

	const selectedProductType = useWatch({
		control,
		name: `shipments.${index}.productType`,
	});

	const selectedLength = useWatch({
		control,
		name: `shipments.${index}.length`,
	});

	const selectedWidth = useWatch({
		control,
		name: `shipments.${index}.width`,
	});

	const selectedHeight = useWatch({
		control,
		name: `shipments.${index}.height`,
	});

	const selectedShipmentPrice = useWatch({
		control,
		name: `shipments.${index}.shipmentPrice`,
	});

	const selectedPurchasePriceOfTheItem = useWatch({
		control,
		name: `shipments.${index}.purchasePriceOfTheItem`,
	});

	const showSizeOptions = (
		options: OptionType[],
		productTypeValue: string | undefined,
		productTypeOptions: OptionType[]
	) => {
		const sizeOptionsCopy = options ? options : [];
		if (sizeOptionsCopy.length > 0) {
			if (productTypeValue && productTypeOptions.length > 0) {
				console.log('returninam Cia 1');
				return true;
			}
			if (!productTypeValue && productTypeOptions.length > 0) {
				console.log('returninam Cia 2');
				return false;
			}
			if (!productTypeValue && productTypeOptions.length === 0) {
				return false;
			}
			return true;
		} else {
			return false;
		}
	};

	const sizeOptions = getSizeOptionsBySelectedProductType(
		selectedCategory?.value,
		selectedProductType?.value
	);

	const specificationOptions =
		selectedCategory?.value !== 'shipments'
			? getSpecificationOptionsBySelectedProduct(
					selectedCategory?.value,
					selectedProductType?.value
			  )
			: [];

	const selectedSize = useWatch({
		control,
		name: `shipments.${index}.size`,
	});

	const selectedSpecification = useWatch({
		control,
		name: `shipments.${index}.specification`,
	});

	const amount = useWatch({
		control,
		name: `shipments.${index}.amount`,
	});

	useCalculatePrice({
		category: selectedCategory as OptionType,
		productType: selectedProductType as OptionType,
		size: (selectedSize as OptionType) ?? null,
		amount,
		specification: selectedSpecification,
		setValue,
		name: `shipments.${index}.estimatedPrice`,
		weight: selectedSize,
		length: selectedLength,
		width: selectedWidth,
		height: selectedHeight,
	});

	const estimatedPrice =
		useWatch({
			control,
			name: `shipments.${index}.estimatedPrice`,
		}) ?? '0.00';

	const productTypesWithRequiredManagerCall = ['interior', 'carQuarter'];

	const volumeErrorMessages = [
		errorMessages.length,
		errorMessages.width,
		errorMessages.height,
	];
	const orderedShipmentNumberErrorMessage = errorMessages.orderedShipmentNumber;
	const shipmentPriceErrorMessage = errorMessages.shipmentPrice;

	const purchasePriceOfTheItemErrorMessage =
		errorMessages.purchasePriceOfTheItem;

	return (
		<div className='single-shipment-container'>
			<div className='left-column'>
				<FieldContainer
					label={`Pasirinkite Nr. ${shipmentNumber} siuntos kategoriją`}
					description='Įveskite siuntos tipą. Pasirinkus siuntą pagal katalogą, automatiškai paskaičiuosime siuntimo kainą.'
					className='left-column-item'>
					<ControlledStyledSelect
						name={`shipments.${index}.category`}
						control={control}
						options={[...categoriesOptions]}
						isClearable
						defaultValue={{
							label: 'Siuntos kategorija',
							value: 'Siuntos kategorija',
						}}
						placeholder='Siuntos kategoriją'
						isDisabled={selectedService === 'parcelForceShipment'}
						onChange={() => {
							setValue(`shipments.${index}.productType`, null);
							setValue(`shipments.${index}.size`, null);
							setValue(`shipments.${index}.specification`, null);
							setValue(`shipments.${index}.amount`, 1);
							setValue(`shipments.${index}.estimatedPrice`, '0.00');
						}}
					/>
				</FieldContainer>
				<p className='estimated-price'>
					Numatoma Nr. {shipmentNumber} siuntos kaina:{' '}
					<span>
						{currency}
						{estimatedPrice}
					</span>{' '}
				</p>
			</div>
			<div className='right-column'>
				{productTypeOptions.length > 0 && (
					<FieldContainer
						label={`Nr. ${shipmentNumber} siuntos tipas`}
						description={`${
							productTypesWithRequiredManagerCall.includes(
								selectedProductType?.value ?? ''
							)
								? 'Susisiekite su vadybininku'
								: ''
						}`}>
						<ControlledStyledSelect
							name={`shipments.${index}.productType`}
							control={control}
							isClearable
							options={productTypeOptions}
							placeholder='Siuntos tipas'
							onChange={() => {
								setValue(`shipments.${index}.size`, null);
								setValue(`shipments.${index}.specification`, null);
								setValue(`shipments.${index}.estimatedPrice`, '0.00');
							}}
						/>
					</FieldContainer>
				)}
				{selectedCategory?.value === 'flatScreenTv' ? (
					<>
						<FieldContainer
							label={`Nr. ${shipmentNumber} siuntos dydis`}
							description=''>
							<ControlledStyledSelect
								name={`shipments.${index}.size`}
								isClearable
								control={control}
								options={sizeOptions}
								placeholder='Siuntos dydis'
								onChange={() => {
									setValue(`shipments.${index}.specification`, null);
								}}
							/>
						</FieldContainer>
					</>
				) : null}
				{productTypesThatNeedsPriceCalculation.includes(
					selectedProductType?.value ?? ''
				) ? (
					<FieldContainer
						label={`Nr. ${shipmentNumber} siuntos išmatavimai metrais`}
						description={''}>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '8px',
							}}>
							<div className='volume-fields-container'>
								<CustomInput
									name={`shipments.${index}.length`}
									control={control}
									placeholder='Ilgis'
									type='number'
									onChange={(e) => {
										handleValidation('length', e.target.value);
									}}
									isError={!!errorMessages.length}
								/>
								<CustomInput
									name={`shipments.${index}.width`}
									control={control}
									placeholder='Plotis'
									type='number'
									onChange={(e) => {
										handleValidation('width', e.target.value);
									}}
									isError={!!errorMessages.width}
								/>
								<CustomInput
									name={`shipments.${index}.height`}
									control={control}
									placeholder='Aukštis'
									type='number'
									onChange={(e) => {
										handleValidation('height', e.target.value);
									}}
									isError={!!errorMessages.height}
								/>
							</div>
							<div className='errors'>
								{volumeErrorMessages.length !== 0 &&
									volumeErrorMessages
										.filter((mes) => mes !== undefined)
										.map((err, index) => {
											return (
												<div
													className='error'
													key={index}>
													<span>Šių parametrų siuntos neaptarnaujame. </span>{' '}
													{err}
												</div>
											);
										})}
							</div>
						</div>
					</FieldContainer>
				) : null}
				{selectedCategory?.value === 'shipments' ||
				selectedCategory?.value === 'removals' ? (
					<>
						{selectedCategory?.value === 'shipments' ? (
							<FieldContainer
								label={`Nr. ${shipmentNumber} siuntos svoris (kg)`}
								description={
									typeof selectedSize === 'string' &&
									!isNaN(Number(selectedSize)) &&
									Number(selectedSize) > 35
										? 'Jūsų siuta/-os sunkesnė/-ės nei 35 kg. Kadangi mūsų kurjeriai dirba po vieną, jam gali prireikti pagalbos pakraunant ar iškraunant sunkias siuntas. Prašome užtikrinti, kad atvykus kurjeriui būtų kas padeda ją pakrauti ar iškrauti. Įveskite siuntos svorį apytiksliai. Kai atiduosite siuntą, ji bus pasverta dar kartą patikslinimui. '
										: 'Įveskite siuntos svorį apytiksliai. Kai atiduosite siuntą, ji bus pasverta dar kartą patikslinimui. '
								}>
								<CustomInput
									name={`shipments.${index}.size`}
									control={control}
									placeholder='Siuntos svoris'
									type='number'
								/>
							</FieldContainer>
						) : null}

						<FieldContainer
							label={`Nr. ${shipmentNumber} siuntos išmatavimai ${
								selectedCategory?.value === 'removals'
									? 'metrais'
									: 'centimetrais'
							}`}
							description={''}>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '8px',
								}}>
								<div className='volume-fields-container'>
									<CustomInput
										name={`shipments.${index}.length`}
										control={control}
										placeholder='Ilgis'
										type='number'
										onChange={(e) => {
											handleValidation('length', e.target.value);
										}}
										isError={!!errorMessages.length}
									/>
									<CustomInput
										name={`shipments.${index}.width`}
										control={control}
										placeholder='Plotis'
										type='number'
										onChange={(e) => {
											handleValidation('width', e.target.value);
										}}
										isError={!!errorMessages.width}
									/>
									<CustomInput
										name={`shipments.${index}.height`}
										control={control}
										placeholder='Aukštis'
										type='number'
										onChange={(e) => {
											handleValidation('height', e.target.value);
										}}
										isError={!!errorMessages.height}
									/>
								</div>
								<div className='errors'>
									{volumeErrorMessages.length !== 0 &&
										volumeErrorMessages
											.filter((mes) => mes !== undefined)
											.map((err, index) => {
												return (
													<div
														className='error'
														key={index}>
														<span>Šių parametrų siuntos neaptarnaujame. </span>{' '}
														{err}
													</div>
												);
											})}
								</div>
							</div>
						</FieldContainer>
						{selectedService === 'shipmentWithAddressService' && (
							<FieldContainer
								label='Užsakytos siuntos numeris (Amazon UK, eBay ir kt.) *'
								description=''>
								<>
									<CustomInput
										name={`shipments.${index}.orderedShipmentNumber`}
										control={control}
										isError={!!errorMessages.orderedShipmentNumber}
										onChange={(e) => {
											handleValidation('orderedShipmentNumber', e.target.value);
										}}
									/>
									{orderedShipmentNumberErrorMessage && (
										<div className='errors'>
											<div className='error'>
												<span>Neįvestas siuntos numeris. </span>{' '}
												{orderedShipmentNumberErrorMessage}
											</div>
										</div>
									)}
								</>
							</FieldContainer>
						)}
						{selectedService === 'productPurchaseService' && (
							<FieldContainer
								label='Prekės nupirkimo suma'
								description=''>
								<>
									<CustomInput
										name={`shipments.${index}.shipmentPrice`}
										control={control}
										isError={!!shipmentPriceErrorMessage}
										type='number'
										onChange={(e) => {
											handleValidation('shipmentPrice', e.target.value);
										}}
									/>
									{shipmentPriceErrorMessage && (
										<div className='errors'>
											<div className='error'>
												<span>Neįvesta prekės suma. </span>{' '}
												{shipmentPriceErrorMessage}
											</div>
										</div>
									)}
								</>
							</FieldContainer>
						)}
						{selectedService === 'productSalesService' && (
							<FieldContainer
								label='Siuntos/prekės išpirkos kaina'
								description=''>
								<>
									<CustomInput
										name={`shipments.${index}.purchasePriceOfTheItem`}
										control={control}
										type='number'
										isError={!!purchasePriceOfTheItemErrorMessage}
										onChange={(e) => {
											handleValidation(
												'purchasePriceOfTheItem',
												e.target.value
											);
										}}
									/>
									{purchasePriceOfTheItemErrorMessage && (
										<div className='errors'>
											<div className='error'>
												<span>Neįvesta siuntos/prekės kaina. </span>{' '}
												{purchasePriceOfTheItemErrorMessage}
											</div>
										</div>
									)}
								</>
							</FieldContainer>
						)}
					</>
				) : (
					<>
						{!productTypesWithRequiredManagerCall.includes(
							selectedProductType?.value ?? ''
						) ? (
							<>
								{showSizeOptions(
									sizeOptions ?? [],
									selectedProductType?.value,
									productTypeOptions ?? []
								) && sizeOptions.length > 0 ? (
									<FieldContainer
										label={`Nr. ${shipmentNumber} siuntos dydis`}
										description=''>
										<ControlledStyledSelect
											name={`shipments.${index}.size`}
											isClearable
											control={control}
											options={sizeOptions}
											placeholder='Siuntos dydis'
											onChange={() => {
												setValue(`shipments.${index}.specification`, null);
											}}
										/>
									</FieldContainer>
								) : null}
								{!!selectedProductType?.value &&
								specificationOptions.length > 0 ? (
									<FieldContainer
										label={`Nr. ${shipmentNumber} siuntos specifikacija`}
										description=''>
										<ControlledStyledSelect
											name={`shipments.${index}.specification`}
											isClearable
											control={control}
											options={specificationOptions}
											placeholder='Siuntos specifikacija'
										/>
									</FieldContainer>
								) : null}
								{selectedCategory?.value ? (
									<FieldContainer
										label={`Nr. ${shipmentNumber} siuntos kiekis`}
										description={`${
											selectedCategory.value === 'palettes'
												? 'Susisiekite su vadibininku'
												: ''
										}`}>
										<CustomInput
											name={`shipments.${index}.amount`}
											type='number'
											control={control}
											placeholder='Siuntos kiekis'
											defaultValue={1}
											onBlur={(e) => {
												const value = e.target.value;
												if (!value) {
													setValue(`shipments.${index}.amount`, 1);
												}
											}}
										/>
									</FieldContainer>
								) : null}
							</>
						) : null}
					</>
				)}

				<PrimaryButton
					type='button'
					onClick={() => removeShipment(index)}
					style={{
						marginTop: '24px',
					}}>
					Pašalinti siuntą {shipmentNumber}
				</PrimaryButton>
			</div>
		</div>
	);
};

export default SingleShimpentForm;
