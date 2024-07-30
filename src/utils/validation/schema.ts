import * as Yup from 'yup';

const OptionTypeSchema = Yup.object().shape({
	label: Yup.string().required('Label is required'),
	value: Yup.string().required('Value is required'),
});

const RangeSizeTypeSchema = Yup.object().shape({
	min: Yup.number()
		.required('Minimum value is required')
		.positive('Must be a positive number'),
	max: Yup.number()
		.required('Maximum value is required')
		.positive('Must be a positive number'),
});

const ShipmentPropsSchema = Yup.object().shape({
	category: OptionTypeSchema.nullable().required('Category is required'),
	productType: OptionTypeSchema.nullable(),
	size: Yup.mixed().notRequired(),
	orderedShipmentNumber: Yup.string()
		.min(3, 'Must be at least 3 characters')
		.nullable(),
	specification: OptionTypeSchema.nullable(),
	estimatedPrice: Yup.string()
		.min(3, 'Must be at least 3 characters')
		.nullable(),
	amount: Yup.number()
		.required('Amount is required')
		.positive('Amount must be a positive number'),
	length: Yup.string().min(3, 'Must be at least 3 characters').nullable(),
	width: Yup.string().min(3, 'Must be at least 3 characters').nullable(),
	height: Yup.string().min(3, 'Must be at least 3 characters').nullable(),
	shipmentPrice: Yup.string()
		.min(3, 'Must be at least 3 characters')
		.nullable(),
	purchasePriceOfTheItem: Yup.string()
		.min(3, 'Must be at least 3 characters')
		.nullable(),
});

const DateSchema = Yup.object().shape({
	year: OptionTypeSchema.nullable().required('Year is required'),
	month: OptionTypeSchema.nullable().required('Month is required'),
	day: OptionTypeSchema.nullable().required('Day is required'),
});

export const validationSchema = Yup.object().shape({
	direction: Yup.mixed<'UK-LT' | 'LT-UK'>()
		.oneOf(['UK-LT', 'LT-UK'])
		.nullable()
		.required('Direction is required'),
	pickupAddress: Yup.string()
		.min(3, 'Must be at least 3 characters')
		.required('Pickup address is required'),
	pickupAddressZipCode: Yup.string()
		.nullable()
		.min(3, 'Must be at least 3 characters'),
	deliveryAddress: Yup.string()
		.min(3, 'Must be at least 3 characters')
		.required('Delivery address is required'),
	deliveryAddressZipCode: Yup.string()
		.nullable()
		.min(3, 'Must be at least 3 characters'),
	service: Yup.string()
		.min(3, 'Must be at least 3 characters')
		.required('Service is required'),
	shipments: Yup.array()
		.of(ShipmentPropsSchema)
		.required('At least one shipment is required'),
	dates: Yup.object().shape({
		from: DateSchema,
		to: DateSchema,
	}),
	senderInformation: Yup.object().shape({
		firstName: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('First name is required'),
		lastName: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('Last name is required'),
		phoneNumber: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('Phone number is required'),
		email: Yup.string()
			.email('Invalid email')
			.min(3, 'Must be at least 3 characters')
			.required('Email is required'),
		address: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('Address is required'),
		zipCode: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('Zip code is required'),
		additionInformation: Yup.string()
			.nullable()
			.min(3, 'Must be at least 3 characters'),
	}),
	recipientInformation: Yup.object().shape({
		firstName: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('First name is required'),
		lastName: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('Last name is required'),
		phoneNumber: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('Phone number is required'),
		email: Yup.string()
			.email('Invalid email')
			.min(3, 'Must be at least 3 characters')
			.required('Email is required'),
		address: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('Address is required'),
		zipCode: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('Zip code is required'),
		additionInformation: Yup.string()
			.nullable()
			.min(3, 'Must be at least 3 characters'),
	}),
	ransomPayeeInformation: Yup.object().shape({
		ransomRecipient: OptionTypeSchema.required('Ransom recipient is required'),
		firstName: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('First name is required'),
		lastName: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('Last name is required'),
		phoneNumber: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('Phone number is required'),
		email: Yup.string()
			.email('Invalid email')
			.min(3, 'Must be at least 3 characters')
			.required('Email is required'),
		address: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('Address is required'),
		zipCode: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('Zip code is required'),
		additionInformation: Yup.string()
			.nullable()
			.min(3, 'Must be at least 3 characters'),
	}),
	purchaseInformation: Yup.object().shape({
		firstName: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('First name is required'),
		lastName: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('Last name is required'),
		phoneNumber: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('Phone number is required'),
		email: Yup.string()
			.email('Invalid email')
			.min(3, 'Must be at least 3 characters')
			.required('Email is required'),
		address: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('Address is required'),
		zipCode: Yup.string()
			.min(3, 'Must be at least 3 characters')
			.required('Zip code is required'),
		additionInformation: Yup.string()
			.nullable()
			.min(3, 'Must be at least 3 characters'),
	}),
	customerInformation: Yup.object().shape({
		payerOfTheShipment: OptionTypeSchema.required(
			'Payer of the shipment is required'
		),
		paymentMethod: OptionTypeSchema.required('Payment method is required'),
		email: Yup.string()
			.email('Invalid email')
			.min(3, 'Must be at least 3 characters')
			.required('Email is required'),
	}),
	invoiceRequired: Yup.boolean().default(false),
	invoiceInformation: Yup.object().shape({
		companyName: Yup.string().when('invoiceRequired', {
			is: true,
			then: (schema) =>
				schema
					.min(3, 'Must be at least 3 characters')
					.required('Company name is required'),
			otherwise: (schema) => schema.nullable(),
		}),

		companyCode: Yup.string().when(
			'invoiceRequired',
			(invoiceRequired, schema) => {
				console.log('invoiceRequired ===', invoiceRequired);
				return invoiceRequired
					? Yup.string()
							.min(3, 'Must be at least 3 characters')
							.required('Company code is required')
					: schema.nullable();
			}
		),

		pvmCode: Yup.string().when('invoiceRequired', {
			is: true,
			then: (schema) =>
				schema
					.min(3, 'Must be at least 3 characters')
					.required('PVM code is required'),
			otherwise: (schema) => schema.nullable(),
		}),

		companyEmail: Yup.string().when('invoiceRequired', {
			is: true,
			then: (schema) =>
				schema
					.email('Invalid email')
					.min(3, 'Must be at least 3 characters')
					.required('Company email is required'),
			otherwise: (schema) => schema.email('Invalid email').nullable(),
		}),
		companyAddress: Yup.string().when('invoiceRequired', {
			is: true,
			then: (schema) =>
				schema
					.min(3, 'Must be at least 3 characters')
					.required('Company address is required'),
			otherwise: (schema) => schema.nullable(),
		}),
	}),

	packagingAndLabelingRules: Yup.boolean().required(
		'Packaging and labeling rules acceptance is required'
	),
	transportRules: Yup.boolean().required(
		'Transport rules acceptance is required'
	),
});
