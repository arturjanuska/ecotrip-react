import { convertValue } from "../../utils/convertCurrency";
import { CurrencyType, DirectionType } from "../../utils/formTypes";
import { ServiceProps } from "../ServiceCard";
import {
  AddressServiceIcon,
  ParcelForceServiceIcon,
  PurchaseServiceIcon,
  SalesServiceIcon,
  StandartShipmentIcon,
} from "../ServiceIcons";

const getServices = (
  currency: CurrencyType,
  direction: DirectionType,
  isParcelForce: boolean,
  rate: number,
) => {
  const services: ServiceProps[] = isParcelForce
    ? [
        {
          title: "standartShipmentServiceTitle",
          desc: {
            text: "standartShipmentServiceDesc",
            variables: {},
          },
          icon: ParcelForceServiceIcon(isParcelForce, direction),
          value: "parcelForceShipment",
          link: "https://ecotrip.lt/siuntos-i-anglija-is-lietuvos-is-anglijos-i-lietuva/",
          linkText: "standartShipmentServiceLinkText",
        },

        {
          title: "addressServiceTitle",
          desc: {
            text: "addressServiceDesc",
            variables: {
              currency,
            },
          },
          icon: AddressServiceIcon(isParcelForce, direction),
          value: "shipmentWithAddressService",
          link: "https://ecotrip.lt/apsipirkimo-adresas-anglijoje/",
          linkText: "addressServiceLinkText",
        },
        {
          title: "purchaseServiceTitle",
          desc: {
            text: "purchaseServiceDesc",
            variables: {
              currency,
              convertedValue: convertValue(currency, 5, rate),
            },
          },
          icon: PurchaseServiceIcon(isParcelForce, direction),
          value: "productPurchaseService",

          linkText: "Link",
        },
        {
          title: "salesServiceTitle",
          desc: {
            text: "salesServiceDesc",
            variables: {
              currency,
              convertedValue: convertValue(currency, 15, rate),
            },
          },
          icon: SalesServiceIcon(isParcelForce, direction),
          value: "productSalesService",

          linkText: "Link",
        },
      ]
    : [
        {
          title: "standartShipmentServiceTitle",
          desc: {
            text: "standartPrices",
            variables: {},
          },
          icon: StandartShipmentIcon(isParcelForce, direction),
          value: "standartShipment",
          link: "https://ecotrip.lt/siuntos-i-anglija-is-lietuvos-is-anglijos-i-lietuva/",
          linkText: "standartShipmentServiceLinkText",
        },
        {
          title: "addressServiceTitle",
          desc: {
            text: "addressServiceDesc",
            variables: {
              currency,
            },
          },
          icon: AddressServiceIcon(isParcelForce, direction),
          value: "shipmentWithAddressService",
          link: "https://ecotrip.lt/apsipirkimo-adresas-anglijoje/",

          linkText: "addressServiceLinkText",
        },
        {
          title: "purchaseServiceTitle",
          desc: {
            text: "purchaseServiceDesc",
            variables: {
              currency,
              convertedValue: convertValue(currency, 5, rate),
            },
          },
          icon: PurchaseServiceIcon(isParcelForce, direction),
          value: "productPurchaseService",

          linkText: "Link",
        },
        {
          title: "salesServiceTitle",
          desc: {
            text: "salesServiceDesc",
            variables: {
              currency,
              convertedValue: convertValue(currency, 15, rate),
            },
          },
          icon: SalesServiceIcon(isParcelForce, direction),
          value: "productSalesService",

          linkText: "Link",
        },
      ];

  return services;
};

export default getServices;
