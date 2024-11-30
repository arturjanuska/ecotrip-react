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

export const validatePostcode = (postcode: string) => {
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

		return isMatch;
	} else {
		return false;
	}
};

type PostCodeObject = {
	postcode: string;
	eastings: string;
	northings: string;
	latitude: string;
	longitude: string;
	town: string;
	region: string;
	country: string;
	countryString: string;
	basicPrice: string;
	additionalCharges: string;
	parcelForceZone: string;
	discount: string;
	calendar: string;
} | null;

const getPostcodeDetails = (postcode: string) => {
	let output: PostCodeObject = null;
	if (!postcode) return output;
	const outcodePattern = /^[A-Z]{1,2}\d{1,2}[A-Z]?/;
	const match = postcode.match(outcodePattern);

	if (match) {
		output = UK_POST_CODES.find((item) => item.postcode === match[0]) || null;
		return output;
	}
	return output;
};

export const checkParcelForcePostcodes = ({
	postcodes,
}: {
	postcodes: string[];
}) => {
	const postcodeDetailsArray = postcodes
		.map((code) => getPostcodeDetails(code))
		.filter((item) => item !== null);

	const postcodeDetails = postcodeDetailsArray[0];

	return {
		isParcelForce: postcodes
			.map((code) => validatePostcode(code))
			.some((item) => item),
		postcodeDetails,
	};
};
