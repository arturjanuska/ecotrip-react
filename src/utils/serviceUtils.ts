import { DirectionType } from './formTypes';

export const getIconColor = (
  service: string,
  isParcelForce: boolean,
  direction: DirectionType
): string => {
  // brand-deep, or ink at 30% when the service cannot be chosen.
  return isCardDisabled(service, isParcelForce, direction)
    ? 'rgba(7, 17, 13, 0.3)'
    : '#5f7300';
};

export const isCardDisabled = (
  service: string,
  isParcelForce: boolean,
  direction: DirectionType
) => {
  if (
    (isParcelForce &&
      service !== 'parcelForceShipment' &&
      service !== 'shipmentWithAddressService') ||
    (!direction && service !== 'shipmentWithAddressService') ||
    (direction && direction === 'LT-LT')
  ) {
    return true;
  } else {
    return false;
  }
};
