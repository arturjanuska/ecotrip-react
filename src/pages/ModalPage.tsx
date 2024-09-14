import '../styles/modal.css';
import SecondaryButton from '../components/SecondaryButton';
import PrimaryButton from '../components/PrimaryButton';
import useScrollToTop from '../hooks/useScrollToTop';

const ModalPage = ({
	setOrderId,
	orderId,
}: {
	setOrderId: () => void;
	orderId: string;
}) => {
	useScrollToTop();

	return (
		<div className='modal-wrapper'>
			<div className='modal-container'>
				<div className='modal-title'>Užsakymas sėkmingai užregistruotas</div>
				<div className='modal-body'>
					<p>
						Jūsų užsakymo ID yra{' '}
						<span className='order-id'>{orderId || ''}</span>.
					</p>
					<p>
						Nurodytu el. paštu netrukus gausite užsakymo patvirtinimą ir
						papildoma informaciją.
					</p>
					<p>
						Jeigu negausite laiško, prašome susisiekti su 'EcoTrip' telefonu{' '}
						<span className='contact-number'>+37060122060</span> arba{' '}
						<span className='contact-number'>+447479622299</span>{' '}
					</p>
				</div>
				<div className='modal-footer'>
					<PrimaryButton
						type='button'
						onClick={() => {
							window.open('https://www.ecotrip.lt');
						}}>
						Grižti į pradinį puslapį
					</PrimaryButton>
					<SecondaryButton
						type='button'
						onClick={setOrderId}>
						Užsakyti dar kartą
					</SecondaryButton>
				</div>
			</div>
		</div>
	);
};

export default ModalPage;
