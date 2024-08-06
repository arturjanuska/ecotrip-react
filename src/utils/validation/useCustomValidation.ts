/* eslint-disable no-mixed-spaces-and-tabs */
import { ShipmentProps } from '../formTypes';

type ValidationProps = {
	invoiceNeeded?: boolean;
	service?: string;
	formShipment?: ShipmentProps;
};

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
		height: { required: 'Laukas yra privalomas' },
		volume: { required: 'Laukas yra privalomas' },
		shipmentPrice: { required: 'Laukas yra privalomas' },
		purchasePriceOfTheItem: { required: 'Laukas yra privalomas' },
		orderedShipmentNumber: { required: 'Laukas yra privalomas' },
	};
};

export const useCustomValidation = ({
	invoiceNeeded = false,
	service,
}: ValidationProps) => {
	const combinedLTandUKPhoneNumberRegex = /^\+(44|370)\d+$/;
	return {
		pickupAddress: { required: 'Laukas yra privalomas' },
		pickupAddressZipCode: { required: 'Laukas yra privalomas' },
		deliveryAddress: { required: 'Laukas yra privalomas' },
		deliveryAddressZipCode: { required: 'Laukas yra privalomas' },
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
				: null,
		purchaseInformation:
			service === 'productPurchaseService'
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
				: null,
		customerInformation: {
			payerOfTheShipment: { required: 'Laukas yra privalomas' },
			paymentMethod: { required: 'Laukas yra privalomas' },
		},
		invoiceInformation: invoiceNeeded
			? {
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
			: null,
		packagingAndLabelingRules: {
			required: 'Prašome pažymėti, kad sutinkate su EcoTrip taisyklėmis.',
		},
		transportRules: {
			required: 'Prašome pažymėti, kad sutinkate su EcoTrip taisyklėmis.',
		},
	};
};
