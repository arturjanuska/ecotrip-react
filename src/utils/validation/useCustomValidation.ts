/* eslint-disable no-mixed-spaces-and-tabs */
import i18next from 'i18next';
import { ShipmentProps } from '../formTypes';

type ValidationProps = {
  invoiceNeeded?: boolean;
  service?: string;
  formShipment?: ShipmentProps;
};

const notZero = (value: string) => {
  return parseFloat(value) === 0 ? i18next.t('nonZeroField') : true;
};

const useCustomShipmentsValidation = () => {
  return {
    category: { required: i18next.t('fieldRequired') },
    productType: { required: i18next.t('fieldRequired') },
    size: { required: i18next.t('fieldRequired') },
    specification: { required: i18next.t('fieldRequired') },
    estimatedPrice: { required: i18next.t('fieldRequired') },
    amount: {
      required: i18next.t('fieldRequired'),
      validate: {
        notZero: (value: string) => notZero(value),
      },
    },
    length: {
      required: i18next.t('fieldRequired'),
      validate: {
        notZero: (value: string) => notZero(value),
      },
    },
    width: {
      required: i18next.t('fieldRequired'),
      validate: {
        notZero: (value: string) => notZero(value),
      },
    },
    weight: {
      required: i18next.t('fieldRequired'),
      validate: {
        notZero: (value: string) => notZero(value),
      },
    },
    height: {
      required: i18next.t('fieldRequired'),
      validate: {
        notZero: (value: string) => notZero(value),
      },
    },
    volume: { required: i18next.t('fieldRequired') },
    extent: { required: i18next.t('fieldRequired') },
    shipmentPrice: { required: i18next.t('fieldRequired') },
    purchasePriceOfTheItem: {
      required: i18next.t('fieldRequired'),
      validate: {
        notZero: (value: string) => notZero(value),
      },
    },
    orderedShipmentNumber: {
      required: i18next.t('fieldRequired'),
    },
  };
};

