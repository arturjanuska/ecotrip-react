/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-mixed-spaces-and-tabs */
import { ShipmentProps } from '../formTypes';
import { servicesDefinition } from '../getServices';

type ValidationProps = {
	invoiceNeeded?: boolean;
	service?: string;
	formShipment?: ShipmentProps;
};

type ValidationRule = {
	required?: string | boolean;
	minLength?: {
		value: number;
		message: string;
	};
	pattern?: {
		value: RegExp;
		message: string;
	};
};

type DateValidation = {
	year: ValidationRule;
	month: ValidationRule;
	day: ValidationRule;
};

type InformationValidation = {
	firstName: ValidationRule;
	lastName: ValidationRule;
	phoneNumber: ValidationRule;
	email: ValidationRule;
	address: ValidationRule;
	zipCode: ValidationRule;
};

type ShipmentValidationRule = {
	required: string;
};

type ShipmentsValidation = {
	category: ShipmentValidationRule;
	productType: ShipmentValidationRule;
	size: ShipmentValidationRule;
	specification: ShipmentValidationRule;
	estimatedPrice: ShipmentValidationRule;
	amount: ShipmentValidationRule;
	length: ShipmentValidationRule;
	width: ShipmentValidationRule;
	weight: ShipmentValidationRule;
	height: ShipmentValidationRule;
	volume: ShipmentValidationRule;
	extent: ShipmentValidationRule;
	shipmentPrice: ShipmentValidationRule;
	purchasePriceOfTheItem: ShipmentValidationRule;
	orderedShipmentNumber: ShipmentValidationRule;
};

type CustomValidationReturn = {
	pickupAddress: ValidationRule;
	pickupAddressZipCode: ValidationRule;
	deliveryAddress: ValidationRule;
	deliveryAddressZipCode: ValidationRule;
	dates: {
		from: DateValidation;
		to: DateValidation;
	};
	shipments: ShipmentsValidation;
	senderInformation: InformationValidation;
	recipientInformation: InformationValidation;
	ransomPayeeInformation: InformationValidation | { required: boolean };
	purchaseInformation: InformationValidation | { required: boolean };
	customerInformation: {
		payerOfTheShipment: ValidationRule;
		paymentMethod: ValidationRule;
	};
	invoiceInformation: InformationValidation | { required: boolean };
	packagingAndLabelingRules: ValidationRule;
	transportRules: ValidationRule;
};

export type { CustomValidationReturn };

const useCustomShipmentsValidation = () => {
	return {
		category: { required: 'Laukas yra privalomas' },
		productType: { required: 'Laukas yra privalomas' },
		size: { required: 'Laukas yra privalomas' },
		specification: { required: 'Laukas yra privalomas' },
		estimatedPrice: { required: 'Laukas yra privalomas' },
		amount: { required: 'Laukas yra privalomas' },
		length: { required: 'Laukas yra privalomas' },
		width: { required: 'Laukas yra privalomas' },
		weight: { required: 'Laukas yra privalomas' },
		height: { required: 'Laukas yra privalomas' },
		volume: { required: 'Laukas yra privalomas' },
		extent: { required: 'Laukas yra privalomas' },
		shipmentPrice: { required: 'Laukas yra privalomas' },
		purchasePriceOfTheItem: { required: 'Laukas yra privalomas' },
		orderedShipmentNumber: { required: 'Laukas yra privalomas' },
	};
};

