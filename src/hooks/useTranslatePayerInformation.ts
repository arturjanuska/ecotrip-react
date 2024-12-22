/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form';
import { FormType } from '../utils/formTypes';
import i18next from 'i18next';
import { useEffect } from 'react';

const useTranslatePayerInformation = ({
  currentLanguage,
  methods,
}: {
  currentLanguage: string;
  methods: UseFormReturn<FormType, any, undefined>;
}) => {
  const { setValue, watch } = methods;

  const payerOfTheShipmentSelect = watch(
    'customerInformation.payerOfTheShipment'
  );
  const paymentMethodSelect = watch('customerInformation.paymentMethod');

  const translatePayerInformation = () => {
    console.log('payerOfTheShipmentSelect ===> ', payerOfTheShipmentSelect);
    if (payerOfTheShipmentSelect?.value) {
      const translatedLabel = i18next.t(payerOfTheShipmentSelect.value);
      console.log('translatedLabel ===> ', translatedLabel);
      setValue('customerInformation.payerOfTheShipment', {
        label: translatedLabel,
        value: payerOfTheShipmentSelect.value,
      });
    }
    if (paymentMethodSelect?.value) {
      const translatedLabel = i18next.t(paymentMethodSelect.value);
      setValue('customerInformation.paymentMethod', {
        label: translatedLabel,
        value: paymentMethodSelect.value,
      });
    }
  };

  useEffect(() => {
    translatePayerInformation();
  }, [currentLanguage]);
};

export default useTranslatePayerInformation;
