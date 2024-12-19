/* eslint-disable @typescript-eslint/no-explicit-any */
import Step from '../Step';
import ClientInformationForm from '../step4/ClientInformationForm';
import { Control, FieldErrors, UseFormReturn } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { useCustomValidation } from '../../utils/validation/useCustomValidation';
import { useTranslation } from 'react-i18next';

type Props = {
  control: Control<FormType, any>;
  formErrors: FieldErrors<FormType>;
  selectedService: string;
  methods: UseFormReturn<FormType, any, undefined>;
};
const ProductPurchaseServiceInformation = ({
  control,
  formErrors,
  selectedService,
  methods,
}: Props) => {
  const { t } = useTranslation();

  const validationRules = useCustomValidation({
    service: selectedService,
  }) as {
    [key: string]: any;
  };
  const purchaseValidationRules = validationRules.purchaseInformation;

  return (
    <Step step={4} title={t('step4Title')}>
      <>
        <div>
          <ClientInformationForm
            client="purchaseInformation"
            control={control}
            subName="purchaseInformation"
            formErrors={formErrors}
            validationRules={
              purchaseValidationRules ? purchaseValidationRules : undefined
            }
            methods={methods}
          />
        </div>
      </>
    </Step>
  );
};

export default ProductPurchaseServiceInformation;
