type Props = {
	weight?: string;
	length?: string;
	width?: string;
	height?: string;
	categoryValue?: string;
	amount: number;
};

export const calculateShipmentPrice = ({ weight = '0', amount }: Props) => {
	if (!weight) return;
	let price = 0;
	const value = Number(weight);
	if (value <= 1 && value !== 0) {
		price = 25;
	}
	if (value > 1 && value <= 5) {
		price = 35;
	}
	if (value > 5 && value <= 15) {
		price = 40;
	}
	if (value > 15 && value <= 30) {
		price = 45;
	}
	if (value > 30 && value <= 35) {
		price = value * 1.5;
	}
	if (value > 35 && value <= 50) {
		price = value * 1.49;
		price = price * 1.05;
	}
	if (value > 50 && value <= 100) {
		price = value * 1.46;
		price = price * 1.07;
	}
	if (value > 100) {
		price = value * 1.35;
		price = price * 1.1;
	}

	price = price * amount;
	return price.toFixed(2) ?? '0.00';
};

export const calculateVolume = ({
	length,
	width,
	height,
	categoryValue,
	amount,
}: Props) => {
	if (!length || !width || !height) return;
	let pricePerUnit = 200;

	const lengthInMeters = Number(length) / 100;
	const widthInMeters = Number(width) / 100;
	const heightInMeters = Number(height) / 100;

	const volume = lengthInMeters * widthInMeters * heightInMeters;

	if (categoryValue === 'removals') {
		if (volume <= 1) {
			pricePerUnit = 200;
		}
		if (volume > 1 && volume <= 2) {
			pricePerUnit = 185;
		}
		if (volume > 2 && volume <= 3) {
			pricePerUnit = 170;
		}
		if (volume > 3 && volume <= 5) {
			pricePerUnit = 150;
		}
		if (volume > 5 && volume <= 10) {
			pricePerUnit = 130;
		}
		if (volume > 10) {
			pricePerUnit = 115;
		}
	}

	const price = volume * pricePerUnit * amount;

	if (price) {
		return price.toFixed(2);
	} else {
		return '0.00';
	}
};
