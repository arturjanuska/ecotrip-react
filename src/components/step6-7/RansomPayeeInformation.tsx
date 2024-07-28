import Step from '../Step';
import ClientInformationForm from '../step4/ClientInformationForm';
import FieldContainer from '../FieldContainer';
import StyledSelect from '../StyledSelect';
import { Control, FieldErrors } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';

type Props = {
	control: Control<FormType, any>;
	formErrors: FieldErrors<FormType>;
};

const RansomPayeeInformation = ({ control, formErrors }: Props) => {
	return (
		<Step
			step={6}
			title='Siuntos/prekės išpirkos gavėjo informacija'>
			<>
				<div
					style={{
						marginBottom: '30px',
					}}>
					<FieldContainer
						label='Kas yra siuntos/prekės išpirkos gavėjas?'
						description='Nurodykite, kam ir kokiu adresu grąžinti iš siuntos gavėjos surinktą pinigų sumą. Įprastai tai yra siuntos siuntėjas.'>
						<StyledSelect
							name='ransomRecipient'
							options={[]}
						/>
					</FieldContainer>
				</div>
				<div>
					<ClientInformationForm
						client='ransomPayee'
						control={control}
						subName='ransomPayeeInformation'
					/>
				</div>
			</>
		</Step>
	);
};

export default RansomPayeeInformation;
