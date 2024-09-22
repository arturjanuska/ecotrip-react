import { useEffect, useState } from 'react';

const useCurrencyConverter = ({ currency }: { currency: '€' | '£' }) => {
	const [rate, setRate] = useState(1);

	useEffect(() => {
		const getRate = async (currency: '€' | '£') => {
			const currencyCode = currency === '€' ? 'EUR' : 'GBP';

			const response = await fetch(
				`https://v6.exchangerate-api.com/v6/f4425234a41d92bbe4bfd444/latest/${currencyCode}`
			);
			const data = await response.json();

			const conversionRate = Object.entries(data.conversion_rates).find(
				([key]) => {
					const rateCurrencyCodeKey = currencyCode === 'EUR' ? 'GBP' : 'EUR';
					if (rateCurrencyCodeKey === key) {
						return true;
					}
					return false;
				}
			);
			if (conversionRate && conversionRate.length > 0) {
				setRate(conversionRate[1] as number);
			}
		};
		getRate(currency);
	}, [currency]);

	return rate;
};

export default useCurrencyConverter;
