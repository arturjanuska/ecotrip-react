import React from 'react';
import Invoice from './Invoice';

type Props = {
	sum: number;
};

const OrderPrice = ({ sum }: Props) => {
	return (
		<div className='w-full flex justify-end order-price flex-col'>
			<p
				className='mb-[18px]'
				style={{
					fontFamily: 'Arial',
					fontSize: '14px',
					fontWeight: '400',
					lineHeight: '16.1px',
					textAlign: 'right',
					color: '#7A7776',
				}}>
				Numatoma viso užsakymo kaina: <strong>€{sum.toFixed(2)}</strong>
			</p>
			<Invoice />
		</div>
	);
};

export default OrderPrice;
