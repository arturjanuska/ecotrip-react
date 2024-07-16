export const categories = [
  {
    label: "Automobilinės prekės",
    value: "automotiveGoods",
  },
  {
    label: "Dviračiai, paspirtukai",
    value: "bicyclesAndScooters",
  },
  {
    label: "Prekės vaikams",
    value: "goodsForChildren",
  },
  {
    label: "Motociklai ir priedai",
    value: "motorcyclesAndAccessories",
  },
  {
    label: "Plokščiaekraniai TV",
    value: "flat-screenTV",
  },
  {
    label: "Buitinė technika",
    value: "appliances",
  },
  {
    label: "Sodo technika",
    value: "gardeningTechnique",
  },
  {
    label: "Siuntos",
    value: "consignment",
  },
  {
    label: "Paletės",
    value: "palette",
  },
  {
    label: "Perkraustymai",
    value: "removals",
  },
];

const automotiveGoodsSubCategories = [
  {
    label: "Ratų komplektas",
    value: "setOfWheels",
  },
  {
    label: "Automobilinė kėdutė",
    value: "childSeat",
  },
  {
    label: "Automobilio durys",
    value: "doors",
  },
  {
    label: "Automobilio salonas",
    value: "interior",
  },
  {
    label: "Automobilio ketvirtis",
    value: "carQuarter",
  },
  {
    label: "Automobilio buferis",
    value: "bumper",
  },
  {
    label: "Automobilio priekinis/galinis dangtis",
    value: "cover",
  },
  {
    label: "Automobilio variklis",
    value: "engine",
  },
  {
    label: "Pavarų dėžė",
    value: "transmision",
  },
];

const carWheelsWithPrices = [
  {
    size: {
      from: 0,
      to: 15,
    },
    completed: false,
    price: 60,
  },
  {
    size: {
      from: 16,
      to: 17,
    },
    completed: false,
    price: 80,
  },
  {
    size: {
      from: 18,
      to: 21,
    },
    completed: false,
    price: 100,
  },
  {
    size: {
      from: 22,
      to: 1000,
    },
    completed: false,
    price: 120,
  },
  {
    size: {
      from: 0,
      to: 15,
    },
    completed: true,
    price: 70,
  },
  {
    size: {
      from: 16,
      to: 17,
    },
    completed: true,
    price: 90,
  },
  {
    size: {
      from: 18,
      to: 21,
    },
    completed: true,
    price: 110,
  },
  {
    size: {
      from: 22,
      to: 1000,
    },
    completed: true,
    price: 130,
  },
];

const childSeatSpecWithPrices = [
  {
    label: "Be pado, nepasukama",
    value: "withoutSole",
    price: 40,
  },
  {
    label: "Pasukama ir/arba su padu",
    value: "withSole",
    price: 45,
  },
];

const carDoorsSpecWithPrices = [
  {
    label: "Mikro automobiliai",
    value: "microCars",
    visualInfo: "Fiat 500",
    price: 45,
  },
  {
    label: "Subkompaktiniai automobiliai",
    value: "subcompactCars",
    visualInfo: "VW Polo",
    price: 45,
  },
  {
    label: "Kompaktiniai automobiliai",
    value: "compactCars",
    visualInfo: "VW Golf",
    price: 50,
  },
  {
    label: "Vidutinio dydžio automobiliai",
    value: "midSizeCars",
    visualInfo: "VW Passat",
    price: 50,
  },
  {
    label: "Dideli automobiliai",
    value: "bigCars",
    visualInfo: "MB S Class",
    price: 55,
  },
  {
    label: "Visureigiai",
    value: "suvs",
    visualInfo: "BMW X5",
    price: 55,
  },
  {
    label: "Pikapai",
    value: "pickupTrucks",
    visualInfo: "Ford Ranger",
    price: 60,
  },
  {
    label: "Mikroautobusai",
    value: "minibuses",
    visualInfo: "VW Caravelle",
    price: 85,
  },
];

const carInteriorSpecWithPrices = [
  // CHECK PRICES
  {
    label: "Mikro automobiliai",
    value: "microCars",
    visualInfo: "Fiat 500",
    price: 45,
  },
  {
    label: "Subkompaktiniai automobiliai",
    value: "subcompactCars",
    visualInfo: "VW Polo",
    price: 45,
  },
  {
    label: "Kompaktiniai automobiliai",
    value: "compactCars",
    visualInfo: "VW Golf",
    price: 50,
  },
  {
    label: "Vidutinio dydžio automobiliai",
    value: "midSizeCars",
    visualInfo: "VW Passat",
    price: 50,
  },
  {
    label: "Dideli automobiliai",
    value: "bigCars",
    visualInfo: "MB S Class",
    price: 55,
  },
  {
    label: "Visureigiai",
    value: "suvs",
    visualInfo: "BMW X5",
    price: 55,
  },
  {
    label: "Pikapai",
    value: "pickupTrucks",
    visualInfo: "Ford Ranger",
    price: 60,
  },
  {
    label: "Mikroautobusai",
    value: "minibuses",
    visualInfo: "VW Caravelle",
    price: 85,
  },
];

