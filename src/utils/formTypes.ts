import { OptionType, RangeSizeType } from './types';

export enum FormTypes {
  Shipment = 'shipment',
  OtherProducts = 'other-products',
  ParcelForceShimpent = 'parcel-force-shipment',
}

export type ShipmentProps = {
  category: OptionType | null;
  productType?: OptionType | null;
  size?: OptionType | RangeSizeType | null;
  orderedShipmentNumber?: string;
};

export type FormType = {
  direction: 'UK-LT' | 'LT-UK';
  pickupAddress: string;
  pickupAddressZipCode: string | null;
  deliveryAddress: string;
  deliveryAddressZipCode: string | null;
  service: string;
  shipments: ShipmentProps[];
  dates: {
    from: {
      year: OptionType | null;
      month: OptionType | null;
      day: OptionType | null;
    };
    to: {
      year: OptionType | null;
      month: OptionType | null;
      day: OptionType | null;
    };
  };
  senderInformation: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    zipCode: string;
    additionInformation: string;
  };
  recipientInformation: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    zipCode: string;
    additionInformation: string;
  };
  ransomPayeeInformation: {
    ransomRecipient: OptionType;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    zipCode: string;
    additionInformation: string;
  };
  customerInformation: {
    payerOfTheShipment: OptionType;
    paymentMethod: OptionType;
    email: string;
  };
  invoiceRequired: boolean;
  invoiceInformation: {
    companyName: string;
    companyCode: string;
    pvmCode: string;
    companyEmail: string;
    companyAddress: string;
  };
  packagingAndLabelingRules: boolean;
  transportRules: boolean;
};
