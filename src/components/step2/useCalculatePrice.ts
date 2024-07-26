import { useEffect, useState } from 'react';
import { OptionType } from '../../utils/types';
import { allProducts } from '../../utils/products';
import { UseFormSetValue } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';

type Props = {
  category: OptionType | null;
  productType: OptionType | null;
  size: OptionType | null;
  amount: number;
  specification: OptionType | null;
  setValue: UseFormSetValue<FormType>;
  name: string;
};

const useCalculatePrice = ({
  category,
  productType,
  size,
  amount = 1,
  specification,
  setValue,
  name,
}: Props) => {
  useEffect(() => {
    if (category && category.value && productType && productType.value) {
      const foundProducts = allProducts.filter(
        (item) =>
          item.productType?.value === productType.value &&
          item.category?.value === category.value &&
          JSON.stringify(item.size) === JSON.stringify(size)
      );

      let product = null;
      if (foundProducts.length > 1 && specification && specification.value) {
        product = foundProducts.find(
          (item) => item?.specification?.value === specification.value
        );
      }
      if (foundProducts.length > 0) {
        product = foundProducts[0];
      }
      console.log('product ===> ', product);
      const productPrice = product ? product.price * Number(amount) : 0;

      const finalPrice = productPrice.toFixed(2) ?? '0.00';
      // @ts-ignore
      setValue(name, finalPrice);
    }
  }, [
    JSON.stringify(productType),
    JSON.stringify(size),
    JSON.stringify(specification),
    amount,
  ]);
};

export default useCalculatePrice;
