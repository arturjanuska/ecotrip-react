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
import { useTranslation } from 'react-i18next';

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

	const {t} = useTranslation();

  const validationRules = useCustomValidation({ service, t });

  const senderValidationRules = validationRules.senderInformation;

  return (
    <Step title={stepLabel} step={step}>
      <ClientInformationForm
        client='sender'
        control={control}
        subName='senderInformation'
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
