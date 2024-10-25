export const getDecemberPickupDays = (
  direction: 'LT-UK' | 'UK-LT' | null
) => {
  if (direction === 'LT-UK') {
    return [
      {
        label: 'Gruodžio 3 - Gruodžio 4',
        value: '3 - 4',
      },
      {
        label: 'Gruodžio 6 - Gruodžio 8',
        value: '6 - 8',
      },
      {
        label: 'Gruodžio 10 - Gruodžio 11',
        value: '10 - 11',
      },
      {
        label: 'Gruodžio 15 - Gruodžio 16',
        value: '15 - 16',
      },
      {
        label: 'Gruodžio 17 - Gruodžio 18',
        value: '17 - 18',
      },
    ];
  } else if (direction === 'UK-LT') {
    return [
      {
        label: 'Gruodžio 6 - Gruodžio 9',
        value: '6 - 9',
      },
      {
        label: 'Gruodžio 10 - Gruodžio 13',
        value: '10 - 13',
      },
      {
        label: 'Gruodžio 14 - Gruodžio 16',
        value: '14 - 16',
      },
      {
        label: 'Gruodžio 18 - Gruodžio 20',
        value: '18 - 20',
      },
    ];
  } else return [];
};

export const getDecemberDeliveryDays = (
  direction: 'LT-UK' | 'UK-LT' | null,
  pickupDayValue: string
) => {
  if (direction === 'LT-UK') {
    switch (pickupDayValue) {
      case '3 - 4': {
        return {
          label: 'Gruodžio 6 - Gruodžio 9',
          value: '6 - 9',
        };
      }
      case '6 - 8': {
        return {
          label: 'Gruodžio 10 - Gruodžio 13',
          value: '10 - 13',
        };
      }
      case '10 - 11': {
        return {
          label: 'Gruodžio 14 - Gruodžio 16',
          value: '14 - 16',
        };
      }
      case '15 - 16': {
        return {
          label: 'Gruodžio 18 - Gruodžio 20',
          value: '18 - 20',
        };
      }
      case '17 - 18': {
        return {
          label: 'Gruodžio 20',
          value: '20 - 20',
        };
      }
    }
  } else if (direction === 'UK-LT') {
    switch (pickupDayValue) {
      case '29 - 1': {
        return {
          label: 'Gruodžio 3 - Gruodžio 4',
          value: '3 - 4',
        };
      }
      case '6 - 9': {
        return {
          label: 'Gruodžio 6 - Gruodžio 8',
          value: '6 - 8',
        };
      }
      case '10 - 13': {
        return {
          label: 'Gruodžio 10 - Gruodžio 11',
          value: '10 - 11',
        };
      }
      case '14 - 16': {
        return {
          label: 'Gruodžio 15 - Gruodžio 16',
          value: '15 - 16',
        };
      }
      case '18 - 20': {
        return {
          label: 'Gruodžio 23',
          value: '23 - 23',
        };
      }
    }
  } else return null;
};
