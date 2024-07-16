import './footer.css';
import LinkList from './LinkList';
import {
	faEnvelope,
	faLocationDot,
	faPhone,
} from '@fortawesome/free-solid-svg-icons';
import InfoEntry from '../InfoEntry';
import News from './News';

const Footer = () => {
	const firstColumnList = [
		{
			label: 'Krovinių pervežimas',
			href: '/',
		},
		{
			label: 'Siuntų gabenimas',
			href: '/',
		},
		{
			label: 'Pristatymas iš parduotuvių',
			href: '/',
		},
		{
			label: 'Vežimo taisyklės',
			href: '/',
		},
	];

	const secondColumnList = [
		{
			label: 'Krovinių pervežimas',
			href: '/',
		},
		{
			label: 'Siuntų gabenimas',
			href: '/',
		},
		{
			label: 'Perkraustymo paslaugos',
			href: '/',
		},
		{
			label: 'Siuntos pakavimo ir ženklinimo taisyklės',
			href: '/',
		},
		{
			label: 'Vežimo taisyklės',
			href: '/',
		},
	];

	return (
		<div className='footer-wrapper'>
			<div className='footer-container'>
				<div className='footer-content'>
					<div className='footer-sections'>
						<LinkList
							list={firstColumnList}
							title='Pervežimai Lietuvoje'
						/>
						<LinkList
							list={secondColumnList}
							title='Pervežimai užsienyje'
						/>
						<div className='link-list-container'>
							<h2 className='link-list-title'>Kontaktai</h2>
							<div className='footer-contacts'>
								<InfoEntry
									icon={faPhone}
									content='+370 601 22060'
								/>
								<InfoEntry
									icon={faPhone}
									content='+370 647 57542'
								/>
								<InfoEntry
									icon={faEnvelope}
									content='info@ecotrip.lt'
								/>
								<InfoEntry
									icon={faLocationDot}
									content='Minijos g. 152b 93263 Klaipėda'
								/>
							</div>
						</div>
						<div className='link-list-container'>
							<News />
						</div>
					</div>
					<p className='copyright'>@ 2024 ecotrip.lt | Visos teisės saugomos</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
