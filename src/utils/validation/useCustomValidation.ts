/* eslint-disable no-mixed-spaces-and-tabs */
import { ShipmentProps } from "../formTypes";

type ValidationProps = {
  invoiceNeeded?: boolean;
  service?: string;
  formShipment?: ShipmentProps;
};

const notZero = (value: string) => {
  return parseFloat(value) === 0 ? "Laukas negali būti nulis" : true;
};

const useCustomShipmentsValidation = () => {
  return {
    category: { required: "Laukas yra privalomas" },
    productType: { required: "Laukas yra privalomas" },
    size: { required: "Laukas yra privalomas" },
    specification: { required: "Laukas yra privalomas" },
    estimatedPrice: { required: "Laukas yra privalomas" },
    amount: {
      required: "Laukas yra privalomas",
      validate: {
        notZero,
      },
    },
    length: {
      required: "Laukas yra privalomas",
      validate: {
        notZero,
      },
    },
    width: {
      required: "Laukas yra privalomas",
      validate: {
        notZero,
      },
    },
    weight: {
      required: "Laukas yra privalomas",
      validate: {
        notZero,
      },
    },
    height: {
      required: "Laukas yra privalomas",
      validate: {
        notZero,
      },
    },
    volume: { required: "Laukas yra privalomas" },
    extent: { required: "Laukas yra privalomas" },
    shipmentPrice: { required: "Laukas yra privalomas" },
    purchasePriceOfTheItem: {
      required: "Laukas yra privalomas",
      validate: {
        notZero,
      },
    },
    orderedShipmentNumber: {
      required: "Laukas yra privalomas",
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
      service !== "shipmentWithAddressService"
        ? { required: "Laukas yra privalomas" }
        : { required: false },
    pickupAddressZipCode:
      service !== "shipmentWithAddressService"
        ? { required: "Laukas yra privalomas" }
        : { required: false },
    deliveryAddress:
      service !== "shipmentWithAddressService"
        ? { required: "Laukas yra privalomas" }
        : { required: false },
    deliveryAddressZipCode:
      service !== "shipmentWithAddressService"
        ? { required: "Laukas yra privalomas" }
        : { required: false },
    dates: {
      from: {
        year: {
          required: "Laukas yra privalomas",
        },
        month: {
          required: "Laukas yra privalomas",
        },
        day: {
          required: "Laukas yra privalomas",
        },
      },
      to: {
        year: {
          required: "Laukas yra privalomas",
        },
        month: {
          required: "Laukas yra privalomas",
        },
        day: {
          required: "Laukas yra privalomas",
        },
      },
    },
    shipments: useCustomShipmentsValidation(),
    senderInformation: {
      firstName: {
        required: "Laukas yra privalomas",
        minLength: {
          value: 3,
          message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
        },
      },
      lastName: {
        required: "Laukas yra privalomas",
        minLength: {
          value: 3,
          message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
        },
      },
      phoneNumber: {
        required: "Laukas yra privalomas",
        pattern: {
          value: combinedLTandUKPhoneNumberRegex,
          message:
            'Neteisingas telefono numerio formatas. Turi prasidėti nuo "+" ir sekti skaičiai, pvz., +370 arba +44',
        },
      },
      email: {
        required: "Laukas yra privalomas",
        pattern: {
          value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
          message: "Neteisingas el. pašto formatas",
        },
      },
      address: {
        required: "Laukas yra privalomas",
        minLength: {
          value: 3,
          message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
        },
      },
      zipCode: {
        required: "Laukas yra privalomas",
        minLength: {
          value: 3,
          message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
        },
      },
    },
    recipientInformation: {
      firstName: {
        required: "Laukas yra privalomas",
        minLength: {
          value: 3,
          message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
        },
      },
      lastName: {
        required: "Laukas yra privalomas",
        minLength: {
          value: 3,
          message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
        },
      },
      phoneNumber: {
        required: "Laukas yra privalomas",
        pattern: {
          value: combinedLTandUKPhoneNumberRegex,
          message:
            'Neteisingas telefono numerio formatas. Turi prasidėti nuo "+" ir sekti skaičiai, pvz., +370 arba +44',
        },
      },
      email: {
        required: "Laukas yra privalomas",
        pattern: {
          value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
          message: "Neteisingas el. pašto formatas",
        },
      },
      address: {
        required: "Laukas yra privalomas",
        minLength: {
          value: 3,
          message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
        },
      },
      zipCode: {
        required: "Laukas yra privalomas",
        minLength: {
          value: 3,
          message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
        },
      },
    },
    ransomPayeeInformation:
      service === "productSalesService"
        ? {
            ransomRecipient: {
              required: "Laukas yra privalomas",
              minLength: {
                value: 3,
                message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
              },
            },
            firstName: {
              required: "Laukas yra privalomas",
              minLength: {
                value: 3,
                message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
              },
            },
            lastName: {
              required: "Laukas yra privalomas",
              minLength: {
                value: 3,
                message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
              },
            },
            phoneNumber: {
              required: "Laukas yra privalomas",
              pattern: {
                value: combinedLTandUKPhoneNumberRegex,
                message:
                  'Neteisingas telefono numerio formatas. Turi prasidėti nuo "+" ir sekti skaičiai, pvz., +370 arba +44',
              },
            },
            email: {
              required: "Laukas yra privalomas",
              pattern: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: "Neteisingas el. pašto formatas",
              },
            },
            address: {
              required: "Laukas yra privalomas",
              minLength: {
                value: 3,
                message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
              },
            },
            zipCode: {
              required: "Laukas yra privalomas",
              minLength: {
                value: 3,
                message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
              },
            },
          }
        : { required: false },
    purchaseInformation:
      service === "productPurchaseService"
        ? {
            firstName: {
              required: "Laukas yra privalomas",
              minLength: {
                value: 3,
                message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
              },
            },
            lastName: {
              required: "Laukas yra privalomas",
              minLength: {
                value: 3,
                message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
              },
            },
            phoneNumber: {
              required: "Laukas yra privalomas",
              pattern: {
                value: combinedLTandUKPhoneNumberRegex,
                message:
                  'Neteisingas telefono numerio formatas. Turi prasidėti nuo "+" ir sekti skaičiai, pvz., +370 arba +44',
              },
            },
            email: {
              required: "Laukas yra privalomas",
              pattern: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: "Neteisingas el. pašto formatas",
              },
            },
            address: { required: "Laukas yra privalomas" },
            zipCode: { required: "Laukas yra privalomas" },
          }
        : { required: false },
    customerInformation: {
      payerOfTheShipment: {
        required: "Laukas yra privalomas",
      },
      paymentMethod: { required: "Laukas yra privalomas" },
    },
    invoiceInformation: invoiceNeeded
      ? {
          companyName: {
            required: "Laukas yra privalomas",
            minLength: {
              value: 3,
              message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
            },
          },
          companyCode: {
            required: "Laukas yra privalomas",
            minLength: {
              value: 3,
              message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
            },
          },
          pvmCode: {
            required: "Laukas yra privalomas",
            minLength: {
              value: 3,
              message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
            },
          },
          companyEmail: {
            required: "Laukas yra privalomas",
            pattern: {
              value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              message: "Neteisingas el. pašto formatas",
            },
          },
          companyAddress: {
            required: "Laukas yra privalomas",
            minLength: {
              value: 3,
              message: "Laukas privalo turėti ne mažiau kaip 3 simbolius",
            },
          },
        }
      : { required: false },
    packagingAndLabelingRules: {
      required: "Prašome pažymėti, kad sutinkate su EcoTrip taisyklėmis.",
    },
    transportRules: {
      required: "Prašome pažymėti, kad sutinkate su EcoTrip taisyklėmis.",
    },
  };
};
