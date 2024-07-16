import { OptionType } from "./types";

export const getOptions = (data: OptionType[]) => {
  return data
    .reduce((acc, curr) => {
      if (!acc.some((obj) => obj.value === curr.value)) {
        return [...acc, curr];
      } else {
        return acc;
      }
    }, [] as OptionType[])
    .sort((a, b) => a.label.localeCompare(b.label));
};
