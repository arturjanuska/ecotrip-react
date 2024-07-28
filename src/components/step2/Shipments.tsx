import { Control, useFieldArray, UseFormReturn } from 'react-hook-form';
import Step from '../Step';
import SingleShimpentForm from './SingleShimpentForm';
import { FormType } from '../../utils/formTypes';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import './step2.css';

const Shipments = ({
	control,
	selectedService,
	methods,
	currency,
}: {
	control: Control<FormType>;
	selectedService: string;
	methods: UseFormReturn<FormType, any, undefined>;
	currency: '€' | '£';
}) => {
	const { fields, append, remove } = useFieldArray<FormType>({
		control,
		name: 'shipments',
	});

	const watchShipments = methods.watch('shipments');

	const removeShipment = (index: number) => {
		remove(index);
	};

	return (
		<Step
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
									/>
								</div>
							);
						})}
				</div>
				<div
					style={{
						width: '100%',
					}}
					className='buttons-container'>
					<PrimaryButton
						className='add-shipment-button'
						type='button'
						onClick={() => {
							append({
								estimatedPrice: '0.00',
								category:
									selectedService === 'parcelForceShipment'
										? {
												label: 'Siuntos',
												value: 'shipments',
										  }
										: null,
								amount: 1,
							});
						}}>
						Pridėti papildomą siuntą
					</PrimaryButton>
					<SecondaryButton type='button'>
						Paskaičiuoti Užsakymo kainą
					</SecondaryButton>
				</div>
			</div>
		</Step>
	);
};

export default Shipments;
