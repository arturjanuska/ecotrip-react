import { ServiceProps } from '../components/ServiceCard';
import { OptionType } from './types';

export enum FormTypes {
	Shipment = 'shipment',
	OtherProducts = 'other-products',
	ParcelForceShimpent = 'parcel-force-shipment',
}

export type ShipmentProps = {};

export type FormType = {
	direction: 'UK-LT' | 'LT-UK';
	pickupAddress: string;
	pickupAddressZipCode: string;
	deliveryAddress: string;
	deliveryAddressZipCode: string;
	service: ServiceProps;
	shimpmets: ShipmentProps[];
	dates: {
		from: string;
		to: string;
	};
	senderInformation: {
		firstName: string;
		lastName: string;
		phoneNumber: string;
		email: string;
		address: string;
		zipCode: string;
		additionInformation: string;
	};
	recipientInformation: {
		firstName: string;
		lastName: string;
		phoneNumber: string;
		email: string;
		address: string;
		zipCode: string;
		additionInformation: string;
	};
	ransomPayeeInformation: {
		ransomRecipient: OptionType;
		firstName: string;
		lastName: string;
		phoneNumber: string;
		email: string;
		address: string;
		zipCode: string;
		additionInformation: string;
	};
	customerInformation: {
		payerOfTheShipment: OptionType;
		paymentMethod: OptionType;
		email: string;
	};
	invoiceRequired: boolean;
	invoiceInformation: {
		companyName: string;
		companyCode: string;
		companyEmail: string;
		companyAddress: string;
	};
	packagingAndLabelingRules: boolean;
	transportRules: boolean;
};
