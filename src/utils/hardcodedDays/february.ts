import i18next from 'i18next';
import { DateDayType } from '../formTypes';

export const getFebruaryPickupDays = (
  direction: 'LT-UK' | 'UK-LT' | null
): DateDayType[] => {
  if (direction === 'LT-UK') {
    return [
      {
        label: `${i18next.t('inFebruary')} 3 - ${i18next.t('inFebruary')} 4`,
        value: '3 - 4',
        key: {
          one: 'inFebruary',
          two: 'inFebruary',
        },
      },
      {
        label: `${i18next.t('inFebruary')} 10 - ${i18next.t('inFebruary')} 11`,
        value: '10 - 11',
        key: {
          one: 'inFebruary',
          two: 'inFebruary',
        },
      },
      {
        label: `${i18next.t('inFebruary')} 17 - ${i18next.t('inFebruary')} 18`,
        value: '17 - 18',
        key: {
          one: 'inFebruary',
          two: 'inFebruary',
        },
      },
      {
        label: `${i18next.t('inFebruary')} 24 - ${i18next.t('inFebruary')} 25`,
        value: '24 - 25',
        key: {
          one: 'inFebruary',
          two: 'inFebruary',
        },
      },
    ];
  } else if (direction === 'UK-LT') {
    return [
      {
        label: `${i18next.t('inFebruary')} 6 - ${i18next.t('inFebruary')} 8`,
        value: '6 - 8',
        key: {
          one: 'inFebruary',
          two: 'inFebruary',
        },
      },
      {
        label: `${i18next.t('inFebruary')} 13 - ${i18next.t('inFebruary')} 15`,
        value: '13 - 15',
        key: {
          one: 'inFebruary',
          two: 'inFebruary',
        },
      },
      {
        label: `${i18next.t('inFebruary')} 20 - ${i18next.t('inFebruary')} 22`,
        value: '20 - 22',
        key: {
          one: 'inFebruary',
          two: 'inFebruary',
        },
      },
      {
        label: `${i18next.t('inFebruary')} 27 - ${i18next.t('inMarch')} 1`,
        value: '27 - 1',
        key: {
          one: 'inFebruary',
          two: 'inFebruary',
        },
      },
    ];
  } else return [];
};

export const getFebruaryDeliveryDays = (
  direction: 'LT-UK' | 'UK-LT' | null,
  pickupDayValue: string
) => {
  if (direction === 'LT-UK') {
    switch (pickupDayValue) {
      case '3 - 4': {
        return {
          label: `${i18next.t('inFebruary')} 6 - ${i18next.t('inFebruary')} 8`,
          value: '6 - 8',
          key: {
            one: 'inFebruary',
            two: 'inFebruary',
          },
        };
      }
      case '10 - 11': {
        return {
          label: `${i18next.t('inFebruary')} 13 - ${i18next.t('inFebruary')} 15`,
          value: '13 - 15',
          key: {
            one: 'inFebruary',
            two: 'inFebruary',
          },
        };
      }
      case '17 - 18': {
        return {
          label: `${i18next.t('inFebruary')} 20 - ${i18next.t('inFebruary')} 22`,
          value: '20 - 22',
          key: {
            one: 'inFebruary',
            two: 'inFebruary',
          },
        };
      }
      case '24 - 25': {
        return {
          label: `${i18next.t('inFebruary')} 27 - ${i18next.t('inMarch')} 1`,
          value: '27 - 1',
          key: {
            one: 'inFebruary',
            two: 'inFebruary',
          },
        };
      }
    }
  } else if (direction === 'UK-LT') {
    switch (pickupDayValue) {
      case '30 - 1': {
        return {
          label: `${i18next.t('inFebruary')} 3 - ${i18next.t('inFebruary')} 4`,
          value: '3 - 4',
          key: {
            one: 'inFebruary',
            two: 'inFebruary',
          },
        };
      }
      case '6 - 8': {
        return {
          label: `${i18next.t('inFebruary')} 10 - ${i18next.t('inFebruary')} 11`,
          value: '10 - 11',
          key: {
            one: 'inFebruary',
            two: 'inFebruary',
          },
        };
      }
      case '13 - 15': {
        return {
          label: `${i18next.t('inFebruary')} 17 - ${i18next.t('inFebruary')} 18`,
          value: '17 - 18',
          key: {
            one: 'inFebruary',
            two: 'inFebruary',
          },
        };
      }
      case '20 - 22': {
        return {
          label: `${i18next.t('inFebruary')} 24 - ${i18next.t('inFebruary')} 25`,
          value: '24 - 25',
          key: {
            one: 'inFebruary',
            two: 'inFebruary',
          },
        };
      }
      case '27 - 1': {
        return {
          label: `${i18next.t('inMarch')} 3 - ${i18next.t('inMarch')} 4`,
          value: '3 - 4',
          key: {
            one: 'inMarch',
            two: 'inMarch',
          },
        };
      }
    }
  } else return null;
};
