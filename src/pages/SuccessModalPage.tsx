import '../styles/modal.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../components/modal/CustomModal';

const SuccessModalPage = () => {
  const orderId = new URLSearchParams(window.location.search).get('orderId');

  const nav = useNavigate();

  const tryAgain = () => {
    nav('/');
  };

  useEffect(() => {
    const triggerGoogleConversion = () => {
      window.gtag('event', 'conversion', {
        send_to: 'AW-792301087',
        value: 'Success order',
      });
    };
    if (orderId) {
      triggerGoogleConversion();
    }
  }, [orderId]);

  return (
    <CustomModal
      modalTitle="Užsakymas sėkmingai užregistruotas"
      modalBody={
        <>
          <p>
            Jūsų užsakymo ID yra{' '}
            <span className="order-id">{orderId || ''}</span>.
          </p>
          <p>
            Nurodytu el. paštu netrukus gausite užsakymo patvirtinimą ir
            papildoma informaciją.
          </p>
          <p>
            Jeigu negausite laiško, prašome susisiekti su 'EcoTrip' telefonu{' '}
            <span className="contact-number">+370 601 22060</span> arba{' '}
            <span className="contact-number">+44 7479 622299</span>{' '}
          </p>
        </>
      }
      footerProps={{
        primaryButtonProps: {
          type: 'button',
          onClick: () => {
            window.location.href = 'https://www.ecotrip.lt';
          },
          children: 'Grižti į pradinį puslapį',
        },
        secondaryButtonProps: {
          type: 'button',
          onClick: tryAgain,
          children: 'Užsakyti dar kartą',
        },
      }}
    />
  );
};

export default SuccessModalPage;
