import { CommonProductTypeExample, OptionType } from './types';
import { getOptions } from './getOptions';

export const automotiveGoodsCategoryProducts: CommonProductTypeExample[] = [
	// setOfWheels
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Ratų komplektas',
			value: 'setOfWheels',
		},
		size: {
			from: 0,
			to: 15,
		},
		volume: 0.08,
		weight: 28,
		specification: false,
		visualInfo: null,
		price: 60,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Ratų komplektas',
			value: 'setOfWheels',
		},
		size: {
			from: 0,
			to: 15,
		},
		specification: true,
		visualInfo: null,
		price: 70,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Ratų komplektas',
			value: 'setOfWheels',
		},
		size: {
			from: 16,
			to: 17,
		},
		specification: false,
		visualInfo: null,
		price: 80,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Ratų komplektas',
			value: 'setOfWheels',
		},
		size: {
			from: 16,
			to: 17,
		},
		specification: true,
		visualInfo: null,
		price: 90,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Ratų komplektas',
			value: 'setOfWheels',
		},
		size: {
			from: 18,
			to: 21,
		},
		specification: false,
		visualInfo: null,
		price: 100,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Ratų komplektas',
			value: 'setOfWheels',
		},
		size: {
			from: 18,
			to: 21,
		},
		specification: true,
		visualInfo: null,
		price: 110,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Ratų komplektas',
			value: 'setOfWheels',
		},
		size: {
			from: 22,
			to: Infinity,
		},
		specification: false,
		visualInfo: null,
		price: 120,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Ratų komplektas',
			value: 'setOfWheels',
		},
		size: {
			from: 22,
			to: Infinity,
		},
		specification: true,
		visualInfo: null,
		price: 130,
	},
	// Kita sub kategorija
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilinė kėdutė',
			value: 'childSeat',
		},
		size: {
			label: 'Be pado, nepasukama',
			value: 'withoutSole',
		},
		specification: null,
		visualInfo: null,
		price: 40,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilinė kėdutė',
			value: 'childSeat',
		},
		size: {
			label: 'Pasukama ir/arba su padu',
			value: 'withSole',
		},
		specification: null,
		visualInfo: null,
		price: 45,
	},
	// doors
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio durys',
			value: 'doors',
		},
		size: {
			label: 'Mikro automobiliai',
			value: 'microCars',
		},
		specification: null,
		visualInfo: 'Fiat 500',
		price: 45,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio durys',
			value: 'doors',
		},
		size: {
			label: 'Subkompaktiniai automobiliai',
			value: 'subcompactCars',
		},
		specification: null,
		visualInfo: 'VW Polo',
		price: 45,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio durys',
			value: 'doors',
		},
		size: {
			label: 'Kompaktiniai automobiliai',
			value: 'compactCars',
		},
		specification: null,
		visualInfo: 'VW Golf',
		price: 50,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio durys',
			value: 'doors',
		},
		size: {
			label: 'Vidutinio dydžio automobiliai',
			value: 'midSizeCars',
		},
		specification: null,
		visualInfo: 'VW Passat',
		price: 50,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio durys',
			value: 'doors',
		},
		size: {
			label: 'Dideli automobiliai',
			value: 'bigCars',
		},
		specification: null,
		visualInfo: 'MB S Class',
		price: 55,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio durys',
			value: 'doors',
		},
		size: {
			label: 'Visureigiai',
			value: 'suvs',
		},
		specification: null,
		visualInfo: 'BMW X5',
		price: 55,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio durys',
			value: 'doors',
		},
		size: {
			label: 'Pikapai',
			value: 'pickupTrucks',
		},
		specification: null,
		visualInfo: 'Ford Ranger',
		price: 60,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio durys',
			value: 'doors',
		},
		size: {
			label: 'Mikroautobusai',
			value: 'minibuses',
		},
		specification: null,
		visualInfo: 'FVW Caravelle',
		price: 85,
	},
	// interior
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio salonas',
			value: 'interior',
		},
		size: {
			label: 'Mikro automobiliai',
			value: 'microCars',
		},
		specification: null,
		visualInfo: 'Fiat 500',
		price: 4444,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio salonas',
			value: 'interior',
		},
		size: {
			label: 'Subkompaktiniai automobiliai',
			value: 'subcompactCars',
		},
		specification: null,
		visualInfo: 'VW Polo',
		price: 4444,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio salonas',
			value: 'interior',
		},
		size: {
			label: 'Kompaktiniai automobiliai',
			value: 'compactCars',
		},
		specification: null,
		visualInfo: 'VW Golf',
		price: 4444,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio salonas',
			value: 'interior',
		},
		size: {
			label: 'Vidutinio dydžio automobiliai',
			value: 'midSizeCars',
		},
		specification: null,
		visualInfo: 'VW Passat',
		price: 4444,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio salonas',
			value: 'interior',
		},
		size: {
			label: 'Dideli automobiliai',
			value: 'bigCars',
		},
		specification: null,
		visualInfo: 'MB S Class',
		price: 4444,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio salonas',
			value: 'interior',
		},
		size: {
			label: 'Visureigiai',
			value: 'suvs',
		},
		specification: null,
		visualInfo: 'BMW X5',
		price: 4444,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio salonas',
			value: 'interior',
		},
		size: {
			label: 'Pikapai',
			value: 'pickupTrucks',
		},
		specification: null,
		visualInfo: 'Ford Ranger',
		price: 4444,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio salonas',
			value: 'interior',
		},
		size: {
			label: 'Mikroautobusai',
			value: 'minibuses',
		},
		specification: null,
		visualInfo: 'FVW Caravelle',
		price: 4444,
	},
	// carQuarter
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio ketvirtis',
			value: 'carQuarter',
		},
		size: {
			label: 'Mikro automobiliai',
			value: 'microCars',
		},
		specification: null,
		visualInfo: 'Fiat 500',
		price: 120,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio ketvirtis',
			value: 'carQuarter',
		},
		size: {
			label: 'Subkompaktiniai automobiliai',
			value: 'subcompactCars',
		},
		specification: null,
		visualInfo: 'VW Polo',
		price: 130,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio ketvirtis',
			value: 'carQuarter',
		},
		size: {
			label: 'Kompaktiniai automobiliai',
			value: 'compactCars',
		},
		specification: null,
		visualInfo: 'VW Golf',
		price: 130,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio ketvirtis',
			value: 'carQuarter',
		},
		size: {
			label: 'Vidutinio dydžio automobiliai',
			value: 'midSizeCars',
		},
		specification: null,
		visualInfo: 'VW Passat',
		price: 150,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio ketvirtis',
			value: 'carQuarter',
		},
		size: {
			label: 'Dideli automobiliai',
			value: 'bigCars',
		},
		specification: null,
		visualInfo: 'MB S Class',
		price: 170,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio ketvirtis',
			value: 'carQuarter',
		},
		size: {
			label: 'Visureigiai',
			value: 'suvs',
		},
		specification: null,
		visualInfo: 'BMW X5',
		price: 185,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio ketvirtis',
			value: 'carQuarter',
		},
		size: {
			label: 'Pikapai',
			value: 'pickupTrucks',
		},
		specification: null,
		visualInfo: 'Ford Ranger',
		price: 180,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio ketvirtis',
			value: 'carQuarter',
		},
		size: {
			label: 'Mikroautobusai',
			value: 'minibuses',
		},
		specification: null,
		visualInfo: 'FVW Caravelle',
		price: 200,
	},
	// bumper
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio buferis',
			value: 'bumper',
		},
		size: {
			label: 'Mikro automobiliai',
			value: 'microCars',
		},
		specification: null,
		visualInfo: 'Fiat 500',
		price: 60,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio buferis',
			value: 'bumper',
		},
		size: {
			label: 'Subkompaktiniai automobiliai',
			value: 'subcompactCars',
		},
		specification: null,
		visualInfo: 'VW Polo',
		price: 60,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio buferis',
			value: 'bumper',
		},
		size: {
			label: 'Kompaktiniai automobiliai',
			value: 'compactCars',
		},
		specification: null,
		visualInfo: 'VW Golf',
		price: 70,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio buferis',
			value: 'bumper',
		},
		size: {
			label: 'Vidutinio dydžio automobiliai',
			value: 'midSizeCars',
		},
		specification: null,
		visualInfo: 'VW Passat',
		price: 75,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio buferis',
			value: 'bumper',
		},
		size: {
			label: 'Dideli automobiliai',
			value: 'bigCars',
		},
		specification: null,
		visualInfo: 'MB S Class',
		price: 80,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio buferis',
			value: 'bumper',
		},
		size: {
			label: 'Visureigiai',
			value: 'suvs',
		},
		specification: null,
		visualInfo: 'BMW X5',
		price: 85,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio buferis',
			value: 'bumper',
		},
		size: {
			label: 'Pikapai',
			value: 'pickupTrucks',
		},
		specification: null,
		visualInfo: 'Ford Ranger',
		price: 85,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio buferis',
			value: 'bumper',
		},
		size: {
			label: 'Mikroautobusai',
			value: 'minibuses',
		},
		specification: null,
		visualInfo: 'FVW Caravelle',
		price: 85,
	},
	// cover
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio priekinis/galinis dangtis',
			value: 'cover',
		},
		size: {
			label: 'Mikro automobiliai',
			value: 'microCars',
		},
		specification: null,
		visualInfo: 'Fiat 500',
		price: 55,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio priekinis/galinis dangtis',
			value: 'cover',
		},
		size: {
			label: 'Subkompaktiniai automobiliai',
			value: 'subcompactCars',
		},
		specification: null,
		visualInfo: 'VW Polo',
		price: 55,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio priekinis/galinis dangtis',
			value: 'cover',
		},
		size: {
			label: 'Kompaktiniai automobiliai',
			value: 'compactCars',
		},
		specification: null,
		visualInfo: 'VW Golf',
		price: 60,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio priekinis/galinis dangtis',
			value: 'cover',
		},
		size: {
			label: 'Vidutinio dydžio automobiliai',
			value: 'midSizeCars',
		},
		specification: null,
		visualInfo: 'VW Passat',
		price: 65,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio priekinis/galinis dangtis',
			value: 'cover',
		},
		size: {
			label: 'Dideli automobiliai',
			value: 'bigCars',
		},
		specification: null,
		visualInfo: 'MB S Class',
		price: 80,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio priekinis/galinis dangtis',
			value: 'cover',
		},
		size: {
			label: 'Visureigiai',
			value: 'suvs',
		},
		specification: null,
		visualInfo: 'BMW X5',
		price: 80,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio priekinis/galinis dangtis',
			value: 'cover',
		},
		size: {
			label: 'Pikapai',
			value: 'pickupTrucks',
		},
		specification: null,
		visualInfo: 'Ford Ranger',
		price: 80,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio priekinis/galinis dangtis',
			value: 'cover',
		},
		size: {
			label: 'Mikroautobusai',
			value: 'minibuses',
		},
		specification: null,
		visualInfo: 'FVW Caravelle',
		price: 85,
	},
	// engine
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 0,
			to: 999,
		},
		specification: false,
		visualInfo: null,
		price: 80,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 0,
			to: 999,
		},
		specification: true,
		visualInfo: null,
		price: 120,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 1000,
			to: 1499,
		},
		specification: false,
		visualInfo: null,
		price: 100,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 1000,
			to: 1499,
		},
		specification: true,
		visualInfo: null,
		price: 170,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 1500,
			to: 1999,
		},
		specification: false,
		visualInfo: null,
		price: 120,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 1500,
			to: 1999,
		},
		specification: true,
		visualInfo: null,
		price: 200,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 2000,
			to: 2499,
		},
		specification: false,
		visualInfo: null,
		price: 150,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 2000,
			to: 2499,
		},
		specification: true,
		visualInfo: null,
		price: 250,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 2500,
			to: 2999,
		},
		specification: false,
		visualInfo: null,
		price: 180,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 2500,
			to: 2999,
		},
		specification: true,
		visualInfo: null,
		price: 300,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 3000,
			to: 3499,
		},
		specification: false,
		visualInfo: null,
		price: 200,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 3000,
			to: 3499,
		},
		specification: true,
		visualInfo: null,
		price: 350,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 3500,
			to: 3999,
		},
		specification: false,
		visualInfo: null,
		price: 230,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 3500,
			to: 3999,
		},
		specification: true,
		visualInfo: null,
		price: 370,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 4000,
			to: Infinity,
		},
		specification: false,
		visualInfo: null,
		price: 250,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 4000,
			to: Infinity,
		},
		specification: true,
		visualInfo: null,
		price: 400,
	},
	// transmision
	// specification: true => Mechanine
	// specification: false => Automatine
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 0,
			to: 999,
		},
		specification: false,
		visualInfo: null,
		price: 45,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 0,
			to: 999,
		},
		specification: true,
		visualInfo: null,
		price: 50,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 1000,
			to: 1499,
		},
		specification: false,
		visualInfo: null,
		price: 50,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 1000,
			to: 1499,
		},
		specification: true,
		visualInfo: null,
		price: 65,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 1500,
			to: 1999,
		},
		specification: false,
		visualInfo: null,
		price: 60,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 1500,
			to: 1999,
		},
		specification: true,
		visualInfo: null,
		price: 75,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 2000,
			to: 2499,
		},
		specification: false,
		visualInfo: null,
		price: 75,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 2000,
			to: 2499,
		},
		specification: true,
		visualInfo: null,
		price: 85,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 2500,
			to: 2999,
		},
		specification: false,
		visualInfo: null,
		price: 85,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 2500,
			to: 2999,
		},
		specification: true,
		visualInfo: null,
		price: 120,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 3000,
			to: 3499,
		},
		specification: false,
		visualInfo: null,
		price: 120,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 3000,
			to: 3499,
		},
		specification: true,
		visualInfo: null,
		price: 120,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 3500,
			to: 3999,
		},
		specification: false,
		visualInfo: null,
		price: 120,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 3500,
			to: 3999,
		},
		specification: true,
		visualInfo: null,
		price: 120,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 4000,
			to: Infinity,
		},
		specification: false,
		visualInfo: null,
		price: 120,
	},
	{
		category: {
			label: 'Automobilinės prekės',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'Automobilio variklis',
			value: 'engine',
		},
		size: {
			from: 4000,
			to: Infinity,
		},
		specification: true,
		visualInfo: null,
		price: 120,
	},
];