export const useCustomValidation = ({
  invoiceNeeded = false,
  service,
}: ValidationProps) => {
  // const ltNumberRegex = /^\+370\s?\d{3}\s?\d{2}\s?\d{3}$/;
  // const ukNumberRegex = /^\+44\s?\d{3,4}\s?\d{3}\s?\d{3,4}$/;

  const combinedLTandUKPhoneNumberRegex =
    /^(?:\+370\s?\d{3}\s?\d{2}\s?\d{3}|\+44\s?\d{3,4}\s?\d{3}\s?\d{3,4})$/;
  return {
    pickupAddress:
      service !== 'shipmentWithAddressService'
        ? { required: i18next.t('fieldRequired') }
        : { required: false },
    pickupAddressZipCode:
      service !== 'shipmentWithAddressService'
        ? { required: i18next.t('fieldRequired') }
        : { required: false },
    deliveryAddress:
      service !== 'shipmentWithAddressService'
        ? { required: i18next.t('fieldRequired') }
        : { required: false },
    deliveryAddressZipCode:
      service !== 'shipmentWithAddressService'
        ? { required: i18next.t('fieldRequired') }
        : { required: false },
    dates: {
      from: {
        year: {
          required: i18next.t('fieldRequired'),
        },
        month: {
          required: i18next.t('fieldRequired'),
        },
        day: {
          required: i18next.t('fieldRequired'),
        },
      },
      to: {
        year: {
          required: i18next.t('fieldRequired'),
        },
        month: {
          required: i18next.t('fieldRequired'),
        },
        day: {
          required: i18next.t('fieldRequired'),
        },
      },
    },
    shipments: useCustomShipmentsValidation(),
    senderInformation: {
      firstName: {
        required: i18next.t('fieldRequired'),
        minLength: {
          value: 3,
          message: i18next.t('minLengthMsg'),
        },
      },
      lastName: {
        required: i18next.t('fieldRequired'),
        minLength: {
          value: 3,
          message: i18next.t('minLengthMsg'),
        },
      },
      phoneNumber: {
        required: i18next.t('fieldRequired'),
        pattern: {
          value: combinedLTandUKPhoneNumberRegex,
          message: i18next.t('invalidPhoneNumberFormat'),
        },
      },
      email: {
        required: i18next.t('fieldRequired'),
        pattern: {
          value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
          message: i18next.t('invalidEmailFormat'),
        },
      },
      address: {
        required: i18next.t('fieldRequired'),
        minLength: {
          value: 3,
          message: i18next.t('minLengthMsg'),
        },
      },
      zipCode: {
        required: i18next.t('fieldRequired'),
        minLength: {
          value: 3,
          message: i18next.t('minLengthMsg'),
        },
      },
    },
    recipientInformation: {
      firstName: {
        required: i18next.t('fieldRequired'),
        minLength: {
          value: 3,
          message: i18next.t('minLengthMsg'),
        },
      },
      lastName: {
        required: i18next.t('fieldRequired'),
        minLength: {
          value: 3,
          message: i18next.t('minLengthMsg'),
        },
      },
      phoneNumber: {
        required: i18next.t('fieldRequired'),
        pattern: {
          value: combinedLTandUKPhoneNumberRegex,
          message: i18next.t('invalidPhoneNumberFormat'),
        },
      },
      email: {
        required: i18next.t('fieldRequired'),
        pattern: {
          value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
          message: i18next.t('invalidEmailFormat'),
        },
      },
      address: {
        required: i18next.t('fieldRequired'),
        minLength: {
          value: 3,
          message: i18next.t('minLengthMsg'),
        },
      },
      zipCode: {
        required: i18next.t('fieldRequired'),
        minLength: {
          value: 3,
          message: i18next.t('minLengthMsg'),
        },
      },
    },
    ransomPayeeInformation:
      service === 'productSalesService'
        ? {
            ransomRecipient: {
              required: i18next.t('fieldRequired'),
              minLength: {
                value: 3,
                message: i18next.t('minLengthMsg'),
              },
            },
            firstName: {
              required: i18next.t('fieldRequired'),
              minLength: {
                value: 3,
                message: i18next.t('minLengthMsg'),
              },
            },
            lastName: {
              required: i18next.t('fieldRequired'),
              minLength: {
                value: 3,
                message: i18next.t('minLengthMsg'),
              },
            },
            phoneNumber: {
              required: i18next.t('fieldRequired'),
              pattern: {
                value: combinedLTandUKPhoneNumberRegex,
                message: i18next.t('invalidPhoneNumberFormat'),
              },
            },
            email: {
              required: i18next.t('fieldRequired'),
              pattern: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: i18next.t('invalidEmailFormat'),
              },
            },
            address: {
              required: i18next.t('fieldRequired'),
              minLength: {
                value: 3,
                message: i18next.t('minLengthMsg'),
              },
            },
            zipCode: {
              required: i18next.t('fieldRequired'),
              minLength: {
                value: 3,
                message: i18next.t('minLengthMsg'),
              },
            },
          }
        : { required: false },
    purchaseInformation:
      service === 'productPurchaseService'
        ? {
            firstName: {
              required: i18next.t('fieldRequired'),
              minLength: {
                value: 3,
                message: i18next.t('minLengthMsg'),
              },
            },
            lastName: {
              required: i18next.t('fieldRequired'),
              minLength: {
                value: 3,
                message: i18next.t('minLengthMsg'),
              },
            },
            phoneNumber: {
              required: i18next.t('fieldRequired'),
              pattern: {
                value: combinedLTandUKPhoneNumberRegex,
                message: i18next.t('invalidPhoneNumberFormat'),
              },
            },
            email: {
              required: i18next.t('fieldRequired'),
              pattern: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: i18next.t('invalidEmailFormat'),
              },
            },
            address: { required: i18next.t('fieldRequired') },
            zipCode: { required: i18next.t('fieldRequired') },
          }
        : { required: false },
    customerInformation: {
      payerOfTheShipment: {
        required: i18next.t('fieldRequired'),
      },
      paymentMethod: { required: i18next.t('fieldRequired') },
    },
    invoiceInformation: invoiceNeeded
      ? {
          companyName: {
            required: i18next.t('fieldRequired'),
            minLength: {
              value: 3,
              message: i18next.t('minLengthMsg'),
            },
          },
          companyCode: {
            required: i18next.t('fieldRequired'),
            minLength: {
              value: 3,
              message: i18next.t('minLengthMsg'),
            },
          },
          pvmCode: {
            required: i18next.t('fieldRequired'),
            minLength: {
              value: 3,
              message: i18next.t('minLengthMsg'),
            },
          },
          companyEmail: {
            required: i18next.t('fieldRequired'),
            pattern: {
              value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              message: i18next.t('invalidEmailFormat'),
            },
          },
          companyAddress: {
            required: i18next.t('fieldRequired'),
            minLength: {
              value: 3,
              message: i18next.t('minLengthMsg'),
            },
          },
        }
      : { required: false },
    packagingAndLabelingRules: {
      required: i18next.t('agreeToTerms'),
    },
    transportRules: {
      required: i18next.t('agreeToTerms'),
    },
  };
};
