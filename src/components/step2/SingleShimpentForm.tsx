/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import FieldContainer from "../FieldContainer";
import CustomInput from "../CustomInput";
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
} from "../../utils/products";
import ControlledStyledSelect from "../ControlledStyledSelect";
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { FormType } from "../../utils/formTypes";
import { OptionType } from "../../utils/types";
import PrimaryButton from "../PrimaryButton";
import useCalculatePrice from "./useCalculatePrice";
import { getError } from "../../utils/validation/getError";
import { useCustomValidation } from "../../utils/validation/useCustomValidation";
import { useEffect, useState } from "react";
import { convertValue } from "../../utils/convertCurrency";
import { t } from "i18next";
import getTranslatedOptions from "../../utils/getTranslatedOptions";

type Props = {
  shipmentNumber: number;
  control: Control<FormType>;
  index: number;
  removeShipment: (index: number) => void;
  selectedService: string;
  setValue: UseFormSetValue<FormType>;
  currency: "€" | "£";
  formErrors: FieldErrors<FormType>;
  disableRemoveButton: boolean;
  errorMessages: Record<string, string>;
  setErrorMessages: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  rate: number;
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
  rate,
}: Props) => {
  const categoriesWithProductType = [
    "automotiveGoods",
    "householdAppliances",
    "bicyclesAndScooters",
    "motorcyclesAndAccessories",
    "goodsForChildren",
    "gardenEquipment",
  ];

  const [shipmentPriceErrorMessage, setShipmentPriceError] = useState("");

  const productTypesThatNeedsPriceCalculation = ["fridge", "freezer"];

  const getOptionsBySelectedCategory = (
    selectedCategory: OptionType | null,
  ): OptionType[] => {
    if (
      !!selectedCategory &&
      categoriesWithProductType.includes(selectedCategory.value)
    ) {
      switch (selectedCategory.value) {
        case "automotiveGoods":
          return getTranslatedOptions(
            automotiveGoodsCategoryProductTypesOptions,
            t,
          ) as OptionType[];
        case "householdAppliances":
          return getTranslatedOptions(
            householdAppliancesCategoryProductTypesOptions,
            t,
          ) as OptionType[];
        case "bicyclesAndScooters":
          return getTranslatedOptions(
            bicyclesAndScootersCategoryProductTypesOptions,
            t,
          ) as OptionType[];
        case "motorcyclesAndAccessories":
          return getTranslatedOptions(
            motorcyclesAndAccessoriesCategoryProductTypesOptions,
            t,
          ) as OptionType[];
        case "goodsForChildren":
          return getTranslatedOptions(
            goodsForChildrenCategoryProductTypesOptions,
            t,
          ) as OptionType[];
        case "gardenEquipment":
          return getTranslatedOptions(
            gardenEquipmentCategoryProductTypesOptions,
            t,
          ) as OptionType[];
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
        case "length":
          if (
            selectedService === "parcelForceShipment" &&
            Number(value) > 110
          ) {
            return t("maxLoadMsg1");
          } else {
						if (Number(value) > 420)
							return t("maxLoadMsg2");
          }
          break;
        case "width":
          if (selectedService === "parcelForceShipment" && Number(value) > 70) {
            return t("maxLoadMsg3");
          } else {
            if (Number(value) > 200)
              return t("maxLoadMsg4");
          }
          break;
        case "height":
          if (
            selectedService === "parcelForceShipment" &&
            Number(value) > 110
          ) {
            return t("maxLoadMsg5");
          } else {
            if (Number(value) > 200)
              return t("maxLoadMsg6");
          }
          break;
        case "orderedShipmentNumber":
          if (!value)
            return t("ecotripOrderMsg");
          break;

        case "purchasePriceOfTheItem":
          if (!value)
            return t("itemPriceInputMsg");
          break;
        case "extent":
          if (Number(value) > 300 && selectedService === "parcelForceShipment")
            return t("packageSizeRuleMsg");
          break;
        case "weight":
          if (Number(value) > 30 && selectedService === "parcelForceShipment")
            return t("maxLoadMsg7");
          break;
        default:
          return "";
      }
      return "";
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
    Number(selectedLength || "0") +
    Number(selectedWidth || "0") * 2 +
    Number(selectedHeight || "0") * 2;

  useEffect(() => {
    handleValidation("extent", extent.toString());
  }, [extent]);

  const showSizeOptions = (
    options: OptionType[],
    productTypeValue: string | undefined,
    productTypeOptions: OptionType[],
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

  const sizeOptions = getTranslatedOptions(
    getSizeOptionsBySelectedProductType(
      selectedCategory?.value,
      selectedProductType?.value,
    ),
    t,
  );

  const specificationOptions =
    selectedCategory?.value !== "shipments"
      ? getTranslatedOptions(
          getSpecificationOptionsBySelectedProduct(
            selectedCategory?.value,
            selectedProductType?.value,
          ),
          t,
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
		t
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

  const productTypesWithRequiredManagerCall = ["interior", "carQuarter"];

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
					label={t('shipmentLeftColumnLabel', { count: shipmentNumber })}
					description={t('shipmentLeftColumnDescription')}
					className='left-column-item'>
					<ControlledStyledSelect
						name={`shipments.${index}.category`}
						control={control}
						// @ts-ignore
						rules={validationRules.shipments.category}
						options={categoriesOptions.map((option) => {
							if (
								// @ts-ignore
								option.value === 'shipments' &&
								selectedService === 'parcelForceShipment'
							) {
								return {
									label: t('shipments'),
									value: 'shipments',
								};
							} else {
								return {
									label: t(option.label),
									value: option.value,
								};
							}
						})}
						isClearable
						placeholder={t('shipmentCategoryPlaceholder')}
						isDisabled={
							selectedService === 'parcelForceShipment' ||
							selectedService === 'shipmentWithAddressService' ||
							selectedService === 'productSalesService'
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
					{t('estimatedShipmentPriceLabel', { count: shipmentNumber })}{' '}
					<span>
						{currency}
						{isNaN(Number(estimatedPrice)) || !estimatedPrice
							? '0.00'
							: estimatedPrice}{' '}
						- {convertValue(currency, Number(estimatedPrice ?? 0), rate)}
					</span>
				</p>
			</div>
			<div className='right-column'>
				{productTypeOptions.length > 0 && (
					<FieldContainer
						label={t('productTypeLabel', { count: shipmentNumber })}
						description={`${
							productTypesWithRequiredManagerCall.includes(
								selectedProductType?.value ?? ''
							)
								? t('wrongDirectionMessage1')
								: ''
						}`}>
						<ControlledStyledSelect
							name={`shipments.${index}.productType`}
							control={control}
							isClearable
							// @ts-ignore
							rules={validationRules.shipments.productType}
							errorMessage={getError(
								`shipments.${index}.productType`,
								formErrors
							)}
							options={productTypeOptions}
							placeholder={t('productTypeSelectPlaceholder')}
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
							label={t('shipmentSizeFieldLabel', { number: shipmentNumber })}
							description=''>
							<ControlledStyledSelect
								name={`shipments.${index}.size`}
								isClearable
								control={control}
								options={sizeOptions}
								placeholder={t('shipmentSize')}
								onChange={() => {
									setValue(`shipments.${index}.specification`, null);
								}}
								// @ts-ignore
								rules={validationRules.shipments.size}
								errorMessage={getError(`shipments.${index}.size`, formErrors)}
							/>
						</FieldContainer>
					</>
				) : null}
				{
					productTypesThatNeedsPriceCalculation.includes(
						selectedProductType?.value ?? ''
					) ? (
						<FieldContainer
							label={t('shipmentMeasurementsMFieldLabel', {
								number: shipmentNumber,
							})}
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
										placeholder={t('length')}
										type='number'
										onFocus={(e) => {
											const value = e.target.value;
											if (Number(value) === 0) {
												setValue(`shipments.${index}.length`, '');
											}
										}}
										onChange={(e) => {
											handleValidation('length', e.target.value);
										}}
										// @ts-ignore
										rules={validationRules.shipments.length}
										errorMessage={getError(
											`shipments.${index}.length`,
											formErrors
										)}
									/>
									<CustomInput
										name={`shipments.${index}.width`}
										control={control}
										placeholder={t('width')}
										type='number'
										onFocus={(e) => {
											const value = e.target.value;
											if (Number(value) === 0) {
												setValue(`shipments.${index}.width`, '');
											}
										}}
										onChange={(e) => {
											handleValidation('width', e.target.value);
										}}
										// @ts-ignore
										rules={validationRules.shipments.width}
										errorMessage={getError(
											`shipments.${index}.width`,
											formErrors
										)}
									/>
									<CustomInput
										name={`shipments.${index}.height`}
										control={control}
										placeholder={t('height')}
										type='number'
										onFocus={(e) => {
											const value = e.target.value;
											if (Number(value) === 0) {
												setValue(`shipments.${index}.height`, '');
											}
										}}
										onChange={(e) => {
											handleValidation('height', e.target.value);
										}}
										// @ts-ignore
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
														<span>{t('dontServeMessage')} </span> {err}
													</div>
												);
											})}
								</div>
							</div>
						</FieldContainer>
					) : null
				}
				{
					selectedCategory?.value === 'shipments' ||
					selectedCategory?.value === 'removals' ? (
						<>
							{selectedCategory?.value === 'shipments' ? (
								<FieldContainer
									label={t('shipmentWeightFieldLabel', {
										number: shipmentNumber,
									})}
									description={
										selectedService !== 'parcelForceShipment' &&
										weight &&
										!isNaN(Number(weight)) &&
										Number(weight) > 35
											? t('parcelForceShipmentWeightWarningMessage')
											: t('shipmentApproximateWeightMessage')
									}>
									<CustomInput
										name={`shipments.${index}.weight`}
										control={control}
										placeholder={t('shipmentWeight')}
										type='number'
										onFocus={(e) => {
											const value = e.target.value;
											if (Number(value) === 0) {
												setValue(`shipments.${index}.weight`, '');
											}
										}}
										// @ts-ignore
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
							<FieldContainer
								label={t('shipmentMeasurementsCmFieldLabel', {
									number: shipmentNumber,
								})}
								description={
									selectedService === 'parcelForceShipment'
										? t('shipmentMeasurementsCmFieldWarningMessage')
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
											placeholder={t('length')}
											type='number'
											onFocus={(e) => {
												const value = e.target.value;
												if (Number(value) === 0) {
													setValue(`shipments.${index}.length`, '');
												}
											}}
											min={0}
											onChange={(e) => {
												handleValidation('length', e.target.value);
											}}
											// @ts-ignore
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
											placeholder={t('width')}
											type='number'
											onFocus={(e) => {
												const value = e.target.value;
												if (Number(value) === 0) {
													setValue(`shipments.${index}.width`, '');
												}
											}}
											min={0}
											onChange={(e) => {
												handleValidation('width', e.target.value);
											}}
											// @ts-ignore
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
											placeholder={t('height')}
											type='number'
											onFocus={(e) => {
												const value = e.target.value;
												if (Number(value) === 0) {
													setValue(`shipments.${index}.height`, '');
												}
											}}
											min={0}
											onChange={(e) => {
												handleValidation('height', e.target.value);
											}}
											// @ts-ignore
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
															<span>{t('dontServeMessage')}</span> {err}
														</div>
													);
												})}
									</div>
								</div>
							</FieldContainer>
							{selectedService === 'parcelForceShipment' ? (
								<FieldContainer
									label={t('extentFieldContainerLabel', {
										number: shipmentNumber,
									})}>
									<CustomInput
										name={`shipments.${index}.extent`}
										control={control}
										type='number'
										onFocus={(e) => {
											const value = e.target.value;
											if (Number(value) === 0) {
												setValue(`shipments.${index}.extent`, '');
											}
										}}
										placeholder={t('extent')}
										onChange={(e) => {
											handleValidation('extent', e.target.value);
										}}
										// @ts-ignore
										rules={validationRules.shipments.extent}
										errorMessage={
											errorMessages.extent ||
											getError(`shipments.${index}.extent`, formErrors)
										}
									/>
								</FieldContainer>
							) : null}
							{selectedService === 'shipmentWithAddressService' && (
								<FieldContainer
									label={t('orderedShipmentNumberFieldLabel')}
									description=''>
									<>
										<CustomInput
											name={`shipments.${index}.orderedShipmentNumber`}
											control={control}
											placeholder={t('orderedShipmentNumber')}
											onChange={(e) => {
												handleValidation(
													'orderedShipmentNumber',
													e.target.value
												);
											}}
											// @ts-ignore
											rules={validationRules.shipments.orderedShipmentNumber}
											errorMessage={getError(
												`shipments.${index}.orderedShipmentNumber`,
												formErrors
											)}
										/>
										{orderedShipmentNumberErrorMessage && (
											<div className='errors'>
												<div className='error'>
													<span>{t('emptyShipmentNumberField')} </span>{' '}
													{orderedShipmentNumberErrorMessage}
												</div>
											</div>
										)}
									</>
								</FieldContainer>
							)}
							{selectedService === 'productPurchaseService' && (
								<FieldContainer
									label={t('shipmentPriceFieldLabel')}
									description=''>
									<>
										<CustomInput
											name={`shipments.${index}.shipmentPrice`}
											control={control}
											placeholder={t('enterShipmentPrice')}
											type='number'
											onFocus={(e) => {
												const value = e.target.value;
												if (Number(value) === 0) {
													setValue(`shipments.${index}.shipmentPrice`, '');
												}
											}}
											onChange={(e) => {
												if (Number(e.target.value) >= 250) {
													setShipmentPriceError(
														t('shipmentPriceFieldErrorMessage')
													);
												} else {
													setShipmentPriceError('');
												}
											}}
											// @ts-ignore
											rules={validationRules.shipments.shipmentPrice}
											errorMessage={getError(
												`shipments.${index}.shipmentPrice`,
												formErrors
											)}
										/>
										{shipmentPriceErrorMessage && (
											<div className='errors'>
												<div className='error'>{shipmentPriceErrorMessage}</div>
											</div>
										)}
									</>
								</FieldContainer>
							)}
							{selectedService === 'productSalesService' && (
								<FieldContainer
									label={t('purchasePriceOfTheItemFieldLabel')}
									description=''>
									<>
										<CustomInput
											name={`shipments.${index}.purchasePriceOfTheItem`}
											control={control}
											placeholder={t('purchasePriceOfTheItem')}
											type='number'
											onFocus={(e) => {
												const value = e.target.value;
												if (Number(value) === 0) {
													setValue(
														`shipments.${index}.purchasePriceOfTheItem`,
														''
													);
												}
											}}
											onChange={(e) => {
												handleValidation(
													'purchasePriceOfTheItem',
													e.target.value
												);
											}}
											// @ts-ignore
											rules={validationRules.shipments.purchasePriceOfTheItem}
											errorMessage={getError(
												`shipments.${index}.purchasePriceOfTheItem`,
												formErrors
											)}
										/>
										{purchasePriceOfTheItemErrorMessage && (
											<div className='errors'>
												<div className='error'>
													<span>{t('emptyPurchasePriceOfTheItemField')}</span>{' '}
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
											label={t('shipmentSizeFieldLabel', {
												number: shipmentNumber,
											})}
											description=''>
											<ControlledStyledSelect
												name={`shipments.${index}.size`}
												isClearable
												control={control}
												options={sizeOptions}
												placeholder={t('shipmentSize')}
												onChange={() => {
													setValue(`shipments.${index}.specification`, null);
												}}
												// @ts-ignore
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
											label={t('shipmentSpecificationFieldLabel', {
												number: shipmentNumber,
											})}
											description=''>
											<ControlledStyledSelect
												name={`shipments.${index}.specification`}
												isClearable
												control={control}
												options={specificationOptions}
												placeholder={t('shipmentSpecification')}
												// @ts-ignore
												rules={validationRules.shipments.specification}
												errorMessage={getError(
													`shipments.${index}.specification`,
													formErrors
												)}
											/>
										</FieldContainer>
									) : null}
									{selectedService === 'productPurchaseService' && (
										<FieldContainer
											label={t('shipmentPriceFieldLabel')}
											description=''>
											<>
												<CustomInput
													name={`shipments.${index}.shipmentPrice`}
													control={control}
													placeholder={t('enterShipmentPrice')}
													type='number'
													onFocus={(e) => {
														const value = e.target.value;
														if (Number(value) === 0) {
															setValue(`shipments.${index}.shipmentPrice`, '');
														}
													}}
													onChange={(e) => {
														if (Number(e.target.value) >= 250) {
															setShipmentPriceError(
																t('shipmentPriceFieldErrorMessage')
															);
														} else {
															setShipmentPriceError('');
														}
													}}
													// @ts-ignore
													rules={validationRules.shipments.shipmentPrice}
													errorMessage={getError(
														`shipments.${index}.shipmentPrice`,
														formErrors
													)}
												/>
												{shipmentPriceErrorMessage && (
													<div className='errors'>
														<div className='error'>
															{shipmentPriceErrorMessage}
														</div>
													</div>
												)}
											</>
										</FieldContainer>
									)}
									{selectedCategory?.value ? (
										<FieldContainer
											label={t('shipmentPriceFieldContainerLabel', {
												number: shipmentNumber,
											})}
											description={`${
												selectedCategory.value === 'palettes'
													? t('wrongDirectionMessage1')
													: ''
											}`}>
											<CustomInput
												name={`shipments.${index}.amount`}
												type='number'
												control={control}
												placeholder={t('shipmentAmount')}
												defaultValue={1}
												onBlur={(e) => {
													// @ts-ignore
													const value = // @ts-ignore
														e.target?.value as unknown as string;
													if (!value) {
														setValue(`shipments.${index}.amount`, 1);
													}
												}}
												// @ts-ignore
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
					)
				}
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
						{t('removeShipmentButton', { number: shipmentNumber })}
					</PrimaryButton>
				</div>
			</div>
		</div>
	);
};

export default SingleShimpentForm;
