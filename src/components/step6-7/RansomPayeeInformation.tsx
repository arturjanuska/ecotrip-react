/* eslint-disable @typescript-eslint/no-explicit-any */
import Step from '../Step';
import ClientInformationForm from '../step4/ClientInformationForm';
import FieldContainer from '../FieldContainer';
import { Control, FieldErrors } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { useCustomValidation } from '../../utils/validation/useCustomValidation';
import ControlledStyledSelect from '../ControlledStyledSelect';

type Props = {
	control: Control<FormType, any>;
	formErrors: FieldErrors<FormType>;
	selectedService: string;
};

const RansomPayeeInformation = ({
	control,
	formErrors,
	selectedService,
}: Props) => {
	const validationRules = useCustomValidation({ service: selectedService });

	const ransomPayeeValidationRules = validationRules.ransomPayeeInformation;

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
						<ControlledStyledSelect
							name='ransomRecipient'
							options={[]}
							control={control}
							rules={
								ransomPayeeValidationRules
									? ransomPayeeValidationRules.ransomRecipient
									: undefined
							}
						/>
					</FieldContainer>
				</div>
				<div>
					<ClientInformationForm
						client='ransomPayee'
						control={control}
						subName='ransomPayeeInformation'
						formErrors={formErrors}
						validationRules={
							ransomPayeeValidationRules
								? ransomPayeeValidationRules
								: undefined
						}
					/>
				</div>
			</>
		</Step>
	);
};

export default RansomPayeeInformation;
