import FieldContainer from '../FieldContainer';
import CustomInput from '../CustomInput';
import CustomTextarea from '../CustomTextarea';
import './step4.css';
import { Control } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';

type Props = {
	client: 'sender' | 'recipient' | 'ransomPayee';
	control: Control<FormType, any>;
	subName: string;
};

const ClientInformationForm = ({ client, control, subName }: Props) => {
	const getSubject = (client: Props['client']) => {
		switch (client) {
			case 'sender':
				return 'Siuntėjo';

			case 'recipient':
				return 'Gavėjo';

			case 'ransomPayee':
				return 'Išpirkos gavėjo';

			default:
				return 'Siuntėjo';
		}
	};

	const getAddressDescription = (client: Props['client']) => {
		switch (client) {
			case 'sender':
				return 'Adresas iš kur paįmama siunta arba perduodama EcoTrip komandai.';

			case 'recipient':
				return 'Adresas, kuriame gavėjas galės atsiimti siuntą arba kuriame siunta bus palikta po pristatymo.';

			case 'ransomPayee':
				return 'Adresas, kur perduodami pinigai EcoTrip kurjeriui.';

			default:
				return 'Adresas iš kur paįmama siunta arba perduodama EcoTrip komandai.';
		}
	};

	const value = getSubject(client);

	return (
		<>
			<div>
				<div className='client-form-container'>
					<FieldContainer label={`${value} vardas`}>
						<CustomInput
							placeholder={`Įveskite ${value.toLowerCase()} vardą`}
							control={control}
							name={`${subName}.firstName`}
						/>
					</FieldContainer>
					<FieldContainer label={`${value} pavardė`}>
						<CustomInput
							placeholder={`Įveskite ${value.toLowerCase()} pavardę`}
							control={control}
							name={`${subName}.lastName`}
						/>
					</FieldContainer>
					<FieldContainer label={`${value} telefonas`}>
						<CustomInput
							placeholder={`Įveskite ${value.toLowerCase()} telefoną`}
							control={control}
							name={`${subName}.phoneNumber`}
						/>
					</FieldContainer>
					<FieldContainer label={`${value} el. paštas`}>
						<CustomInput
							placeholder={`Įveskite ${value.toLowerCase()} el. paštą`}
							control={control}
							name={`${subName}.email`}
						/>
					</FieldContainer>
					<FieldContainer
						label={`${value} adresas`}
						description={getAddressDescription(client)}
					>
						<CustomInput
							placeholder={`Įveskite gatvę, namo numerį, miestą`}
							control={control}
							name={`${subName}.address`}
						/>
					</FieldContainer>
					<FieldContainer
						label={`${value} pašto kodas`}
						description='Pašto kodas sugeneruojamas automatiškai, suvedus tikslų adresą. Pasitikrinkite ar teisingas pašto kodas.'
					>
						<CustomInput
							placeholder={`Pašto kodas`}
							control={control}
							name={`${subName}.zipCode`}
						/>
					</FieldContainer>
				</div>
				<CustomTextarea
					label='Papildoma informacija apie paįmamą siuntą'
					name={`${subName}.additionInformation`}
					control={control}
					placeholder='Pvz.: Nebusiu namie, siuntą paduos mano kaimynas. Arba siuntą rasite paėmimui galiniame kieme ir panašiai.'
				/>
			</div>
		</>
	);
};

export default ClientInformationForm;
