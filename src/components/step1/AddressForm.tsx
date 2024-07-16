import { useForm } from 'react-hook-form';
import Step from '../Step';
import { Address } from '../../utils/types';
import FieldContainer from '../FieldContainer';
import CustomInput from '../CustomInput';
import SecondaryButton from '../SecondaryButton';
import { SearchBox } from './SearchBox';
import './step1.css';
import ServiceSection from './ServiceSection';

type AddressFormProps = {
	addressFrom: string;
	addressTo: string;
};

const AddressForm = ({
	setValue,
}: {
	setValue: (name: Address, value: string) => void;
}) => {
	// const { register, setValue, watch, getValues, handleSubmit } =
	// 	useForm<AddressFormProps>({
	// 		defaultValues: {},
	// 	});

	// const form = watch();
	// console.log('form ===', form);

	// const onTestClick = () => {
	// 	const values = getValues();
	// 	console.log('values ===', values);
	// };

	// const onSubmit = (data: AddressFormProps) => {
	// 	console.log('data', data);
	// };

	const onChange = (name: Address, value: string) => {
		setValue(name, value);
	};

	return (
		<Step
			title='Paėmimo ir pristatymo adresai'
			step={1}>
			<div className='address-form-section-wrapper'>
				<FieldContainer
					label='Paėmimo adresas:'
					description='Adresas iš kur paįmama siunta arba perduodama EcoTrip komandai.'>
					<SearchBox
						name={Address.From}
						defaultValue=''
						onChange={onChange}
						placeholder='Įveskite gatvę, namo numerį, miestą'
					/>
				</FieldContainer>
				<FieldContainer
					label='Paėmimo pašto kodas:'
					description='Pašto kodas sugeneruojamas automatiškai, suvedus tikslų adresą. Pasitikrinkite ar teisingas pašto kodas.'>
					<CustomInput
						type='text'
						placeholder='Pašto kodas'
					/>
				</FieldContainer>
			</div>

			<div className='address-form-section-wrapper'>
				<FieldContainer
					label='Pristatymo adresas:'
					description='Adresas, kuriame gavėjas galės atsiimti siuntą arba kuriame siunta bus palikta po pristatymo.'>
					<SearchBox
						name={Address.To}
						defaultValue=''
						onChange={onChange}
						placeholder='Įveskite gatvę, namo numerį, miestą'
					/>
				</FieldContainer>
				<FieldContainer
					label='Pristatymo pašto kodas:'
					description='Pašto kodas sugeneruojamas automatiškai, suvedus tikslų adresą. Pasitikrinkite ar teisingas pašto kodas.'>
					<CustomInput
						type='text'
						placeholder='Pašto kodas'
					/>
				</FieldContainer>
			</div>
			<div
				style={{
					width: '100%',
					display: 'flex',
					marginBottom: '40px',
				}}>
				<SecondaryButton
					type='submit'
					style={{
						marginLeft: 'auto',
					}}>
					Patvirtintinti adresus
				</SecondaryButton>
			</div>
			<ServiceSection />
		</Step>
	);
};

export default AddressForm;
