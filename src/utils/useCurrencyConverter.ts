import { useEffect, useState } from 'react';

const useCurrencyConverter = ({ currency }: { currency: '€' | '£' }) => {
	const [rate, setRate] = useState(1);

	useEffect(() => {
		const getRate = async (currency: '€' | '£') => {
			const baseCurrencyCode = currency === '€' ? 'EUR' : 'GBP';
			const currencyCodeToGetRate = baseCurrencyCode === 'EUR' ? 'GBP' : 'EUR';

			const res = await fetch(
				`https://openexchangerates.org/api/latest.json?app_id=3a45579860fa4b5a9cb32b7078d5c23c&base=${baseCurrencyCode}`
			);

			const data = await res.json();

			const conversionRate = Object.entries(data.rates).find(
				([key]) => currencyCodeToGetRate === key
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
