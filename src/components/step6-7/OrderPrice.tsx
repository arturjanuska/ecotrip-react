/* eslint-disable @typescript-eslint/no-explicit-any */
import Invoice from './Invoice';
import { Control, FieldErrors, UseFormReturn } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';

type Props = {
	sum: string;
	control: Control<FormType, any>;
	formErrors: FieldErrors<FormType>;
	currency: '€' | '£';
	methods: UseFormReturn<FormType, any, undefined>;
	priceDescription: { title: string; price: string }[];
};

const OrderPrice = ({
	sum,
	control,
	formErrors,
	currency,
	methods,
	priceDescription,
}: Props) => {
	return (
		<div className='order-price-container'>
			{priceDescription.length !== 0 ? (
				<div className='price-description-container'>
					{priceDescription.map((item) => {
						return (
							<p className='price-description-row'>
								{item.title} <strong>{item.price}</strong>
							</p>
						);
					})}
				</div>
			) : null}
			<p className='order-price'>
				Numatoma viso užsakymo kaina:{' '}
				<strong>
					{currency}
					{sum ? sum : '0.00'}
				</strong>
			</p>
			<Invoice
				control={control}
				formErrors={formErrors}
				methods={methods}
			/>
		</div>
	);
};

export default OrderPrice;