export const bicyclesAndScootersCategoryProducts: CommonProductTypeExample[] = [
	// childBicycleAndTricycle
	{
		category: {
			label: 'Dviračiai, paspirtukai',
			value: 'bicyclesAndScooters',
		},
		productType: {
			label: 'Vaikiškas dviratis, triratis (<12 metų)',
			value: 'childBicycleAndTricycle',
		},
		size: {
			label: 'Pilnai surinktas',
			value: 'fullyAssembled',
		},
		specification: null,
		visualInfo: null,
		price: 35,
	},
	{
		category: {
			label: 'Dviračiai, paspirtukai',
			value: 'bicyclesAndScooters',
		},
		productType: {
			label: 'Vaikiškas dviratis, triratis (<12 metų)',
			value: 'childBicycleAndTricycle',
		},
		size: {
			label: 'Išardytas',
			value: 'dismantled',
		},
		specification: null,
		visualInfo: null,
		price: 35,
	},
	// teenagersBike
	{
		category: {
			label: 'Dviračiai, paspirtukai',
			value: 'bicyclesAndScooters',
		},
		productType: {
			label: 'Paauglio dviratis (>12 metų)',
			value: 'teenagersBike',
		},
		size: {
			label: 'Pilnai surinktas',
			value: 'fullyAssembled',
		},
		specification: null,
		visualInfo: null,
		price: 40,
	},
	{
		category: {
			label: 'Dviračiai, paspirtukai',
			value: 'bicyclesAndScooters',
		},
		productType: {
			label: 'Paauglio dviratis (>12 metų)',
			value: 'teenagersBike',
		},
		size: {
			label: 'Išardytas',
			value: 'dismantled',
		},
		specification: null,
		visualInfo: null,
		price: 40,
	},
	// adultBike
	{
		category: {
			label: 'Dviračiai, paspirtukai',
			value: 'bicyclesAndScooters',
		},
		productType: {
			label: 'Suaugusiojo dviratis',
			value: 'adultBike',
		},
		size: {
			label: 'Pilnai surinktas',
			value: 'fullyAssembled',
		},
		specification: null,
		visualInfo: null,
		price: 60,
	},
	{
		category: {
			label: 'Dviračiai, paspirtukai',
			value: 'bicyclesAndScooters',
		},
		productType: {
			label: 'Suaugusiojo dviratis',
			value: 'adultBike',
		},
		size: {
			label: 'Išardytas',
			value: 'dismantled',
		},
		specification: null,
		visualInfo: null,
		price: 50,
	},
	// electricBike
	{
		category: {
			label: 'Dviračiai, paspirtukai',
			value: 'bicyclesAndScooters',
		},
		productType: { label: 'Elektrinis dviratis', value: 'electricBike' },
		size: {
			label: 'Pilnai surinktas',
			value: 'fullyAssembled',
		},
		specification: null,
		visualInfo: null,
		price: 70,
	},
	{
		category: {
			label: 'Dviračiai, paspirtukai',
			value: 'bicyclesAndScooters',
		},
		productType: { label: 'Elektrinis dviratis', value: 'electricBike' },
		size: {
			label: 'Išardytas',
			value: 'dismantled',
		},
		specification: null,
		visualInfo: null,
		price: 55,
	},
	// childBicycleTrailer
	{
		category: {
			label: 'Dviračiai, paspirtukai',
			value: 'bicyclesAndScooters',
		},
		productType: {
			label: 'Vaikiška dviračio priekaba',
			value: 'childBicycleTrailer',
		},
		size: {
			label: 'Pilnai surinktas',
			value: 'fullyAssembled',
		},
		specification: null,
		visualInfo: null,
		price: 75,
	},
	{
		category: {
			label: 'Dviračiai, paspirtukai',
			value: 'bicyclesAndScooters',
		},
		productType: {
			label: 'Vaikiška dviračio priekaba',
			value: 'childBicycleTrailer',
		},
		size: {
			label: 'Išardytas',
			value: 'dismantled',
		},
		specification: null,
		visualInfo: null,
		price: 60,
	},
	// electricScooter
	{
		category: {
			label: 'Dviračiai, paspirtukai',
			value: 'bicyclesAndScooters',
		},
		productType: {
			label: 'Elektrinis paspirtukas',
			value: 'electricScooter',
		},
		size: {
			from: 0,
			to: 24,
		},
		specification: null,
		visualInfo: null,
		price: 45,
	},
	{
		category: {
			label: 'Dviračiai, paspirtukai',
			value: 'bicyclesAndScooters',
		},
		productType: {
			label: 'Elektrinis paspirtukas',
			value: 'electricScooter',
		},
		size: {
			from: 25,
			to: 500,
		},
		specification: null,
		visualInfo: null,
		price: 60,
	},
];

