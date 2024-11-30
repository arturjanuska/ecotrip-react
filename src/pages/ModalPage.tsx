import '../styles/modal.css';
import SecondaryButton from '../components/SecondaryButton';
import PrimaryButton from '../components/PrimaryButton';
import useScrollToTop from '../hooks/useScrollToTop';
import { useEffect } from 'react';

const ModalPage = ({
  setOrderId,
  orderId,
}: {
  setOrderId: () => void;
  orderId: string;
}) => {
  useScrollToTop();

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
    <div className='modal-wrapper'>
      <div className='modal-container'>
        <div className='modal-title'>
          Užsakymas sėkmingai užregistruotas
        </div>
        <div className='modal-body'>
          <p>
            Jūsų užsakymo ID yra{' '}
            <span className='order-id'>
              {orderId || ''}
            </span>
            .
          </p>
          <p>
            Nurodytu el. paštu netrukus gausite užsakymo
            patvirtinimą ir papildoma informaciją.
          </p>
          <p>
            Jeigu negausite laiško, prašome susisiekti su
            'EcoTrip' telefonu{' '}
            <span className='contact-number'>
              +370 601 22060
            </span>{' '}
            arba{' '}
            <span className='contact-number'>
              +44 7479 622299
            </span>{' '}
          </p>
        </div>
        <div className='modal-footer'>
          <PrimaryButton
            type='button'
            onClick={() => {
              window.open('https://www.ecotrip.lt');
            }}
          >
            Grižti į pradinį puslapį
          </PrimaryButton>
          <SecondaryButton
            type='button'
            onClick={setOrderId}
          >
            Užsakyti dar kartą
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default ModalPage;
