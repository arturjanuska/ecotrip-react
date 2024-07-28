import { useEffect } from 'react';
import { OptionType } from '../../utils/types';
import { allProducts } from '../../utils/products';
import { UseFormSetValue } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { convertOptionTypeToRangeSize } from '../../utils/convertSizeOptions';
import {
	calculateShipmentPrice,
	calculateVolume,
} from '../../utils/calculateShipmentPrice';

type Props = {
	category: OptionType | null;
	productType: OptionType | null;
	size: OptionType | null;
	amount: number;
	specification?: OptionType | null;
	setValue: UseFormSetValue<FormType>;
	name: string;
	weight?: string;
	length?: string;
	width?: string;
	height?: string;
	pricePerUnit?: number;
};

const useCalculatePrice = ({
	category,
	productType,
	size,
	amount = 1,
	specification,
	setValue,
	name,
	weight,
	length,
	width,
	height,
}: Props) => {
	useEffect(() => {
		if (
			(category && category.value === 'removals') ||
			(productType && productType.value === 'fridge') ||
			(productType && productType.value === 'freezer')
		) {
			if (length && width && height) {
				const price = calculateVolume({
					length,
					width,
					height,
					categoryValue: category?.value,
					amount,
				});

				// @ts-ignore
				setValue(name, price);
				return;
			}
			return;
		}

		if (category && category.value === 'shipments') {
			if (weight) {
				const price = calculateShipmentPrice({ weight, amount });
				// @ts-ignore
				setValue(name, price);
				return;
			}
			return;
		}

		let filteredProducts = allProducts;

		if (category && category.value) {
			filteredProducts = filteredProducts.filter(
				(item) => item.category?.value === category.value
			);
		}

		if (productType && productType.value) {
			filteredProducts = filteredProducts.filter(
				(item) => item.productType?.value === productType.value
			);
		}

		if (size !== null) {
			if (size.value === size.label) {
				console.log('category ===', category);
				filteredProducts = filteredProducts.filter(
					(item) =>
						item.size.from ===
							convertOptionTypeToRangeSize(
								productType?.value ?? '',
								size.value,
								category?.value ?? ''
							)?.from &&
						item.size.to ===
							convertOptionTypeToRangeSize(
								productType?.value ?? '',
								size.value,
								category?.value ?? ''
							)?.to
				);
			} else {
				filteredProducts = filteredProducts.filter(
					(item) =>
						item.size.label === size.label && item.size.value === size.value
				);
			}
		}

		if (specification && specification.value) {
			filteredProducts = filteredProducts.filter(
				(item) => item?.specification?.value === specification.value
			);
		}

		let product = null;

		if (filteredProducts.length === 1) {
			product = filteredProducts[0];
		}
		const productPrice = product ? product.price * Number(amount) : 0;
		const finalPrice = productPrice.toFixed(2) ?? '0.00';
		// @ts-ignore
		setValue(name, finalPrice);
	}, [
		JSON.stringify(productType),
		JSON.stringify(size),
		JSON.stringify(specification),
		amount,
		weight,
		length,
		width,
		height,
	]);
};

export default useCalculatePrice;
