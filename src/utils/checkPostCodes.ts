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

	const filteredPostcodes: string[] = UK_POST_CODES.map((obj) => obj.postcode)
		.filter((code) => {
			const postCodesArray: string[] = [];
			if (postCodesArray.includes(code)) {
				return false;
			} else {
				postCodesArray.push(code);
			}
			return postCodesArray;
		})
		.sort((a, b) => a.localeCompare(b));

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

export const test = (postcode: string) => {
	if (!postcode) return false;
	// Extract the first part of the typed postcode (outcode)
	const outcodePattern = /^[A-Z]{1,2}\d{1,2}[A-Z]?/;
	const match = postcode.match(outcodePattern);

	if (match) {
		const outcode = match[0];

		// Check if the outcode matches any postcode in the array
		const isMatch = UK_POST_CODES.some((item) => item.postcode === outcode);

		if (isMatch) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

export const checkParcelForcePostcodes = (postcodes: string[]): boolean => {
	const result = postcodes.map((code) => test(code));
	return result.some((res) => res);
};
