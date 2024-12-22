/* eslint-disable @typescript-eslint/no-explicit-any */
import i18next from 'i18next';
import { OptionType } from './types';

const getTranslatedOptions = (options: OptionType[]) => {
  return options.map((option) => {
    return {
      label: i18next.t(option.label),
      value: option.value,
    };
  }) as OptionType[];
};

export default getTranslatedOptions;
