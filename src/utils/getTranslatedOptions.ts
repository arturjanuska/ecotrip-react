/* eslint-disable @typescript-eslint/no-explicit-any */
import { OptionType } from "./types";

const getTranslatedOptions = (options: OptionType[], t: any) => {
  return options.map((option) => {
    return {
      label: t(option.label),
      value: option.value,
    };
  });
};

export default getTranslatedOptions;
