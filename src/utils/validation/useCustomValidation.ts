/* eslint-disable no-mixed-spaces-and-tabs */
import { TFunction } from 'i18next';
import { ShipmentProps } from '../formTypes';

type ValidationProps = {
  invoiceNeeded?: boolean;
  service?: string;
  formShipment?: ShipmentProps;
  t: TFunction<'translation', undefined>;
};

const notZero = (value: string, t: TFunction<'translation', undefined>) => {
  return parseFloat(value) === 0 ? t('nonZeroField') : true;
};

const useCustomShipmentsValidation = ({
  t,
}: {
  t: TFunction<'translation', undefined>;
}) => {
  return {
    category: { required: t('fieldRequired') },
    productType: { required: t('fieldRequired') },
    size: { required: t('fieldRequired') },
    specification: { required: t('fieldRequired') },
    estimatedPrice: { required: t('fieldRequired') },
    amount: {
      required: t('fieldRequired'),
      validate: {
        notZero: (value: string) => notZero(value, t),
      },
    },
    length: {
      required: t('fieldRequired'),
      validate: {
        notZero: (value: string) => notZero(value, t),
      },
    },
    width: {
      required: t('fieldRequired'),
      validate: {
        notZero: (value: string) => notZero(value, t),
      },
    },
    weight: {
      required: t('fieldRequired'),
      validate: {
        notZero: (value: string) => notZero(value, t),
      },
    },
    height: {
      required: t('fieldRequired'),
      validate: {
        notZero: (value: string) => notZero(value, t),
      },
    },
    volume: { required: t('fieldRequired') },
    extent: { required: t('fieldRequired') },
    shipmentPrice: { required: t('fieldRequired') },
    purchasePriceOfTheItem: {
      required: t('fieldRequired'),
      validate: {
        notZero: (value: string) => notZero(value, t),
      },
    },
    orderedShipmentNumber: {
      required: t('fieldRequired'),
    },
  };
};

