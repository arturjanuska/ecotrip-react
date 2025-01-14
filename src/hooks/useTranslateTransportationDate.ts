/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form';
import { FormType } from '../utils/formTypes';
import i18n from 'i18next';
import { useEffect } from 'react';
import { monthNamesForMonthSelect } from '../components/step3/monthNames';

const useTranslateTransportationDate = ({
  currentLanguage,
  methods,
}: {
  currentLanguage: string;
  methods: UseFormReturn<FormType, any, undefined>;
}) => {
  const { setValue } = methods;

  const dates = methods.watch('dates');

  const selectedMonthIndex = dates?.from?.month?.value
    ? parseInt(dates?.from?.month?.value)
    : null;

  const translatePickupDate = () => {
    if (selectedMonthIndex) {
      // Translates month name
      const monthKey = monthNamesForMonthSelect[selectedMonthIndex - 1];
      setValue('dates.from.month', {
        label: i18n.t(monthKey),
        value: selectedMonthIndex.toString(),
      });
    }
    // Translates days range
    const selectedDay = dates?.from?.day;
    if (selectedDay) {
      const selectedDayOptionLabel = selectedDay.label;
      const splittedLabels = selectedDayOptionLabel.split(' - ');
      const selectedDayFromLabel = splittedLabels[0];
      const selectedDayToLabel = splittedLabels[1];
      const monthKeyOne = selectedDay?.key?.one || '';
      const monthKeyTwo = selectedDay?.key?.two || '';

      const translatedLabel = `${i18n.t(monthKeyOne)} ${selectedDayFromLabel.split(' ')[1]} - ${i18n.t(monthKeyTwo)} ${selectedDayToLabel.split(' ')[1]}`;
      setValue('dates.from.day', {
        label: translatedLabel,
        value: selectedDay.value,
        key: {
          one: monthKeyOne,
          two: monthKeyTwo,
        },
      });
    }
  };

  useEffect(() => {
    translatePickupDate();
  }, [currentLanguage]);
};

export default useTranslateTransportationDate;
