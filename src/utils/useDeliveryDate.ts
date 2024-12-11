/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FormType } from "./formTypes";
import {
  monthNamesForDaySelect,
  monthNamesForMonthSelect,
} from "../components/step3/monthNames";
import { getDecemberDeliveryDays } from "./hardcodedDays/december";
import { getJanuaryDeliveryDays } from "../components/step3/exclusions/2025/january";

type Props = {
  pickupDate: string;
  direction: "UK-LT" | "LT-UK" | "LT-LT" | null;
  setValue: UseFormSetValue<FormType>;
  dayRangeFrom?: string;
  service?: string;
  selectedYear: string | null;
};

const useDeliveryDate = ({
  pickupDate,
  direction,
  setValue,
  dayRangeFrom,
  service,
  selectedYear,
}: Props) => {
  useEffect(() => {
    const getDeliveryDate = () => {
      if (!pickupDate || direction === "LT-LT") {
        setValue("dates.to.year", null);
        setValue("dates.to.month", null);
        setValue("dates.to.day", null);
        return;
      }

      const currentYear = dayjs().year();
      const nextYear = currentYear + 1;

      console.log("dayRangeFrom ===", dayRangeFrom);

      const pickupStart = pickupDate;
      console.log("pickupStart ===", pickupStart);
      const splittedDayRangeFrom = dayRangeFrom?.split(" - ");
      console.log("splittedDayRangeFrom ===", splittedDayRangeFrom);

      const pickupEndDay =
        splittedDayRangeFrom?.length === 2
          ? dayRangeFrom?.split(" - ")[1]
          : splittedDayRangeFrom?.length === 1
            ? splittedDayRangeFrom[0]
            : null;

      const pickupMonth = parseInt(pickupStart.split("/")[1], 10);

      const is_UK_LT = direction === "UK-LT";
      const deliveryDays = is_UK_LT ? [2, 3] : [0, 5, 6];

      const findNextValidDay = (date: Dayjs, validDays: number[]) => {
        while (!validDays.includes(date.day())) {
          date = date.add(1, "day");
        }
        return date;
      };

      const findNextAfterNextValidDay = (date: Dayjs, validDays: number[]) => {
        date = findNextValidDay(date, validDays);
        date = date.add(7, "day");
        date = findNextValidDay(date, validDays);
        return date;
      };

      const getDeliveryYear = (selectedYear: string | null) => {
        const currentYear = dayjs().year();

        const nextYear = currentYear + 1;

        // if selectedYear is not null and it is equal to nextYear, delivery date year is always nextYear
        if (selectedYear && parseInt(selectedYear, 10) === nextYear) {
          return nextYear;
        }

        if (pickupMonth == 12) {
          if (pickupEndDay === "1" || pickupEndDay === "2") {
            return nextYear;
          }
          return currentYear;
        }
        return currentYear;
      };

      const getDeliveryMonth = () => {
        if (splittedDayRangeFrom && splittedDayRangeFrom.length === 2) {
          return pickupEndDay === "1" || pickupEndDay === "2"
            ? pickupMonth + 1 < 13
              ? pickupMonth + 1
              : 1
            : pickupMonth;
        }
        return pickupMonth;
      };

      const pickupEndDate = dayjs(
        `${getDeliveryYear(selectedYear)}-${getDeliveryMonth()}-${pickupEndDay}`,
      ).add(1, "day");

      const deliveryStartDate =
        service === "parcelForceShipment"
          ? findNextAfterNextValidDay(pickupEndDate, deliveryDays)
          : findNextValidDay(pickupEndDate, deliveryDays);

      const deliveryEndDate = deliveryStartDate.add(is_UK_LT ? 1 : 2, "day");

      const deliveryStartDateDay = deliveryStartDate.format("D");
      const deliveryEndDateDay = deliveryEndDate.format("D");
      const month = deliveryStartDate.format("MM");

      const deliveryStartDateDayLabel = `${
        monthNamesForDaySelect[parseInt(month, 10) - 1]
      } ${deliveryStartDateDay}`;

      const deliveryEndDateDayLabel =
        parseInt(month, 10) === 12
          ? `${monthNamesForDaySelect[0]} ${deliveryEndDateDay}`
          : `${
              monthNamesForDaySelect[
                parseInt(deliveryEndDateDay, 10) === 1 ||
                parseInt(deliveryEndDateDay, 10) === 2
                  ? parseInt(month, 10)
                  : parseInt(month, 10) - 1
              ]
            } ${deliveryEndDateDay}`;

      const deliveryYear = deliveryStartDate.format("YYYY");
      const deliveryMonth = deliveryStartDate.format("MM");

      const deliveryDate = {
        year: deliveryYear,
        month: deliveryMonth,
        day: `${deliveryStartDateDay} - ${deliveryEndDateDay}`,
      };

      setValue("dates.to.year", {
        label: deliveryDate.year,
        value: deliveryDate.year,
      });

      setValue("dates.to.month", {
        label: monthNamesForMonthSelect[deliveryStartDate.month()],
        value: deliveryDate.month,
      });

      console.log("deliveryStartDate ===", deliveryStartDate.format("YYYY"));

      if (getDeliveryMonth() === 12) {
        // December hardcoded days
        setValue(
          "dates.to.day",
          getDecemberDeliveryDays(direction, dayRangeFrom as string) || null,
        );
      } else if (
        deliveryYear === String(nextYear) &&
        getDeliveryMonth() === 1
      ) {
        // January hardcoded days
        setValue(
          "dates.to.day",
          getJanuaryDeliveryDays({
            direction,
            pickupDayValue: dayRangeFrom as string,
          }) || null,
        );
      } else {
        setValue("dates.to.day", {
          label: `${deliveryStartDateDayLabel} - ${deliveryEndDateDayLabel}`,
          value: deliveryDate.day,
        });
      }
    };

    if (dayRangeFrom) {
      getDeliveryDate();
    } else {
      setValue("dates.to.year", null);
      setValue("dates.to.month", null);
      setValue("dates.to.day", null);
    }
  }, [pickupDate, direction, setValue, dayRangeFrom, service]);
};

export default useDeliveryDate;