export const goodsForChildrenCategoryProducts: CommonProductTypeExample[] = [
	// childSeat
	{
		category: {
			label: 'Prekės vaikams',
			value: 'goodsForChildren',
		},
		productType: {
			label: 'Automobilinė kėdutė',
			value: 'childSeat',
		},
		size: {
			label: 'Be pado, nepasukama',
			value: 'withoutSole',
		},
		specification: null,
		visualInfo: null,
		price: 40,
	},
	{
		category: {
			label: 'Prekės vaikams',
			value: 'goodsForChildren',
		},
		productType: {
			label: 'Automobilinė kėdutė',
			value: 'childSeat',
		},
		size: {
			label: 'Pasukama ir/arba su padu',
			value: 'withSole',
		},
		specification: null,
		visualInfo: null,
		price: 45,
	},
	// strollers
	{
		category: {
			label: 'Prekės vaikams',
			value: 'goodsForChildren',
		},
		productType: {
			label: 'Vežimėliai',
			value: 'strollers',
		},
		size: {
			label: 'Skėtukas (kelioninis)',
			value: 'umbrella',
		},
		specification: null,
		visualInfo: null,
		price: 40,
	},
	{
		category: {
			label: 'Prekės vaikams',
			value: 'goodsForChildren',
		},
		productType: {
			label: 'Vežimėliai',
			value: 'strollers',
		},
		size: {
			label: 'Universalus',
			value: 'universal',
		},
		specification: null,
		visualInfo: null,
		price: 50,
	},
	{
		category: {
			label: 'Prekės vaikams',
			value: 'goodsForChildren',
		},
		productType: {
			label: 'Vežimėliai',
			value: 'strollers',
		},
		size: {
			label: 'Sportinis',
			value: 'sport',
		},
		specification: null,
		visualInfo: null,
		price: 50,
	},
	{
		category: {
			label: 'Prekės vaikams',
			value: 'goodsForChildren',
		},
		productType: {
			label: 'Vežimėliai',
			value: 'strollers',
		},
		size: {
			label: 'Lopšio vežimėlis',
			value: 'cradleStroller',
		},
		specification: null,
		visualInfo: null,
		price: 45,
	},
	{
		category: {
			label: 'Prekės vaikams',
			value: 'goodsForChildren',
		},
		productType: {
			label: 'Vežimėliai',
			value: 'strollers',
		},
		size: {
			label: 'Dvyniams',
			value: 'forTwins',
		},
		specification: null,
		visualInfo: null,
		price: 75,
	},
	{
		category: {
			label: 'Prekės vaikams',
			value: 'goodsForChildren',
		},
		productType: {
			label: 'Vežimėliai',
			value: 'strollers',
		},
		size: {
			label: '2 in 1',
			value: '2in1',
		},
		specification: null,
		visualInfo: null,
		price: 60,
	},
	{
		category: {
			label: 'Prekės vaikams',
			value: 'goodsForChildren',
		},
		productType: {
			label: 'Vežimėliai',
			value: 'strollers',
		},
		size: {
			label: '3 in 1',
			value: '3in1',
		},
		specification: null,
		visualInfo: null,
		price: 85,
	},
	// childBicycleTrailer
	{
		category: {
			label: 'Dviračiai, paspirtukai',
			value: 'bicyclesAndScooters',
		},
		productType: {
			label: 'Vaikiška dviračio priekaba',
			value: 'childBicycleTrailer',
		},
		size: {
			label: 'Pilnai surinktas',
			value: 'fullyAssembled',
		},
		specification: null,
		visualInfo: null,
		price: 75,
	},
	{
		category: {
			label: 'Dviračiai, paspirtukai',
			value: 'bicyclesAndScooters',
		},
		productType: {
			label: 'Vaikiška dviračio priekaba',
			value: 'childBicycleTrailer',
		},
		size: {
			label: 'Išardytas',
			value: 'dismantled',
		},
		specification: null,
		visualInfo: null,
		price: 60,
	},
];

