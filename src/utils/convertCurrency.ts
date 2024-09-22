export const convertCurrency = (value: number, rate: number) => {
	return value * rate;
};

export const convertValue = (
	currentCurrency: '€' | '£',
	value: number,
	rate: number
) => {
	const possibleCurrencies = ['€', '£'];

	const remainingCurrency = possibleCurrencies.find(
		(curr) => curr !== currentCurrency
	) as string;

	const convertedValue = convertCurrency(value, rate);

	return `${remainingCurrency}${convertedValue.toFixed(2)}`;
};
