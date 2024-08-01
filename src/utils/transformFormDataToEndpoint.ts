import { FormType } from './formTypes';

export const transformFormDataToEndpoint = (data: FormType) => {
  return {
    day: data.dates.from.day?.value,
    description: data.senderInformation.additionInformation ?? '',
    estimatedPrice: {
      value: data.estimatedShipmentPrice,
      currency: data.currency,
    },
    invoice: null,
    month: data.dates.from.month?.value,
    orderEmail: data.customerInformation.email,
    parcels: data.shipments.map((item) => ({
      weight: item.size,
    })),
    payer: 'siuntejas',
    paymentType: 'grynais',
    route: data.direction,
    year: data.dates.from.year,
    receiver: {
      name: 'Test',
      surname: 'Test',
      phone: '+333333333',
      email: 'Test2@Test2.lr',
      address: '22222 Davis Mill Road, Germantown, MD, USA',
      postCode: '20876',
    },
    sender: {
      name: '222',
      surname: 'Test',
      phone: '+333333333',
      email: '2222@2222.lr',
      address: '22222 Davis Mill Road, Germantown, MD, USA',
      postCode: '20876',
    },
  };
};
