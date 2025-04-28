/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */
import ServiceCard, { ServiceProps } from '../ServiceCard';
import Link from '../Link';
import { UseFormReturn, UseFormSetValue } from 'react-hook-form';
import { CurrencyType, FormType } from '../../utils/formTypes';
import scrollToSection from '../../utils/scrollToSection';
import getServices from './getServices';
import { isCardDisabled } from '../../utils/serviceUtils';
import { useTranslation } from 'react-i18next';
import { ECOTRIP_CONTACT_INFO } from '../../utils/variables/ecotrip';

// const services = {
// 	adressService: "shipmentWithAddressService",
// }

const ServiceSection = ({
  setValue,
  selectedService,
  isParcelForce,
  currency,
  methods,
  rate,
}: {
  setValue: UseFormSetValue<FormType>;
  selectedService: string;
  isParcelForce: boolean;
  currency: CurrencyType;
  methods: UseFormReturn<FormType, any, undefined>;
  rate: number;
}) => {
  const { t } = useTranslation();

  const prefillAddressFormFields = (service: string) => {
    const pickupAddress = methods.getValues('pickupAddress');
    const deliveryAddress = methods.getValues('deliveryAddress');
    const pickupAddressPostcode = methods.getValues('pickupAddressZipCode');
    const deliveryAddressPostcode = methods.getValues('deliveryAddressZipCode');

    // TODO uncomment
    // if (service === 'shipmentWithAddressService') {
    //   setValue(`senderInformation.firstName`, '');
    //   setValue(`senderInformation.lastName`, '');
    //   setValue(
    //     `senderInformation.phoneNumber`,
    //     ECOTRIP_CONTACT_INFO.phoneNumber
    //   );
    //   setValue(`senderInformation.email`, ECOTRIP_CONTACT_INFO.email);
    //   setValue(`senderInformation.address`, ECOTRIP_CONTACT_INFO.address);
    //   setValue(`senderInformation.zipCode`, ECOTRIP_CONTACT_INFO.zipCode);
    // } else {
    //   setValue(`senderInformation.firstName`, '');
    //   setValue(`senderInformation.lastName`, '');
    //   setValue(`senderInformation.phoneNumber`, '');
    //   setValue(`senderInformation.email`, '');
    //   setValue('senderInformation.address', pickupAddress ?? '');
    //   setValue('senderInformation.zipCode', pickupAddressPostcode ?? '');
    // }

    setValue(`senderInformation.firstName`, 'asdasd');
    setValue(`senderInformation.lastName`, 'asdasd');
    setValue(`senderInformation.phoneNumber`, '+37067272727');
    setValue(`senderInformation.email`, 'asdads@ASD.COM');
    setValue('senderInformation.address', pickupAddress);
    setValue('senderInformation.zipCode', pickupAddressPostcode);
    setValue(`recipientInformation.firstName`, 'asdasd');
    setValue(`recipientInformation.lastName`, 'asdasd');
    setValue(`recipientInformation.phoneNumber`, '+37067272727');
    setValue(`recipientInformation.email`, 'asdads@ASD.COM');

    setValue('recipientInformation.address', deliveryAddress ?? '');
    setValue('recipientInformation.zipCode', deliveryAddressPostcode ?? '');
  };

  const direction = methods.watch('direction');

  const handleServiceSelect = (service: string) => {
    if (service === 'shipmentWithAddressService') {
      setValue('dates.from.day', null);
      setValue('dates.from.month', null);
      setValue('dates.from.year', null);
    }

    if (
      service === 'productPurchaseService' ||
      service === 'shipmentWithAddressService'
    ) {
      setValue('customerInformation.payerOfTheShipment', {
        label: t('thePayerIsTheRecipient'),
        value: 'thePayerIsTheRecipient',
      });
    }

    if (service === 'productSalesService') {
      setValue('ransomPayeeInformation.ransomRecipient', {
        label: t('sender'),
        value: 'sender',
      });
    }

    setValue('shipments', [
      {
        estimatedPrice: '0.00',
        category: { label: t('shipments'), value: 'shipments' },
        amount: 1,
      },
    ]);
    setValue('service', service);
    prefillAddressFormFields(service);
    setTimeout(() => {
      scrollToSection({
        scrollToSection: 'shipments-section',
        block: 'center',
      });
    }, 200);
  };

  const services: ServiceProps[] = getServices(
    currency,
    direction,
    isParcelForce,
    rate
  );

  return (
    <div className="service-section-wrapper">
      <div className="service-section-container">
        <span className="title">{t('selectService')}</span>
        <div className="services-mapping-wrapper">
          <div className="services-mapping-container">
            {services.map((service, index) => (
              <div
                key={index}
                className="services-mapping-container-service-card"
              >
                <ServiceCard
                  service={service}
                  direction={direction}
                  onSelect={() => {
                    if (isCardDisabled(service.value, isParcelForce, direction))
                      return;
                    handleServiceSelect(service.value);
                  }}
                  selected={service.value === selectedService}
                  isDisabled={isCardDisabled(
                    service.value,
                    isParcelForce,
                    direction
                  )}
                  isParcelForce={isParcelForce}
                />
                {service.link && (
                  <Link href={service.link} text={t(service.linkText) ?? ''} />
                )}
              </div>
            ))}
          </div>
        </div>
        <Link
          href="https://ecotrip.lt/prekes-is-anglijos-uk/"
          text={t('serviceSectionLinkDescription')}
        />

        {selectedService === 'parcelForceShipment' ? (
          <div className="service-section-sub-text">
            <span>{t('parcelForceServiceDescription')}</span>
            {/* <Link
              href='/'
              text='Plačiau apie siuntų persiuntimą per partnerius rasite čia.'
            /> */}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ServiceSection;
