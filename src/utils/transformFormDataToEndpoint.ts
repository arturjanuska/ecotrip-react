/* eslint-disable no-mixed-spaces-and-tabs */
import { FormType } from './formTypes';

export const transformFormDataToEndpoint = (data: FormType) => {
  console.log('data ===', data);
  return {
    route: data.direction,
    estimatedPrice: {
      value: data.estimatedShipmentPrice,
      currency: data.currency,
    },
    invoice: data.invoiceInformation || null,
    year: Number(data.dates.from.year?.value),
    month: Number(data.dates.from.month?.value),
    day: data.dates.from.day?.value,
    // parcels: data.shipments.map((item) => ({
    // 	weight: item.size || item.size?.value,
    // })),
    parcels: data.shipments.map((item) => ({
      category: item.category?.label,
      productType: item.productType?.label,
      orderedShipmentNumber: item.orderedShipmentNumber || null,
      specification: item.specification?.label || null,
      estimatedPrice: Number(item.estimatedPrice),
      size: item.size?.value ?? '',
      amount: Number(item.amount) || 1,
      length: Number(item.length) || null,
      width: Number(item.width) || null,
      height: Number(item.height) || null,
      shipmentPrice: Number(item.shipmentPrice) || null,
      purchasePriceOfTheItem: Number(item.purchasePriceOfTheItem) || null,
      weight: item.weight,
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
      description: data.recipientInformation.additionInformation ?? '', // new
    },
    sender: {
      name: data.senderInformation.firstName,
      surname: data.senderInformation.lastName,
      phone: data.senderInformation.phoneNumber,
      email: data.senderInformation.email,
      address: data.senderInformation.address,
      postCode: data.senderInformation.zipCode,
      description: data.senderInformation.additionInformation ?? '', // new
    },
    // new
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
    // new
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
