/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */
import ServiceCard, { ServiceProps } from '../ServiceCard';
import Link from '../Link';
import { UseFormReturn, UseFormSetValue } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { convertValue } from '../../utils/convertCurrency';

const ServiceSection = ({
	setValue,
	selectedService,
	isParcelForce,
	currency,
	methods,
	rate,
}: {
	setValue: UseFormSetValue<FormType>;
	selectedService: string;
	isParcelForce: boolean;
	currency: '€' | '£';
	methods: UseFormReturn<FormType, any, undefined>;
	rate: number;
}) => {
	const prefillAddressFormFields = (service: string) => {
		const pickupAddress = methods.getValues('pickupAddress');
		const deliveryAddress = methods.getValues('deliveryAddress');
		const pickupAddressPostcode = methods.getValues('pickupAddressZipCode');
		const deliveryAddressPostcode = methods.getValues('deliveryAddressZipCode');

		if (service === 'shipmentWithAddressService') {
			setValue(`senderInformation.firstName`, 'EcoTrip UK');
			setValue(`senderInformation.lastName`, '----');
			setValue(`senderInformation.phoneNumber`, '+447479622299');
			setValue(`senderInformation.email`, 'info@ecotrip.lt');
			setValue(
				`senderInformation.address`,
				'Chaney Court Cottage, Maidstone Rd, Boughton Monchelseam, Tonbridge'
			);
			setValue(`senderInformation.zipCode`, 'TN12 0RW');
		} else {
			setValue(`senderInformation.firstName`, '');
			setValue(`senderInformation.lastName`, '');
			setValue(`senderInformation.phoneNumber`, '');
			setValue(`senderInformation.email`, '');
			setValue('senderInformation.address', pickupAddress ?? '');
			setValue('senderInformation.zipCode', pickupAddressPostcode ?? '');
		}

		setValue('recipientInformation.address', deliveryAddress ?? '');
		setValue('recipientInformation.zipCode', deliveryAddressPostcode ?? '');
	};

	const direction = methods.watch('direction');

	const handleServiceSelect = (service: string) => {
		if (
			service === 'productPurchaseService' ||
			service === 'shipmentWithAddressService'
		) {
			setValue('customerInformation.payerOfTheShipment', {
				label: 'Mokėtojas yra gavėjas',
				value: 'thePayerIsTheRecipient',
			});
		}

		if (service === 'productSalesService') {
			setValue('ransomPayeeInformation.ransomRecipient', {
				label: 'Siuntejas',
				value: 'sender',
			});
		}

		setValue('shipments', [
			{
				estimatedPrice: '0.00',
				category: { label: 'Siunta', value: 'shipments' },
				amount: 1,
			},
		]);
		setValue('service', service);
		prefillAddressFormFields(service);
	};

	const getIconColor = (service: string): '#9AA61E' | '#7A777680' => {
		return isCardDisabled(service, isParcelForce) ? '#7A777680' : '#9AA61E';
	};

	const isCardDisabled = (service: string, isParcelForce: boolean) => {
		if (
			(isParcelForce &&
				service !== 'parcelForceShipment' &&
				service !== 'shipmentWithAddressService') ||
			(!direction && service !== 'shipmentWithAddressService') ||
			(direction && direction === 'LT-LT')
		) {
			return true;
		} else {
			return false;
		}
	};

	const services: ServiceProps[] = isParcelForce
		? [
				{
					title: 'Siuntos',
					desc: 'Įprastos kainos',
					icon: (
						<svg
							width='34'
							height='34'
							viewBox='0 0 34 34'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M33.402 3.46575L33.3471 3.4109C33.2923 3.35605 33.2374 3.3012 33.1277 3.3012C33.0729 3.3012 34.1808 3.46575 17.1171 0.558716H16.8977C-0.111192 3.46575 0.941921 3.3012 0.887071 3.3012C0.612823 3.4109 0.387939 3.68515 0.387939 3.9594V28.6417C0.387939 28.9708 0.607338 29.2451 0.887071 29.2999C18.0057 33.6879 16.8428 33.4137 16.8977 33.4137H17.0622C17.2268 33.4137 16.5083 33.5782 33.0729 29.2999C33.4074 29.2451 33.572 28.9708 33.572 28.6417V3.9594C33.6268 3.74 33.572 3.57545 33.4074 3.46575H33.402ZM9.80563 3.13665L21.5489 6.15338L17.0074 7.36007L4.32066 4.06909L9.80563 3.13665ZM1.77015 4.83699L16.2834 8.56677V11.2544L1.77015 7.52462V4.83699ZM17.6711 8.56677C17.9453 8.51192 31.3561 5.00154 32.1843 4.83699V18.4946L17.6711 22.2243V8.56677ZM17.0074 1.87511L29.6941 4.06909L24.3189 5.44034L13.1295 2.5333L17.0074 1.87511ZM1.77015 15.0939C13.4038 17.7815 12.6852 17.6718 12.8498 17.6718C13.1844 17.6718 13.4586 17.4524 13.5135 17.1233C13.6232 16.7394 13.3489 16.4103 13.0143 16.3006L1.77015 13.6678V8.95072L16.2834 12.6805V31.823L1.77015 28.0933V15.0939ZM17.6711 31.823V23.6504L32.2391 19.9207V23.9795L20.995 26.5575C20.6055 26.6672 20.3861 26.9963 20.4958 27.3802C20.6055 27.7642 20.9401 27.9836 21.3295 27.8739L32.2446 25.3508V28.0933L17.6766 31.823H17.6711Z'
								fill={getIconColor('parcelForceShipment')}
							/>
							<path
								d='M25.3171 8.73129C22.6569 8.73129 20.4958 10.8704 20.4958 13.5032C20.4958 16.136 22.6569 18.2751 25.3171 18.2751C27.9773 18.2751 30.1384 16.136 30.1384 13.5032C30.1384 10.8704 27.9773 8.73129 25.3171 8.73129ZM25.3171 16.9587C23.4358 16.9587 21.8835 15.423 21.8835 13.5581C21.8835 11.6932 23.4358 10.1574 25.3171 10.1574C27.1985 10.1574 28.7507 11.6932 28.7507 13.5581C28.7507 15.423 27.1985 16.9587 25.3171 16.9587Z'
								fill={getIconColor('parcelForceShipment')}
							/>
							<path
								d='M27.0889 11.6384C26.7543 11.419 26.3704 11.4738 26.0906 11.8029L24.4835 13.8872L24.3738 13.7775C24.0996 13.5032 23.6553 13.5032 23.3756 13.7775C23.0958 14.0517 23.0958 14.4905 23.3756 14.7648L24.0393 15.4778C24.3135 15.7521 24.8126 15.7521 25.0924 15.423L27.1437 12.6805C27.4783 12.2417 27.4235 11.8578 27.0889 11.6384Z'
								fill={getIconColor('parcelForceShipment')}
							/>
						</svg>
					),
					value: 'parcelForceShipment',
					link: 'https://ecotrip.lt/siuntos-i-anglija-is-lietuvos-is-anglijos-i-lietuva/',
					linkText: 'Sužinoti daugiau apie siuntų ir krovinių pervežimą.',
				},

				{
					title: 'Siuntos su adreso paslauga',
					desc: `Papildomai nuo ${currency}0`,
					icon: (
						<svg
							width='34'
							height='33'
							viewBox='0 0 34 33'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M13.1856 19.1617H20.1076C20.497 19.1617 20.7713 18.8326 20.7713 18.4487C20.7713 18.0647 20.4367 17.7905 20.0528 17.7905H13.1856C12.7961 17.7905 12.467 18.1196 12.467 18.5035C12.467 18.8875 12.8016 19.1617 13.1856 19.1617Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M13.1856 21.9042H20.1076C20.497 21.9042 20.7713 21.5751 20.7713 21.1912C20.7713 20.8072 20.4367 20.533 20.1076 20.533H13.1856C12.7961 20.533 12.467 20.8621 12.467 21.1912C12.467 21.5751 12.8016 21.9042 13.1856 21.9042Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M13.1856 24.6467H20.1076C20.497 24.6467 20.7713 24.3176 20.7713 23.9885C20.7713 23.6045 20.4367 23.2755 20.1076 23.2755H13.1856C12.7961 23.2755 12.467 23.6045 12.467 23.9885C12.467 24.3176 12.8016 24.6467 13.1856 24.6467Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M13.1856 27.3892H20.1076C20.497 27.3892 20.7713 27.0601 20.7713 26.6761C20.7713 26.2922 20.4367 25.9631 20.1076 25.9631H13.1856C12.7961 25.9631 12.467 26.2922 12.467 26.6761C12.467 27.0601 12.8016 27.3892 13.1856 27.3892Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M32.5149 31.5029H29.0813V10.2706L30.7432 11.5321C31.0175 11.7515 31.4618 11.6967 31.6867 11.3676C31.9061 11.0385 31.8512 10.6545 31.577 10.4352C31.023 10.0512 28.8619 8.40571 28.8071 8.35086C28.7522 8.29601 19.7788 2.04315 17.0089 0.123412C16.7895 -0.0411373 16.4549 -0.0411373 16.2355 0.123412C16.071 0.233111 4.43734 8.35086 4.43734 8.35086L1.66743 10.3803C1.33285 10.5997 1.278 11.0385 1.50288 11.3127C1.72228 11.587 2.16656 11.6967 2.50115 11.4773L4.16309 10.2158V31.4974H0.718531C0.329098 31.4974 0 31.8265 0 32.2105C0 32.5944 0.334583 32.8687 0.718531 32.8687H32.5697C32.9592 32.8687 33.2883 32.5396 33.2883 32.2105C33.2883 31.8814 32.8988 31.4974 32.5149 31.4974V31.5029ZM23.5415 31.5029H9.69194V13.6768H23.5415V31.5029ZM24.9237 31.5029V13.0131C24.9237 12.6291 24.5891 12.3 24.2052 12.3H9.02826C8.63882 12.3 8.30973 12.6291 8.30973 13.0131V31.4974H5.53982V9.23394L16.6195 1.49465L27.6991 9.22846V31.4974H24.9292L24.9237 31.5029Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M4.15747 2.04315H2.76978V3.41439H4.15747V2.04315Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M4.15747 4.78564H2.76978V6.15689H4.15747V4.78564Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M5.53968 3.4144H4.15747V4.78564H5.53968V3.4144Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M2.76966 3.4144H1.38745V4.78564H2.76966V3.4144Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M31.1326 2.70685H29.7449V4.07809H31.1326V2.70685Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M31.1326 5.44931H29.7449V6.82055H31.1326V5.44931Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M32.5148 4.07806H31.1326V5.44931H32.5148V4.07806Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M29.7448 4.07806H28.3625V5.44931H29.7448V4.07806Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M21.4353 6.82056H11.7982C11.4088 6.82056 11.1345 7.14965 11.1345 7.5336C11.1345 7.91755 11.4691 8.1918 11.7982 8.1918H21.4901C21.8796 8.1918 22.1538 7.8627 22.1538 7.5336C22.1538 7.14965 21.8192 6.82056 21.4353 6.82056Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M21.4353 9.56308H11.7982C11.4088 9.56308 11.1345 9.89218 11.1345 10.2213C11.1345 10.6052 11.4691 10.9343 11.7982 10.9343H21.4901C21.8796 10.9343 22.1538 10.6052 22.1538 10.2213C22.1538 9.89218 21.8192 9.56308 21.4353 9.56308Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
						</svg>
					),
					value: 'shipmentWithAddressService',
					link: 'https://ecotrip.lt/apsipirkimo-adresas-anglijoje/',

					linkText:
						'Sužinoti daugiau apie siuntas su adreso paslauga ir kaip ja naudotis.',
				},
				{
					title: 'Prekės nupirkimo paslauga',
					desc: `Papildomai nuo ${currency}5 - ${convertValue(
						currency,
						5,
						rate
					)}`,
					icon: (
						<svg
							width='34'
							height='33'
							viewBox='0 0 34 33'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M32.46 31.5386H31.0175C28.9113 2.85218 28.9661 4.05888 28.9661 3.94918C28.9661 3.89433 28.9113 3.83948 28.9113 3.78463C28.8564 3.67493 29.0758 3.94918 25.368 0.219399C25.2583 0.109699 25.0334 0 24.8688 0H8.97341C8.80886 0 8.63882 0.0548497 8.52912 0.164549C4.09727 3.83948 4.377 3.62008 4.32215 3.67493C4.21245 3.78463 4.15761 3.89433 4.15761 4.00403C4.15761 4.05888 2.49566 26.2181 2.10623 31.5386H0.663681C0.274248 31.5386 0 31.8677 0 32.2516C0 32.6356 0.334583 32.9098 0.663681 32.9098H32.5149C32.9043 32.9098 33.2334 32.5807 33.2334 32.2516C33.2334 31.9225 32.844 31.5386 32.46 31.5386ZM9.19281 1.37124H24.5946L26.646 3.40068H6.70263L9.19281 1.37124ZM3.43359 31.5386L5.43012 4.82677H27.6991L29.6956 31.5386H3.43359Z'
								fill={getIconColor('productPurchaseService')}
							/>
							<path
								d='M22.768 15.0837V10.1472C23.6017 9.87296 24.1557 9.10506 24.1557 8.22747C24.1557 7.07562 23.2123 6.19803 22.1044 6.19803C20.9415 6.19803 20.053 7.13047 20.053 8.22747C20.053 9.10506 20.607 9.87296 21.4407 10.1472V15.0837C21.4407 17.7165 19.2796 19.8556 16.6194 19.8556C13.9592 19.8556 11.7981 17.7165 11.7981 15.0837V10.1472C12.6263 9.87296 13.1803 9.10506 13.1803 8.22747C13.1803 7.07562 12.2369 6.19803 11.0741 6.19803C9.91127 6.19803 9.02271 7.13047 9.02271 8.22747C9.02271 9.10506 9.57669 9.87296 10.4049 10.1472V15.0837C10.4049 18.4844 13.1748 21.2268 16.6084 21.2268C20.042 21.2268 22.7571 18.4844 22.7571 15.0837H22.768ZM22.1044 7.56927C22.4938 7.56927 22.8229 7.89837 22.8229 8.22747C22.8229 8.61141 22.4883 8.94051 22.1044 8.94051C21.7204 8.94051 21.3858 8.61141 21.3858 8.22747C21.3858 7.84352 21.7204 7.56927 22.1044 7.56927ZM11.0247 7.56927C11.4142 7.56927 11.7432 7.89837 11.7432 8.22747C11.7432 8.61141 11.4087 8.94051 11.0247 8.94051C10.6408 8.94051 10.361 8.61141 10.361 8.22747C10.361 7.84352 10.6353 7.56927 11.0247 7.56927Z'
								fill={getIconColor('productPurchaseService')}
							/>
							<path
								d='M22.7681 20.5686C20.1079 20.5686 17.9468 22.7078 17.9468 25.3406C17.9468 27.9733 20.1079 30.1125 22.7681 30.1125C25.4283 30.1125 27.5893 27.9733 27.5893 25.3406C27.6442 22.7078 25.4831 20.5686 22.7681 20.5686ZM22.7681 28.7961C20.8867 28.7961 19.3345 27.2603 19.3345 25.3954C19.3345 23.5305 20.8867 21.9947 22.7681 21.9947C24.6494 21.9947 26.2017 23.5305 26.2017 25.3954C26.2565 27.2603 24.7043 28.7961 22.7681 28.7961Z'
								fill={getIconColor('productPurchaseService')}
							/>
							<path
								d='M24.5945 23.4208C24.26 23.2014 23.876 23.2563 23.5963 23.5305L21.9892 25.6148L21.8795 25.5051C21.6052 25.2309 21.161 25.2309 20.8812 25.5051C20.607 25.7794 20.607 26.2182 20.8812 26.4924L21.5998 27.2055C21.874 27.4797 22.3731 27.4797 22.6529 27.1506L24.7042 24.4081C24.9785 24.079 24.9236 23.6951 24.5945 23.4208Z'
								fill={getIconColor('productPurchaseService')}
							/>
							<path
								d='M6.8728 28.083H5.48511V29.4543H6.8728V28.083Z'
								fill={getIconColor('productPurchaseService')}
							/>
							<path
								d='M9.64258 28.083H8.25488V29.4543H9.64258V28.083Z'
								fill={getIconColor('productPurchaseService')}
							/>
							<path
								d='M12.4126 28.083H11.0249V29.4543H12.4126V28.083Z'
								fill={getIconColor('productPurchaseService')}
							/>
						</svg>
					),
					value: 'productPurchaseService',

					linkText: 'Link',
				},
				{
					title: 'Prekės pardavimo paslauga',
					desc: `Papildomai nuo ${currency}15 - ${convertValue(
						currency,
						15,
						rate
					)}`,
					icon: (
						<svg
							width='35'
							height='33'
							viewBox='0 0 35 33'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M33.4651 31.5386H29.6421C30.1412 30.7158 30.1412 29.6737 29.6421 28.7961H30.6952C31.0846 28.7961 31.3589 28.467 31.3589 28.083C31.3589 27.6991 31.0243 27.4248 30.6952 27.4248H12.6935C12.3041 27.4248 12.0298 27.1506 12.0298 26.7666V25.3954H30.0315C30.3661 25.3954 30.6403 25.176 30.6952 24.9018L34.1288 11.1893C34.2385 10.7505 33.9094 10.3117 33.4651 10.3117H7.87222L5.10232 0.493647C4.99262 0.219399 4.76773 0 4.43863 0H1.66873C1.28478 0 0.950195 0.329098 0.950195 0.713046C0.950195 1.09699 1.28478 1.37124 1.66873 1.37124H3.9395C4.27409 2.63278 10.5324 24.1339 10.697 24.7921V26.7666C10.697 27.9185 11.6404 28.7961 12.7484 28.7961H13.1378C12.6387 29.6188 12.6387 30.661 13.1378 31.5386H1.66873C1.27929 31.5386 0.950195 31.8677 0.950195 32.2516C0.950195 32.6356 1.28478 32.9098 1.66873 32.9098H33.5199C33.9094 32.9098 34.2385 32.5807 34.2385 32.2516C34.2385 31.9225 33.849 31.5386 33.4651 31.5386ZM32.5765 11.683L31.0243 17.8261H15.5128C15.1234 17.8261 14.7943 18.1552 14.7943 18.5392C14.7943 18.9231 15.1288 19.2522 15.5128 19.2522H30.7445L29.472 23.9693H11.8653L8.32199 11.6281L32.5875 11.683H32.5765ZM28.6438 30.1673C28.6438 30.9352 28.035 31.5386 27.2616 31.5386C26.4882 31.5386 25.8739 30.9352 25.8739 30.1673C25.8739 29.3994 26.4827 28.7961 27.2616 28.7961C28.0405 28.7961 28.6438 29.3994 28.6438 30.1673ZM24.8756 31.5386H17.8933C18.3924 30.7158 18.3924 29.6737 17.8933 28.7961H24.8756C24.3765 29.6188 24.3765 30.661 24.8756 31.5386ZM14.1306 30.1673C14.1306 29.3994 14.7394 28.7961 15.5128 28.7961C16.2862 28.7961 16.9005 29.3994 16.9005 30.1673C16.9005 30.9352 16.2916 31.5386 15.5128 31.5386C14.7339 31.5386 14.1306 30.9352 14.1306 30.1673Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M3.05642 17.168C1.89361 17.168 0.950195 18.1004 0.950195 19.1974C0.950195 20.3493 1.89361 21.2268 3.05642 21.2268C4.21924 21.2268 5.1078 20.2944 5.1078 19.1974C5.1078 18.0456 4.16439 17.168 3.05642 17.168ZM3.05642 19.8556C2.66699 19.8556 2.33789 19.5265 2.33789 19.1974C2.33789 18.8135 2.67248 18.4844 3.05642 18.4844C3.44037 18.4844 3.77495 18.8135 3.77495 19.1974C3.7201 19.5814 3.38552 19.8556 3.05642 19.8556Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M6.48451 26.0536H5.10229V27.4248H6.48451V26.0536Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M6.48451 23.3111H5.10229V24.6824H6.48451V23.3111Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M5.10767 24.6823H3.71997V26.0536H5.10767V24.6823Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M7.87769 24.6823H6.48999V26.0536H7.87769V24.6823Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M30.0369 6.19803H28.6492V7.56927H30.0369V6.19803Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M30.0369 3.45551H28.6492V4.82675H30.0369V3.45551Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M28.6437 4.82678H27.2615V6.19802H28.6437V4.82678Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M31.4137 4.82678H30.0315V6.19802H31.4137V4.82678Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M17.8439 4.00405C18.1785 4.22344 18.5624 4.16859 18.7873 3.89435L19.6155 2.79735V7.56927C19.6155 7.95322 19.9501 8.22747 20.3341 8.22747C20.718 8.22747 21.0526 7.89837 21.0526 7.56927V2.79735L21.8808 3.89435C22.1002 4.16859 22.5445 4.27829 22.8242 4.00405C23.1588 3.78465 23.2137 3.34585 22.9888 3.0716C20.7235 0.109719 20.8935 0.274268 20.8387 0.219418C20.5644 -0.0548299 20.1201 1.97552e-05 19.8404 0.329118C19.7856 0.383967 18.7325 1.75521 17.7342 3.0716C17.4599 3.34585 17.5148 3.7298 17.8439 4.00405Z'
								fill={getIconColor('productSalesService')}
							/>
						</svg>
					),
					value: 'productSalesService',

					linkText: 'Link',
				},
		  ]
		: [
				{
					title: 'Siuntos',
					desc: 'Įprastos kainos',
					icon: (
						<svg
							width='34'
							height='34'
							viewBox='0 0 34 34'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M33.402 3.46575L33.3471 3.4109C33.2923 3.35605 33.2374 3.3012 33.1277 3.3012C33.0729 3.3012 34.1808 3.46575 17.1171 0.558716H16.8977C-0.111192 3.46575 0.941921 3.3012 0.887071 3.3012C0.612823 3.4109 0.387939 3.68515 0.387939 3.9594V28.6417C0.387939 28.9708 0.607338 29.2451 0.887071 29.2999C18.0057 33.6879 16.8428 33.4137 16.8977 33.4137H17.0622C17.2268 33.4137 16.5083 33.5782 33.0729 29.2999C33.4074 29.2451 33.572 28.9708 33.572 28.6417V3.9594C33.6268 3.74 33.572 3.57545 33.4074 3.46575H33.402ZM9.80563 3.13665L21.5489 6.15338L17.0074 7.36007L4.32066 4.06909L9.80563 3.13665ZM1.77015 4.83699L16.2834 8.56677V11.2544L1.77015 7.52462V4.83699ZM17.6711 8.56677C17.9453 8.51192 31.3561 5.00154 32.1843 4.83699V18.4946L17.6711 22.2243V8.56677ZM17.0074 1.87511L29.6941 4.06909L24.3189 5.44034L13.1295 2.5333L17.0074 1.87511ZM1.77015 15.0939C13.4038 17.7815 12.6852 17.6718 12.8498 17.6718C13.1844 17.6718 13.4586 17.4524 13.5135 17.1233C13.6232 16.7394 13.3489 16.4103 13.0143 16.3006L1.77015 13.6678V8.95072L16.2834 12.6805V31.823L1.77015 28.0933V15.0939ZM17.6711 31.823V23.6504L32.2391 19.9207V23.9795L20.995 26.5575C20.6055 26.6672 20.3861 26.9963 20.4958 27.3802C20.6055 27.7642 20.9401 27.9836 21.3295 27.8739L32.2446 25.3508V28.0933L17.6766 31.823H17.6711Z'
								fill={getIconColor('standartShipment')}
							/>
							<path
								d='M25.3171 8.73129C22.6569 8.73129 20.4958 10.8704 20.4958 13.5032C20.4958 16.136 22.6569 18.2751 25.3171 18.2751C27.9773 18.2751 30.1384 16.136 30.1384 13.5032C30.1384 10.8704 27.9773 8.73129 25.3171 8.73129ZM25.3171 16.9587C23.4358 16.9587 21.8835 15.423 21.8835 13.5581C21.8835 11.6932 23.4358 10.1574 25.3171 10.1574C27.1985 10.1574 28.7507 11.6932 28.7507 13.5581C28.7507 15.423 27.1985 16.9587 25.3171 16.9587Z'
								fill={getIconColor('standartShipment')}
							/>
							<path
								d='M27.0889 11.6384C26.7543 11.419 26.3704 11.4738 26.0906 11.8029L24.4835 13.8872L24.3738 13.7775C24.0996 13.5032 23.6553 13.5032 23.3756 13.7775C23.0958 14.0517 23.0958 14.4905 23.3756 14.7648L24.0393 15.4778C24.3135 15.7521 24.8126 15.7521 25.0924 15.423L27.1437 12.6805C27.4783 12.2417 27.4235 11.8578 27.0889 11.6384Z'
								fill={getIconColor('standartShipment')}
							/>
						</svg>
					),
					value: 'standartShipment',
					link: 'https://ecotrip.lt/siuntos-i-anglija-is-lietuvos-is-anglijos-i-lietuva/',
					linkText: 'Sužinoti daugiau apie siuntų ir krovinių pervežimą.',
				},
				{
					title: 'Siuntos su adreso paslauga',
					desc: `Papildomai nuo ${currency}0`,
					icon: (
						<svg
							width='34'
							height='33'
							viewBox='0 0 34 33'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M13.1856 19.1617H20.1076C20.497 19.1617 20.7713 18.8326 20.7713 18.4487C20.7713 18.0647 20.4367 17.7905 20.0528 17.7905H13.1856C12.7961 17.7905 12.467 18.1196 12.467 18.5035C12.467 18.8875 12.8016 19.1617 13.1856 19.1617Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M13.1856 21.9042H20.1076C20.497 21.9042 20.7713 21.5751 20.7713 21.1912C20.7713 20.8072 20.4367 20.533 20.1076 20.533H13.1856C12.7961 20.533 12.467 20.8621 12.467 21.1912C12.467 21.5751 12.8016 21.9042 13.1856 21.9042Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M13.1856 24.6467H20.1076C20.497 24.6467 20.7713 24.3176 20.7713 23.9885C20.7713 23.6045 20.4367 23.2755 20.1076 23.2755H13.1856C12.7961 23.2755 12.467 23.6045 12.467 23.9885C12.467 24.3176 12.8016 24.6467 13.1856 24.6467Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M13.1856 27.3892H20.1076C20.497 27.3892 20.7713 27.0601 20.7713 26.6761C20.7713 26.2922 20.4367 25.9631 20.1076 25.9631H13.1856C12.7961 25.9631 12.467 26.2922 12.467 26.6761C12.467 27.0601 12.8016 27.3892 13.1856 27.3892Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M32.5149 31.5029H29.0813V10.2706L30.7432 11.5321C31.0175 11.7515 31.4618 11.6967 31.6867 11.3676C31.9061 11.0385 31.8512 10.6545 31.577 10.4352C31.023 10.0512 28.8619 8.40571 28.8071 8.35086C28.7522 8.29601 19.7788 2.04315 17.0089 0.123412C16.7895 -0.0411373 16.4549 -0.0411373 16.2355 0.123412C16.071 0.233111 4.43734 8.35086 4.43734 8.35086L1.66743 10.3803C1.33285 10.5997 1.278 11.0385 1.50288 11.3127C1.72228 11.587 2.16656 11.6967 2.50115 11.4773L4.16309 10.2158V31.4974H0.718531C0.329098 31.4974 0 31.8265 0 32.2105C0 32.5944 0.334583 32.8687 0.718531 32.8687H32.5697C32.9592 32.8687 33.2883 32.5396 33.2883 32.2105C33.2883 31.8814 32.8988 31.4974 32.5149 31.4974V31.5029ZM23.5415 31.5029H9.69194V13.6768H23.5415V31.5029ZM24.9237 31.5029V13.0131C24.9237 12.6291 24.5891 12.3 24.2052 12.3H9.02826C8.63882 12.3 8.30973 12.6291 8.30973 13.0131V31.4974H5.53982V9.23394L16.6195 1.49465L27.6991 9.22846V31.4974H24.9292L24.9237 31.5029Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M4.15747 2.04315H2.76978V3.41439H4.15747V2.04315Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M4.15747 4.78564H2.76978V6.15689H4.15747V4.78564Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M5.53968 3.4144H4.15747V4.78564H5.53968V3.4144Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M2.76966 3.4144H1.38745V4.78564H2.76966V3.4144Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M31.1326 2.70685H29.7449V4.07809H31.1326V2.70685Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M31.1326 5.44931H29.7449V6.82055H31.1326V5.44931Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M32.5148 4.07806H31.1326V5.44931H32.5148V4.07806Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M29.7448 4.07806H28.3625V5.44931H29.7448V4.07806Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M21.4353 6.82056H11.7982C11.4088 6.82056 11.1345 7.14965 11.1345 7.5336C11.1345 7.91755 11.4691 8.1918 11.7982 8.1918H21.4901C21.8796 8.1918 22.1538 7.8627 22.1538 7.5336C22.1538 7.14965 21.8192 6.82056 21.4353 6.82056Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
							<path
								d='M21.4353 9.56308H11.7982C11.4088 9.56308 11.1345 9.89218 11.1345 10.2213C11.1345 10.6052 11.4691 10.9343 11.7982 10.9343H21.4901C21.8796 10.9343 22.1538 10.6052 22.1538 10.2213C22.1538 9.89218 21.8192 9.56308 21.4353 9.56308Z'
								fill={getIconColor('shipmentWithAddressService')}
							/>
						</svg>
					),
					value: 'shipmentWithAddressService',
					link: 'https://ecotrip.lt/apsipirkimo-adresas-anglijoje/',

					linkText:
						'Sužinoti daugiau apie siuntas su adreso paslauga ir kaip ja naudotis.',
				},
				{
					title: 'Prekės nupirkimo paslauga',
					desc: `Papildomai nuo ${currency}5 - ${convertValue(
						currency,
						5,
						rate
					)}`,
					icon: (
						<svg
							width='34'
							height='33'
							viewBox='0 0 34 33'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M32.46 31.5386H31.0175C28.9113 2.85218 28.9661 4.05888 28.9661 3.94918C28.9661 3.89433 28.9113 3.83948 28.9113 3.78463C28.8564 3.67493 29.0758 3.94918 25.368 0.219399C25.2583 0.109699 25.0334 0 24.8688 0H8.97341C8.80886 0 8.63882 0.0548497 8.52912 0.164549C4.09727 3.83948 4.377 3.62008 4.32215 3.67493C4.21245 3.78463 4.15761 3.89433 4.15761 4.00403C4.15761 4.05888 2.49566 26.2181 2.10623 31.5386H0.663681C0.274248 31.5386 0 31.8677 0 32.2516C0 32.6356 0.334583 32.9098 0.663681 32.9098H32.5149C32.9043 32.9098 33.2334 32.5807 33.2334 32.2516C33.2334 31.9225 32.844 31.5386 32.46 31.5386ZM9.19281 1.37124H24.5946L26.646 3.40068H6.70263L9.19281 1.37124ZM3.43359 31.5386L5.43012 4.82677H27.6991L29.6956 31.5386H3.43359Z'
								fill={getIconColor('productPurchaseService')}
							/>
							<path
								d='M22.768 15.0837V10.1472C23.6017 9.87296 24.1557 9.10506 24.1557 8.22747C24.1557 7.07562 23.2123 6.19803 22.1044 6.19803C20.9415 6.19803 20.053 7.13047 20.053 8.22747C20.053 9.10506 20.607 9.87296 21.4407 10.1472V15.0837C21.4407 17.7165 19.2796 19.8556 16.6194 19.8556C13.9592 19.8556 11.7981 17.7165 11.7981 15.0837V10.1472C12.6263 9.87296 13.1803 9.10506 13.1803 8.22747C13.1803 7.07562 12.2369 6.19803 11.0741 6.19803C9.91127 6.19803 9.02271 7.13047 9.02271 8.22747C9.02271 9.10506 9.57669 9.87296 10.4049 10.1472V15.0837C10.4049 18.4844 13.1748 21.2268 16.6084 21.2268C20.042 21.2268 22.7571 18.4844 22.7571 15.0837H22.768ZM22.1044 7.56927C22.4938 7.56927 22.8229 7.89837 22.8229 8.22747C22.8229 8.61141 22.4883 8.94051 22.1044 8.94051C21.7204 8.94051 21.3858 8.61141 21.3858 8.22747C21.3858 7.84352 21.7204 7.56927 22.1044 7.56927ZM11.0247 7.56927C11.4142 7.56927 11.7432 7.89837 11.7432 8.22747C11.7432 8.61141 11.4087 8.94051 11.0247 8.94051C10.6408 8.94051 10.361 8.61141 10.361 8.22747C10.361 7.84352 10.6353 7.56927 11.0247 7.56927Z'
								fill={getIconColor('productPurchaseService')}
							/>
							<path
								d='M22.7681 20.5686C20.1079 20.5686 17.9468 22.7078 17.9468 25.3406C17.9468 27.9733 20.1079 30.1125 22.7681 30.1125C25.4283 30.1125 27.5893 27.9733 27.5893 25.3406C27.6442 22.7078 25.4831 20.5686 22.7681 20.5686ZM22.7681 28.7961C20.8867 28.7961 19.3345 27.2603 19.3345 25.3954C19.3345 23.5305 20.8867 21.9947 22.7681 21.9947C24.6494 21.9947 26.2017 23.5305 26.2017 25.3954C26.2565 27.2603 24.7043 28.7961 22.7681 28.7961Z'
								fill={getIconColor('productPurchaseService')}
							/>
							<path
								d='M24.5945 23.4208C24.26 23.2014 23.876 23.2563 23.5963 23.5305L21.9892 25.6148L21.8795 25.5051C21.6052 25.2309 21.161 25.2309 20.8812 25.5051C20.607 25.7794 20.607 26.2182 20.8812 26.4924L21.5998 27.2055C21.874 27.4797 22.3731 27.4797 22.6529 27.1506L24.7042 24.4081C24.9785 24.079 24.9236 23.6951 24.5945 23.4208Z'
								fill={getIconColor('productPurchaseService')}
							/>
							<path
								d='M6.8728 28.083H5.48511V29.4543H6.8728V28.083Z'
								fill={getIconColor('productPurchaseService')}
							/>
							<path
								d='M9.64258 28.083H8.25488V29.4543H9.64258V28.083Z'
								fill={getIconColor('productPurchaseService')}
							/>
							<path
								d='M12.4126 28.083H11.0249V29.4543H12.4126V28.083Z'
								fill={getIconColor('productPurchaseService')}
							/>
						</svg>
					),
					value: 'productPurchaseService',

					linkText: 'Link',
				},
				{
					title: 'Prekės pardavimo paslauga',
					desc: `Papildomai nuo ${currency}15 - ${convertValue(
						currency,
						15,
						rate
					)}`,
					icon: (
						<svg
							width='35'
							height='33'
							viewBox='0 0 35 33'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M33.4651 31.5386H29.6421C30.1412 30.7158 30.1412 29.6737 29.6421 28.7961H30.6952C31.0846 28.7961 31.3589 28.467 31.3589 28.083C31.3589 27.6991 31.0243 27.4248 30.6952 27.4248H12.6935C12.3041 27.4248 12.0298 27.1506 12.0298 26.7666V25.3954H30.0315C30.3661 25.3954 30.6403 25.176 30.6952 24.9018L34.1288 11.1893C34.2385 10.7505 33.9094 10.3117 33.4651 10.3117H7.87222L5.10232 0.493647C4.99262 0.219399 4.76773 0 4.43863 0H1.66873C1.28478 0 0.950195 0.329098 0.950195 0.713046C0.950195 1.09699 1.28478 1.37124 1.66873 1.37124H3.9395C4.27409 2.63278 10.5324 24.1339 10.697 24.7921V26.7666C10.697 27.9185 11.6404 28.7961 12.7484 28.7961H13.1378C12.6387 29.6188 12.6387 30.661 13.1378 31.5386H1.66873C1.27929 31.5386 0.950195 31.8677 0.950195 32.2516C0.950195 32.6356 1.28478 32.9098 1.66873 32.9098H33.5199C33.9094 32.9098 34.2385 32.5807 34.2385 32.2516C34.2385 31.9225 33.849 31.5386 33.4651 31.5386ZM32.5765 11.683L31.0243 17.8261H15.5128C15.1234 17.8261 14.7943 18.1552 14.7943 18.5392C14.7943 18.9231 15.1288 19.2522 15.5128 19.2522H30.7445L29.472 23.9693H11.8653L8.32199 11.6281L32.5875 11.683H32.5765ZM28.6438 30.1673C28.6438 30.9352 28.035 31.5386 27.2616 31.5386C26.4882 31.5386 25.8739 30.9352 25.8739 30.1673C25.8739 29.3994 26.4827 28.7961 27.2616 28.7961C28.0405 28.7961 28.6438 29.3994 28.6438 30.1673ZM24.8756 31.5386H17.8933C18.3924 30.7158 18.3924 29.6737 17.8933 28.7961H24.8756C24.3765 29.6188 24.3765 30.661 24.8756 31.5386ZM14.1306 30.1673C14.1306 29.3994 14.7394 28.7961 15.5128 28.7961C16.2862 28.7961 16.9005 29.3994 16.9005 30.1673C16.9005 30.9352 16.2916 31.5386 15.5128 31.5386C14.7339 31.5386 14.1306 30.9352 14.1306 30.1673Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M3.05642 17.168C1.89361 17.168 0.950195 18.1004 0.950195 19.1974C0.950195 20.3493 1.89361 21.2268 3.05642 21.2268C4.21924 21.2268 5.1078 20.2944 5.1078 19.1974C5.1078 18.0456 4.16439 17.168 3.05642 17.168ZM3.05642 19.8556C2.66699 19.8556 2.33789 19.5265 2.33789 19.1974C2.33789 18.8135 2.67248 18.4844 3.05642 18.4844C3.44037 18.4844 3.77495 18.8135 3.77495 19.1974C3.7201 19.5814 3.38552 19.8556 3.05642 19.8556Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M6.48451 26.0536H5.10229V27.4248H6.48451V26.0536Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M6.48451 23.3111H5.10229V24.6824H6.48451V23.3111Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M5.10767 24.6823H3.71997V26.0536H5.10767V24.6823Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M7.87769 24.6823H6.48999V26.0536H7.87769V24.6823Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M30.0369 6.19803H28.6492V7.56927H30.0369V6.19803Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M30.0369 3.45551H28.6492V4.82675H30.0369V3.45551Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M28.6437 4.82678H27.2615V6.19802H28.6437V4.82678Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M31.4137 4.82678H30.0315V6.19802H31.4137V4.82678Z'
								fill={getIconColor('productSalesService')}
							/>
							<path
								d='M17.8439 4.00405C18.1785 4.22344 18.5624 4.16859 18.7873 3.89435L19.6155 2.79735V7.56927C19.6155 7.95322 19.9501 8.22747 20.3341 8.22747C20.718 8.22747 21.0526 7.89837 21.0526 7.56927V2.79735L21.8808 3.89435C22.1002 4.16859 22.5445 4.27829 22.8242 4.00405C23.1588 3.78465 23.2137 3.34585 22.9888 3.0716C20.7235 0.109719 20.8935 0.274268 20.8387 0.219418C20.5644 -0.0548299 20.1201 1.97552e-05 19.8404 0.329118C19.7856 0.383967 18.7325 1.75521 17.7342 3.0716C17.4599 3.34585 17.5148 3.7298 17.8439 4.00405Z'
								fill={getIconColor('productSalesService')}
							/>
						</svg>
					),
					value: 'productSalesService',

					linkText: 'Link',
				},
		  ];

	return (
		<div className='service-section-wrapper'>
			<div className='service-section-container'>
				<span className='title'>Pasirinkite paslaugą:</span>
				<div className='services-mapping-wrapper'>
					<div className='services-mapping-container'>
						{services.map((service, index) => (
							<div
								key={index}
								className='services-mapping-container-service-card'>
								<ServiceCard
									service={service}
									direction={direction}
									onSelect={() => {
										if (isCardDisabled(service.value, isParcelForce)) return;
										handleServiceSelect(service.value);
									}}
									selected={service.value === selectedService}
									isDisabled={isCardDisabled(service.value, isParcelForce)}
									isParcelForce={isParcelForce}
								/>
								{service.link && (
									<Link
										href={service.link}
										text={service.linkText ?? ''}
									/>
								)}
							</div>
						))}
					</div>
				</div>
				<Link
					href='https://ecotrip.lt/prekes-is-anglijos-uk/'
					text='Sužinoti daugiau apie prekės nupirkimo ir pardavimo paslaugas ir kaip jomis naudotis.'
				/>

				{selectedService === 'parcelForceShipment' ? (
					<div className='service-section-sub-text'>
						<span>
							Dėl pasirinkto UK adreso, jūsų siuntą persiųsime per partnerius,
							galimas maksimalus siuntos svoris iki 30 kg ir privalomas
							pakavimas dėžėse. Jei sutinkate su sąlygomis tęskite siuntos
							įvedimą.
						</span>
						{/* <Link
              href='/'
              text='Plačiau apie siuntų persiuntimą per partnerius rasite čia.'
            /> */}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default ServiceSection;