export const motorcyclesAndAccessoriesCategoryProducts: CommonProductTypeExample[] =
	[
		// scooterMoped
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motoroleris, mopedas',
				value: 'scooterMoped',
			},
			size: {
				from: 0,
				to: 49,
			},
			specification: null,
			visualInfo: null,
			price: 120,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motoroleris, mopedas',
				value: 'scooterMoped',
			},
			size: {
				from: 50,
				to: 124,
			},
			specification: null,
			visualInfo: null,
			price: 160,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motoroleris, mopedas',
				value: 'scooterMoped',
			},
			size: {
				from: 125,
				to: 249,
			},
			specification: null,
			visualInfo: null,
			price: 200,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motoroleris, mopedas',
				value: 'scooterMoped',
			},
			size: {
				from: 250,
				to: Infinity,
			},
			specification: null,
			visualInfo: null,
			price: 270,
		},
		// Standartinis motociklas standardMotorcycle
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Standartinis motociklas',
				value: 'standardMotorcycle',
			},
			size: {
				from: 0,
				to: 499,
			},
			specification: null,
			visualInfo: null,
			price: 250,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Standartinis motociklas',
				value: 'standardMotorcycle',
			},
			size: {
				from: 500,
				to: 749,
			},
			specification: null,
			visualInfo: null,
			price: 270,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Standartinis motociklas',
				value: 'standardMotorcycle',
			},
			size: {
				from: 750,
				to: 999,
			},
			specification: null,
			visualInfo: null,
			price: 300,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Standartinis motociklas',
				value: 'standardMotorcycle',
			},
			size: {
				from: 1000,
				to: Infinity,
			},
			specification: null,
			visualInfo: null,
			price: 330,
		},
		// Krosinis motociklas motocrossMotorcycle
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Krosinis motociklas',
				value: 'motocrossMotorcycle',
			},
			size: {
				from: 0,
				to: 124,
			},
			specification: null,
			visualInfo: null,
			price: 150,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Krosinis motociklas',
				value: 'motocrossMotorcycle',
			},
			size: {
				from: 125,
				to: 249,
			},
			specification: null,
			visualInfo: null,
			price: 180,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Krosinis motociklas',
				value: 'motocrossMotorcycle',
			},
			size: {
				from: 250,
				to: 449,
			},
			specification: null,
			visualInfo: null,
			price: 230,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Krosinis motociklas',
				value: 'motocrossMotorcycle',
			},
			size: {
				from: 450,
				to: Infinity,
			},
			specification: null,
			visualInfo: null,
			price: 260,
		},
		// Kelioninis motociklas touringMotorcycle
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Kelioninis motociklas',
				value: 'touringMotorcycle',
			},
			size: {
				from: 0,
				to: 799,
			},
			specification: null,
			visualInfo: null,
			price: 300,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Kelioninis motociklas',
				value: 'touringMotorcycle',
			},
			size: {
				from: 800,
				to: 1199,
			},
			specification: null,
			visualInfo: null,
			price: 350,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Kelioninis motociklas',
				value: 'touringMotorcycle',
			},
			size: {
				from: 1200,
				to: 1599,
			},
			specification: null,
			visualInfo: null,
			price: 400,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Kelioninis motociklas',
				value: 'touringMotorcycle',
			},
			size: {
				from: 1600,
				to: Infinity,
			},
			specification: null,
			visualInfo: null,
			price: 430,
		},
		// Sportinis motociklas sportsMotorcycle
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Sportinis motociklas',
				value: 'sportsMotorcycle',
			},
			size: {
				from: 0,
				to: 599,
			},
			specification: null,
			visualInfo: null,
			price: 230,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Sportinis motociklas',
				value: 'sportsMotorcycle',
			},
			size: {
				from: 600,
				to: 999,
			},
			specification: null,
			visualInfo: null,
			price: 260,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Sportinis motociklas',
				value: 'sportsMotorcycle',
			},
			size: {
				from: 1000,
				to: Infinity,
			},
			specification: null,
			visualInfo: null,
			price: 280,
		},
		// Čioperis chopper
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Čioperis',
				value: 'chopper',
			},
			size: {
				from: 0,
				to: 799,
			},
			specification: null,
			visualInfo: null,
			price: 300,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Čioperis',
				value: 'chopper',
			},
			size: {
				from: 800,
				to: 1199,
			},
			specification: null,
			visualInfo: null,
			price: 350,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Čioperis',
				value: 'chopper',
			},
			size: {
				from: 1200,
				to: Infinity,
			},
			specification: null,
			visualInfo: null,
			price: 400,
		},
		// Enduro enduro
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Enduro',
				value: 'enduro',
			},
			size: {
				from: 0,
				to: 249,
			},
			specification: null,
			visualInfo: null,
			price: 200,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Enduro',
				value: 'enduro',
			},
			size: {
				from: 250,
				to: 649,
			},
			specification: null,
			visualInfo: null,
			price: 230,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Enduro',
				value: 'enduro',
			},
			size: {
				from: 650,
				to: 1199,
			},
			specification: null,
			visualInfo: null,
			price: 250,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Enduro',
				value: 'enduro',
			},
			size: {
				from: 1200,
				to: Infinity,
			},
			specification: null,
			visualInfo: null,
			price: 280,
		},
		// quadBike Keturratis
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Keturratis',
				value: 'quadBike',
			},
			size: {
				from: 0,
				to: 399,
			},
			specification: null,
			visualInfo: null,
			price: 330,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Keturratis',
				value: 'quadBike',
			},
			size: {
				from: 400,
				to: 799,
			},
			specification: null,
			visualInfo: null,
			price: 360,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Keturratis',
				value: 'quadBike',
			},
			size: {
				from: 800,
				to: 1199,
			},
			specification: null,
			visualInfo: null,
			price: 400,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Keturratis',
				value: 'quadBike',
			},
			size: {
				from: 1200,
				to: Infinity,
			},
			specification: null,
			visualInfo: null,
			price: 400,
		},
		// Motociklo variklis motorcycleEngine
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motociklo variklis',
				value: 'motorcycleEngine',
			},
			size: {
				from: 0,
				to: 44,
			},
			specification: null,
			visualInfo: null,
			price: 45,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motociklo variklis',
				value: 'motorcycleEngine',
			},
			size: {
				from: 45,
				to: 249,
			},
			specification: null,
			visualInfo: null,
			price: 55,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motociklo variklis',
				value: 'motorcycleEngine',
			},
			size: {
				from: 250,
				to: 449,
			},
			specification: null,
			visualInfo: null,
			price: 65,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motociklo variklis',
				value: 'motorcycleEngine',
			},
			size: {
				from: 450,
				to: 599,
			},
			specification: null,
			visualInfo: null,
			price: 80,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motociklo variklis',
				value: 'motorcycleEngine',
			},
			size: {
				from: 600,
				to: 999,
			},
			specification: null,
			visualInfo: null,
			price: 90,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motociklo variklis',
				value: 'motorcycleEngine',
			},
			size: {
				from: 1000,
				to: 1199,
			},
			specification: null,
			visualInfo: null,
			price: 110,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motociklo variklis',
				value: 'motorcycleEngine',
			},
			size: {
				from: 1200,
				to: 1599,
			},
			specification: null,
			visualInfo: null,
			price: 150,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motociklo variklis',
				value: 'motorcycleEngine',
			},
			size: {
				from: 1600,
				to: Infinity,
			},
			specification: null,
			visualInfo: null,
			price: 190,
		},
		// motorcycleGearbox Motociklo pavarų dėžė
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motociklo pavarų dėžė',
				value: 'motorcycleGearbox',
			},
			size: {
				from: 0,
				to: 44,
			},
			specification: null,
			visualInfo: null,
			price: 45,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motociklo pavarų dėžė',
				value: 'motorcycleGearbox',
			},
			size: {
				from: 45,
				to: 249,
			},
			specification: null,
			visualInfo: null,
			price: 55,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motociklo pavarų dėžė',
				value: 'motorcycleGearbox',
			},
			size: {
				from: 250,
				to: 449,
			},
			specification: null,
			visualInfo: null,
			price: 65,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motociklo pavarų dėžė',
				value: 'motorcycleGearbox',
			},
			size: {
				from: 450,
				to: 599,
			},
			specification: null,
			visualInfo: null,
			price: 80,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motociklo pavarų dėžė',
				value: 'motorcycleGearbox',
			},
			size: {
				from: 600,
				to: 999,
			},
			specification: null,
			visualInfo: null,
			price: 90,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motociklo pavarų dėžė',
				value: 'motorcycleGearbox',
			},
			size: {
				from: 1000,
				to: 1199,
			},
			specification: null,
			visualInfo: null,
			price: 110,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motociklo pavarų dėžė',
				value: 'motorcycleGearbox',
			},
			size: {
				from: 1200,
				to: 1599,
			},
			specification: null,
			visualInfo: null,
			price: 150,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Motociklo pavarų dėžė',
				value: 'motorcycleGearbox',
			},
			size: {
				from: 1600,
				to: Infinity,
			},
			specification: null,
			visualInfo: null,
			price: 190,
		},
		// goodsForMotorcycles Prekės motociklams
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Prekės motociklams',
				value: 'goodsForMotorcycles',
			},
			size: {
				label: 'Motociklo krepšys',
				value: 'motorcycleBag',
			},
			specification: null,
			visualInfo: null,
			price: 30,
		},
		{
			category: {
				label: 'Motociklai ir priedai',
				value: 'motorcyclesAndAccessories',
			},
			productType: {
				label: 'Prekės motociklams',
				value: 'goodsForMotorcycles',
			},
			size: {
				label: 'Duslintuvas',
				value: 'muffler',
			},
			specification: null,
			visualInfo: null,
			price: 40,
		},
	];

