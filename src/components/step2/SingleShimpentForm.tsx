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
import { useEffect, useState } from 'react';
import { servicesDefinition } from '../../utils/getServices';
import TypeSelect from './fields/TypeSelect';
import VolumeFields from './fields/VolumeFields';

export const productTypesWithRequiredManagerCall = ['interior', 'carQuarter'];

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

	const [shipmentPriceErrorMessage, setShipmentPriceError] = useState('');

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
						selectedService === servicesDefinition[2] &&
						Number(value) > 110
					) {
						return 'Apgailestaujame, tačiau į mūsų automobilius telpa ne ilgesni kaip 110 cm kroviniai.';
					} else {
						if (Number(value) > 420)
							return 'Apgailestaujame, tačiau į mūsų automobilius telpa ne ilgesni kaip 420 cm kroviniai.';
					}
					break;
				case 'width':
					if (selectedService === servicesDefinition[2] && Number(value) > 70) {
						return 'Apgailestaujame, tačiau į mūsų automobilius telpa ne platesni kaip 70 cm kroviniai.';
					} else {
						if (Number(value) > 200)
							return 'Apgailestaujame, tačiau į mūsų automobilius telpa ne platesni kaip 200 cm kroviniai.';
					}
					break;
				case 'height':
					if (
						selectedService === servicesDefinition[2] &&
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

				case 'purchasePriceOfTheItem':
					if (!value)
						return 'Suveskite parduodamos prekės kainą, kurią EcoTrip kurjeriui perduos siuntos gavėjas.';
					break;
				case 'extent':
					if (Number(value) > 300 && selectedService === servicesDefinition[2])
						return 'Siuntos apimtis skaičiuojama automatiškai pagal formulę: ilgis + plotis*2 + aukštis*2 < 300 cm - viršijus nepatarnaujame.';
					break;
				case 'weight':
					if (Number(value) > 30 && selectedService === servicesDefinition[2])
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

	const extent =
		Number(selectedLength || '0') +
		Number(selectedWidth || '0') * 2 +
		Number(selectedHeight || '0') * 2;

	useEffect(() => {
		handleValidation('extent', extent.toString());
	}, [extent]);

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

	const weight = useWatch({
		control,
		name: `shipments.${index}.weight`,
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
		volumePropName: `shipments.${index}.volume`,
		weightPropName: `shipments.${index}.weight`,
		extentPropName: `shipments.${index}.extent`,
		weight,
		length: selectedLength,
		width: selectedWidth,
		height: selectedHeight,
		service: selectedService,
	});

	const estimatedPrice = useWatch({
		control,
		name: `shipments.${index}.estimatedPrice`,
	});

	const volumeErrorMessages = [
		errorMessages.length,
		errorMessages.width,
		errorMessages.height,
	];
	const orderedShipmentNumberErrorMessage = errorMessages.orderedShipmentNumber;

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
								selectedService === servicesDefinition[2]
							) {
								return {
									label: 'Siunta',
									value: 'shipments',
								};
							} else {
								return option;
							}
						})}
						isClearable
						placeholder='Siuntos kategorija'
						isDisabled={
							selectedService === servicesDefinition[2] ||
							selectedService === servicesDefinition[3] ||
							selectedService === servicesDefinition[5]
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
						{isNaN(Number(estimatedPrice)) || !estimatedPrice
							? '0.00'
							: estimatedPrice}
					</span>{' '}
				</p>
			</div>
			<div className='right-column'>
				{productTypeOptions.length > 0 && (
					<>
						<TypeSelect
							shipmentNumber={shipmentNumber}
							selectedProductTypeValue={selectedProductType?.value}
							index={index}
							control={control}
							validationRules={validationRules.shipments.productType}
							errorMessage={getError(
								`shipments.${index}.productType`,
								formErrors
							)}
							options={productTypeOptions}
							onChange={() => {
								setValue(`shipments.${index}.size`, null);
								setValue(`shipments.${index}.specification`, null);
								setValue(`shipments.${index}.estimatedPrice`, '0.00');
							}}
						/>
					</>
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
					<VolumeFields
						shipmentNumber={shipmentNumber}
						index={index}
						control={control}
						validationRules={validationRules}
						errorMessages={{
							length: getError(`shipments.${index}.length`, formErrors),
							width: getError(`shipments.${index}.width`, formErrors),
							height: getError(`shipments.${index}.height`, formErrors),
						}}
						onFocus={{
							length: (e: React.FocusEvent<HTMLInputElement, Element>) => {
								const value = e.target.value;
								if (Number(value) === 0) {
									setValue(`shipments.${index}.length`, '');
								}
							},
							width: (e: React.FocusEvent<HTMLInputElement, Element>) => {
								const value = e.target.value;
								if (Number(value) === 0) {
									setValue(`shipments.${index}.width`, '');
								}
							},
							height: (e: React.FocusEvent<HTMLInputElement, Element>) => {
								const value = e.target.value;
								if (Number(value) === 0) {
									setValue(`shipments.${index}.height`, '');
								}
							},
						}}
						onChange={{
							length: (e: any) => {
								handleValidation('length', e.target.value);
							},
							width: (e: any) => {
								handleValidation('width', e.target.value);
							},
							height: (e: any) => {
								handleValidation('height', e.target.value);
							},
						}}
						volumeErrorMessages={volumeErrorMessages}
					/>
				) : null}
				{selectedCategory?.value === 'shipments' ||
				selectedCategory?.value === 'removals' ? (
					<>
						{selectedCategory?.value === 'shipments' ? (
							<FieldContainer
								label={`Nr. ${shipmentNumber} siuntos svoris (kg)`}
								description={
									selectedService !== servicesDefinition[2] &&
									weight &&
									!isNaN(Number(weight)) &&
									Number(weight) > 35
										? 'Jūsų siuta/-os sunkesnė/-ės nei 35 kg. Kadangi mūsų kurjeriai dirba po vieną, jam gali prireikti pagalbos pakraunant ar iškraunant sunkias siuntas. Prašome užtikrinti, kad atvykus kurjeriui būtų kas padeda ją pakrauti ar iškrauti. Įveskite siuntos svorį apytiksliai. Kai atiduosite siuntą, ji bus pasverta dar kartą patikslinimui. '
										: 'Įveskite siuntos svorį apytiksliai. Kai atiduosite siuntą, ji bus pasverta dar kartą patikslinimui. '
								}>
								<CustomInput
									name={`shipments.${index}.weight`}
									control={control}
									placeholder='Siuntos svoris'
									defaultValue={0}
									type='number'
									onFocus={(e) => {
										const value = e.target.value;
										if (Number(value) === 0) {
											setValue(`shipments.${index}.weight`, '');
										}
									}}
									rules={validationRules.shipments.weight}
									errorMessage={
										errorMessages.weight ||
										getError(`shipments.${index}.weight`, formErrors)
									}
									onChange={(e) => {
										handleValidation('weight', e.target.value);
									}}
								/>
							</FieldContainer>
						) : null}

						<VolumeFields
							shipmentNumber={shipmentNumber}
							description={
								selectedService === servicesDefinition[2]
									? 'Maksimalus "Parcel Force" siuntos ilgis 110 cm, plotis 70 cm, aukštis 110 cm. Didesnių išmatavimų neaptarnaujame.'
									: ''
							}
							index={index}
							control={control}
							validationRules={validationRules}
							errorMessages={{
								length: getError(`shipments.${index}.length`, formErrors),
								width: getError(`shipments.${index}.width`, formErrors),
								height: getError(`shipments.${index}.height`, formErrors),
								extent:
									errorMessages.extent ||
									getError(`shipments.${index}.extent`, formErrors),
								shipmentPrice: getError(
									`shipments.${index}.shipmentPrice`,
									formErrors
								),
								orderedShipmentNumber: getError(
									`shipments.${index}.orderedShipmentNumber`,
									formErrors
								),
								purchasePriceOfTheItem: getError(
									`shipments.${index}.purchasePriceOfTheItem`,
									formErrors
								),
								orderedShipmentNumberErrorMessage,
								shipmentPriceErrorMessage,
								purchasePriceOfTheItemErrorMessage,
							}}
							onFocus={{
								length: (e: React.FocusEvent<HTMLInputElement, Element>) => {
									const value = e.target.value;
									if (Number(value) === 0) {
										setValue(`shipments.${index}.length`, '');
									}
								},
								width: (e: React.FocusEvent<HTMLInputElement, Element>) => {
									const value = e.target.value;
									if (Number(value) === 0) {
										setValue(`shipments.${index}.width`, '');
									}
								},
								height: (e: React.FocusEvent<HTMLInputElement, Element>) => {
									const value = e.target.value;
									if (Number(value) === 0) {
										setValue(`shipments.${index}.height`, '');
									}
								},
								extent: (e: React.FocusEvent<HTMLInputElement, Element>) => {
									const value = e.target.value;
									if (Number(value) === 0) {
										setValue(`shipments.${index}.extent`, '');
									}
								},
								shipmentPrice: (
									e: React.FocusEvent<HTMLInputElement, Element>
								) => {
									const value = e.target.value;
									if (Number(value) === 0) {
										setValue(`shipments.${index}.shipmentPrice`, '');
									}
								},
								purchasePriceOfTheItem: (
									e: React.FocusEvent<HTMLInputElement, Element>
								) => {
									const value = e.target.value;
									if (Number(value) === 0) {
										setValue(`shipments.${index}.purchasePriceOfTheItem`, '');
									}
								},
							}}
							onChange={{
								length: (e: any) => {
									handleValidation('length', e.target.value);
								},
								width: (e: any) => {
									handleValidation('width', e.target.value);
								},
								height: (e: any) => {
									handleValidation('height', e.target.value);
								},
								extent: (e: any) => {
									handleValidation('extent', e.target.value);
								},
								orderedShipmentNumber: (e: any) => {
									handleValidation('orderedShipmentNumber', e.target.value);
								},
								purchasePriceOfTheItem: (e: any) => {
									handleValidation('purchasePriceOfTheItem', e.target.value);
								},
								shipmentPrice: (e) => {
									if (Number(e.target.value) >= 250) {
										setShipmentPriceError(
											'Prekės kainai viršijus £250 GBP, reikalingas pinigų perdavimas EcoTrip kurjeriui iki prekės nupirkimo. Atvykstame nurodytu pinigus perduodačio asmens adresu.'
										);
									} else {
										setShipmentPriceError('');
									}
								},
							}}
							volumeErrorMessages={volumeErrorMessages}
							showExtentField={selectedService === servicesDefinition[2]}
							showOrderedShipmentNumber={
								selectedService === servicesDefinition[3]
							}
							showShipmentPriceField={selectedService === servicesDefinition[4]}
							showPurchasePriceOfItemField={
								selectedService === servicesDefinition[5]
							}
						/>
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
