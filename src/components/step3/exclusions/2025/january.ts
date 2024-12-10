export const getJan2025DaysOptions = ({
	direction,
}: {
	direction: 'LT-UK' | 'UK-LT' | 'LT-LT' | null;
}) => {
	if (direction === 'LT-UK')
		return [
			{ label: 'Sausio 2', value: '2' },
			{ label: 'Sausio 7 - Sausio 8', value: '7 - 8' },
			{ label: 'Sausio 14 - Sausio 15', value: '14 - 15' },
			{ label: 'Sausio 21 - Sausio 22', value: '21 - 22' },
			{ label: 'Sausio 28 - Sausio 29', value: '28 - 29' },
		];
	if (direction === 'UK-LT')
		return [
			{ label: 'Sausio 4 - Sausio 5', value: '4 - 5' },
			{ label: 'Sausio 10 - Sausio 12', value: '10 - 12' },
			{ label: 'Sausio 17 - Sausio 19', value: '17 - 19' },
			{ label: 'Sausio 24 - Sausio 26', value: '24 - 26' },
			{ label: 'Sausio 31 - Vasario 2', value: '31 - 2' },
		];
	return [];
};

export const getJanuaryDeliveryDays = ({
	direction,
	pickupDayValue,
}: {
	direction: 'LT-UK' | 'UK-LT' | null;
	pickupDayValue: string;
}) => {
	if (direction === 'LT-UK') {
		switch (pickupDayValue) {
			case '2': {
				return {
					label: 'Sausio 4 - Sausio 5',
					value: '4 - 5',
				};
			}
			case '7 - 8': {
				return {
					label: 'Sausio 10 - Sausio 12',
					value: '10 - 12',
				};
			}
			case '14 - 15': {
				return {
					label: 'Sausio 17 - Sausio 19',
					value: '17 - 19',
				};
			}
			case '21 - 22': {
				return {
					label: 'Sausio 24 - Sausio 26',
					value: '24 - 26',
				};
			}
			case '28 - 29': {
				return {
					label: 'Sausio 28 - Sausio 29',
					value: '28 - 29',
				};
			}
		}
	} else if (direction === 'UK-LT') {
		switch (pickupDayValue) {
			case '4 - 5': {
				return {
					label: 'Sausio 7 - Sausio 8',
					value: '7 - 8',
				};
			}
			case '10 - 12': {
				return {
					label: 'Sausio 14 - Sausio 15',
					value: '14 - 15',
				};
			}
			case '17 - 19': {
				return {
					label: 'Sausio 21 - Sausio 22',
					value: '21 - 22',
				};
			}
			case '24 - 26': {
				return {
					label: 'Sausio 28 - Sausio 29',
					value: '28 - 29',
				};
			}
			case '31 - 2': {
				return {
					label: 'Vasario 4 - Vasario 5',
					value: '4 - 5',
				};
			}
		}
	} else return null;
};