export const flatScreenTvCategoryProducts: CommonProductTypeExample[] = [
	{
		category: {
			label: 'Plokščiaekraniai TV',
			value: 'flatScreenTv',
		},
		productType: null,
		size: {
			from: 0,
			to: 23,
		},
		specification: null,
		visualInfo: null,
		price: 45,
	},
	{
		category: {
			label: 'Plokščiaekraniai TV',
			value: 'flatScreenTv',
		},
		productType: null,
		size: {
			from: 24,
			to: 31,
		},
		specification: null,
		visualInfo: null,
		price: 45,
	},
	{
		category: {
			label: 'Plokščiaekraniai TV',
			value: 'flatScreenTv',
		},
		productType: null,
		size: {
			from: 32,
			to: 39,
		},
		specification: null,
		visualInfo: null,
		price: 50,
	},
	{
		category: {
			label: 'Plokščiaekraniai TV',
			value: 'flatScreenTv',
		},
		productType: null,
		size: {
			from: 41,
			to: 42,
		},
		specification: null,
		visualInfo: null,
		price: 55,
	},
	{
		category: {
			label: 'Plokščiaekraniai TV',
			value: 'flatScreenTv',
		},
		productType: null,
		size: {
			from: 43,
			to: 49,
		},
		specification: null,
		visualInfo: null,
		price: 60,
	},
	{
		category: {
			label: 'Plokščiaekraniai TV',
			value: 'flatScreenTv',
		},
		productType: null,
		size: {
			from: 50,
			to: 54,
		},
		specification: null,
		visualInfo: null,
		price: 65,
	},
	{
		category: {
			label: 'Plokščiaekraniai TV',
			value: 'flatScreenTv',
		},
		productType: null,
		size: {
			from: 55,
			to: 64,
		},
		specification: null,
		visualInfo: null,
		price: 75,
	},
	{
		category: {
			label: 'Plokščiaekraniai TV',
			value: 'flatScreenTv',
		},
		productType: null,
		size: {
			from: 65,
			to: 69,
		},
		specification: null,
		visualInfo: null,
		price: 80,
	},
	{
		category: {
			label: 'Plokščiaekraniai TV',
			value: 'flatScreenTv',
		},
		productType: null,
		size: {
			from: 70,
			to: 74,
		},
		specification: null,
		visualInfo: null,
		price: 85,
	},
	{
		category: {
			label: 'Plokščiaekraniai TV',
			value: 'flatScreenTv',
		},
		productType: null,
		size: {
			from: 75,
			to: 84,
		},
		specification: null,
		visualInfo: null,
		price: 95,
	},
	{
		category: {
			label: 'Plokščiaekraniai TV',
			value: 'flatScreenTv',
		},
		productType: null,
		size: {
			from: 85,
			to: Infinity,
		},
		specification: null,
		visualInfo: null,
		price: 105,
	},
];

