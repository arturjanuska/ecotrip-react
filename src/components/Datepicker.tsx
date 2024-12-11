/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import FieldContainer from "./FieldContainer";
import ControlledStyledSelect from "./ControlledStyledSelect";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import { FormType } from "../utils/formTypes";
import { useCustomValidation } from "../utils/validation/useCustomValidation";

type Props = {
  fiedsDisabled: boolean;
  label: string;
  options?: {
    years: { label: string; value: string }[];
    months: { label: string; value: string }[];
    days: { label: string; value: string }[];
  };
  className?: string;
  control: Control<FormType, any>;
  name: string;
  formErrors: FieldErrors<FormType>;
  resetToDates: () => void;
  setValue?: UseFormSetValue<FormType>;
  service?: string;
};

const Datepicker = ({
  fiedsDisabled,
  label,
  options,
  className,
  control,
  name,
  formErrors,
  resetToDates,
  setValue,
  service,
}: Props) => {
  const validationRules = useCustomValidation({ service });

  return (
    <FieldContainer label={label} className={className}>
      <div className="date-picker-wrapper">
        <div>
          <ControlledStyledSelect
            placeholder="Metai"
            options={options?.years || []}
            isDisabled={fiedsDisabled}
            control={control}
            name={`dates.${name}.year`}
            errorMessage={
              name === "from"
                ? formErrors.dates?.from?.year?.message
                : formErrors.dates?.to?.year?.message
            }
            needMargin={true}
            rules={
              name === "from"
                ? validationRules.dates.from.year
                : validationRules.dates.to.year
            }
            // @ts-ignore
            onChange={() => {
              setValue?.("dates.from.day", null);
              setValue?.("dates.from.month", null);
              resetToDates();
            }}
          />
        </div>
        <div>
          <ControlledStyledSelect
            placeholder="Mėnuo"
            options={options?.months || []}
            isDisabled={fiedsDisabled}
            control={control}
            name={`dates.${name}.month`}
            errorMessage={
              name === "from"
                ? formErrors.dates?.from?.month?.message
                : formErrors.dates?.to?.month?.message
            }
            needMargin={true}
            rules={
              name === "from"
                ? validationRules.dates.from.month
                : validationRules.dates.to.month
            }
            onChange={() => {
              setValue?.("dates.from.day", null);
              resetToDates();
            }}
          />
        </div>
        <div>
          <ControlledStyledSelect
            placeholder="Diena"
            options={options?.days || []}
            isDisabled={fiedsDisabled}
            control={control}
            name={`dates.${name}.day`}
            errorMessage={
              name === "from"
                ? formErrors.dates?.from?.day?.message
                : formErrors.dates?.to?.day?.message
            }
            needMargin={true}
            rules={
              name === "from"
                ? validationRules.dates.from.day
                : validationRules.dates.to.day
            }
          />
        </div>
      </div>
    </FieldContainer>
  );
};

export default Datepicker;
