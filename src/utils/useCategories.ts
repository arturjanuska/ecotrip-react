import { useEffect, useState } from 'react';
import { fetchWrapper } from './fetchWrapper';
import type { OptionType } from './types';

const useCategories = () => {
  const [categories, setCategories] = useState<OptionType[]>([]);

  const getCategoriesSelectOptions = async () => {
    const response = await fetchWrapper('ecotrip-pricelist', {
      httpOptions: {
        method: 'GET',
      },
    });

    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    getCategoriesSelectOptions();
  }, []);

  return categories;
};
export default useCategories;
