/* eslint-disable @typescript-eslint/no-explicit-any */
import Step from '../Step';
import FieldContainer from '../FieldContainer';
import CustomInput from '../CustomInput';
import OrderPrice from './OrderPrice';
import SecondaryButton from '../SecondaryButton';
import './step6.css';
import Link from '../Link';
import { Control, FieldErrors, UseFormReturn } from 'react-hook-form';
import { FormType, ShipmentProps } from '../../utils/formTypes';
import ControlledStyledSelect from '../ControlledStyledSelect';
import ControlledCheckboxWithLabel from '../ControlledCheckboxWithLabel';
import { getError } from '../../utils/validation/getError';
import { useEffect } from 'react';

type Props = {
  control: Control<FormType, any>;
  step: number;
  stepLabel: string;
  formErrors: FieldErrors<FormType>;
  methods: UseFormReturn<FormType, any, undefined>;
  currency: '€' | '£';
};

const PayerInformation = ({
  control,
  step,
  stepLabel,
  formErrors,
  methods,
  currency,
}: Props) => {
  const payerOptions = [
    {
      label: 'Mokėtojas yra siuntėjas',
      value: 'thePayerIsTheSender',
    },
    {
      label: 'Mokėtojas yra gavėjas',
      value: 'thePayerIsTheRecipient',
    },
  ];

  const paymentMethodOptions = [
    {
      label: 'Grynais',
      value: 'cash',
    },
    {
      label: 'Kortele',
      value: 'card',
    },
    {
      label: 'Bankiniu pavedimu (juridiniams asmenims)',
      value: 'bankTransfer',
    },
  ];

  const shipments = methods.watch('shipments');

  const shipmentsWithEmptyEstimatedPrice = shipments.filter((item) => {
    if (item.estimatedPrice === '0.00') {
      return true;
    }
  });

  const getOrderPrice = (shipmentsArray: ShipmentProps[]) => {
    let price = 0;

    for (let i = 0; i < shipmentsArray.length; i++) {
      const shipmentPrice = shipmentsArray[i].estimatedPrice;
      price += Number(shipmentPrice);
    }

    methods.setValue('estimatedShipmentPrice', price ?? 0);
  };

  useEffect(() => {
    getOrderPrice(shipments);
  }, [shipments.length, shipments]);

  const orderPrice = methods.watch('estimatedShipmentPrice');

  return (
    <Step step={step} title={stepLabel}>
      <>
        <div className='payer-info-container'>
          <FieldContainer
            label='Kas yra siuntos užsakovas?'
            description='Prašome iš anksto nurodyti, kas bus atsakingas už siuntos apmokėjimą, kad vėliau nebūtų nesusipratimų ar papildomų klausimų po užsakymo.'
          >
            <ControlledStyledSelect
              placeholder='Kas yra siuntos užsakovas?'
              name='customerInformation.payerOfTheShipment'
              options={payerOptions}
              control={control}
              errorMessage={getError(
                'customerInformation.payerOfTheShipment.value',
                formErrors
              )}
            />
          </FieldContainer>
          <FieldContainer
            label='Pasirinkite apmokėjimo būdą'
            description='Prašome pasirinkti ir nurodyti atsiskaitymo būdą, kuris jums yra patogus ir teisingas.'
          >
            <ControlledStyledSelect
              placeholder='Pasirinkite apmokėjimo būdą'
              name='customerInformation.paymentMethod'
              options={paymentMethodOptions}
              control={control}
              errorMessage={getError(
                'customerInformation.paymentMethod.value',
                formErrors
              )}
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
              placeholder='Įveskite mokėtojo el. paštą *'
              type='text'
              control={control}
              name='customerInformation.email'
              errorMessage={getError('customerInformation.email', formErrors)}
            />
          </FieldContainer>
        </div>
        <OrderPrice
          sum={orderPrice}
          currency={currency}
          control={control}
          formErrors={formErrors}
          methods={methods}
        />
        <div className='checkboxes-container'>
          <ControlledCheckboxWithLabel
            control={control}
            errorMessage={getError('packagingAndLabelingRules', formErrors)}
            name='packagingAndLabelingRules'
          >
            <>
              <span>
                Aš esu susipažinęs(-usi) ir sutinku su{' '}
                <Link
                  href='https://ecotrip.lt/siuntos-pakavimo-ir-zenklinimo-taisykles/'
                  text='EcoTrip siuntos pakavimo ir ženklinimo taisyklėmis *'
                />
              </span>
            </>
          </ControlledCheckboxWithLabel>
          <ControlledCheckboxWithLabel
            control={control}
            errorMessage={getError('transportRules', formErrors)}
            name='transportRules'
          >
            <span>
              Aš esu susipažinęs(-usi) ir sutinku su{' '}
              <Link
                href='https://ecotrip.lt/vezimo-taisykles/'
                text='EcoTrip vežimo taisyklėmis *'
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
          <SecondaryButton
            type={`${
              shipmentsWithEmptyEstimatedPrice.length > 0 ||
              shipments.length === 0
                ? 'button'
                : 'submit'
            }`}
            isDisabled={
              shipmentsWithEmptyEstimatedPrice.length > 0 ||
              shipments.length === 0
            }
          >
            <span>PatvirtinTi užsakymą</span>
          </SecondaryButton>
        </div>
      </>
    </Step>
  );
};

export default PayerInformation;
