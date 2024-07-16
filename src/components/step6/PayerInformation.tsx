import Step from '../Step';
import FieldContainer from '../FieldContainer';
import StyledSelect from '../StyledSelect';
import CustomInput from '../CustomInput';
import CheckboxWithLabel from '../CheckboxWithLabel';
import OrderPrice from './OrderPrice';
import SecondaryButton from '../SecondaryButton';
import './step6.css';
import Link from '../Link';

type PayerInformationProps = {};

const PayerInformation = ({}: PayerInformationProps) => {
	const payerOptions = [
		{
			value: 'thePayerIsTheSender',
			label: 'Mokėtojas yra siuntėjas',
		},
		{
			value: 'thePayerIsTheRecipient',
			label: 'The payer is the recipient',
		},
	];

	const paymentMethodOptions = [
		{
			value: 'cash',
			label: 'Grynais',
		},
	];

	return (
		<Step
			step={6}
			title='Užsakovo / mokėtojo informacija'>
			<>
				<div className='payer-info-container'>
					<FieldContainer
						label='Kas mokės už siuntos pervežimą?'
						description='Prašome iš anksto nurodyti, kas bus atsakingas už siuntos apmokėjimą, kad vėliau nebūtų nesusipratimų ar papildomų klausimų po užsakymo.'>
						<StyledSelect
							name='payer'
							options={payerOptions}
							defaultValue={payerOptions[0]}
						/>
					</FieldContainer>
					<FieldContainer
						label='Pasirinkite apmokėjimo būdą'
						description='Prašome pasirinkti ir nurodyti atsiskaitymo būdą, kuris jums yra patogus ir teisingas.'>
						<StyledSelect
							name='payer'
							options={paymentMethodOptions}
							defaultValue={paymentMethodOptions[0]}
						/>
					</FieldContainer>
				</div>
				<div
					style={{
						width: '100%',
						marginBottom: '14px',
					}}>
					<FieldContainer
						label='Mokėtojo el. paštas'
						description='Užsakymo ir mokėjimo patvirtinimai bus išsiųsti į šį elektroninį paštą.'
						width='full'>
						<CustomInput
							placeholder='Įveskite mokėtojo el. paštą'
							type='text'
						/>
					</FieldContainer>
				</div>
				<OrderPrice sum={324} />
				<div className='checkboxes-container'>
					<CheckboxWithLabel>
						<span>
							Aš esu susipažinęs(-usi) ir sutinku su{' '}
							<Link
								href='/'
								text='EcoTrip siuntos pakavimo ir ženklinimo taisyklėmis'
							/>
						</span>
					</CheckboxWithLabel>
					<CheckboxWithLabel>
						<span>
							Aš esu susipažinęs(-usi) ir sutinku su{' '}
							<Link
								href='/'
								text='EcoTrip vežimo taisyklėmis'
							/>
						</span>
					</CheckboxWithLabel>
				</div>
				<div
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'flex-end',
					}}>
					<SecondaryButton>
						<span>PatvirtinTi užsakymą</span>
					</SecondaryButton>
				</div>
			</>
		</Step>
	);
};

export default PayerInformation;
