/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */
import ServiceCard, { ServiceProps } from '../ServiceCard';
import Link from '../Link';
import { UseFormReturn, UseFormSetValue } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import {
	getServices,
	isCardDisabled,
	servicesDefinition,
} from '../../utils/getServices';

const ServiceSection = ({
	setValue,
	selectedService,
	isParcelForce,
	currency,
	methods,
}: {
	setValue: UseFormSetValue<FormType>;
	selectedService: string;
	isParcelForce: boolean;
	currency: '€' | '£';
	methods: UseFormReturn<FormType, any, undefined>;
}) => {
	const prefillAddressFormFields = (service: string) => {
		const pickupAddress = methods.getValues('pickupAddress');
		const deliveryAddress = methods.getValues('deliveryAddress');
		const pickupAddressPostcode = methods.getValues('pickupAddressZipCode');
		const deliveryAddressPostcode = methods.getValues('deliveryAddressZipCode');

		if (service === servicesDefinition[3]) {
			setValue(`senderInformation.firstName`, 'EcoTrip UK');
			setValue(`senderInformation.lastName`, '----');
			setValue(`senderInformation.phoneNumber`, '+447479622299');
			setValue(`senderInformation.email`, 'info@ecotrip.lt');
			setValue(
				`senderInformation.address`,
				'Chaney Court Cottage, Maidstone Rd, Boughton Monchelseam, Tonbridge'
			);
			setValue(`senderInformation.zipCode`, 'TN12 0RW');
		} else {
			setValue(`senderInformation.firstName`, '');
			setValue(`senderInformation.lastName`, '');
			setValue(`senderInformation.phoneNumber`, '');
			setValue(`senderInformation.email`, '');
			setValue('senderInformation.address', pickupAddress ?? '');
			setValue('senderInformation.zipCode', pickupAddressPostcode ?? '');
		}

		setValue('recipientInformation.address', deliveryAddress ?? '');
		setValue('recipientInformation.zipCode', deliveryAddressPostcode ?? '');
	};

	const direction = methods.watch('direction');

	const handleServiceSelect = (service: string) => {
		if (
			service === servicesDefinition[4] ||
			service === servicesDefinition[3]
		) {
			setValue('customerInformation.payerOfTheShipment', {
				label: 'Gavėjas',
				value: 'thePayerIsTheRecipient',
			});
		}

		if (service === servicesDefinition[5]) {
			setValue('ransomPayeeInformation.ransomRecipient', {
				label: 'Siuntejas',
				value: 'sender',
			});
		}

		setValue('shipments', [
			{
				estimatedPrice: '0.00',
				category: { label: 'Siunta', value: 'shipments' },
				amount: 1,
			},
		]);
		setValue('service', service);
		prefillAddressFormFields(service);
	};

	const services: ServiceProps[] = getServices(
		isParcelForce,
		currency,
		direction
	);

	return (
		<div className='service-section-wrapper'>
			<div className='service-section-container'>
				<span className='title'>Pasirinkite paslaugą:</span>
				<div className='services-mapping-wrapper'>
					<div className='services-mapping-container'>
						{services.map((service, index) => (
							<div
								key={index}
								className='services-mapping-container-service-card'>
								<ServiceCard
									service={service}
									direction={direction}
									onSelect={() => {
										if (isCardDisabled(service.value, isParcelForce, direction))
											return;
										handleServiceSelect(service.value);
									}}
									selected={service.value === selectedService}
									isDisabled={isCardDisabled(
										service.value,
										isParcelForce,
										direction
									)}
									isParcelForce={isParcelForce}
								/>
								<Link
									href='/'
									text='Link'
								/>
							</div>
						))}
					</div>
				</div>
				<Link
					href='/'
					text='Sužinoti daugiau apie papildomas paslaugas ir kaip jomis naudotis'
				/>

				{selectedService === servicesDefinition[2] ? (
					<div className='service-section-sub-text'>
						<span>
							Dėl pasirinkto UK adreso, jūsų siuntą persiųsime per partnerius,
							galimas maksimalus siuntos svoris iki 30 kg ir privalomas
							pakavimas dėžėse. Jei sutinkate su sąlygomis tęskite siuntos
							įvedimą.{' '}
						</span>
						<Link
							href='/'
							text='Plačiau apie siuntų persiuntimą per partnerius rasite čia.'
						/>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default ServiceSection;