export const householdAppliancesCategoryProducts: CommonProductTypeExample[] = [
	// TODO Think how we will calculate price for these
	{
		category: {
			label: 'Buitinė technika',
			value: 'householdAppliances',
		},
		productType: {
			label: 'Šaldytuvas',
			value: 'fridge',
		},
		size: null,
		specification: null,
		visualInfo: null,
		price: 85,
	},
	{
		category: {
			label: 'Buitinė technika',
			value: 'householdAppliances',
		},
		productType: {
			label: 'Šaldiklis',
			value: 'freezer',
		},
		size: null,
		specification: null,
		visualInfo: null,
		price: 85,
	},
	// Skalbimo mašina washingMachine
	{
		category: {
			label: 'Buitinė technika',
			value: 'householdAppliances',
		},
		productType: {
			label: 'Skalbimo mašina',
			value: 'washingMachine',
		},
		size: {
			label: 'Paprasta',
			value: 'simple',
		},
		specification: null,
		visualInfo: null,
		price: 60,
	},
	{
		category: {
			label: 'Buitinė technika',
			value: 'householdAppliances',
		},
		productType: {
			label: 'Skalbimo mašina',
			value: 'washingMachine',
		},
		size: {
			label: 'Miele',
			value: 'miele',
		},
		specification: null,
		visualInfo: null,
		price: 90,
	},
	{
		category: {
			label: 'Buitinė technika',
			value: 'householdAppliances',
		},
		productType: {
			label: 'Indaplovė',
			value: 'dishwasher',
		},
		size: null,
		specification: null,
		visualInfo: null,
		price: 60,
	},
	{
		category: {
			label: 'Buitinė technika',
			value: 'householdAppliances',
		},
		productType: {
			label: 'Džiovyklė',
			value: 'dryer',
		},
		size: null,
		specification: null,
		visualInfo: null,
		price: 70,
	},
	{
		category: {
			label: 'Buitinė technika',
			value: 'householdAppliances',
		},
		productType: {
			label: 'Kaitlentė',
			value: 'hob',
		},
		size: null,
		specification: null,
		visualInfo: null,
		price: 45,
	},
	// Viryklė stove
	{
		category: {
			label: 'Buitinė technika',
			value: 'householdAppliances',
		},
		productType: {
			label: 'Viryklė',
			value: 'stove',
		},
		size: {
			label: 'Imontuojama',
			value: 'built-in',
		},
		specification: null,
		visualInfo: null,
		price: 60,
	},
	{
		category: {
			label: 'Buitinė technika',
			value: 'householdAppliances',
		},
		productType: {
			label: 'Viryklė',
			value: 'stove',
		},
		size: {
			label: 'Pastatoma', // TODO translate it
			value: 'built-in',
		},
		specification: null,
		visualInfo: null,
		price: 70,
	},
	{
		category: {
			label: 'Buitinė technika',
			value: 'householdAppliances',
		},
		productType: {
			label: 'Viryklė',
			value: 'stove',
		},
		size: {
			label: '5-6 Degiklių',
			value: 'withBurners',
		},
		specification: null,
		visualInfo: null,
		price: 90,
	},
];

