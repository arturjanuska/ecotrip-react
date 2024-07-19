import React from 'react';
import Invoice from './Invoice';

type Props = {
  sum: number;
  control: any;
};

const OrderPrice = ({ sum, control }: Props) => {
  return (
    <div className='order-price-container'>
      <p className='order-price'>
        Numatoma viso užsakymo kaina: <strong>€{sum.toFixed(2)}</strong>
      </p>
      <Invoice control={control} />
    </div>
  );
};

export default OrderPrice;
