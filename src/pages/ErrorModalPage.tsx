import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import { useNavigate } from 'react-router-dom';

const ErrorModalPage = () => {
  const orderId = new URLSearchParams(window.location.search).get('orderId');

  const nav = useNavigate();

  const tryAgain = () => {
    nav('/');
  };

  return (
    <div className="modal-wrapper">
      <div className="modal-container">
        <div className="modal-title">Apmokėjimo klaida</div>
        <div className="modal-body">
          <p>
            Apmokėjimo metu įvyko klaida užsakymo ID:{' '}
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
            Bandyti dar kartą
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default ErrorModalPage;
