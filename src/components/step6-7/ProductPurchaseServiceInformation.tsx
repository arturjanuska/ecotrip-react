/* eslint-disable @typescript-eslint/no-explicit-any */
import Step from '../Step';
import ClientInformationForm from '../step4/ClientInformationForm';
import { Control, FieldErrors } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';

type Props = {
  control: Control<FormType, any>;
  formErrors: FieldErrors<FormType>;
};
const ProductPurchaseServiceInformation = ({ control, formErrors }: Props) => {
  return (
    <Step
      step={6}
      title='Siuntos/prekės išpirkos gavėjo informacija'>
      <>
        <div>
          <ClientInformationForm
            client='purchaseInformation'
            control={control}
            subName='purchaseInformation'
            formErrors={formErrors}
          />
        </div>
      </>
    </Step>
  )
}

export default ProductPurchaseServiceInformation