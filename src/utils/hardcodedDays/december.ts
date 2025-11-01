import i18next from 'i18next';
import { DateDayType } from '../formTypes';

export const getDecemberPickupDays = (
  direction: 'LT-UK' | 'UK-LT' | null
): DateDayType[] => {
  if (direction === 'LT-UK') {
    return [
      {
        label: `${i18next.t('inDecember')} 2 - ${i18next.t('inDecember')} 3`,
        value: '2 - 3',
        key: {
          one: 'inDecember',
          two: 'inDecember',
        },
      },
      {
        label: `${i18next.t('inDecember')} 10 - ${i18next.t('inDecember')} 12`,
        value: '10 - 12',
        key: {
          one: 'inDecember',
          two: 'inDecember',
        },
      },
    ];
  } else if (direction === 'UK-LT') {
    return [
      {
        label: `${i18next.t('inDecember')} 5 - ${i18next.t('inDecember')} 7`,
        value: '5 - 7',
        key: {
          one: 'inDecember',
          two: 'inDecember',
        },
      },
      {
        label: `${i18next.t('inDecember')} 15 - ${i18next.t('inDecember')} 18`,
        value: '15 - 18',
        key: {
          one: 'inDecember',
          two: 'inDecember',
        },
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
      case '2 - 3': {
        return {
          label: `${i18next.t('inDecember')} 5 - ${i18next.t('inDecember')} 7`,
          value: '5 - 7',
          key: {
            one: 'inDecember',
            two: 'inDecember',
          },
        };
      }
      case '10 - 12': {
        return {
          label: `${i18next.t('inDecember')} 15 - ${i18next.t('inDecember')} 18`,
          value: '15 - 18',
          key: {
            one: 'inDecember',
            two: 'inDecember',
          },
        };
      }
    }
  } else if (direction === 'UK-LT') {
    switch (pickupDayValue) {
      case '5 - 7': {
        return {
          label: `${i18next.t('inDecember')} 10 - ${i18next.t('inDecember')} 12`,
          value: '10 - 12',
          key: {
            one: 'inDecember',
            two: 'inDecember',
          },
        };
      }
      case '15 - 18': {
        return {
          label: `${i18next.t('inDecember')} 21 - ${i18next.t('inDecember')} 22`,
          value: '21 - 22',
          key: {
            one: 'inDecember',
            two: 'inDecember',
          },
        };
      }
    }
  } else return null;
};
