import Step from '../Step';
import FieldContainer from '../FieldContainer';
import CustomInput from '../CustomInput';
import OrderPrice from './OrderPrice';
import SecondaryButton from '../SecondaryButton';
import './step6.css';
import Link from '../Link';
import { Control } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import ControlledStyledSelect from '../ControlledStyledSelect';
import ControlledCheckboxWithLabel from '../ControlledCheckboxWithLabel';

type Props = {
  control: Control<FormType, any>;
  step: number;
  stepLabel: string;
};

const PayerInformation = ({ control, step, stepLabel }: Props) => {
  const payerOptions = [
    {
      value: 'thePayerIsTheSender',
      label: 'Mokėtojas yra siuntėjas',
    },
    {
      value: 'thePayerIsTheRecipient',
      label: 'The payer is the recipient',
    },
  ];

  const paymentMethodOptions = [
    {
      value: 'cash',
      label: 'Grynais',
    },
  ];

  return (
    <Step step={step} title={stepLabel}>
      <>
        <div className='payer-info-container'>
          <FieldContainer
            label='Kas yra siuntos užsakovas?'
            description='Prašome iš anksto nurodyti, kas bus atsakingas už siuntos apmokėjimą, kad vėliau nebūtų nesusipratimų ar papildomų klausimų po užsakymo.'
          >
            <ControlledStyledSelect
              name='customerInformation.payerOfTheShipment'
              options={payerOptions}
              defaultValue={payerOptions[0]}
              control={control}
            />
          </FieldContainer>
          <FieldContainer
            label='Pasirinkite apmokėjimo būdą'
            description='Prašome pasirinkti ir nurodyti atsiskaitymo būdą, kuris jums yra patogus ir teisingas.'
          >
            <ControlledStyledSelect
              name='customerInformation.paymentMethod'
              options={paymentMethodOptions}
              defaultValue={paymentMethodOptions[0]}
              control={control}
            />
          </FieldContainer>
        </div>
        <div className='payer-email'>
          <FieldContainer
            label='Mokėtojo el. paštas'
            description='Užsakymo ir mokėjimo patvirtinimai bus išsiųsti į šį elektroninį paštą.'
            width='full'
          >
            <CustomInput
              placeholder='Įveskite mokėtojo el. paštą'
              type='text'
              control={control}
              name='customerInformation.email'
            />
          </FieldContainer>
        </div>
        <OrderPrice sum={324} control={control} />
        <div className='checkboxes-container'>
          <ControlledCheckboxWithLabel
            control={control}
            name='packagingAndLabelingRules'
          >
            <span>
              Aš esu susipažinęs(-usi) ir sutinku su{' '}
              <Link
                href='https://ecotrip.lt/siuntos-pakavimo-ir-zenklinimo-taisykles/'
                text='EcoTrip siuntos pakavimo ir ženklinimo taisyklėmis'
              />
            </span>
          </ControlledCheckboxWithLabel>
          <ControlledCheckboxWithLabel control={control} name='transportRules'>
            <span>
              Aš esu susipažinęs(-usi) ir sutinku su{' '}
              <Link
                href='https://ecotrip.lt/vezimo-taisykles/'
                text='EcoTrip vežimo taisyklėmis'
              />
            </span>
          </ControlledCheckboxWithLabel>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <SecondaryButton>
            <span>PatvirtinTi užsakymą</span>
          </SecondaryButton>
        </div>
      </>
    </Step>
  );
};

export default PayerInformation;
