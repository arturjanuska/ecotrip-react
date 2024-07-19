import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBell, faHouse, faImage } from '@fortawesome/free-solid-svg-icons';
import ServiceCard, { ServiceProps } from '../ServiceCard';
import Link from '../Link';
import { UseFormSetValue } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';

const services: ServiceProps[] = [
  {
    title: 'Standartinės siuntos',
    desc: 'Įprastos kainos',
    icon: faHouse,
    value: 'standartShipment',
  },
  {
    title: 'Siuntos su adreso paslauga',
    desc: 'Papildomai nuo €0 / vnt.',
    icon: faImage,
    value: 'shipmentWithAddressService',
  },
  {
    title: 'Prekės nupirkimo paslauga',
    desc: 'Papildomai nuo €5 / vnt.',
    icon: faInstagram,
    value: 'productPurchaseService',
  },
  {
    title: 'Prekės pardavimo paslauga',
    desc: 'Papildomai nuo €10 / vnt.',
    icon: faBell,
    value: 'productSalesService',
  },
];

const ServiceSection = ({
  setValue,
  selectedService,
}: {
  setValue: UseFormSetValue<FormType>;
  selectedService: string;
}) => {
  const handleServiceSelect = (service: string) => {
    setValue('service', service);
  };

  return (
    <div className='service-section-wrapper'>
      <div className='service-section-container'>
        <span className='title'>Pasirinkite vieną EcoTrip paslaugą:</span>
        <div className='services-mapping-wrapper'>
          <div className='services-mapping-container'>
            {services.map((service, index) => (
              <div key={index}>
                <ServiceCard
                  service={service}
                  onSelect={() => {
                    handleServiceSelect(service.value);
                  }}
                  selected={service.value === selectedService}
                />
              </div>
            ))}
          </div>
        </div>
        <Link
          href='/'
          text='Sužinoti daugiau apie papildomas paslaugas ir kaip jomis naudotis'
        />
      </div>
    </div>
  );
};

export default ServiceSection;
