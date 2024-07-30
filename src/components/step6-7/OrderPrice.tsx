/* eslint-disable @typescript-eslint/no-explicit-any */
import Invoice from './Invoice';
import { Control, FieldErrors } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';

type Props = {
  sum: number;
  control: Control<FormType, any>;
  formErrors: FieldErrors<FormType>
  currency: '€' | '£'
};

const OrderPrice = ({ sum, control, formErrors, currency }: Props) => {
  return (
    <div className='order-price-container'>
      <p className='order-price'>
        Numatoma viso užsakymo kaina: <strong>{currency}{sum.toFixed(2)}</strong>
      </p>
      <Invoice control={control} formErrors={formErrors} />
    </div>
  );
};

export default OrderPrice;
