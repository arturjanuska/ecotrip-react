/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-mixed-spaces-and-tabs */
import { FormType } from './formTypes';

type ClientInfoType = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  address: string;
  postCode: string;
  description: string;
};

export type TransformedFormData = {
  route: string | null;
  estimatedPrice: {
    value: string;
    currency: '€' | '£';
  };
  invoice: {
    companyName: string;
    companyCode: string;
    pvmCode: string;
    companyEmail: string;
    companyAddress: string;
  } | null;
  year: number;
  month: number;
  day: string | null;
  dates: {
    pickupDate: string;
    deliveryDate: string;
  };
  parcels: {
    category: string | null;
    productType: string | null;
    orderedShipmentNumber: string | null;
    specification: string | null;
    estimatedPrice: number | null;
    size: string | null;
    amount: number | null;
    length: number | null;
    width: number | null;
    height: number | null;
    volume: number | null;
    extent: number | null;
    shipmentPrice: number | null;
    purchasePriceOfTheItem: number | null;
    weight: number | null;
  }[];
  service: string;
  payer: string;
  paymentType: string;
  receiver: ClientInfoType;
  sender: ClientInfoType;
  ransomPayee: (ClientInfoType & { ransomRecipient: string }) | null;
  purchaseInformation: ClientInfoType | null;
};

export const transformFormDataToEndpoint = (
  data: FormType
): TransformedFormData => {
  return {
    route:
      data.service === 'shipmentWithAddressService' ? 'UK-LT' : data.direction,
    estimatedPrice: {
      value: data.estimatedShipmentPrice,
      currency: data.currency,
    },
    invoice: data.invoiceInformation || null,
    year: Number(data.dates.from.year?.value),
    month: Number(data.dates.from.month?.value),
    day: data.dates.from.day?.value || null,
    dates: {
      pickupDate: `${Number(data.dates.from.year?.value)}/${Number(
        data.dates.from.month?.value
      )}/${data.dates.from.day?.value}`,
      deliveryDate: `${Number(data.dates.to.year?.value)}/${Number(
        data.dates.to.month?.value
      )}/${data.dates.to.day?.value}`,
    },
    parcels: data.shipments.map((item) => ({
      category: item.category?.label ?? null,
      productType: item.productType?.label ?? null,
      orderedShipmentNumber: item.orderedShipmentNumber ?? null,
      specification: item.specification?.label ?? null,
      estimatedPrice: Number(item.estimatedPrice) ?? null,
      // @ts-ignore
      size: (item.size?.label as string) ?? null,
      amount: Number(item.amount) ?? 1,
      length: Number(item.length) ?? null,
      width: Number(item.width) ?? null,
      height: Number(item.height) ?? null,
      volume: Number(item.volume) ?? null,
      extent: Number(item.extent) ?? null,
      shipmentPrice: Number(item.shipmentPrice) ?? null,
      purchasePriceOfTheItem: Number(item.purchasePriceOfTheItem) ?? null,
      weight: item.weight ? Number(item.weight) : null,
    })),
    service: data.service,
    payer: data.customerInformation.payerOfTheShipment.label,
    paymentType: data.customerInformation.paymentMethod.label,
    receiver: {
      name: data.recipientInformation.firstName,
      surname: data.recipientInformation.lastName,
      phone: data.recipientInformation.phoneNumber,
      email: data.recipientInformation.email,
      address: data.recipientInformation.address,
      postCode: data.recipientInformation.zipCode,
      description: data.recipientInformation.additionInformation ?? '',
    },
    sender: {
      name: data.senderInformation.firstName,
      surname: data.senderInformation.lastName,
      phone: data.senderInformation.phoneNumber,
      email: data.senderInformation.email,
      address: data.senderInformation.address,
      postCode: data.senderInformation.zipCode,
      description: data.senderInformation.additionInformation ?? '',
    },
    ransomPayee: data.ransomPayeeInformation
      ? {
          ransomRecipient:
            data.ransomPayeeInformation.ransomRecipient.label ?? null,
          name: data.ransomPayeeInformation.firstName ?? null,
          surname: data.ransomPayeeInformation.lastName ?? null,
          phone: data.ransomPayeeInformation.phoneNumber ?? null,
          email: data.ransomPayeeInformation.email ?? null,
          address: data.ransomPayeeInformation.address ?? null,
          postCode: data.ransomPayeeInformation.zipCode ?? null,
          description: data.ransomPayeeInformation.additionInformation ?? null,
        }
      : null,
    purchaseInformation: data.purchaseInformation
      ? {
          name: data.purchaseInformation.firstName ?? null,
          surname: data.purchaseInformation.lastName ?? null,
          phone: data.purchaseInformation.phoneNumber ?? null,
          email: data.purchaseInformation.email ?? null,
          address: data.purchaseInformation.address ?? null,
          postCode: data.purchaseInformation.zipCode ?? null,
          description: data.purchaseInformation.additionInformation ?? null,
        }
      : null,
  };
};
