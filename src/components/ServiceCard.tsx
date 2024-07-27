import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type ServiceProps = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  value: string;
};

export type ServiceCardProps = {
  service: ServiceProps;
  onSelect: () => void;
  selected: boolean;
  isParcelForce: boolean
};

const CheckmarkIcon = () => {
  return <FontAwesomeIcon icon={faCircleCheck} color='#9AA61E' size='lg' />;
};

const ServiceCard = ({ service, onSelect, selected, isParcelForce }: ServiceCardProps) => {
  return (
    <div
      className={`service-card ${selected ? 'active' : ''} ${isParcelForce && service.value !== "parcelForceShipment" ? "disabled-card" : ""}`}
      onClick={onSelect}
    >
      <div className='service-info'>
        {service.icon}
        <div className='service-description'>
          <span className='card-title'>{service.title}</span>
          <span className='card-description'>{service.desc}</span>
        </div>
      </div>
      {selected ? <CheckmarkIcon /> : null}
    </div>
  );
};

export default ServiceCard;
