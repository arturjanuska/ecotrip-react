import { useNavigate } from 'react-router-dom';
import CustomModal from '../components/modal/CustomModal';

const ErrorModalPage = () => {
  const orderId = new URLSearchParams(window.location.search).get('orderId');

  const nav = useNavigate();

  const tryAgain = () => {
    nav('/');
  };

  return (
    <CustomModal
      modalTitle="Apmokėjimo klaida"
      modalBody={
        <>
          <p>
            Apmokėjimo metu įvyko klaida užsakymo ID:
            <span className="order-id">{orderId || ''}</span>.
          </p>
          <p>
            Pinigai nebuvo nurašyti. Jeigu matote lėšų nurašymą, prašome
            patikrinti savo sąskaitą per 1-2 darbo dienas.
          </p>
          <p>
            Jei problema kartojasi ar turite klausimų, prašome susisiekti su
            'EcoTrip' telefonu{' '}
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
          children: 'Bandyti dar kartą',
        },
      }}
    />
  );
};

export default ErrorModalPage;
