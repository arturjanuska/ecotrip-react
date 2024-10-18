/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Control,
  FieldErrors,
  UseFormReturn,
  UseFormSetValue,
} from 'react-hook-form';
import Step from '../Step';
import FieldContainer from '../FieldContainer';
import CustomInput from '../CustomInput';
import './step1.css';
import ServiceSection from './ServiceSection';
import { FormType } from '../../utils/formTypes';
import { useEffect } from 'react';
import { checkParcelForcePostcodes } from '../../utils/checkPostCodes';
import { useCustomValidation } from '../../utils/validation/useCustomValidation';
import SearchBoxV2 from './newSearchBox/SearchBoxV2';
import { findPostcode } from '../../utils/findPostcode';

const AddressForm = ({
  setValue,
  control,
  selectedService,
  methods,
  direction,
  currency,
  formErrors,
  setPostCodeObject,
  rate,
}: {
  setValue: UseFormSetValue<FormType>;
  control: Control<FormType, any>;
  selectedService: string;
  methods: UseFormReturn<FormType, any, undefined>;
  direction: 'LT-UK' | 'UK-LT' | 'LT-LT' | null;
  currency: '€' | '£';
  formErrors: FieldErrors<FormType>;
  setPostCodeObject: (obj: any) => void;
  rate: number;
}) => {
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

  const validationRules = useCustomValidation({ service });

  const selectedPickupAddress = methods.watch('pickupAddress');
  const selectedPickupAddressPostcode = methods.watch('pickupAddressZipCode');

  const selectedDeliveryAddress = methods.watch('deliveryAddress');
  const selectedDeliveryAddressPostcode = methods.watch(
    'deliveryAddressZipCode'
  );

  const isParcelForce =
    checkParcelForcePostcodes(
      direction
        ? {
            postcodes: [
              selectedPickupAddressPostcode as string,
              selectedDeliveryAddressPostcode as string,
            ],
            setPostCodeObject,
          }
        : {
            postcodes: [],
            setPostCodeObject,
          }
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
      const dir: 'LT-UK' | 'UK-LT' | 'LT-LT' | null = getDirection(
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
      title='Paėmimo ir pristatymo adresai'
      step={1}
      instructions='Įveskite siuntėjo ir gavėjo adresus, tuomet pasirinkite norimą paslaugą iš langelių apačioje'
    >
      <div className='address-form-section-wrapper'>
        <FieldContainer
          label='Paėmimo adresas:'
          description='Adresas iš kur paimama siunta arba perduodama EcoTrip kurjeriui.'
          instructions='Įrašykite ir pasirinkite tikslų siuntėjo adresą'
        >
          <SearchBoxV2
            control={control}
            name={'pickupAddress'}
            placeholder='Įveskite gatvę, namo numerį, miestą'
            errorMessage={formErrors.pickupAddress?.message}
            methods={methods}
            onChange={onChange}
            onClear={handleOnClear}
          />
        </FieldContainer>
        <FieldContainer
          label='Paėmimo pašto kodas:'
          description='Pašto kodas sugeneruojamas automatiškai, suvedus tikslų adresą.'
        >
          <CustomInput
            type='text'
            placeholder='Pašto kodas'
            name='pickupAddressZipCode'
            control={control}
            errorMessage={formErrors.pickupAddressZipCode?.message}
            rules={validationRules.pickupAddressZipCode}
            disabled={true}
          />
        </FieldContainer>
      </div>

      <div className='address-form-section-wrapper'>
        <FieldContainer
          label='Pristatymo adresas:'
          description='Adresas, kuriame gavėjas galės atsiimti siuntą arba kuriame siunta bus palikta po pristatymo.'
          instructions='Įrašykite ir pasirinkite tikslų gavėjo adresą'
        >
          <SearchBoxV2
            name={'deliveryAddress'}
            placeholder='Įveskite gatvę, namo numerį, miestą'
            errorMessage={formErrors.deliveryAddress?.message}
            control={control}
            methods={methods}
            onChange={onChange}
            onClear={handleOnClear}
          />
        </FieldContainer>
        <FieldContainer
          label='Pristatymo pašto kodas:'
          description='Pašto kodas sugeneruojamas automatiškai, suvedus tikslų adresą.'
          instructions=''
          className='align-self-baseline mt-26px'
        >
          <CustomInput
            type='text'
            placeholder='Pašto kodas'
            name='deliveryAddressZipCode'
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