export const useCustomValidation = ({
  invoiceNeeded = false,
  service,
  t,
}: ValidationProps) => {
  const combinedLTandUKPhoneNumberRegex = /^\+(44|370)\d+$/;
  return {
    pickupAddress:
      service !== 'shipmentWithAddressService'
        ? { required: t('fieldRequired') }
        : { required: false },
    pickupAddressZipCode:
      service !== 'shipmentWithAddressService'
        ? { required: t('fieldRequired') }
        : { required: false },
    deliveryAddress:
      service !== 'shipmentWithAddressService'
        ? { required: t('fieldRequired') }
        : { required: false },
    deliveryAddressZipCode:
      service !== 'shipmentWithAddressService'
        ? { required: t('fieldRequired') }
        : { required: false },
    dates: {
      from: {
        year: {
          required: t('fieldRequired'),
        },
        month: {
          required: t('fieldRequired'),
        },
        day: {
          required: t('fieldRequired'),
        },
      },
      to: {
        year: {
          required: t('fieldRequired'),
        },
        month: {
          required: t('fieldRequired'),
        },
        day: {
          required: t('fieldRequired'),
        },
      },
    },
    shipments: useCustomShipmentsValidation({ t }),
    senderInformation: {
      firstName: {
        required: t('fieldRequired'),
        minLength: {
          value: 3,
          message: t('minLengthMsg'),
        },
      },
      lastName: {
        required: t('fieldRequired'),
        minLength: {
          value: 3,
          message: t('minLengthMsg'),
        },
      },
      phoneNumber: {
        required: t('fieldRequired'),
        pattern: {
          value: combinedLTandUKPhoneNumberRegex,
          message: t('invalidPhoneNumberFormat'),
        },
      },
      email: {
        required: t('fieldRequired'),
        pattern: {
          value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
          message: t('invalidEmailFormat'),
        },
      },
      address: {
        required: t('fieldRequired'),
        minLength: {
          value: 3,
          message: t('minLengthMsg'),
        },
      },
      zipCode: {
        required: t('fieldRequired'),
        minLength: {
          value: 3,
          message: t('minLengthMsg'),
        },
      },
    },
    recipientInformation: {
      firstName: {
        required: t('fieldRequired'),
        minLength: {
          value: 3,
          message: t('minLengthMsg'),
        },
      },
      lastName: {
        required: t('fieldRequired'),
        minLength: {
          value: 3,
          message: t('minLengthMsg'),
        },
      },
      phoneNumber: {
        required: t('fieldRequired'),
        pattern: {
          value: combinedLTandUKPhoneNumberRegex,
          message: t('invalidPhoneNumberFormat'),
        },
      },
      email: {
        required: t('fieldRequired'),
        pattern: {
          value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
          message: t('invalidEmailFormat'),
        },
      },
      address: {
        required: t('fieldRequired'),
        minLength: {
          value: 3,
          message: t('minLengthMsg'),
        },
      },
      zipCode: {
        required: t('fieldRequired'),
        minLength: {
          value: 3,
          message: t('minLengthMsg'),
        },
      },
    },
    ransomPayeeInformation:
      service === 'productSalesService'
        ? {
            ransomRecipient: {
              required: t('fieldRequired'),
              minLength: {
                value: 3,
                message: t('minLengthMsg'),
              },
            },
            firstName: {
              required: t('fieldRequired'),
              minLength: {
                value: 3,
                message: t('minLengthMsg'),
              },
            },
            lastName: {
              required: t('fieldRequired'),
              minLength: {
                value: 3,
                message: t('minLengthMsg'),
              },
            },
            phoneNumber: {
              required: t('fieldRequired'),
              pattern: {
                value: combinedLTandUKPhoneNumberRegex,
                message: t('invalidPhoneNumberFormat'),
              },
            },
            email: {
              required: t('fieldRequired'),
              pattern: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: t('invalidEmailFormat'),
              },
            },
            address: {
              required: t('fieldRequired'),
              minLength: {
                value: 3,
                message: t('minLengthMsg'),
              },
            },
            zipCode: {
              required: t('fieldRequired'),
              minLength: {
                value: 3,
                message: t('minLengthMsg'),
              },
            },
          }
        : { required: false },
    purchaseInformation:
      service === 'productPurchaseService'
        ? {
            firstName: {
              required: t('fieldRequired'),
              minLength: {
                value: 3,
                message: t('minLengthMsg'),
              },
            },
            lastName: {
              required: t('fieldRequired'),
              minLength: {
                value: 3,
                message: t('minLengthMsg'),
              },
            },
            phoneNumber: {
              required: t('fieldRequired'),
              pattern: {
                value: combinedLTandUKPhoneNumberRegex,
                message: t('invalidPhoneNumberFormat'),
              },
            },
            email: {
              required: t('fieldRequired'),
              pattern: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: t('invalidEmailFormat'),
              },
            },
            address: { required: t('fieldRequired') },
            zipCode: { required: t('fieldRequired') },
          }
        : { required: false },
    customerInformation: {
      payerOfTheShipment: {
        required: t('fieldRequired'),
      },
      paymentMethod: { required: t('fieldRequired') },
    },
    invoiceInformation: invoiceNeeded
      ? {
          companyName: {
            required: t('fieldRequired'),
            minLength: {
              value: 3,
              message: t('minLengthMsg'),
            },
          },
          companyCode: {
            required: t('fieldRequired'),
            minLength: {
              value: 3,
              message: t('minLengthMsg'),
            },
          },
          pvmCode: {
            required: t('fieldRequired'),
            minLength: {
              value: 3,
              message: t('minLengthMsg'),
            },
          },
          companyEmail: {
            required: t('fieldRequired'),
            pattern: {
              value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              message: t('invalidEmailFormat'),
            },
          },
          companyAddress: {
            required: t('fieldRequired'),
            minLength: {
              value: 3,
              message: t('minLengthMsg'),
            },
          },
        }
      : { required: false },
    packagingAndLabelingRules: {
      required: t('agreeToTerms'),
    },
    transportRules: {
      required: t('agreeToTerms'),
    },
  };
};
