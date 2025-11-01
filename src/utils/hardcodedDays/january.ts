import i18next from 'i18next';
import { DateDayType } from '../formTypes';

export const getJanuaryPickupDays = (
  direction: 'LT-UK' | 'UK-LT' | null
): DateDayType[] => {
  if (direction === 'LT-UK') {
    return [
      {
        label: `${i18next.t('inJanuary')} 6 - ${i18next.t('inJanuary')} 7`,
        value: '6 - 7',
        key: {
          one: 'inJanuary',
          two: 'inJanuary',
        },
      },
      {
        label: `${i18next.t('inJanuary')} 13 - ${i18next.t('inJanuary')} 14`,
        value: '13 - 14',
        key: {
          one: 'inJanuary',
          two: 'inJanuary',
        },
      },
      {
        label: `${i18next.t('inJanuary')} 20 - ${i18next.t('inJanuary')} 21`,
        value: '20 - 21',
        key: {
          one: 'inJanuary',
          two: 'inJanuary',
        },
      },
      {
        label: `${i18next.t('inJanuary')} 27 - ${i18next.t('inJanuary')} 28`,
        value: '27 - 28',
        key: {
          one: 'inJanuary',
          two: 'inJanuary',
        },
      },
    ];
  } else if (direction === 'UK-LT') {
    return [
      {
        label: `${i18next.t('inJanuary')} 9 - ${i18next.t('inJanuary')} 11`,
        value: '9 - 11',
        key: {
          one: 'inJanuary',
          two: 'inJanuary',
        },
      },
      {
        label: `${i18next.t('inJanuary')} 16 - ${i18next.t('inJanuary')} 18`,
        value: '16 - 18',
        key: {
          one: 'inJanuary',
          two: 'inJanuary',
        },
      },
      {
        label: `${i18next.t('inJanuary')} 23 - ${i18next.t('inJanuary')} 25`,
        value: '23 - 25',
        key: {
          one: 'inJanuary',
          two: 'inJanuary',
        },
      },
      {
        label: `${i18next.t('inJanuary')} 30 - ${i18next.t('inFebruary')} 1`,
        value: '30 - 1',
        key: {
          one: 'inJanuary',
          two: 'inFebruary',
        },
      },
    ];
  } else return [];
};

export const getJanuaryDeliveryDays = (
  direction: 'LT-UK' | 'UK-LT' | null,
  pickupDayValue: string
) => {
  if (direction === 'LT-UK') {
    switch (pickupDayValue) {
      case '6 - 7': {
        return {
          label: `${i18next.t('inJanuary')} 9 - ${i18next.t('inJanuary')} 11`,
          value: '9 - 11',
          key: {
            one: 'inJanuary',
            two: 'inJanuary',
          },
        };
      }
      case '13 - 14': {
        return {
          label: `${i18next.t('inJanuary')} 16 - ${i18next.t('inJanuary')} 18`,
          value: '16 - 18',
          key: {
            one: 'inJanuary',
            two: 'inJanuary',
          },
        };
      }
      case '20 - 21': {
        return {
          label: `${i18next.t('inJanuary')} 23 - ${i18next.t('inJanuary')} 25`,
          value: '23 - 25',
          key: {
            one: 'inJanuary',
            two: 'inJanuary',
          },
        };
      }
      case '27 - 28': {
        return {
          label: `${i18next.t('inJanuary')} 30 - ${i18next.t('inFebruary')} 1`,
          value: '30 - 1',
          key: {
            one: 'inJanuary',
            two: 'inFebruary',
          },
        };
      }
    }
  } else if (direction === 'UK-LT') {
    switch (pickupDayValue) {
      case '9 - 11': {
        return {
          label: `${i18next.t('inJanuary')} 13 - ${i18next.t('inJanuary')} 14`,
          value: '13 - 14',
          key: {
            one: 'inJanuary',
            two: 'inJanuary',
          },
        };
      }
      case '16 - 18': {
        return {
          label: `${i18next.t('inJanuary')} 20 - ${i18next.t('inJanuary')} 21`,
          value: '20 - 21',
          key: {
            one: 'inJanuary',
            two: 'inJanuary',
          },
        };
      }
      case '23 - 25': {
        return {
          label: `${i18next.t('inJanuary')} 27 - ${i18next.t('inJanuary')} 28`,
          value: '27 - 28',
          key: {
            one: 'inJanuary',
            two: 'inJanuary',
          },
        };
      }
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
    }
  } else return null;
};
