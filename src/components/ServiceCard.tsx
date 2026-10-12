import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

export type ServiceProps = {
  title: string;
  desc: {
    text: string;
    variables: { [key: string]: string };
  };
  icon: React.ReactNode;
  value: string;
  link?: string;
  linkText: string;
};

export type ServiceCardProps = {
  service: ServiceProps;
  onSelect: () => void;
  selected: boolean;
  isParcelForce: boolean;
  direction: 'UK-LT' | 'LT-UK' | 'LT-LT' | null;
  isDisabled: boolean;
};

const CheckmarkIcon = () => {
  return <FontAwesomeIcon icon={faCircleCheck} color="#5f7300" size="lg" />;
};

const ServiceCard = ({
  service,
  onSelect,
  selected,
  isDisabled,
}: ServiceCardProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={`service-card ${selected ? 'active' : ''} ${
        isDisabled ? 'disabled-card' : ''
      }`}
      onClick={onSelect}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-pressed={selected}
      aria-disabled={isDisabled}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="service-info">
        {service.icon}
        <div className="service-description">
          <span className="card-title">{t(service.title)}</span>
          <span className="card-description">
            {t(service.desc.text, service.desc.variables)}
          </span>
        </div>
      </div>
      {selected ? <CheckmarkIcon /> : null}
    </div>
  );
};

export default ServiceCard;
