import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBell, faHouse, faImage } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ServiceCard, { ServiceProps } from '../ServiceCard';
import Link from '../Link';

const services: ServiceProps[] = [
	{
		title: 'Standartinės siuntos',
		desc: 'Įprastos kainos',
		icon: faHouse,
	},
	{
		title: 'Siuntos su adreso paslauga',
		desc: 'Papildomai nuo €0 / vnt.',
		icon: faImage,
	},
	{
		title: 'Prekės nupirkimo paslauga',
		desc: 'Papildomai nuo €5 / vnt.',
		icon: faInstagram,
	},
	{
		title: 'Prekės pardavimo paslauga',
		desc: 'Papildomai nuo €10 / vnt.',
		icon: faBell,
	},
];

const ServiceSection = () => {
	const [selectedServiceIndex, setSelectedServiceIndex] = useState<number>(0);

	const handleServiceSelect = (index: number) => {
		setSelectedServiceIndex(index);
	};

	return (
		<div className='service-section-wrapper'>
			<div className='service-section-container'>
				<span className='title'>Pasirinkite vieną EcoTrip paslaugą:</span>
				<div className='services-mapping-wrapper'>
					<div className='services-mapping-container'>
						{services.map((service, index) => (
							<div key={index}>
								<ServiceCard
									service={service}
									onSelect={() => {
										handleServiceSelect(index);
									}}
									selected={index === selectedServiceIndex}
								/>
							</div>
						))}
					</div>
				</div>
				<Link
					href='/'
					text='Sužinoti daugiau apie papildomas paslaugas ir kaip jomis naudotis'
				/>
			</div>
		</div>
	);
};

export default ServiceSection;
