/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FieldContainer from '../FieldContainer';
import CustomInput from '../CustomInput';
import { Control, FieldErrors, UseFormReturn } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import ControlledCheckboxWithLabel from '../ControlledCheckboxWithLabel';
import { useCustomValidation } from '../../utils/validation/useCustomValidation';
import SearchBoxV2 from '../step1/newSearchBox/SearchBoxV2';
import { useTranslation } from 'react-i18next';

type InvoiceProps = {
  control: Control<FormType, any>;
  formErrors: FieldErrors<FormType>;
  methods: UseFormReturn<FormType, any, undefined>;
};

const Invoice = ({ control, formErrors, methods }: InvoiceProps) => {
  const needInvoice = methods.watch('invoiceRequired');
  const service = methods.watch('service');

  const { t } = useTranslation();

  const validationRules = useCustomValidation({
    invoiceNeeded: needInvoice,
    service,
  });

  const onChange = (name: keyof FormType, value: string) => {
    methods.setValue(name, value);
  };

  return (
    <>
      <ControlledCheckboxWithLabel control={control} name="invoiceRequired">
        <span>{t('needInvoiceMsg')}</span>
      </ControlledCheckboxWithLabel>

      {needInvoice ? (
        <div className="invoice-form-container">
          <FieldContainer label={t('companyName')}>
            <CustomInput
              placeholder={t('enterCompanyName')}
              control={control}
              name="invoiceInformation.companyName"
              errorMessage={formErrors.invoiceInformation?.companyName?.message}
              rules={validationRules.invoiceInformation?.companyName}
            />
          </FieldContainer>
          <FieldContainer label={t('companyCode')}>
            <CustomInput
              placeholder={t('enterCompanyCode')}
              name="invoiceInformation.companyCode"
              control={control}
              errorMessage={formErrors.invoiceInformation?.companyCode?.message}
              rules={validationRules.invoiceInformation?.companyCode}
            />
          </FieldContainer>
          <FieldContainer label={t('pvmComapnyCode')}>
            <CustomInput
              placeholder={t('enterPvmComapnyCode')}
              name="invoiceInformation.pvmCode"
              control={control}
              errorMessage={formErrors.invoiceInformation?.pvmCode?.message}
              rules={validationRules.invoiceInformation?.pvmCode}
            />
          </FieldContainer>
          <FieldContainer label={t('companyEmail')}>
            <CustomInput
              placeholder={t('enterCompanyEmail')}
              control={control}
              name="invoiceInformation.companyEmail"
              errorMessage={
                formErrors.invoiceInformation?.companyEmail?.message
              }
              rules={validationRules.invoiceInformation?.companyEmail}
            />
          </FieldContainer>
          <FieldContainer label={t('companyAddress')}>
            <SearchBoxV2
              control={control}
              // @ts-ignore
              name="invoiceInformation.companyAddress"
              placeholder={t('enterComapnyAddress')}
              errorMessage={
                formErrors.invoiceInformation?.companyAddress?.message
              }
              methods={methods}
              onChange={onChange}
              rules={validationRules.invoiceInformation?.companyAddress}
            />
          </FieldContainer>
        </div>
      ) : null}
    </>
  );
};

export default Invoice;
