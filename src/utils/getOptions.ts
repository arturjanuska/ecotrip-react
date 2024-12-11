import { OptionType, RangeSizeType } from "./types";

export type AnyOptionType = OptionType | RangeSizeType;

export const getOptions = (data: OptionType[]) => {
  const value = data as AnyOptionType[];
  return value
    .reduce((acc, curr) => {
      if (isOptionType(curr)) {
        if (!acc.some((obj) => isOptionType(obj) && obj.value === curr.value)) {
          return [...acc, curr];
        }
      } else {
        if (
          !acc.some(
            (obj) =>
              isRangeOptionType(obj) &&
              obj.from === curr.from &&
              obj.to === curr.to,
          )
        ) {
          return [...acc, curr];
        }
      }
      return acc;
    }, [] as AnyOptionType[])
    .sort((a, b) => {
      if (isOptionType(a) && isOptionType(b)) {
        return a.label.localeCompare(b.label);
      } else if (isRangeOptionType(a) && isRangeOptionType(b)) {
        return a.from - b.from;
      } else if (isOptionType(a) && isRangeOptionType(b)) {
        return -1; // or any custom sorting logic
      } else {
        return 1; // or any custom sorting logic
      }
    });
};

function isOptionType(option: AnyOptionType): option is OptionType {
  return (option as OptionType).value !== undefined;
}

function isRangeOptionType(option: AnyOptionType): option is RangeSizeType {
  return (
    (option as RangeSizeType).from !== undefined &&
    (option as RangeSizeType).to !== undefined
  );
}
