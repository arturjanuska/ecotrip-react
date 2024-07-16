export enum ProductTypes {
	SetOfWheels = 'setOfWheels',
	ChildSeat = 'childSeat',
	Doors = 'doors',
	Interior = 'interior',
	CarQuarter = 'carQuarter',
	Bumper = 'bumper',
	Cover = 'cover',
	Engine = 'engine',
	Transmision = 'transmision',
	ChildBicycleAndTricycle = 'childBicycleAndTricycle',
	TeenagersBike = 'teenagersBike',
	AdultBike = 'adultBike',
	ChildBicycleTrailer = 'childBicycleTrailer',
	ElectricBike = 'electricBike',
	ElectricScooter = 'electricScooter',
	Strollers = 'strollers',
	ScooterMoped = 'scooterMoped',
	StandardMotorcycle = 'standardMotorcycle',
	MotocrossMotorcycle = 'motocrossMotorcycle',
	TouringMotorcycle = 'touringMotorcycle',
	SportsMotorcycle = 'sportsMotorcycle',
	Chopper = 'chopper',
	Enduro = 'enduro',
	QuadBike = 'quadBike',
	MotorcycleEngine = 'motorcycleEngine',
	MotorcycleTransmision = 'motorcycleTransmision',
	GoodsForMotorcycles = 'goodsForMotorcycles',
	Refrigerator = 'refrigerator',
	Freezer = 'freezer',
	WashingMachine = 'washingMachine',
	Dishwasher = 'dishwasher',
	Dryer = 'dryer',
	Hob = 'hob',
	Stove = 'stove',
	SmallGardenTractor = 'smallGardenTractor',
	MediumGardenTractor = 'mediumGardenTractor',
	LargeGardenTractor = 'largeGardenTractor',
	PushMower = 'pushMower',
	SelfPropelledMower = 'selfPropelledMower',
}

export enum FlatRangeProductType {
	ChildSeat = ProductTypes.ChildSeat,
	Doors = ProductTypes.Doors,
	Interior = ProductTypes.Interior,
	CarQuarter = ProductTypes.CarQuarter,
	Bumper = ProductTypes.Bumper,
	Cover = ProductTypes.Cover,
	ChildBicycleAndTricycle = ProductTypes.ChildBicycleAndTricycle,
	TeenagersBike = ProductTypes.TeenagersBike,
	AdultBike = ProductTypes.AdultBike,
	ChildBicycleTrailer = ProductTypes.ChildBicycleTrailer,
	ElectricBike = ProductTypes.ElectricBike,
	Strollers = ProductTypes.Strollers,
	GoodsForMotorcycles = ProductTypes.GoodsForMotorcycles,
	Refrigerator = ProductTypes.Refrigerator,
	Freezer = ProductTypes.Freezer,
	WashingMachine = ProductTypes.WashingMachine,
	Dishwasher = ProductTypes.Dishwasher,
	Dryer = ProductTypes.Dryer,
	Hob = ProductTypes.Hob,
	Stove = ProductTypes.Stove,
	SmallGardenTractor = ProductTypes.SmallGardenTractor,
	MediumGardenTractor = ProductTypes.MediumGardenTractor,
	LargeGardenTractor = ProductTypes.LargeGardenTractor,
	PushMower = ProductTypes.PushMower,
	SelfPropelledMower = ProductTypes.SelfPropelledMower,
}

export enum RangeSizeProductType {
	SetOfWheels = ProductTypes.SetOfWheels,
	Engine = ProductTypes.Engine,
	Transmision = ProductTypes.Transmision,
	ElectricScooter = ProductTypes.ElectricScooter,
	ScooterMoped = ProductTypes.ScooterMoped,
	StandardMotorcycle = ProductTypes.StandardMotorcycle,
	MotocrossMotorcycle = ProductTypes.MotocrossMotorcycle,
	TouringMotorcycle = ProductTypes.TouringMotorcycle,
	SportsMotorcycle = ProductTypes.SportsMotorcycle,
	Chopper = ProductTypes.Chopper,
	Enduro = ProductTypes.Enduro,
	QuadBike = ProductTypes.QuadBike,
	MotorcycleEngine = ProductTypes.MotorcycleEngine,
	MotorcycleTransmision = ProductTypes.MotorcycleTransmision,
}

export type OptionType = {
	label: string;
	value: string;
};

export type CommonProductType = {
	category: string;
	// productType: ProductTypes;
	visualInfo: string;
	price: number;
};

export type RangeSizeType = {
	from: number;
	to: number;
};

export type TypeFlatSizeProductType = {
	productType: FlatRangeProductType;
	size: OptionType;
	specification: boolean | SpecificationOptionType;
};

export type TypeRangeSizeProductType = {
	productType: RangeSizeProductType;
	size: RangeSizeType;
	specification: boolean | SpecificationOptionType;
};

export type SpecificationBooleanType = {
	specification: boolean;
};

export type SpecificationOptionType = OptionType;

export type ProductType = CommonProductType &
	(TypeFlatSizeProductType | TypeRangeSizeProductType);

export type CommonProductTypeExample = {
	category: OptionType;
	productType: OptionType | null;
	size: RangeSizeType | OptionType | null;
	specification: boolean | OptionType | null;
	volume: number | null;
	weight: number | null;
	price: number;
	surcharge?: number;
	sizeUnits?: string;
};

export enum SizeUnits {
	Radius = 'R',
	CubicCentimeter = 'cm3',
	Inch = 'Inch',
	Kilogram = 'Kg',
	CubicMetre = 'm3',
}

export enum Address {
	From = 'addressFrom',
	To = 'addressTo',
}

export type AddressesFormType = {
	addressFrom: { label: string; value: string } | null;
	addressTo: { label: string; value: string } | null;
};

export type UKPostcodeType = {
	postcode: string;
	eastings: string;
	northings: string;
	latitude: string;
	longitude: string;
	town: string | null;
	region: string;
	country: string;
	countryString: string;
	basicPrice: string;
	additionalCharges: string;
	parcelForceZone: string;
	discount: string | null;
	calendar: string | null;
};
