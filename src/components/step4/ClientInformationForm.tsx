import FieldContainer from '../FieldContainer';
import CustomInput from '../CustomInput';
import CustomTextarea from '../CustomTextarea';
import './step4.css';

type Props = {
	client: 'sender' | 'recipient';
};

const ClientInformationForm = ({ client }: Props) => {
	const value = client === 'sender' ? 'Siuntėjo' : 'Gavėjo';

	return (
		<>
			<div>
				<div className='client-form-container'>
					<FieldContainer label={`${value} vardas`}>
						<CustomInput
							placeholder={`Įveskite ${value.toLowerCase()} vardą`}
						/>
					</FieldContainer>
					<FieldContainer label={`${value} pavardė`}>
						<CustomInput
							placeholder={`Įveskite ${value.toLowerCase()} pavardę`}
						/>
					</FieldContainer>
					<FieldContainer label={`${value} telefonas`}>
						<CustomInput
							placeholder={`Įveskite ${value.toLowerCase()} telefoną`}
						/>
					</FieldContainer>
					<FieldContainer label={`${value} el. paštas`}>
						<CustomInput
							placeholder={`Įveskite ${value.toLowerCase()} el. paštą`}
						/>
					</FieldContainer>
					<FieldContainer
						label={`${value} adresas`}
						description={
							client === 'sender'
								? 'Adresas iš kur paįmama siunta arba perduodama EcoTrip komandai.'
								: 'Adresas, kuriame gavėjas galės atsiimti siuntą arba kuriame siunta bus palikta po pristatymo.'
						}>
						<CustomInput placeholder={`Įveskite gatvę, namo numerį, miestą`} />
					</FieldContainer>
					<FieldContainer
						label={`${value} pašto kodas`}
						description='Pašto kodas sugeneruojamas automatiškai, suvedus tikslų adresą. Pasitikrinkite ar teisingas pašto kodas.'>
						<CustomInput placeholder={`Pašto kodas`} />
					</FieldContainer>
				</div>
				<CustomTextarea
					label='Papildoma informacija apie paįmamą siuntą'
					name={`${client}Note`}
				/>
			</div>
		</>
	);
};

export default ClientInformationForm;
