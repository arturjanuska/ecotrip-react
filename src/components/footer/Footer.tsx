import './footer.css';
import LinkList from './LinkList';
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import InfoEntry from '../InfoEntry';
import News from './News';
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import IconWithContainer from '../IconWithContainer';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  const firstColumnList = [
    {
      label: t('cargoTransportLink'),
      href: 'https://ecotrip.lt/kroviniu-pervezimas/',
    },
    {
      label: t('shipmentTransportLink'),
      href: 'https://ecotrip.lt/siuntu-pristatymas/',
    },
    {
      label: t('deliveryFromStores'),
      href: 'https://ecotrip.lt/pristatymas-is-parduotuviu/',
    },
    {
      label: t('transportationRules'),
      href: 'https://ecotrip.lt/vezimo-taisykles/',
    },
  ];

  const secondColumnList = [
    {
      label: t('cargoTransportLink'),
      href: 'https://ecotrip.lt/kroviniu-pervezimas/',
    },
    {
      label: t('shipmentTransportLink'),
      href: 'https://ecotrip.lt/siuntu-pristatymas/',
    },
    {
      label: t('movingServices'),
      href: 'https://ecotrip.lt/perkraustymo-paslaugos/',
    },
    {
      label: t('packingAndLabelingRules'),
      href: 'https://ecotrip.lt/siuntos-pakavimo-ir-zenklinimo-taisykles/',
    },
    {
      label: t('transportationRules'),
      href: 'https://ecotrip.lt/vezimo-taisykles/',
    },
  ];

  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-sections">
            <LinkList list={firstColumnList} title={t('domesticTransport')} />
            <LinkList
              list={secondColumnList}
              title={t('internationalTransport')}
            />
            <div className="link-list-container">
              <h2 className="link-list-title">{t('contacts')}</h2>
              <div className="footer-contacts">
                <InfoEntry icon={faPhone} content="+370 601 22060" />
                <InfoEntry icon={faPhone} content="+370 647 57542" />
                <InfoEntry icon={faEnvelope} content="info@ecotrip.lt" />
                <InfoEntry
                  icon={faLocationDot}
                  content="Dubysos g. 37, Klaipėda"
                />
                <div className="contacts-icons">
                  <IconWithContainer
                    icon={faFacebookF}
                    onClick={() => {
                      window.open(
                        'https://www.facebook.com/Ecotrip.lt/',
                        '_blank'
                      );
                    }}
                  />
                  <IconWithContainer
                    icon={faLinkedin}
                    onClick={() => {
                      window.open(
                        'https://www.linkedin.com/company/ecotrip-transona/?trk=public_post_feed-actor-name&originalSubdomain=lt',
                        '_blank'
                      );
                    }}
                  />
                  <IconWithContainer
                    icon={faInstagram}
                    onClick={() => {
                      window.open(
                        'https://www.instagram.com/ecotriplogistika/',
                        '_blank'
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="link-list-container">
              <News />
            </div>
          </div>
          <p className="copyright">{t('copyright')}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
