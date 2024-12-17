export const getDecemberPickupDays = (direction: "LT-UK" | "UK-LT" | null) => {
  if (direction === "LT-UK") {
    return [
      // {
      // 	label: 'Gruodžio 3 - Gruodžio 4',
      // 	value: '3 - 4',
      // },
      // {
      //   label: "Gruodžio 10 - Gruodžio 11",
      //   value: "10 - 11",
      // },
      // {
      //   label: "Gruodžio 13 - Gruodžio 15",
      //   value: "13 - 15",
      // },
      {
        label: "Gruodžio 17 - Gruodžio 18",
        value: "17 - 18",
      },
    ];
  } else if (direction === "UK-LT") {
    return [
      // {
      // 	label: 'Gruodžio 6 - Gruodžio 8',
      // 	value: '6 - 8',
      // },
      // {
      //   label: "Gruodžio 13 - Gruodžio 15",
      //   value: "13 - 15",
      // },
      {
        label: "Gruodžio 18 - Gruodžio 20",
        value: "18 - 20",
      },
      {
        label: "Gruodžio 20 - Gruodžio 22",
        value: "20 - 22",
      },
    ];
  } else return [];
};

export const getDecemberDeliveryDays = (
  direction: "LT-UK" | "UK-LT" | null,
  pickupDayValue: string,
) => {
  if (direction === "LT-UK") {
    switch (pickupDayValue) {
      // case '3 - 4': {
      // 	return {
      // 		label: 'Gruodžio 6 - Gruodžio 8',
      // 		value: '6 - 8',
      // 	};
      // }
      case "10 - 11": {
        return {
          label: "Gruodžio 13 - Gruodžio 15",
          value: "13 - 15",
        };
      }
      case "13 - 15": {
        return {
          label: "Gruodžio 18 - Gruodžio 20",
          value: "18 - 20",
        };
      }
      case "17 - 18": {
        return {
          label: "Gruodžio 20 - Gruodžio 22",
          value: "20 - 22",
        };
      }
    }
  } else if (direction === "UK-LT") {
    switch (pickupDayValue) {
      // case '30 - 2': {
      // 	return {
      // 		label: 'Gruodžio 3 - Gruodžio 4',
      // 		value: '3 - 4',
      // 	};
      // }
      // case '6 - 8': {
      // 	return {
      // 		label: 'Gruodžio 10 - Gruodžio 11',
      // 		value: '10 - 11',
      // 	};
      // }
      case "13 - 15": {
        return {
          label: "Gruodžio 17 - Gruodžio 18",
          value: "17 - 18",
        };
      }
      case "18 - 20": {
        return {
          label: "Gruodžio 23",
          value: "23 - 23",
        };
      }
      case "20 - 22": {
        return {
          label: "Gruodžio 27 - Gruodžio 30",
          value: "27 - 30",
        };
      }
    }
  } else return null;
};
