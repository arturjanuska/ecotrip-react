/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect } from 'react';
import { OptionType } from '../../utils/types';
import { UseFormSetValue } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { calculateExtent } from '../../utils/calculateShipmentPrice';
import { calculatePrice, Direction, Pricing } from '../../utils/priceCatalog';

type Props = {
  category: OptionType | null;
  pricing: Pricing | null;
  direction: Direction;
  size: OptionType | null;
  amount: number;
  specification?: OptionType | null;
  setValue: UseFormSetValue<FormType>;
  name: string;
  weight?: string;
  length?: string;
  width?: string;
  height?: string;
  volumePropName: string;
  weightPropName: string;
  extentPropName: string;
};

// An empty input is missing; "0" is a value, as in the old formulas.
const toNumber = (value?: string) =>
  value === undefined || value === '' ? null : Number(value);

const useCalculatePrice = ({
  category,
  pricing,
  direction,
  size,
  amount = 1,
  specification,
  setValue,
  name,
  weight,
  length,
  width,
  height,
  volumePropName,
  weightPropName,
  extentPropName,
}: Props) => {
  useEffect(() => {
    if (!pricing) {
      // @ts-ignore
      setValue(name, '0.00');
      return;
    }

    const result = calculatePrice(
      pricing,
      {
        size: size?.value,
        specification: specification?.value,
        amount: Number(amount),
        weight: toNumber(weight),
        length: toNumber(length),
        width: toNumber(width),
        height: toNumber(height),
      },
      direction
    );
    // @ts-ignore
    setValue(name, (result.price ?? 0).toFixed(2));

    if (pricing.type === 'measured') {
      if (category?.value === 'shipments') {
        // ParcelForce limits read the volume and extent of every parcel.
        const extent =
          result.volume === null
            ? 0
            : calculateExtent({ length, width, height });
        // @ts-ignore
        setValue(volumePropName, result.volume ?? 0);
        // @ts-ignore
        setValue(extentPropName, extent);
      } else if (result.volume !== null) {
        // @ts-ignore
        setValue(volumePropName, result.volume);
      }
      return;
    }

    if (result.volume) {
      // @ts-ignore
      setValue(volumePropName, result.volume);
    }
    if (result.weight && !weight) {
      // @ts-ignore
      setValue(weightPropName, result.weight);
    }
  }, [
    pricing,
    direction,
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
