/* eslint-disable @typescript-eslint/no-explicit-any */
import Invoice from './Invoice';
import { Control, FieldErrors, UseFormReturn } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';

type Props = {
  sum: number;
  control: Control<FormType, any>;
  formErrors: FieldErrors<FormType>;
  currency: '€' | '£';
  methods: UseFormReturn<FormType, any, undefined>;
};

const OrderPrice = ({ sum, control, formErrors, currency, methods }: Props) => {
  return (
    <div className='order-price-container'>
      <p className='order-price'>
        Numatoma viso užsakymo kaina:{' '}
        <strong>
          {currency}
          {sum ? sum : 0}
        </strong>
      </p>
      <Invoice control={control} formErrors={formErrors} methods={methods} />
    </div>
  );
};

export default OrderPrice;
