/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Control,
  FieldErrors,
  UseFormReturn,
  UseFormSetValue,
} from 'react-hook-form';
import Step from '../Step';
import ClientInformationForm from './ClientInformationForm';
import { FormType } from '../../utils/formTypes';
import { useCustomValidation } from '../../utils/validation/useCustomValidation';

type SenderInformationProps = {
  control: Control<FormType, any>;
  stepLabel: string;
  formErrors: FieldErrors<FormType>;
  selectedService?: string;
  setValue: UseFormSetValue<FormType>;
  methods: UseFormReturn<FormType, any, undefined>;
  step: number;
};

const SenderInformation = ({
  control,
  stepLabel,
  formErrors,
  selectedService,
  methods,
  step,
}: SenderInformationProps) => {
  const service = methods.watch('service');

  const validationRules = useCustomValidation({ service });

  const senderValidationRules = validationRules.senderInformation;

  return (
    <Step title={stepLabel} step={step}>
      <ClientInformationForm
        client="sender"
        control={control}
        subName="senderInformation"
        formErrors={formErrors}
        isShipmentWithAddressServiceSelected={
          selectedService === 'shipmentWithAddressService'
        }
        validationRules={senderValidationRules}
        methods={methods}
      />
    </Step>
  );
};

export default SenderInformation;
