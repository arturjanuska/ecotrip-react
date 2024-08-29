/* eslint-disable @typescript-eslint/no-explicit-any */
import ClientInformationForm from '../step4/ClientInformationForm';
import Step from '../Step';
import '../step4/step4.css';
import { Control, FieldErrors, UseFormReturn } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { useCustomValidation } from '../../utils/validation/useCustomValidation';

type Props = {
  control: Control<FormType, any>;
  formErrors: FieldErrors<FormType>;
  methods: UseFormReturn<FormType, any, undefined>;
  stepLabel: string;
  step: number;
};

const RecipientInformation = ({
  control,
  formErrors,
  methods,
  stepLabel,
  step,
}: Props) => {
  const service = methods.watch('service');

  const validationRules = useCustomValidation({ service });

  const recipientValidationRules = validationRules.recipientInformation;
  return (
    <Step title={stepLabel} step={step}>
      <ClientInformationForm
        client='recipient'
        control={control}
        subName='recipientInformation'
        formErrors={formErrors}
        validationRules={recipientValidationRules}
        methods={methods}
        step={step}
        isShipmentWithAddressServiceSelected={
          service === 'shipmentWithAddressService'
        }
      />
    </Step>
  );
};

export default RecipientInformation;
