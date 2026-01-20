/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form';
import { convertValue } from './convertCurrency';
import { CurrencyType, FormType, ShipmentProps } from './formTypes';
import i18next from 'i18next';

const getDiscountPercentage = (itemsCount: number) => {
  if (itemsCount === 0 || itemsCount === 1) return 1;

  if (itemsCount === 2) return 0.95;
  if (itemsCount === 3) return 0.9;
  if (itemsCount === 4) return 0.85;
  if (itemsCount > 4) return 0.8;
  return 1;
};

const getOrderPrice = (
  shipmentsArray: ShipmentProps[],
  postcodeDetails: any,
  service: string,
  currency: CurrencyType,
  rate: number,
  setPriceDescription: React.Dispatch<
    React.SetStateAction<
      {
        title: string;
        price: string;
      }[]
    >
  >,
  methods: UseFormReturn<FormType, any, undefined>
) => {
  let price = 0;
  const priceDescription: { title: string; price: string }[] = [];

  for (let i = 0; i < shipmentsArray.length; i++) {
    const shipment = shipmentsArray[i];
    const shipmentWeight = Number(shipment.weight) ?? 0;
    const shipmentLenght = Number(shipment.length) ?? 0;
    const shipmentWidth = Number(shipment.width) ?? 0;
    const shipmentHeight = Number(shipment.height) ?? 0;

    let parcelForceAdditionalCharges = 0;
    if (service === 'parcelForceShipment') {
      if (
        (shipmentLenght <= 45 || shipmentWidth <= 45 || shipmentHeight <= 45) &&
        shipmentWeight <= 2
      ) {
        parcelForceAdditionalCharges = 4.19;
      } else if (
        (shipmentLenght <= 61 || shipmentWidth <= 61 || shipmentHeight <= 61) &&
        shipmentWeight <= 20
      ) {
        if (shipmentWeight <= 2) {
          parcelForceAdditionalCharges = 5.89;
        } else if (shipmentWeight > 2 && shipmentWeight <= 10) {
          parcelForceAdditionalCharges = 7.59;
        } else if (shipmentWeight > 10 && shipmentWeight <= 20) {
          parcelForceAdditionalCharges = 11.69;
        }
      } else if (
        postcodeDetails?.additionalCharges === 'Parcel force pricelist'
      ) {
        const zones = [
          {
            title: 'Zone 1',
            value: 9,
          },
          {
            title: 'Zone 2',
            value: 19,
          },
          {
            title: 'Zone 3',
            value: 23,
          },
        ];

        const zone = postcodeDetails?.parcelForceZone || '';

        zones.forEach((item) => {
          if (item.title === zone) {
            parcelForceAdditionalCharges = item.value;
          }
        });
      }
    }

    const shipmentPrice =
      Number(shipment.estimatedPrice) + parcelForceAdditionalCharges;

    price += shipmentPrice;

    if (shipment.category?.label) {
      priceDescription.push({
        title: `${i18next.t('orderNo')} ${i + 1} ${
          shipment.productType?.label
            ? `${shipment.productType?.label}${
                parcelForceAdditionalCharges !== 0
                  ? ` + ${i18next.t('forwardingServiceMsg')}`
                  : ''
              }`
            : `${shipment.category?.label}${
                parcelForceAdditionalCharges !== 0
                  ? ` + ${i18next.t('forwardingServiceMsg')}`
                  : ''
              }`
        }:`,
        price:
          `${currency}${shipmentPrice.toFixed(2)} - ${convertValue(
            currency,
            shipmentPrice,
            rate
          )}` || '0.00',
      });
    }
  }

  const purchaseServiceShipmentsPrices =
    shipmentsArray
      .filter((item) => item.shipmentPrice)
      .reduce((acc, curr) => {
        return acc + Number(curr.shipmentPrice);
      }, 0) || 0;

  const salesServiceShipmentsPrices =
    shipmentsArray
      .filter((item) => item.purchasePriceOfTheItem)
      .reduce((acc, curr) => acc + Number(curr.purchasePriceOfTheItem), 0) || 0;

  if (service === 'shipmentWithAddressService') {
    price += 0;
  }

  if (service === 'productPurchaseService') {
    // is savu
    if (purchaseServiceShipmentsPrices < 250) {
      const threePercentOfThePrice = (purchaseServiceShipmentsPrices / 100) * 3;
      if (threePercentOfThePrice < 5) {
        price += 5;
        priceDescription.push({
          title: i18next.t('purchaseServiceMsg'),
          price: `${currency}5.00 - ${convertValue(currency, 5, rate)}`,
        });
      } else {
        price += threePercentOfThePrice;
        priceDescription.push({
          title: i18next.t('purchaseServiceMsg'),
          price: `${currency}${threePercentOfThePrice.toFixed(
            2
          )} - ${convertValue(currency, threePercentOfThePrice, rate)}`,
        });
      }
    }
    // klientas
    if (purchaseServiceShipmentsPrices >= 250) {
      const twoPercentOfThePrice = (purchaseServiceShipmentsPrices / 100) * 2;
      if (twoPercentOfThePrice < 15) {
        price += 15;
        priceDescription.push({
          title: i18next.t('purchaseServiceMsg'),
          price: `${currency}15.00 - ${convertValue(currency, 15, rate)}`,
        });
      } else if (twoPercentOfThePrice > 50) {
        price += 50;
        priceDescription.push({
          title: i18next.t('purchaseServiceMsg'),
          price: `${currency}50.00 - ${convertValue(currency, 50, rate)}`,
        });
      } else {
        price += twoPercentOfThePrice;
        priceDescription.push({
          title: i18next.t('purchaseServiceMsg'),
          price: `${currency}${twoPercentOfThePrice.toFixed(
            2
          )} - ${convertValue(currency, twoPercentOfThePrice, rate)}`,
        });
      }
    }

    if (purchaseServiceShipmentsPrices < 250) {
      price += purchaseServiceShipmentsPrices;
      priceDescription.push({
        title: i18next.t('purchaseAmountMsg'),
        price: `${currency}${purchaseServiceShipmentsPrices.toFixed(
          2
        )}  - ${convertValue(currency, purchaseServiceShipmentsPrices, rate)}`,
      });
    }
  }

  if (service === 'productSalesService') {
    const twoPercentOfThePrice = (salesServiceShipmentsPrices * 2) / 100;
    if (twoPercentOfThePrice < 15) {
      price += 15;
      priceDescription.push({
        title: i18next.t('salesServiceMsg'),
        price: `${currency}15.00  - ${convertValue(currency, 15, rate)}`,
      });
    } else if (twoPercentOfThePrice > 50) {
      price += 50;
      priceDescription.push({
        title: i18next.t('salesAmountMsg'),
        price: `${currency}50.00  - ${convertValue(currency, 50, rate)}`,
      });
    } else {
      price += twoPercentOfThePrice;
      priceDescription.push({
        title: i18next.t('salesAmountMsg'),
        price: `${currency}${twoPercentOfThePrice.toFixed(
          2
        )}  - ${convertValue(currency, twoPercentOfThePrice, rate)}`,
      });
    }
  }

  if (
    postcodeDetails?.additionalCharges &&
    !isNaN(Number(postcodeDetails?.additionalCharges)) &&
    service !== 'shipmentWithAddressService'
  ) {
    price += Number(postcodeDetails?.additionalCharges) || 0;
    priceDescription.push({
      title: i18next.t('addressFeeMsg'),
      price: `${currency}${Number(postcodeDetails.additionalCharges).toFixed(
        2
      )} - ${convertValue(
        currency,
        Number(postcodeDetails.additionalCharges),
        rate
      )}`,
    });
  }

  const discountPercentage = getDiscountPercentage(shipmentsArray.length || 0);

  const percentage =
    discountPercentage === 0.8
      ? '20%'
      : discountPercentage === 0.85
        ? '15%'
        : discountPercentage === 0.9
          ? '10%'
          : discountPercentage === 0.95
            ? '5%'
            : null;

  const secondDiscountPercentage =
    postcodeDetails?.discount === '10%' &&
    service !== 'shipmentWithAddressService'
      ? 0.9
      : 1;

  let finalPrice = price;

  if (secondDiscountPercentage === 1) {
    finalPrice = finalPrice * discountPercentage;
    if (percentage) {
      priceDescription.push({
        title: i18next.t('quantityDiscountMsg'),
        price: `${percentage}`,
      });
    }
  } else if (secondDiscountPercentage === 0.9) {
    if (discountPercentage >= 0.9) {
      finalPrice = finalPrice * secondDiscountPercentage;
      priceDescription.push({
        title: i18next.t('addressDiscountMsg'),
        price: `10%`,
      });
    } else {
      finalPrice = finalPrice * discountPercentage;
      if (percentage) {
        priceDescription.push({
          title: i18next.t('quantityDiscountMsg'),
          price: `${percentage}`,
        });
      }
    }
  }

  setPriceDescription(priceDescription);
  methods.setValue('estimatedShipmentPrice', finalPrice.toFixed(2) ?? '0.00');
};

export default getOrderPrice;
