/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Control,
	FieldErrors,
	useFieldArray,
	UseFormReturn,
} from 'react-hook-form';
import Step from '../Step';
import SingleShimpentForm from './SingleShimpentForm';
import { FormType } from '../../utils/formTypes';
import PrimaryButton from '../PrimaryButton';
import './step2.css';

const Shipments = ({
	control,
	selectedService,
	methods,
	currency,
	formErrors,
	errorMessages,
	setErrorMessages,
	rate,
}: {
	control: Control<FormType>;
	selectedService: string;
	methods: UseFormReturn<FormType, any, undefined>;
	currency: '€' | '£';
	formErrors: FieldErrors<FormType>;
	errorMessages: Record<string, string>;
	setErrorMessages: React.Dispatch<
		React.SetStateAction<Record<string, string>>
	>;
	rate: number;
}) => {
	const { fields, append, remove } = useFieldArray<FormType>({
		control,
		name: 'shipments',
	});

	const removeShipment = (index: number) => {
		remove(index);
	};

	const disableRemoveButton = fields.length === 1;

	const handleAddShipment = () => {
		append({
			estimatedPrice: '0.00',
			category: {
				label: 'Siunta',
				value: 'shipments',
			},
			amount: 1,
		});
	};

	return (
		<Step
			id='shipments-section'
			step={2}
			title={`Siuntos suvedimas ${
				selectedService === 'shipmentWithAddressService'
					? '(EcoTrip adreso pasl.)'
					: ''
			}`}>
			<div className='shipments-column-wrapper'>
				<div className='shipments-column-container'>
					{fields.length > 0 &&
						fields.map((field, index) => {
							return (
								<div
									className='form-control'
									key={field.id}>
									<SingleShimpentForm
										key={field.id}
										shipmentNumber={index + 1}
										control={control}
										index={index}
										removeShipment={removeShipment}
										selectedService={selectedService}
										setValue={methods.setValue}
										currency={currency}
										formErrors={formErrors}
										disableRemoveButton={disableRemoveButton}
										errorMessages={errorMessages}
										setErrorMessages={setErrorMessages}
										rate={rate}
									/>
								</div>
							);
						})}
				</div>
				<div
					className='single-shipment-container'
					style={{
						margin: 0,
					}}>
					<div className='left-column'>
						<div
							style={{
								width: '100%',
							}}
							className='buttons-container'>
							<PrimaryButton
								className='add-shipment-button'
								type='button'
								onClick={handleAddShipment}>
								Pridėti papildomą siuntą
							</PrimaryButton>
						</div>
					</div>
					<div className='right-column'></div>
				</div>
			</div>
		</Step>
	);
};

export default Shipments;
