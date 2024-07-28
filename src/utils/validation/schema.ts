import * as yup from 'yup';

const OptionTypeSchema = yup.object().shape({
	value: yup.string().required('Option is required'),
	label: yup.string().required('Option label is required'),
});

const ShipmentPropsSchema = yup.object().shape({
	category: OptionTypeSchema.nullable().required('Category is required'),
	productType: OptionTypeSchema.nullable(),
	size: yup.mixed().nullable(), // Assuming it can be OptionType, RangeSizeType, or null
	orderedShipmentNumber: yup.string(),
	specification: OptionTypeSchema.nullable(),
	estimatedPrice: yup.string(),
	amount: yup.number().required('Amount is required'),
	length: yup.string(),
	width: yup.string(),
	height: yup.string(),
	shipmentPrice: yup.string(),
	purchasePriceOfTheItem: yup.string(),
});

export const schema = yup.object().shape({
	direction: yup
		.string()
		.oneOf(['UK-LT', 'LT-UK'])
		.required('Direction is required'),
	pickupAddress: yup.string().required('Pickup address is required'),
	pickupAddressZipCode: yup.string().nullable().required(),
	deliveryAddress: yup.string().required('Delivery address is required'),
	deliveryAddressZipCode: yup.string().nullable().required(),
	service: yup.string().required('Service is required'),
	shipments: yup
		.array()
		.of(ShipmentPropsSchema)
		.required('Shipments are required'),
	dates: yup
		.object()
		.shape({
			from: yup
				.object()
				.shape({
					year: OptionTypeSchema.nullable(),
					month: OptionTypeSchema.nullable(),
					day: OptionTypeSchema.nullable(),
				})
				.required(),
			to: yup
				.object()
				.shape({
					year: OptionTypeSchema.nullable(),
					month: OptionTypeSchema.nullable(),
					day: OptionTypeSchema.nullable(),
				})
				.required(),
		})
		.required(),
	senderInformation: yup
		.object()
		.shape({
			firstName: yup.string().required('First name is required'),
			lastName: yup.string().required('Last name is required'),
			phoneNumber: yup.string().required('Phone number is required'),
			email: yup.string().email('Invalid email').required('Email is required'),
			address: yup.string().required('Address is required'),
			zipCode: yup.string().required('Zip code is required'),
			additionInformation: yup.string(),
		})
		.required(),
	recipientInformation: yup
		.object()
		.shape({
			firstName: yup.string().required('First name is required'),
			lastName: yup.string().required('Last name is required'),
			phoneNumber: yup.string().required('Phone number is required'),
			email: yup.string().email('Invalid email').required('Email is required'),
			address: yup.string().required('Address is required'),
			zipCode: yup.string().required('Zip code is required'),
			additionInformation: yup.string(),
		})
		.required(),
	ransomPayeeInformation: yup
		.object()
		.shape({
			ransomRecipient: OptionTypeSchema.required(
				'Ransom recipient is required'
			),
			firstName: yup.string().required('First name is required'),
			lastName: yup.string().required('Last name is required'),
			phoneNumber: yup.string().required('Phone number is required'),
			email: yup.string().email('Invalid email').required('Email is required'),
			address: yup.string().required('Address is required'),
			zipCode: yup.string().required('Zip code is required'),
			additionInformation: yup.string(),
		})
		.required(),
	customerInformation: yup
		.object()
		.shape({
			payerOfTheShipment: OptionTypeSchema.required(
				'Payer of the shipment is required'
			),
			paymentMethod: OptionTypeSchema.required('Payment method is required'),
			email: yup.string().email('Invalid email').required('Email is required'),
		})
		.required(),
	invoiceRequired: yup.boolean().required(),
	invoiceInformation: yup
		.object()
		.shape({
			companyName: yup.string().required('Company name is required'),
			companyCode: yup.string().required('Company code is required'),
			pvmCode: yup.string().required('PVM code is required'),
			companyEmail: yup
				.string()
				.email('Invalid email')
				.required('Company email is required'),
			companyAddress: yup.string().required('Company address is required'),
		})
		.required(),
	packagingAndLabelingRules: yup
		.boolean()
		.oneOf([true], 'Must accept packaging and labeling rules'),
	transportRules: yup.boolean().oneOf([true], 'Must accept transport rules'),
});
