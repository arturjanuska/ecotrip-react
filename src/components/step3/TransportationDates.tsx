/* eslint-disable @typescript-eslint/no-explicit-any */
import Step from "../Step";
import Datepicker from "../Datepicker";
import "./step3.css";
import { FieldErrors, UseFormReturn } from "react-hook-form";
import { DatePicketOptions, FormType } from "../../utils/formTypes";
import useDeliveryDate from "../../utils/useDeliveryDate";
import useDateOptions from "../../utils/useDateOptions";
import { transformDateOptionsWithExclusions } from "./transformDateOptionsWithExclusions";

type TransportationDatesProps = {
  methods: UseFormReturn<FormType, any, undefined>;
  formErrors: FieldErrors<FormType>;
  direction: "LT-UK" | "UK-LT" | "LT-LT" | null;
};

const TransportationDates = ({
  methods,
  formErrors,
  direction,
}: TransportationDatesProps) => {
  const { watch, setValue } = methods;

  const yearFrom = watch("dates.from.year.value");
  const monthFrom = watch("dates.from.month.value");
  const dayRangeFromValue = watch("dates.from.day.value");

  const service = methods.watch("service");

  const resetToDates = () => {
    setValue("dates.to.year", null);
    setValue("dates.to.month", null);
    setValue("dates.to.day", null);
  };

  const pickupDate =
    yearFrom && monthFrom && dayRangeFromValue
      ? `${yearFrom}/${monthFrom}/${dayRangeFromValue.split(" - ")[0]}`
      : "";

  // Move this to DatePicker component to avoid unnecessary re-renders
  useDeliveryDate({
    pickupDate,
    direction,
    setValue,
    dayRangeFrom: dayRangeFromValue,
    service,
    selectedYear: yearFrom || null,
  });

  const options: DatePicketOptions = useDateOptions({
    selectedMonth: monthFrom || null,
    direction,
    service,
    selectedYear: yearFrom || null,
  });

  const transformDateOptionsWithExclusionsResult =
    transformDateOptionsWithExclusions({
      calculatedOptions: options,
      selectedYear: parseInt(yearFrom, 10) || null,
      selectedMonth: parseInt(monthFrom, 10) || null,
      direction,
    });

  const showWarningMessage =
    direction === "LT-UK" && monthFrom === "12" && yearFrom === "2024";

  return (
    <Step step={3} title="Siuntos pervežimo datos">
      <>
        <div className="date-fields-container">
          <Datepicker
            fiedsDisabled={false}
            label="Siuntos paėmimo data"
            options={transformDateOptionsWithExclusionsResult}
            control={methods.control}
            name="from"
            formErrors={formErrors}
            resetToDates={resetToDates}
            setValue={setValue}
            service={service}
          />

          <Datepicker
            fiedsDisabled={true}
            label="Siuntos pristatymo data (numatoma)"
            control={methods.control}
            name="to"
            formErrors={formErrors}
            resetToDates={resetToDates}
            service={service}
          />
          {showWarningMessage ? (
            <div className="warning-text">
              <p>
                Atsiprašome, tačiau vietos siuntoms iš Lietuvos į Didžiają
                Britaniją gruodžio mėnesį nebeturime. Registracija uždaryta.
              </p>
              <p>+370 60122 060</p>
              <p>+44 7479 622299</p>
              <p>info@ecotrip.lt</p>
            </div>
          ) : null}
        </div>
      </>
    </Step>
  );
};

export default TransportationDates;
