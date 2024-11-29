import { DirectionType } from "./formTypes";

export const getIconColor = (
  service: string,
  isParcelForce: boolean,
  direction: DirectionType,
): "#9AA61E" | "#7A777680" => {
  return isCardDisabled(service, isParcelForce, direction)
    ? "#7A777680"
    : "#9AA61E";
};

export const isCardDisabled = (
  service: string,
  isParcelForce: boolean,
  direction: DirectionType,
) => {
  if (
    (isParcelForce &&
      service !== "parcelForceShipment" &&
      service !== "shipmentWithAddressService") ||
    (!direction && service !== "shipmentWithAddressService") ||
    (direction && direction === "LT-LT")
  ) {
    return true;
  } else {
    return false;
  }
};
