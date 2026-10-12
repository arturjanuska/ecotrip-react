/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form';
import { convertValue } from './convertCurrency';
import { CurrencyType, FormType, ShipmentProps } from './formTypes';
import i18next from 'i18next';
import {
  FeeSettings,
  parcelForceSurcharge,
  percentFee,
  purchaseServiceFee,
  quantityDiscountPercent,
} from './orderFees';
import { isParcelForceArea } from './postcodes';

const parseDiscount = (value: unknown): number => {
  if (value === null || value === undefined || value === '') {
    return 0;
  }

  const parsed = Number(
    typeof value === 'string' ? value.replace('%', '').trim() : value
  );

  return Number.isFinite(parsed) ? parsed : 0;
};

const getOrderPrice = (
  shipmentsArray: ShipmentProps[],
  postcodeDetails: any,
  fees: FeeSettings,
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

    const parcelForceAdditionalCharges =
      service === 'parcelForceShipment'
        ? parcelForceSurcharge(
            {
              length: shipmentLenght,
              width: shipmentWidth,
              height: shipmentHeight,
              weight: shipmentWeight,
            },
            postcodeDetails
              ? {
                  isParcelForceArea: isParcelForceArea(postcodeDetails),
                  zone: postcodeDetails.parcelForceZone || '',
                }
              : null,
            fees
          )
        : 0;

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
          `${currency}${shipmentPrice.toFixed(2)} (${convertValue(
            currency,
            shipmentPrice,
            rate
          )})` || '0.00',
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
    price += fees.addressService.fee;
  }

  if (service === 'productPurchaseService') {
    const { fee, addsItemPrices } = purchaseServiceFee(
      purchaseServiceShipmentsPrices,
      fees
    );
    price += fee;
    priceDescription.push({
      title: i18next.t('purchaseServiceMsg'),
      price: `${currency}${fee.toFixed(2)} (${convertValue(
        currency,
        fee,
        rate
      )})`,
    });

    if (addsItemPrices) {
      price += purchaseServiceShipmentsPrices;
      priceDescription.push({
        title: i18next.t('purchaseAmountMsg'),
        price: `${currency}${purchaseServiceShipmentsPrices.toFixed(
          2
        )} (${convertValue(currency, purchaseServiceShipmentsPrices, rate)})`,
      });
    }
  }

  if (service === 'productSalesService') {
    const fee = percentFee(salesServiceShipmentsPrices, fees.salesService);
    price += fee;
    // A fee raised to the minimum has always been titled as the service,
    // the others as the amount; kept as is.
    const raisedToMin =
      fees.salesService.min !== null &&
      (salesServiceShipmentsPrices * fees.salesService.percent) / 100 <
        fees.salesService.min;
    priceDescription.push({
      title: i18next.t(raisedToMin ? 'salesServiceMsg' : 'salesAmountMsg'),
      price: `${currency}${fee.toFixed(2)} (${convertValue(
        currency,
        fee,
        rate
      )})`,
    });
  }

  const additionalCharges = Number(postcodeDetails?.additionalCharges);

  if (
    Number.isFinite(additionalCharges) &&
    additionalCharges !== 0 &&
    service !== 'shipmentWithAddressService'
  ) {
    price += additionalCharges;

    priceDescription.push({
      title: i18next.t('addressFeeMsg'),
      price: `${currency}${additionalCharges.toFixed(2)} (${convertValue(
        currency,
        additionalCharges,
        rate
      )})`,
    });
  }

  const quantityDiscount = quantityDiscountPercent(
    shipmentsArray.length || 0,
    fees
  );
  const discountPercentage = 1 - quantityDiscount / 100;
  const percentage = quantityDiscount > 0 ? `${quantityDiscount}%` : null;

  const postcodeDiscount = parseDiscount(postcodeDetails?.discount);

  const postcodeDiscountPercentage =
    postcodeDiscount > 0 && service !== 'shipmentWithAddressService'
      ? 1 - postcodeDiscount / 100
      : 1;

  let finalPrice = price;

  if (postcodeDiscountPercentage < discountPercentage) {
    finalPrice *= postcodeDiscountPercentage;

    priceDescription.push({
      title: i18next.t('addressDiscountMsg'),
      price: `${postcodeDiscount}%`,
    });
  } else {
    finalPrice *= discountPercentage;

    if (percentage) {
      priceDescription.push({
        title: i18next.t('quantityDiscountMsg'),
        price: `${percentage}`,
      });
    }
  }

  setPriceDescription(priceDescription);
  methods.setValue('estimatedShipmentPrice', finalPrice.toFixed(2) ?? '0.00');
};

export default getOrderPrice;
