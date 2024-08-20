import { UKPostcodeType } from './types';
import UK_POST_CODES from './ukPostCodes';

type CheckPostCodesProps = {
  address: {
    from: string;
    to: string;
  };
};

export const checkPostCodes = ({ address }: CheckPostCodesProps) => {
  let path: string = '';
  let foundPostcode: UKPostcodeType | null = null;

  const formattedData = Object.entries(address).map(([key, value]) => {
    return {
      direction: key,
      value,
    };
  });

  const fromObj = formattedData.find((obj) => obj.direction === 'from');

  foundPostcode =
    UK_POST_CODES.find((ukObj) => {
      return fromObj?.value.toUpperCase().includes(ukObj.postcode);
    }) || null;

  const isStandartPrices = foundPostcode?.basicPrice === 'Ecotrip pricelist';
  if (isStandartPrices) {
    path = '/address-form/standart-prices';
  } else {
    path = '/address-form/parcel-force-prices';
  }

  return {
    path,
    foundPostcode,
  };
};

export const test = (
  postcode: string,
  setPostCodeObject: (obj: any) => void
) => {
  if (!postcode) return false;
  const outcodePattern = /^[A-Z]{1,2}\d{1,2}[A-Z]?/;
  const match = postcode.match(outcodePattern);

  if (match) {
    const outcode = match[0];

    const isMatch = UK_POST_CODES.some(
      (item) =>
        item.postcode === outcode &&
        item.additionalCharges === 'Parcel force pricelist'
    );
    const obj = UK_POST_CODES.find((item) => item.postcode === outcode);

    setPostCodeObject(obj || null);

    if (isMatch) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const checkParcelForcePostcodes = ({
  postcodes,
  setPostCodeObject,
}: {
  postcodes: string[];
  setPostCodeObject: (obj: any) => void;
}): boolean => {
  const result = postcodes.map((code) => test(code, setPostCodeObject));
  return result.some((res) => res);
};
