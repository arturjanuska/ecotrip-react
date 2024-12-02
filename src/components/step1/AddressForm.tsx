/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldErrors, UseFormReturn } from 'react-hook-form';
import Step from '../Step';
import FieldContainer from '../FieldContainer';
import CustomInput from '../CustomInput';
import './step1.css';
import ServiceSection from './ServiceSection';
import { DirectionType, FormType } from '../../utils/formTypes';
import { useEffect } from 'react';
import { useCustomValidation } from '../../utils/validation/useCustomValidation';
import SearchBoxV2 from './newSearchBox/SearchBoxV2';
import { findPostcode } from '../../utils/findPostcode';
import { useTranslation } from 'react-i18next';

const AddressForm = ({
  selectedService,
  methods,
  direction,
  currency,
  formErrors,
  rate,
  isParcelForce,
}: {
  selectedService: string;
  methods: UseFormReturn<FormType, any, undefined>;
  direction: 'LT-UK' | 'UK-LT' | 'LT-LT' | null;
  currency: '€' | '£';
  formErrors: FieldErrors<FormType>;
  rate: number;
  isParcelForce: boolean;
}) => {
  const { t } = useTranslation();

  const { control, setValue } = methods;

  const onChange = (name: keyof FormType, value: string) => {
    if (name === 'pickupAddress') {
      const postCode = findPostcode(value);
      setValue('pickupAddressZipCode', postCode);
    }
    if (name === 'deliveryAddress') {
      const postCode = findPostcode(value);
      setValue('deliveryAddressZipCode', postCode);
    }
    setValue(name, value);
  };

  const service = methods.watch('service');

  const handleOnClear = (name: keyof FormType) => {
    if (name === 'pickupAddress') {
      setValue('pickupAddressZipCode', '');
    }
    if (name === 'deliveryAddress') {
      setValue('deliveryAddressZipCode', '');
    }
  };

  const validationRules = useCustomValidation({ service, t });

  const selectedPickupAddress = methods.watch('pickupAddress');
  const selectedPickupAddressPostcode = methods.watch('pickupAddressZipCode');

  const selectedDeliveryAddress = methods.watch('deliveryAddress');
  const selectedDeliveryAddressPostcode = methods.watch(
    'deliveryAddressZipCode'
  );

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

    if (
      pickupPostcode.match(ltPostcodePattern) &&
      deliveryPostcode.match(ltPostcodePattern)
    ) {
      return 'LT-LT';
    }

    return null;
  };

  useEffect(() => {
    if (
      selectedPickupAddress &&
      selectedDeliveryAddress &&
      selectedPickupAddressPostcode &&
      selectedDeliveryAddressPostcode
    ) {
      const dir: DirectionType = getDirection(
        selectedPickupAddressPostcode,
        selectedDeliveryAddressPostcode
      );
      setValue('direction', dir);
    } else {
      setValue('direction', null);
      setValue('service', '');
    }
  }, [
    selectedPickupAddress,
    selectedDeliveryAddress,
    selectedPickupAddressPostcode,
    selectedDeliveryAddressPostcode,
  ]);

  return (
    <Step
      title={t('addressFormStepTitle')}
      step={1}
      instructions={t('addressFormStepInstructions')}
    >
      <div className="address-form-section-wrapper">
        <FieldContainer
          label={t('pickupAddressLabel')}
          description={t('senderPickupFieldDescription')}
          // description='Adresas iš kur paimama siunta arba perduodama EcoTrip kurjeriui.'
          // instructions='Įrašykite ir pasirinkite tikslų siuntėjo adresą'
        >
          <SearchBoxV2
            control={control}
            name={'pickupAddress'}
            placeholder={t('enterStreetNumberCity')}
            errorMessage={formErrors.pickupAddress?.message}
            methods={methods}
            onChange={onChange}
            onClear={handleOnClear}
          />
        </FieldContainer>
        <FieldContainer
          label={t('pickupZipCode')}
          description={t('zipCodeDescripion')}
        >
          <CustomInput
            type="text"
            placeholder={t('zipCodeLabel')}
            name="pickupAddressZipCode"
            control={control}
            errorMessage={formErrors.pickupAddressZipCode?.message}
            rules={validationRules.pickupAddressZipCode}
            disabled={true}
          />
        </FieldContainer>
      </div>

      <div className="address-form-section-wrapper">
        <FieldContainer
          label={t('deliveryAddressLabel')}
          description={t('recipientPickupFieldDescription')}
          // description='Adresas, kuriame gavėjas galės atsiimti siuntą arba kuriame siunta bus palikta po pristatymo.'
          // instructions='Įrašykite ir pasirinkite tikslų gavėjo adresą'
        >
          <SearchBoxV2
            name={'deliveryAddress'}
            placeholder={t('enterStreetNumberCity')}
            errorMessage={formErrors.deliveryAddress?.message}
            control={control}
            methods={methods}
            onChange={onChange}
            onClear={handleOnClear}
          />
        </FieldContainer>
        <FieldContainer
          label={t('deliveryZipCode')}
          description={t('zipCodeDescripion')}
          instructions=""
        >
          <CustomInput
            type="text"
            placeholder={t('zipCodeLabel')}
            name="deliveryAddressZipCode"
            control={control}
            errorMessage={formErrors.deliveryAddressZipCode?.message}
            rules={validationRules.deliveryAddressZipCode}
            disabled={true}
          />
        </FieldContainer>
      </div>

      {direction && direction !== 'LT-LT' ? (
        <ServiceSection
          setValue={setValue}
          selectedService={selectedService}
          isParcelForce={isParcelForce}
          currency={currency}
          methods={methods}
          rate={rate}
        />
      ) : null}

      {/* {direction && direction !== 'LT-LT' ? (
        <ServiceSection
          setValue={setValue}
          selectedService={selectedService}
          isParcelForce={isParcelForce}
          currency={currency}
          methods={methods}
        />
      ) : null} */}
    </Step>
  );
};

export default AddressForm;
