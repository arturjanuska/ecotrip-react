import '../styles/modal.css';
import { useEffect } from 'react';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import SiteHeader from '../components/layout/SiteHeader';

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
    <>
      <SiteHeader />
      <main className="modal-wrapper">
        <div className="modal-container">
          <div className="modal-title">Užsakymas sėkmingai užregistruotas</div>
          <div className="modal-body">
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
          </div>
          <div className="modal-footer">
            <PrimaryButton
              type="button"
              onClick={() => {
                window.location.href = 'https://www.ecotrip.lt';
              }}
            >
              Grižti į pradinį puslapį
            </PrimaryButton>
            <SecondaryButton type="button" onClick={tryAgain}>
              Užsakyti dar kartą
            </SecondaryButton>
          </div>
        </div>
      </main>
    </>
  );
};

export default SuccessModalPage;