export const gardenEquipmentCategoryProducts: CommonProductTypeExample[] = [
	{
		category: {
			label: 'Sodo technika',
			value: 'gardenEquipment',
		},
		productType: {
			label: 'Mažas sodo traktorius',
			value: 'smallGardenTractor',
		},
		size: {
			from: 0,
			to: 79,
		},
		specification: null,
		visualInfo: null,
		price: 200,
	},
	{
		category: {
			label: 'Sodo technika',
			value: 'gardenEquipment',
		},
		productType: {
			label: 'Vidutinis sodo traktorius',
			value: 'averageGardenTractor',
		},
		size: {
			from: 80,
			to: 119,
		},
		specification: null,
		visualInfo: null,
		price: 230,
	},
	{
		category: {
			label: 'Sodo technika',
			value: 'gardenEquipment',
		},
		productType: {
			label: 'Didelis sodo traktorius',
			value: 'bigGardenTractor',
		},
		size: {
			from: 120,
			to: Infinity,
		},
		specification: null,
		visualInfo: null,
		price: 280,
	},
	{
		category: {
			label: 'Sodo technika',
			value: 'gardenEquipment',
		},
		productType: {
			label: 'Stumdoma žoliapjovė',
			value: 'pushMower',
		},
		size: null,
		specification: null,
		visualInfo: null,
		price: 60,
	},
	{
		category: {
			label: 'Sodo technika',
			value: 'gardenEquipment',
		},
		productType: {
			label: 'Savaeigė žoliapjovė',
			value: 'selfPropelledMower',
		},
		size: null,
		specification: null,
		visualInfo: null,
		price: 80,
	},
];