const carQuarterSpecWithPrices = [
  {
    label: "Mikro automobiliai",
    value: "microCars",
    visualInfo: "Fiat 500",
    price: 120,
  },
  {
    label: "Subkompaktiniai automobiliai",
    value: "subcompactCars",
    visualInfo: "VW Polo",
    price: 130,
  },
  {
    label: "Kompaktiniai automobiliai",
    value: "compactCars",
    visualInfo: "VW Golf",
    price: 130,
  },
  {
    label: "Vidutinio dydžio automobiliai",
    value: "midSizeCars",
    visualInfo: "VW Passat",
    price: 150,
  },
  {
    label: "Dideli automobiliai",
    value: "bigCars",
    visualInfo: "MB S Class",
    price: 170,
  },
  {
    label: "Visureigiai",
    value: "suvs",
    visualInfo: "BMW X5",
    price: 185,
  },
  {
    label: "Pikapai",
    value: "pickupTrucks",
    visualInfo: "Ford Ranger",
    price: 180,
  },
  {
    label: "Mikroautobusai",
    value: "minibuses",
    visualInfo: "VW Caravelle",
    price: 200,
  },
];

const carBumperSpecWithPrices = [
  {
    label: "Mikro automobiliai",
    value: "microCars",
    visualInfo: "Fiat 500",
    price: 60,
  },
  {
    label: "Subkompaktiniai automobiliai",
    value: "subcompactCars",
    visualInfo: "VW Polo",
    price: 60,
  },
  {
    label: "Kompaktiniai automobiliai",
    value: "compactCars",
    visualInfo: "VW Golf",
    price: 70,
  },
  {
    label: "Vidutinio dydžio automobiliai",
    value: "midSizeCars",
    visualInfo: "VW Passat",
    price: 75,
  },
  {
    label: "Dideli automobiliai",
    value: "bigCars",
    visualInfo: "MB S Class",
    price: 80,
  },
  {
    label: "Visureigiai",
    value: "suvs",
    visualInfo: "BMW X5",
    price: 85,
  },
  {
    label: "Pikapai",
    value: "pickupTrucks",
    visualInfo: "Ford Ranger",
    price: 85,
  },
  {
    label: "Mikroautobusai",
    value: "minibuses",
    visualInfo: "VW Caravelle",
    price: 85,
  },
];

const carCoversSpecWithPrices = [
  {
    label: "Mikro automobiliai",
    value: "microCars",
    visualInfo: "Fiat 500",
    price: 55,
  },
  {
    label: "Subkompaktiniai automobiliai",
    value: "subcompactCars",
    visualInfo: "VW Polo",
    price: 55,
  },
  {
    label: "Kompaktiniai automobiliai",
    value: "compactCars",
    visualInfo: "VW Golf",
    price: 60,
  },
  {
    label: "Vidutinio dydžio automobiliai",
    value: "midSizeCars",
    visualInfo: "VW Passat",
    price: 65,
  },
  {
    label: "Dideli automobiliai",
    value: "bigCars",
    visualInfo: "MB S Class",
    price: 80,
  },
  {
    label: "Visureigiai",
    value: "suvs",
    visualInfo: "BMW X5",
    price: 80,
  },
  {
    label: "Pikapai",
    value: "pickupTrucks",
    visualInfo: "Ford Ranger",
    price: 80,
  },
  {
    label: "Mikroautobusai",
    value: "minibuses",
    visualInfo: "VW Caravelle",
    price: 85,
  },
];

const carEngineSpecWithPrices = [
  {
    size: {
      from: 0,
      to: 999,
    },
    completed: false,
    price: 80,
  },
  {
    size: {
      from: 1000,
      to: 1499,
    },
    completed: false,
    price: 100,
  },
  {
    size: {
      from: 1500,
      to: 1999,
    },
    completed: false,
    price: 120,
  },
  {
    size: {
      from: 2000,
      to: 2499,
    },
    completed: false,
    price: 150,
  },
  {
    size: {
      from: 2500,
      to: 2999,
    },
    completed: false,
    price: 180,
  },
  {
    size: {
      from: 3000,
      to: 3499,
    },
    completed: false,
    price: 200,
  },
  {
    size: {
      from: 3500,
      to: 3999,
    },
    completed: false,
    price: 230,
  },
  {
    size: {
      from: 4000,
      to: 100000,
    },
    completed: false,
    price: 250,
  },
  {
    size: {
      from: 0,
      to: 999,
    },
    completed: true,
    price: 120,
  },
  {
    size: {
      from: 1000,
      to: 1499,
    },
    completed: true,
    price: 170,
  },
  {
    size: {
      from: 1500,
      to: 1999,
    },
    completed: true,
    price: 200,
  },
  {
    size: {
      from: 2000,
      to: 2499,
    },
    completed: true,
    price: 250,
  },
  {
    size: {
      from: 2500,
      to: 2999,
    },
    completed: true,
    price: 300,
  },
  {
    size: {
      from: 3000,
      to: 3499,
    },
    completed: true,
    price: 350,
  },
  {
    size: {
      from: 3500,
      to: 3999,
    },
    completed: true,
    price: 370,
  },
  {
    size: {
      from: 4000,
      to: 100000,
    },
    completed: true,
    price: 400,
  },
];

