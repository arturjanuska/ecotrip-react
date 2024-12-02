/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormType, ShipmentProps } from '../utils/formTypes';
import i18n from 'i18next';

const useTranslateParcelData = ({
  currentLanguage,
  methods,
}: {
  currentLanguage: string;
  methods: UseFormReturn<FormType, any, undefined>;
}) => {
  const { setValue, watch } = methods;
  const formData = watch();

  const { shipments } = formData;

  const keys = ['category', 'productType', 'size', 'specification'];

  const translateShipment = ({
    shipment,
    index,
  }: {
    shipment: ShipmentProps;
    index: number;
  }) => {
    let translatedShipment = shipment;
    Object.entries(shipment).forEach(([key, value]) => {
      if (
        typeof value === 'object' &&
        value !== null &&
        'label' in value &&
        'value' in value
      ) {
        const translatedValues = {
          label: i18n.t(value.value),
          value: value.value,
        };

        translatedShipment = {
          ...translatedShipment,
          [key]: translatedValues,
        };

        if (keys.includes(key)) {
          replaceKeyValues({
            entries: { [key]: translatedValues },
            index,
          });
        }
      }
    });

    return translatedShipment;
  };

  const replaceKeyValues = ({
    entries,
    index,
  }: {
    entries: Record<
      string,
      {
        label: string;
        value: string;
      }
    >;
    index: number;
  }) => {
    Object.entries(entries).forEach(([key, value]) => {
      // @ts-ignore
      setValue(`shipments.${index}.${key}` as keyof FormType, value);
    });
  };

  useEffect(() => {
    const data = shipments || [];
    if (data.length > 0) {
      data.map((shipment: ShipmentProps, i: number) => {
        translateShipment({ shipment, index: i });
      });
    }
  }, [currentLanguage]);
};

export default useTranslateParcelData;
