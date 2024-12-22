/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

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
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { OptionType } from '../../utils/types';
import useCalculatePrice from './useCalculatePrice';
import { getError } from '../../utils/validation/getError';
import { useCustomValidation } from '../../utils/validation/useCustomValidation';
import { useEffect, useState } from 'react';
import { convertValue } from '../../utils/convertCurrency';
import { t } from 'i18next';
import getTranslatedOptions from '../../utils/getTranslatedOptions';
import FieldContainer from '../layout/FieldContainer';
import ControlledStyledSelect from '../form/select/ControlledStyledSelect';
import CustomInput from '../form/input/CustomInput';
import PrimaryButton from '../buttons/PrimaryButton';
import CategorySelect from './CategorySelect';
import TypeSelect from './TypeSelect';
import { productTypesWithRequiredManagerCall } from '../../utils/shipmentsExlusions';
import SizeSelect from './SizeSelect';
import LengthInput from './LengthInput';
import WidthInput from './WidthInput';
import HeightInput from './HeightInput';
import ExtendInput from './ExtendInput';
import WeightInput from './WeightInput';

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
          return getTranslatedOptions(
            automotiveGoodsCategoryProductTypesOptions,
            t
          ) as OptionType[];
        case 'householdAppliances':
          return getTranslatedOptions(
            householdAppliancesCategoryProductTypesOptions,
            t
          ) as OptionType[];
        case 'bicyclesAndScooters':
          return getTranslatedOptions(
            bicyclesAndScootersCategoryProductTypesOptions,
            t
          ) as OptionType[];
        case 'motorcyclesAndAccessories':
          return getTranslatedOptions(
            motorcyclesAndAccessoriesCategoryProductTypesOptions,
            t
          ) as OptionType[];
        case 'goodsForChildren':
          return getTranslatedOptions(
            goodsForChildrenCategoryProductTypesOptions,
            t
          ) as OptionType[];
        case 'gardenEquipment':
          return getTranslatedOptions(
            gardenEquipmentCategoryProductTypesOptions,
            t
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
        case 'length':
          if (
            selectedService === 'parcelForceShipment' &&
            Number(value) > 110
          ) {
            return t('maxLoadMsg1');
          } else {
            if (Number(value) > 420) return t('maxLoadMsg2');
          }
          break;
        case 'width':
          if (selectedService === 'parcelForceShipment' && Number(value) > 70) {
            return t('maxLoadMsg3');
          } else {
            if (Number(value) > 200) return t('maxLoadMsg4');
          }
          break;
        case 'height':
          if (
            selectedService === 'parcelForceShipment' &&
            Number(value) > 110
          ) {
            return t('maxLoadMsg5');
          } else {
            if (Number(value) > 200) return t('maxLoadMsg6');
          }
          break;
        case 'orderedShipmentNumber':
          if (!value) return t('ecotripOrderMsg');
          break;

        case 'purchasePriceOfTheItem':
          if (!value) return t('itemPriceInputMsg');
          break;
        case 'extent':
          if (Number(value) > 300 && selectedService === 'parcelForceShipment')
            return t('packageSizeRuleMsg');
          break;
        case 'weight':
          if (Number(value) > 30 && selectedService === 'parcelForceShipment')
            return t('maxLoadMsg7');
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

  const sizeOptions = getTranslatedOptions(
    getSizeOptionsBySelectedProductType(
      selectedCategory?.value,
      selectedProductType?.value
    ),
    t
  );

  const specificationOptions =
    selectedCategory?.value !== 'shipments'
      ? getTranslatedOptions(
          getSpecificationOptionsBySelectedProduct(
            selectedCategory?.value,
            selectedProductType?.value
          ),
          t
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
    t,
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
    <div className="single-shipment-container">
      <div className="left-column">
        <CategorySelect
          control={control}
          index={index}
          shipmentNumber={shipmentNumber}
          options={categoriesOptions}
          selectedService={selectedService}
          validationRules={validationRules}
          setValue={setValue}
        />
        <p className="estimated-price">
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
      <div className="right-column">
        {productTypeOptions.length > 0 && (
          <TypeSelect
            control={control}
            index={index}
            shipmentNumber={shipmentNumber}
            options={productTypeOptions}
            validationRules={validationRules}
            formErrors={formErrors}
            setValue={setValue}
            selectedProductTypeValue={selectedProductType?.value}
          />
        )}
        {selectedCategory?.value === 'flatScreenTv' ? (
          <SizeSelect
            control={control}
            index={index}
            shipmentNumber={shipmentNumber}
            options={sizeOptions}
            validationRules={validationRules}
            formErrors={formErrors}
            setValue={setValue}
          />
        ) : null}
        {productTypesThatNeedsPriceCalculation.includes(
          selectedProductType?.value ?? ''
        ) ? (
          <FieldContainer
            label={t('shipmentMeasurementsMFieldLabel', {
              number: shipmentNumber,
            })}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div className="volume-fields-container">
                <LengthInput
                  control={control}
                  index={index}
                  setValue={setValue}
                  validationRules={validationRules}
                  formErrors={formErrors}
                  handleValidation={handleValidation}
                />
                <WidthInput
                  control={control}
                  index={index}
                  formErrors={formErrors}
                  setValue={setValue}
                  validationRules={validationRules}
                  handleValidation={handleValidation}
                />
                <HeightInput
                  control={control}
                  index={index}
                  formErrors={formErrors}
                  setValue={setValue}
                  validationRules={validationRules}
                  handleValidation={handleValidation}
                />
              </div>
              <div className="errors">
                {volumeErrorMessages.length !== 0 &&
                  volumeErrorMessages
                    .filter((mes) => mes !== undefined)
                    .map((err, index) => {
                      return (
                        <div className="error" key={index}>
                          <span>{t('dontServeMessage')} </span> {err}
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
              <WeightInput
                shipmentNumber={shipmentNumber}
                control={control}
                index={index}
                formErrors={formErrors}
                setValue={setValue}
                handleValidation={handleValidation}
                validationRules={validationRules}
                selectedService={selectedService}
                weight={Number(weight) || 0}
                errorMessages={errorMessages}
              />
            ) : null}
            <FieldContainer
              label={t('shipmentMeasurementsCmFieldLabel', {
                number: shipmentNumber,
              })}
              description={
                selectedService === 'parcelForceShipment'
                  ? t('shipmentMeasurementsCmFieldWarningMessage')
                  : ''
              }
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div className="volume-fields-container">
                  <LengthInput
                    control={control}
                    index={index}
                    setValue={setValue}
                    validationRules={validationRules}
                    formErrors={formErrors}
                    handleValidation={handleValidation}
                    isError={!!errorMessages.length}
                  />
                  <WidthInput
                    control={control}
                    index={index}
                    formErrors={formErrors}
                    setValue={setValue}
                    validationRules={validationRules}
                    handleValidation={handleValidation}
                    isError={!!errorMessages.width}
                  />
                  <HeightInput
                    control={control}
                    index={index}
                    formErrors={formErrors}
                    setValue={setValue}
                    validationRules={validationRules}
                    handleValidation={handleValidation}
                    isError={!!errorMessages.height}
                  />
                </div>
                <div className="errors">
                  {volumeErrorMessages.length !== 0 &&
                    volumeErrorMessages
                      .filter((mes) => mes !== undefined)
                      .map((err, index) => {
                        return (
                          <div className="error" key={index}>
                            <span>{t('dontServeMessage')}</span> {err}
                          </div>
                        );
                      })}
                </div>
              </div>
            </FieldContainer>
            {selectedService === 'parcelForceShipment' ? (
              <>
                <ExtendInput
                  shipmentNumber={shipmentNumber}
                  control={control}
                  index={index}
                  formErrors={formErrors}
                  setValue={setValue}
                  handleValidation={handleValidation}
                  validationRules={validationRules}
                  errorMessages={errorMessages}
                />
              </>
            ) : null}
            {selectedService === 'shipmentWithAddressService' && (
              <FieldContainer
                label={t('orderedShipmentNumberFieldLabel')}
                description=""
              >
                {/* TODO */}
                <>
                  <CustomInput
                    name={`shipments.${index}.orderedShipmentNumber`}
                    control={control}
                    placeholder={t('orderedShipmentNumber')}
                    onChange={(e) => {
                      handleValidation('orderedShipmentNumber', e.target.value);
                    }}
                    // @ts-ignore
                    rules={validationRules.shipments.orderedShipmentNumber}
                    errorMessage={getError(
                      `shipments.${index}.orderedShipmentNumber`,
                      formErrors
                    )}
                  />
                  {orderedShipmentNumberErrorMessage && (
                    <div className="errors">
                      <div className="error">
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
                description=""
              >
                <>
                  <CustomInput
                    name={`shipments.${index}.shipmentPrice`}
                    control={control}
                    placeholder={t('enterShipmentPrice')}
                    type="number"
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
                    <div className="errors">
                      <div className="error">{shipmentPriceErrorMessage}</div>
                    </div>
                  )}
                </>
              </FieldContainer>
            )}
            {selectedService === 'productSalesService' && (
              <FieldContainer
                label={t('purchasePriceOfTheItemFieldLabel')}
                description=""
              >
                <>
                  <CustomInput
                    name={`shipments.${index}.purchasePriceOfTheItem`}
                    control={control}
                    placeholder={t('purchasePriceOfTheItem')}
                    type="number"
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
                    <div className="errors">
                      <div className="error">
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
                  <SizeSelect
                    control={control}
                    index={index}
                    shipmentNumber={shipmentNumber}
                    options={sizeOptions}
                    validationRules={validationRules}
                    formErrors={formErrors}
                    setValue={setValue}
                  />
                ) : null}
                {!!selectedProductType?.value &&
                specificationOptions.length > 0 ? (
                  <FieldContainer
                    label={t('shipmentSpecificationFieldLabel', {
                      number: shipmentNumber,
                    })}
                    description=""
                  >
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
                    description=""
                  >
                    <>
                      <CustomInput
                        name={`shipments.${index}.shipmentPrice`}
                        control={control}
                        placeholder={t('enterShipmentPrice')}
                        type="number"
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
                        <div className="errors">
                          <div className="error">
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
                    }`}
                  >
                    <CustomInput
                      name={`shipments.${index}.amount`}
                      type="number"
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
        )}
        <div
          style={{
            width: '100%',
          }}
          className="buttons-container"
        >
          <PrimaryButton
            type="button"
            onClick={() => removeShipment(index)}
            style={{
              marginTop: '24px',
            }}
            disabled={disableRemoveButton}
          >
            {t('removeShipmentButton', { number: shipmentNumber })}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default SingleShimpentForm;
