import React from 'react';
import Invoice from './Invoice';

type Props = {
	sum: number;
};

const OrderPrice = ({ sum }: Props) => {
	return (
		<div className='order-price-container'>
			<p className='order-price'>
				Numatoma viso užsakymo kaina: <strong>€{sum.toFixed(2)}</strong>
			</p>
			<Invoice />
		</div>
	);
};

export default OrderPrice;
