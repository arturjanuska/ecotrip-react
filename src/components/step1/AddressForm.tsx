import { Control, UseFormReturn, UseFormSetValue } from 'react-hook-form';
import Step from '../Step';
import FieldContainer from '../FieldContainer';
import CustomInput from '../CustomInput';
import SecondaryButton from '../SecondaryButton';
import { SearchBox } from './SearchBox';
import './step1.css';
import ServiceSection from './ServiceSection';
import { FormType } from '../../utils/formTypes';
import { useEffect } from 'react';

const AddressForm = ({
  setValue,
  control,
  selectedService,
  methods,
}: {
  setValue: UseFormSetValue<FormType>;
  control: Control<FormType, any>;
  selectedService: string;
  methods: UseFormReturn<FormType, any, undefined>;
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

  function findUKPostcode(address: string) {
    const postcodePattern = /\b[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}\b/;

    const match = address.match(postcodePattern);

    if (match) {
      return match[0];
    } else {
      return null;
    }
  }

  const selectedPickupAddress = methods.watch('pickupAddress');
  const selectedDeliveryAddress = methods.watch('deliveryAddress');

  console.log('selectedPickupAddress ===> ', selectedPickupAddress);
  console.log('selectedDeliveryAddress ===> ', selectedDeliveryAddress);

  useEffect(() => {
    if (selectedPickupAddress) {
      const postCode = findUKPostcode(selectedPickupAddress);

      setValue('pickupAddressZipCode', postCode);
    }
  }, [selectedPickupAddress]);

  useEffect(() => {
    if (selectedDeliveryAddress) {
      const postCode = findUKPostcode(selectedDeliveryAddress);

      setValue('deliveryAddressZipCode', postCode);
    }
  }, [selectedDeliveryAddress]);

  return (
    <Step title='Paėmimo ir pristatymo adresai' step={1}>
      <div className='address-form-section-wrapper'>
        <FieldContainer
          label='Paėmimo adresas:'
          description='Adresas iš kur paįmama siunta arba perduodama EcoTrip komandai.'
        >
          <SearchBox
            name={'pickupAddress'}
            defaultValue=''
            onChange={onChange}
            placeholder='Įveskite gatvę, namo numerį, miestą'
            onClear={handleOnClear}
          />
        </FieldContainer>
        <FieldContainer
          label='Paėmimo pašto kodas:'
          description='Pašto kodas sugeneruojamas automatiškai, suvedus tikslų adresą. Pasitikrinkite ar teisingas pašto kodas.'
        >
          <CustomInput
            type='text'
            placeholder='Pašto kodas'
            name='pickupAddressZipCode'
            control={control}
          />
        </FieldContainer>
      </div>

      <div className='address-form-section-wrapper'>
        <FieldContainer
          label='Pristatymo adresas:'
          description='Adresas, kuriame gavėjas galės atsiimti siuntą arba kuriame siunta bus palikta po pristatymo.'
        >
          <SearchBox
            name={'deliveryAddress'}
            defaultValue=''
            onChange={onChange}
            placeholder='Įveskite gatvę, namo numerį, miestą'
            onClear={handleOnClear}
          />
        </FieldContainer>
        <FieldContainer
          label='Pristatymo pašto kodas:'
          description='Pašto kodas sugeneruojamas automatiškai, suvedus tikslų adresą. Pasitikrinkite ar teisingas pašto kodas.'
        >
          <CustomInput
            type='text'
            placeholder='Pašto kodas'
            name='deliveryAddressZipCode'
            control={control}
          />
        </FieldContainer>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          marginBottom: '40px',
        }}
      >
        <SecondaryButton
          type='submit'
          style={{
            marginLeft: 'auto',
          }}
        >
          Patvirtintinti adresus
        </SecondaryButton>
      </div>
      <ServiceSection setValue={setValue} selectedService={selectedService} />
    </Step>
  );
};

export default AddressForm;
