import {
  categoryOptions,
  findCategory,
  findSubCategory,
  priceDirection,
  pricingFor,
  sizeOptions as getSizeOptions,
  specificationOptions as getSpecificationOptions,
  subCategoryOptions,
} from '../../utils/priceCatalog';
import usePriceCatalog from '../../hooks/usePriceCatalog';
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { OptionType } from '../../utils/types';
import useCalculatePrice from './useCalculatePrice';
import { useCustomValidation } from '../../utils/validation/useCustomValidation';
import { useEffect, useState } from 'react';
import { convertValue } from '../../utils/convertCurrency';
import getTranslatedOptions from '../../utils/getTranslatedOptions';
import FieldContainer from '../layout/FieldContainer';
import PrimaryButton from '../buttons/PrimaryButton';
import CategorySelect from './CategorySelect';
import TypeSelect from './TypeSelect';
import SizeSelect from './SizeSelect';
import LengthInput from './LengthInput';
import WidthInput from './WidthInput';
import HeightInput from './HeightInput';
import ExtendInput from './ExtendInput';
import WeightInput from './WeightInput';
import OrderedShipmentNumberInput from './OrderedShipmentNumberInput';
import ShipmentPriceInput from './ShipmentPriceInput';
import PurchasePriceOfTheItemInput from './PurchasePriceOfTheItemInput';
import SpecificationSelect from './SpecificationSelect';
import AmountInput from './AmountInput';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const catalog = usePriceCatalog();

  const [shipmentPriceErrorMessage, setShipmentPriceError] = useState('');

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

  const selectedProductType = useWatch({
    control,
    name: `shipments.${index}.productType`,
  });

  const direction = useWatch({ control, name: 'direction' });

  const category = findCategory(catalog, selectedCategory?.value);
  const subCategory = findSubCategory(category, selectedProductType?.value);
  const pricing = pricingFor(category, subCategory);
  const requiresManagerCall = subCategory?.pricing.type === 'callManager';
  const needsMeasurements = subCategory?.pricing.type === 'measured';

  const productTypeOptions = getTranslatedOptions(subCategoryOptions(category));

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

  const sizeOptions = getTranslatedOptions(getSizeOptions(pricing));

  const selectedSize = useWatch({
    control,
    name: `shipments.${index}.size`,
  });

  const specificationOptions = getTranslatedOptions(
    getSpecificationOptions(pricing, (selectedSize as OptionType)?.value)
  );

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
    pricing,
    direction: priceDirection(selectedService, direction),
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
          options={categoryOptions(catalog)}
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
            requiresManagerCall={requiresManagerCall}
          />
        )}
        {needsMeasurements ? (
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
                <>
                  <OrderedShipmentNumberInput
                    control={control}
                    index={index}
                    formErrors={formErrors}
                    handleValidation={handleValidation}
                    validationRules={validationRules}
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
              <FieldContainer label={t('shipmentPriceFieldLabel')}>
                <>
                  <ShipmentPriceInput
                    control={control}
                    index={index}
                    formErrors={formErrors}
                    validationRules={validationRules}
                    setShipmentPriceError={setShipmentPriceError}
                    setValue={setValue}
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
              <FieldContainer label={t('purchasePriceOfTheItemFieldLabel')}>
                <>
                  <PurchasePriceOfTheItemInput
                    control={control}
                    index={index}
                    formErrors={formErrors}
                    handleValidation={handleValidation}
                    validationRules={validationRules}
                    setValue={setValue}
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
            {!requiresManagerCall ? (
              <>
                {sizeOptions.length > 0 ? (
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
                {specificationOptions.length > 0 ? (
                  <SpecificationSelect
                    control={control}
                    index={index}
                    shipmentNumber={shipmentNumber}
                    options={specificationOptions}
                    validationRules={validationRules}
                    formErrors={formErrors}
                  />
                ) : null}
                {selectedService === 'productPurchaseService' && (
                  <FieldContainer label={t('shipmentPriceFieldLabel')}>
                    <>
                      <ShipmentPriceInput
                        control={control}
                        index={index}
                        formErrors={formErrors}
                        validationRules={validationRules}
                        setShipmentPriceError={setShipmentPriceError}
                        setValue={setValue}
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
                <AmountInput
                  shipmentNumber={shipmentNumber}
                  control={control}
                  index={index}
                  formErrors={formErrors}
                  validationRules={validationRules}
                  setValue={setValue}
                  selectedCategory={selectedCategory}
                  requiresManagerCall={pricing?.type === 'callManager'}
                />
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
