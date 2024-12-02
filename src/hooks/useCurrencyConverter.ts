import { useEffect, useState } from 'react';

const useCurrencyConverter = ({ currency }: { currency: '€' | '£' }) => {
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const getRate = async (currency: '€' | '£') => {
      const baseCurrencyCode = currency === '€' ? 'EUR' : 'GBP';
      const currencyCodeToGetRate = baseCurrencyCode === 'EUR' ? 'GBP' : 'EUR';

      const res = await fetch(
        `https://openexchangerates.org/api/latest.json?app_id=559dcf0827d44c219f0a22fdc6264e3c&base=${baseCurrencyCode}`
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