export const shipmentsCategoryProducts: CommonProductTypeExample[] = [
	// Siuntos shipments
	{
		category: {
			label: 'Siuntos',
			value: 'shipments',
		},
		productType: null,
		size: {
			from: 0,
			to: 4,
		},
		specification: null,
		visualInfo: null,
		price: 35,
	},
	{
		category: {
			label: 'Siuntos',
			value: 'shipments',
		},
		productType: null,
		size: {
			from: 5,
			to: 14,
		},
		specification: null,
		visualInfo: null,
		price: 40,
	},
	{
		category: {
			label: 'Siuntos',
			value: 'shipments',
		},
		productType: null,
		size: {
			from: 15,
			to: 29,
		},
		specification: null,
		visualInfo: null,
		price: 45,
	},
	{
		category: {
			label: 'Siuntos',
			value: 'shipments',
		},
		productType: null,
		size: {
			from: 30,
			to: 34,
		},
		specification: null,
		visualInfo: null,
		price: 0, // 1.5 * size(kg)
		surcharge: 10, // %
	},
	{
		category: {
			label: 'Siuntos',
			value: 'shipments',
		},
		productType: null,
		size: {
			from: 35,
			to: 49,
		},
		specification: null,
		visualInfo: null,
		price: 0, // 1.49 * size(kg)
		surcharge: 10, // %
	},
	{
		category: {
			label: 'Siuntos',
			value: 'shipments',
		},
		productType: null,
		size: {
			from: 50,
			to: 99,
		},
		specification: null,
		visualInfo: null,
		price: 0, // 1.46 * size(kg)
		surcharge: 10, // %
	},
	{
		category: {
			label: 'Siuntos',
			value: 'shipments',
		},
		productType: null,
		size: {
			from: 100,
			to: Infinity,
		},
		specification: null,
		visualInfo: null,
		price: 0, // 1.35 * size(kg)
		surcharge: 10, // %
	},
];

export const removalsCategoryProducts: CommonProductTypeExample[] = [
	//Perkraustymai removals
	// Size in m3
	{
		category: {
			label: 'Perkraustymai',
			value: 'removals',
		},
		productType: null,
		size: {
			from: 0,
			to: 0.99,
		},
		specification: null,
		visualInfo: null,
		price: 200,
	},
	{
		category: {
			label: 'Perkraustymai',
			value: 'removals',
		},
		productType: null,
		size: {
			from: 1,
			to: 2.99,
		},
		specification: null,
		visualInfo: null,
		price: 170,
	},
	{
		category: {
			label: 'Perkraustymai',
			value: 'removals',
		},
		productType: null,
		size: {
			from: 3,
			to: 4.99,
		},
		specification: null,
		visualInfo: null,
		price: 150,
	},
	{
		category: {
			label: 'Perkraustymai',
			value: 'removals',
		},
		productType: null,
		size: {
			from: 5,
			to: 9.99,
		},
		specification: null,
		visualInfo: null,
		price: 130,
	},
	{
		category: {
			label: 'Perkraustymai',
			value: 'removals',
		},
		productType: null,
		size: {
			from: 10,
			to: Infinity,
		},
		specification: null,
		visualInfo: null,
		price: 115,
	},
];

export const allProducts: CommonProductTypeExample[] = [
	...automotiveGoodsCategoryProducts,
	...bicyclesAndScootersCategoryProducts,
	...goodsForChildrenCategoryProducts,
	...motorcyclesAndAccessoriesCategoryProducts,
	...flatScreenTvCategoryProducts,
	...householdAppliancesCategoryProducts,
	...gardenEquipmentCategoryProducts,
	...shipmentsCategoryProducts,
	...removalsCategoryProducts,
];

export const categoriesOptions: OptionType[] = getOptions(
	allProducts.map((product) => product.category)
);

export const automotiveGoodsCategoryProductTypesOptions: OptionType[] =
	getOptions(
		automotiveGoodsCategoryProducts
			.map((product) => product.productType)
			.filter((obj) => obj !== null) as OptionType[]
	);

export const bicyclesAndScootersCategoryProductTypesOptions: OptionType[] =
	getOptions(
		bicyclesAndScootersCategoryProducts
			.map((product) => product.productType)
			.filter((obj) => obj !== null) as OptionType[]
	);

export const goodsForChildrenCategoryProductTypesOptions: OptionType[] =
	getOptions(
		goodsForChildrenCategoryProducts
			.map((product) => product.productType)
			.filter((obj) => obj !== null) as OptionType[]
	);

export const motorcyclesAndAccessoriesCategoryProductTypesOptions: OptionType[] =
	getOptions(
		motorcyclesAndAccessoriesCategoryProducts
			.map((product) => product.productType)
			.filter((obj) => obj !== null) as OptionType[]
	);

export const householdAppliancesCategoryProductTypesOptions: OptionType[] =
	getOptions(
		householdAppliancesCategoryProducts
			.map((product) => product.productType)
			.filter((obj) => obj !== null) as OptionType[]
	);

export const gardenEquipmentCategoryProductTypesOptions: OptionType[] =
	getOptions(
		gardenEquipmentCategoryProducts
			.map((product) => product.productType)
			.filter((obj) => obj !== null) as OptionType[]
	);

// Size Units x = number
// Radius Rx
// CM3
// Coliai
// KG
// M3
