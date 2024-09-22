/* eslint-disable @typescript-eslint/no-explicit-any */
import Invoice from './Invoice';
import { Control, FieldErrors, UseFormReturn } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { convertValue } from '../../utils/convertCurrency';

type Props = {
	sum: string;
	control: Control<FormType, any>;
	formErrors: FieldErrors<FormType>;
	currency: '€' | '£';
	methods: UseFormReturn<FormType, any, undefined>;
	priceDescription: { title: string; price: string }[];
	rate: number;
};

const OrderPrice = ({
	sum,
	control,
	formErrors,
	currency,
	methods,
	priceDescription,
	rate,
}: Props) => {
	return (
		<div className='order-price-container'>
			{priceDescription.length !== 0 ? (
				<div className='price-description-container'>
					{priceDescription.map((item, index) => {
						return (
							<p
								className='price-description-row'
								key={`${item.title}-${index}`}>
								<span>{item.title}</span> <strong>{item.price}</strong>
							</p>
						);
					})}
				</div>
			) : null}
			<p className='order-price'>
				Numatoma viso užsakymo kaina:{' '}
				<strong>
					{currency}
					{sum
						? `${sum} - ${convertValue(currency, Number(sum) ?? 0, rate)}`
						: '0.00'}
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
