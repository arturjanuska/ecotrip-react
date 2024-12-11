import { DatePicketOptions } from "../../utils/formTypes";
import { getJan2025DaysOptions } from "./exclusions/2025/january";

export const transformDateOptionsWithExclusions = ({
  calculatedOptions,
  selectedYear,
  selectedMonth,
  direction,
}: {
  calculatedOptions: DatePicketOptions;
  selectedYear: number | null;
  selectedMonth: number | null;
  direction: "LT-UK" | "UK-LT" | "LT-LT" | null;
}) => {
  if (selectedYear === 2025 && selectedMonth === 1) {
    return { ...calculatedOptions, days: getJan2025DaysOptions({ direction }) };
  }

  return calculatedOptions;
};