export const useCustomValidation = ({
	invoiceNeeded = false,
	service,
}: ValidationProps): CustomValidationReturn => {
	const combinedLTandUKPhoneNumberRegex = /^\+(44|370)\d+$/;
	return {
		pickupAddress:
			service !== servicesDefinition[3]
				? { required: 'Laukas yra privalomas' }
				: { required: false },
		pickupAddressZipCode:
			service !== servicesDefinition[3]
				? { required: 'Laukas yra privalomas' }
				: { required: false },
		deliveryAddress:
			service !== servicesDefinition[3]
				? { required: 'Laukas yra privalomas' }
				: { required: false },
		deliveryAddressZipCode:
			service !== servicesDefinition[3]
				? { required: 'Laukas yra privalomas' }
				: { required: false },
		dates: {
			from: {
				year: {
					required: 'Laukas yra privalomas',
				},
				month: {
					required: 'Laukas yra privalomas',
				},
				day: {
					required: 'Laukas yra privalomas',
				},
			},
			to: {
				year: {
					required: 'Laukas yra privalomas',
				},
				month: {
					required: 'Laukas yra privalomas',
				},
				day: {
					required: 'Laukas yra privalomas',
				},
			},
		},
		shipments: useCustomShipmentsValidation(),
		senderInformation: {
			firstName: {
				required: 'Laukas yra privalomas',
				minLength: {
					value: 3,
					message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
				},
			},
			lastName: {
				required: 'Laukas yra privalomas',
				minLength: {
					value: 3,
					message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
				},
			},
			phoneNumber: {
				required: 'Laukas yra privalomas',
				pattern: {
					value: combinedLTandUKPhoneNumberRegex,
					message:
						'Neteisingas telefono numerio formatas. Turi prasidėti nuo "+" ir sekti skaičiai, pvz., +370 arba +44',
				},
			},
			email: {
				required: 'Laukas yra privalomas',
				pattern: {
					value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
					message: 'Neteisingas el. pašto formatas',
				},
			},
			address: {
				required: 'Laukas yra privalomas',
				minLength: {
					value: 3,
					message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
				},
			},
			zipCode: {
				required: 'Laukas yra privalomas',
				minLength: {
					value: 3,
					message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
				},
			},
		},
		recipientInformation: {
			firstName: {
				required: 'Laukas yra privalomas',
				minLength: {
					value: 3,
					message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
				},
			},
			lastName: {
				required: 'Laukas yra privalomas',
				minLength: {
					value: 3,
					message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
				},
			},
			phoneNumber: {
				required: 'Laukas yra privalomas',
				pattern: {
					value: combinedLTandUKPhoneNumberRegex,
					message:
						'Neteisingas telefono numerio formatas. Turi prasidėti nuo "+" ir sekti skaičiai, pvz., +370 arba +44',
				},
			},
			email: {
				required: 'Laukas yra privalomas',
				pattern: {
					value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
					message: 'Neteisingas el. pašto formatas',
				},
			},
			address: {
				required: 'Laukas yra privalomas',
				minLength: {
					value: 3,
					message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
				},
			},
			zipCode: {
				required: 'Laukas yra privalomas',
				minLength: {
					value: 3,
					message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
				},
			},
		},
		ransomPayeeInformation:
			service === 'productSalesService'
				? {
						// @ts-ignore
						ransomRecipient: {
							required: 'Laukas yra privalomas',
							minLength: {
								value: 3,
								message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
							},
						},
						firstName: {
							required: 'Laukas yra privalomas',
							minLength: {
								value: 3,
								message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
							},
						},
						lastName: {
							required: 'Laukas yra privalomas',
							minLength: {
								value: 3,
								message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
							},
						},
						phoneNumber: {
							required: 'Laukas yra privalomas',
							pattern: {
								value: combinedLTandUKPhoneNumberRegex,
								message:
									'Neteisingas telefono numerio formatas. Turi prasidėti nuo "+" ir sekti skaičiai, pvz., +370 arba +44',
							},
						},
						email: {
							required: 'Laukas yra privalomas',
							pattern: {
								value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
								message: 'Neteisingas el. pašto formatas',
							},
						},
						address: {
							required: 'Laukas yra privalomas',
							minLength: {
								value: 3,
								message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
							},
						},
						zipCode: {
							required: 'Laukas yra privalomas',
							minLength: {
								value: 3,
								message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
							},
						},
				  }
				: { required: false },
		purchaseInformation:
			service === servicesDefinition[4]
				? {
						firstName: {
							required: 'Laukas yra privalomas',
							minLength: {
								value: 3,
								message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
							},
						},
						lastName: {
							required: 'Laukas yra privalomas',
							minLength: {
								value: 3,
								message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
							},
						},
						phoneNumber: {
							required: 'Laukas yra privalomas',
							pattern: {
								value: combinedLTandUKPhoneNumberRegex,
								message:
									'Neteisingas telefono numerio formatas. Turi prasidėti nuo "+" ir sekti skaičiai, pvz., +370 arba +44',
							},
						},
						email: {
							required: 'Laukas yra privalomas',
							pattern: {
								value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
								message: 'Neteisingas el. pašto formatas',
							},
						},
						address: { required: 'Laukas yra privalomas' },
						zipCode: { required: 'Laukas yra privalomas' },
				  }
				: { required: false },
		customerInformation: {
			payerOfTheShipment: { required: 'Laukas yra privalomas' },
			paymentMethod: { required: 'Laukas yra privalomas' },
		},
		invoiceInformation: invoiceNeeded
			? {
					// @ts-ignore
					companyName: {
						required: 'Laukas yra privalomas',
						minLength: {
							value: 3,
							message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
						},
					},
					companyCode: {
						required: 'Laukas yra privalomas',
						minLength: {
							value: 3,
							message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
						},
					},
					pvmCode: {
						required: 'Laukas yra privalomas',
						minLength: {
							value: 3,
							message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
						},
					},
					companyEmail: {
						required: 'Laukas yra privalomas',
						pattern: {
							value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
							message: 'Neteisingas el. pašto formatas',
						},
					},
					companyAddress: {
						required: 'Laukas yra privalomas',
						minLength: {
							value: 3,
							message: 'Laukas privalo turėti ne mažiau kaip 3 simbolius',
						},
					},
			  }
			: { required: false },
		packagingAndLabelingRules: {
			required: 'Prašome pažymėti, kad sutinkate su EcoTrip taisyklėmis.',
		},
		transportRules: {
			required: 'Prašome pažymėti, kad sutinkate su EcoTrip taisyklėmis.',
		},
	};
};