const carTransmisionSpecWithPrices = [
  // completed: true = Automatic
  // completed: false = Manual
  {
    size: {
      from: 0,
      to: 999,
    },
    completed: false,
    price: 50,
  },
  {
    size: {
      from: 1000,
      to: 1499,
    },
    completed: false,
    price: 65,
  },
  {
    size: {
      from: 1500,
      to: 1999,
    },
    completed: false,
    price: 75,
  },
  {
    size: {
      from: 2000,
      to: 2499,
    },
    completed: false,
    price: 85,
  },
  {
    size: {
      from: 2500,
      to: 2999,
    },
    completed: false,
    price: 120,
  },
  {
    size: {
      from: 3000,
      to: 3499,
    },
    completed: false,
    price: 120,
  },
  {
    size: {
      from: 3500,
      to: 3999,
    },
    completed: false,
    price: 120,
  },
  {
    size: {
      from: 4000,
      to: 100000,
    },
    completed: false,
    price: 120,
  },
  {
    size: {
      from: 0,
      to: 999,
    },
    completed: true,
    price: 45,
  },
  {
    size: {
      from: 1000,
      to: 1499,
    },
    completed: true,
    price: 50,
  },
  {
    size: {
      from: 1500,
      to: 1999,
    },
    completed: true,
    price: 60,
  },
  {
    size: {
      from: 2000,
      to: 2499,
    },
    completed: true,
    price: 75,
  },
  {
    size: {
      from: 2500,
      to: 2999,
    },
    completed: true,
    price: 85,
  },
  {
    size: {
      from: 3000,
      to: 3499,
    },
    completed: true,
    price: 120,
  },
  {
    size: {
      from: 3500,
      to: 3999,
    },
    completed: true,
    price: 120,
  },
  {
    size: {
      from: 4000,
      to: 100000,
    },
    completed: true,
    price: 120,
  },
];

const bicyclesAndScootersSubCategories = [
  {
    label: "Vaikiškas dviratis, triratis (<12 metų)",
    value: "childBicycleAndTricycle",
    dismantled: false,
    price: 35,
  },
  {
    label: "Paauglio dviratis (>12 metų)",
    value: "teenagersBike",
    dismantled: false,
    price: 40,
  },
  {
    label: "Suaugusiojo dviratis",
    value: "adultBike",
    dismantled: false,
    price: 60,
  },
  {
    label: "Elektrinis dviratis",
    value: "electricBike",
    dismantled: false,
    price: 70,
  },
  {
    label: "Vaikiškas dviratis, triratis (<12 metų)",
    value: "childBicycleAndTricycle",
    dismantled: true,
    price: 35,
  },
  {
    label: "Paauglio dviratis (>12 metų)",
    value: "teenagersBike",
    dismantled: true,
    price: 40,
  },
  {
    label: "Suaugusiojo dviratis",
    value: "adultBike",
    dismantled: true,
    price: 50,
  },
  {
    label: "Vaikiška dviračio priekaba",
    value: "childBicycleTrailer",
    dismantled: true,
    price: 60,
  },
  {
    label: "Vaikiška dviračio priekaba",
    value: "childBicycleTrailer",
    dismantled: false,
    price: 75,
  },
  {
    label: "Elektrinis dviratis",
    value: "electricBike",
    dismantled: true,
    price: 55,
  },
  {
    label: "Elektrinis paspirtukas",
    value: "electricScooter",
    dismantled: true, // <25km/h
    price: 45,
  },
  {
    label: "Elektrinis paspirtukas",
    value: "electricScooter",
    dismantled: false, // >25km/h
    price: 60,
  },
];

const goodsForChildrenSubCategories = [
  {
    label: "Automobilinė kėdutė",
    value: "childSeat",
  },
  {
    label: "Vežimėliai",
    value: "strollers",
  },
  {
    label: "Vaikiška dviračio priekaba",
    value: "childBicycleTrailer",
  },
];

const strollersSpecWithPrices = [
  {
    label: "Skėtukas (kelioninis)",
    value: "umbrella",
    price: 40,
  },
  {
    label: "Universalus",
    value: "universal",
    price: 50,
  },
  {
    label: "Sportinis",
    value: "sport",
    price: 50,
  },
  {
    label: "Lopšio vežimėlis",
    value: "cradleStroller",
    price: 45,
  },
  {
    label: "Dvyniams",
    value: "forTwins",
    price: 75,
  },
  {
    label: "2 in 1",
    value: "2in1",
    price: 60,
  },
  {
    label: "3 in 1",
    value: "3in1",
    price: 85,
  },
];

const childBicycleTrailerSpecWithPrices = [
  {
    dismantled: true,
    price: 60,
  },
  {
    dismantled: false,
    price: 75,
  },
];
