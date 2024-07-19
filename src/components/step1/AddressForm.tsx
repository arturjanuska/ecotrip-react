import { Control, UseFormSetValue } from 'react-hook-form';
import Step from '../Step';
import FieldContainer from '../FieldContainer';
import CustomInput from '../CustomInput';
import SecondaryButton from '../SecondaryButton';
import { SearchBox } from './SearchBox';
import './step1.css';
import ServiceSection from './ServiceSection';
import { FormType } from '../../utils/formTypes';

const AddressForm = ({
  setValue,
  control,
  selectedService,
  formData,
}: {
  setValue: UseFormSetValue<FormType>;
  control: Control<FormType, any>;
  selectedService: string;
  formData: FormType;
}) => {
  const onChange = (
    name: 'pickupAddress' | 'deliveryAddress',
    value: string
  ) => {
    setValue(name, value);
  };

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
