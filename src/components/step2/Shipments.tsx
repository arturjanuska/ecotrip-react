import { Control, useFieldArray } from 'react-hook-form';
import Step from '../Step';
import SingleShimpentForm from './SingleShimpentForm';
import { FormType } from '../../utils/formTypes';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import './step2.css';

const Shipments = ({
  control,
  selectedService,
}: {
  control: Control<FormType>;
  formData: FormType;
  selectedService: string;
}) => {
  const { fields, append, remove } = useFieldArray<FormType>({
    control,
    name: 'shipments',
  });

  const removeShipment = (index: number) => {
    remove(index);
  };

  return (
    <Step
      step={2}
      title={`Siuntos suvedimas ${
        selectedService === 'shipmentWithAddressService'
          ? '(EcoTrip adreso pasl.)'
          : ''
      }`}
    >
      <div className='shipments-column-wrapper'>
        <div className='shipments-column-container'>
          {fields.length > 0 &&
            fields.map((field, index) => {
              return (
                <div className='form-control' key={index}>
                  <SingleShimpentForm
                    key={field.id}
                    shipmentNumber={index + 1}
                    control={control}
                    field={field}
                    index={index}
                    removeShipment={removeShipment}
                    selectedService={selectedService}
                  />
                </div>
              );
            })}
        </div>
        <div
          style={{
            width: '100%',
          }}
          className='buttons-container'
        >
          <PrimaryButton
            className='add-shipment-button'
            type='button'
            onClick={() => {
              append({ category: null });
            }}
          >
            Pridėti papildomą siuntą
          </PrimaryButton>
          <SecondaryButton type='button'>
            Paskaičiuoti Užsakymo kainą
          </SecondaryButton>
        </div>
      </div>
    </Step>
  );
};

export default Shipments;
