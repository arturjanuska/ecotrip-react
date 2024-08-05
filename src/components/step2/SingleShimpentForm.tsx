/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

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
import {
	Control,
	FieldErrors,
	UseFormSetValue,
	useWatch,
} from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { OptionType } from '../../utils/types';
import PrimaryButton from '../PrimaryButton';
import useCalculatePrice from './useCalculatePrice';
import { getError } from '../../utils/validation/getError';
import { useCustomValidation } from '../../utils/validation/useCustomValidation';

type Props = {
	shipmentNumber: number;
	control: Control<FormType>;
	index: number;
	removeShipment: (index: number) => void;
	selectedService: string;
	setValue: UseFormSetValue<FormType>;
	currency: '€' | '£';
	formErrors: FieldErrors<FormType>;
	disableRemoveButton: boolean;
	errorMessages: Record<string, string>;
	setErrorMessages: React.Dispatch<
		React.SetStateAction<Record<string, string>>
	>;
};

const SingleShimpentForm = ({
	shipmentNumber,
	control,
	index,
	removeShipment,
	selectedService,
	setValue,
	currency,
	formErrors,
	disableRemoveButton,
	errorMessages,
	setErrorMessages,
}: Props) => {
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
					if (
						selectedService === 'parcelForceShipment' &&
						Number(value) > 110
					) {
						return 'Apgailestaujame, tačiau į mūsų automobilius telpa ne ilgesni kaip 110 cm kroviniai.';
					} else {
						if (Number(value) > 420)
							return 'Apgailestaujame, tačiau į mūsų automobilius telpa ne ilgesni kaip 420 cm kroviniai.';
					}
					break;
				case 'width':
					if (selectedService === 'parcelForceShipment' && Number(value) > 70) {
						return 'Apgailestaujame, tačiau į mūsų automobilius telpa ne platesni kaip 70 cm kroviniai.';
					} else {
						if (Number(value) > 200)
							return 'Apgailestaujame, tačiau į mūsų automobilius telpa ne platesni kaip 200 cm kroviniai.';
					}
					break;
				case 'height':
					if (
						selectedService === 'parcelForceShipment' &&
						Number(value) > 110
					) {
						return 'Apgailestaujame, tačiau į mūsų automobilius telpa ne aukstesni kaip 110 cm kroviniai.';
					} else {
						if (Number(value) > 200)
							return 'Apgailestaujame, tačiau į mūsų automobilius telpa ne aukstesni kaip 200 cm kroviniai.';
					}
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
				case 'volume':
					if (Number(value) > 300)
						return 'Siuntos apimtis skaičiuojama automatiškai pagal formulę: ilgis + plotis*2 + aukštis*2 < 300 cm - viršijus nepatarnaujame.';
					break;
				case 'weight':
					if (Number(value) > 30 && selectedService === 'parcelForceShipment')
						return 'Apgailestaujame, tačiau sunkesnius uz 30 kg krovinius neaptarnaujame.';
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

	const shipment = useWatch({
		control,
		name: `shipments.${index}`,
	});

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

	const showSizeOptions = (
		options: OptionType[],
		productTypeValue: string | undefined,
		productTypeOptions: OptionType[]
	) => {
		const sizeOptionsCopy = options ? options : [];
		if (sizeOptionsCopy.length > 0) {
			if (productTypeValue && productTypeOptions.length > 0) {
				return true;
			}
			if (!productTypeValue && productTypeOptions.length > 0) {
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

	const validationRules = useCustomValidation({
		service: selectedService,
		formShipment: shipment,
	});

	useCalculatePrice({
		category: selectedCategory as OptionType,
		productType: selectedProductType as OptionType,
		size: (selectedSize as OptionType) ?? null,
		amount,
		specification: selectedSpecification,
		setValue,
		name: `shipments.${index}.estimatedPrice`,
		weight: selectedSize as unknown as string,
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
					description='Įveskite siuntos kategoriją. Pasirinkus siuntą pagal katalogą, automatiškai paskaičiuosime siuntimo kainą.'
					className='left-column-item'>
					<ControlledStyledSelect
						name={`shipments.${index}.category`}
						control={control}
						rules={validationRules.shipments.category}
						options={categoriesOptions.map((option) => {
							if (
								// @ts-ignore
								option.value === 'shipments' &&
								selectedService === 'parcelForceShipment'
							) {
								return {
									label: 'Parcel Force siunta',
									value: 'shipments',
								};
							} else {
								return option;
							}
						})}
						isClearable
						placeholder='Siuntos kategorija'
						isDisabled={
							selectedService === 'parcelForceShipment' ||
							selectedService === 'shipmentWithAddressService' ||
							selectedService === 'productSalesService' ||
							selectedService === 'productPurchaseService'
						}
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
							rules={validationRules.shipments.productType}
							errorMessage={getError(
								`shipments.${index}.productType`,
								formErrors
							)}
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
								rules={validationRules.shipments.size}
								errorMessage={getError(`shipments.${index}.size`, formErrors)}
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
									rules={validationRules.shipments.length}
									errorMessage={getError(
										`shipments.${index}.length`,
										formErrors
									)}
								/>
								<CustomInput
									name={`shipments.${index}.width`}
									control={control}
									placeholder='Plotis'
									type='number'
									onChange={(e) => {
										handleValidation('width', e.target.value);
									}}
									rules={validationRules.shipments.width}
									errorMessage={getError(
										`shipments.${index}.width`,
										formErrors
									)}
								/>
								<CustomInput
									name={`shipments.${index}.height`}
									control={control}
									placeholder='Aukštis'
									type='number'
									onChange={(e) => {
										handleValidation('height', e.target.value);
									}}
									rules={validationRules.shipments.height}
									errorMessage={getError(
										`shipments.${index}.height`,
										formErrors
									)}
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
									selectedService !== 'parcelForceShipment' &&
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
									rules={validationRules.shipments.size}
									errorMessage={
										errorMessages.weight ||
										getError(`shipments.${index}.size`, formErrors)
									}
									onChange={(e) => {
										handleValidation('weight', e.target.value);
									}}
								/>
							</FieldContainer>
						) : null}

						<FieldContainer
							label={`Nr. ${shipmentNumber} siuntos išmatavimai ${
								selectedCategory?.value === 'removals'
									? 'metrais'
									: 'centimetrais'
							}`}
							description={
								selectedService === 'parcelForceShipment'
									? 'Maksimalus Parcel Force siuntos ilgis 110 cm, plotis 70 cm, aukštis 110 cm. Didesnių išmatavimų neaptarnaujame.'
									: ''
							}>
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
										rules={validationRules.shipments.length}
										errorMessage={getError(
											`shipments.${index}.length`,
											formErrors
										)}
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
										rules={validationRules.shipments.width}
										errorMessage={getError(
											`shipments.${index}.width`,
											formErrors
										)}
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
										rules={validationRules.shipments.height}
										errorMessage={getError(
											`shipments.${index}.height`,
											formErrors
										)}
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

						{selectedService === 'parcelForceShipment' ? (
							<FieldContainer
								label={`Nr. ${shipmentNumber} siuntos apimtis (max 300 cm)`}>
								<CustomInput
									name={`shipments.${index}.volume`}
									control={control}
									type='number'
									placeholder='Apimtis'
									onChange={(e) => {
										handleValidation('volume', e.target.value);
									}}
									rules={validationRules.shipments.volume}
									errorMessage={
										errorMessages.volume ||
										getError(`shipments.${index}.volume`, formErrors)
									}
								/>
							</FieldContainer>
						) : null}

						{selectedService === 'shipmentWithAddressService' && (
							<FieldContainer
								label='Užsakytos siuntos numeris (Amazon UK, eBay ir kt.) *'
								description=''>
								<>
									<CustomInput
										name={`shipments.${index}.orderedShipmentNumber`}
										control={control}
										placeholder='Siuntos numeris'
										onChange={(e) => {
											handleValidation('orderedShipmentNumber', e.target.value);
										}}
										rules={validationRules.shipments.orderedShipmentNumber}
										errorMessage={getError(
											`shipments.${index}.orderedShipmentNumber`,
											formErrors
										)}
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
										placeholder='Įveskite prekės sumą'
										type='number'
										onChange={(e) => {
											handleValidation('shipmentPrice', e.target.value);
										}}
										rules={validationRules.shipments.shipmentPrice}
										errorMessage={getError(
											`shipments.${index}.shipmentPrice`,
											formErrors
										)}
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
										placeholder='Įveskite siuntos/prekės kainą'
										type='number'
										onChange={(e) => {
											handleValidation(
												'purchasePriceOfTheItem',
												e.target.value
											);
										}}
										rules={validationRules.shipments.purchasePriceOfTheItem}
										errorMessage={getError(
											`shipments.${index}.purchasePriceOfTheItem`,
											formErrors
										)}
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
											rules={validationRules.shipments.size}
											errorMessage={getError(
												`shipments.${index}.size`,
												formErrors
											)}
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
											rules={validationRules.shipments.specification}
											errorMessage={getError(
												`shipments.${index}.specification`,
												formErrors
											)}
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
												// @ts-ignore
												const value = e.target?.value as unknown as string;
												if (!value) {
													setValue(`shipments.${index}.amount`, 1);
												}
											}}
											rules={validationRules.shipments.amount}
											errorMessage={getError(
												`shipments.${index}.amount`,
												formErrors
											)}
										/>
									</FieldContainer>
								) : null}
							</>
						) : null}
					</>
				)}
				<div
					style={{
						width: '100%',
					}}
					className='buttons-container'>
					<PrimaryButton
						type='button'
						onClick={() => removeShipment(index)}
						style={{
							marginTop: '24px',
						}}
						disabled={disableRemoveButton}>
						Pašalinti siuntą {shipmentNumber}
					</PrimaryButton>
				</div>
			</div>
		</div>
	);
};

export default SingleShimpentForm;
