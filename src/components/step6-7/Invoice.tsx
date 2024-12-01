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
    t,
  });

  const onChange = (name: keyof FormType, value: string) => {
    // @ts-ignore
    methods.setValue(name, value);
  };

  return (
    <>
      <ControlledCheckboxWithLabel control={control} name="invoiceRequired">
        <span>Reikalinga sąskaita faktūra</span>
      </ControlledCheckboxWithLabel>

      {needInvoice ? (
        <div className="invoice-form-container">
          <FieldContainer label="Įmonės pavadinimas">
            <CustomInput
              placeholder="Įveskite įmonės pavadinimą *"
              control={control}
              name="invoiceInformation.companyName"
              errorMessage={formErrors.invoiceInformation?.companyName?.message}
              rules={validationRules.invoiceInformation?.companyName}
            />
          </FieldContainer>
          <FieldContainer label="Įmonės kodas">
            <CustomInput
              placeholder="Įveskite įmonės kodą *"
              name="invoiceInformation.companyCode"
              control={control}
              errorMessage={formErrors.invoiceInformation?.companyCode?.message}
              rules={validationRules.invoiceInformation?.companyCode}
            />
          </FieldContainer>
          <FieldContainer label="PVM mokėtojo kodas">
            <CustomInput
              placeholder="Įveskite PVM mokėtojo kodą *"
              name="invoiceInformation.pvmCode"
              control={control}
              errorMessage={formErrors.invoiceInformation?.pvmCode?.message}
              rules={validationRules.invoiceInformation?.pvmCode}
            />
          </FieldContainer>
          <FieldContainer label="Įmonės el. paštas">
            <CustomInput
              placeholder="Įveskite įmonės el paštą *"
              control={control}
              name="invoiceInformation.companyEmail"
              errorMessage={
                formErrors.invoiceInformation?.companyEmail?.message
              }
              rules={validationRules.invoiceInformation?.companyEmail}
            />
          </FieldContainer>
          <FieldContainer label="Įmonės adresas">
            <SearchBoxV2
              control={control}
              // @ts-ignore
              name="invoiceInformation.companyAddress"
              placeholder="Įveskite įmonės adresą *"
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
