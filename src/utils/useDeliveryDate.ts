/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs, { Dayjs } from 'dayjs';
import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { FormType } from './formTypes';
import { monthNames } from '../components/step3/monthNames';

type Props = {
	pickupDate: string;
	direction: 'UK-LT' | 'LT-UK' | 'LT-LT' | null;
	setValue: UseFormSetValue<FormType>;
	dayRangeFrom?: string;
	service?: string;
};

const useDeliveryDate = ({
	pickupDate,
	direction,
	setValue,
	dayRangeFrom,
	service,
}: Props) => {
	useEffect(() => {
		const getDeliveryDate = () => {
			if (!pickupDate || direction === 'LT-LT') {
				setValue('dates.to.year', null);
				setValue('dates.to.month', null);
				setValue('dates.to.day', null);
				return;
			}

			const pickupStart = pickupDate;

			const pickupEndDay = dayRangeFrom?.split(' - ')[1];

			const pickupMonth = parseInt(pickupStart.split('/')[1], 10);

			const is_UK_LT =
				direction === 'UK-LT' || service === 'shipmentWithAddressService';

			const deliveryDays = is_UK_LT ? [2, 3] : [0, 5, 6];

			const findNextValidDay = (date: Dayjs, validDays: number[]) => {
				while (!validDays.includes(date.day())) {
					date = date.add(1, 'day');
				}
				return date;
			};

			const findNextAfterNextValidDay = (date: Dayjs, validDays: number[]) => {
				date = findNextValidDay(date, validDays);
				date = date.add(7, 'day');
				date = findNextValidDay(date, validDays);
				return date;
			};

			const getDeliveryYear = () => {
				const currentYear = dayjs().year();

				const nextYear = dayjs().add(1, 'year').year();

				if (pickupMonth == 12) {
					if (pickupEndDay === '1' || pickupEndDay === '2') {
						return nextYear;
					}
					return currentYear;
				}
				return currentYear;
			};

			const getDeliveryMonth = () => {
				return pickupEndDay === '1' || pickupEndDay === '2'
					? pickupMonth + 1 < 13
						? pickupMonth + 1
						: 1
					: pickupMonth;
			};

			const pickupEndDate = dayjs(
				`${getDeliveryYear()}-${getDeliveryMonth()}-${pickupEndDay}`
			).add(1, 'day');

			const deliveryStartDate =
				service === 'parcelForceShipment'
					? findNextAfterNextValidDay(pickupEndDate, deliveryDays)
					: findNextValidDay(pickupEndDate, deliveryDays);

			const deliveryEndDate = deliveryStartDate.add(is_UK_LT ? 1 : 2, 'day');

			const deliveryDate = {
				year: deliveryStartDate.format('YYYY'),
				month: deliveryStartDate.format('MM'),
				day: `${deliveryStartDate.format('D')} - ${deliveryEndDate.format(
					'D'
				)}`,
			};

			setValue('dates.to.year', {
				label: deliveryDate.year,
				value: deliveryDate.year,
			});

			setValue('dates.to.month', {
				label: monthNames[deliveryStartDate.month()],
				value: deliveryDate.month,
			});

			setValue('dates.to.day', {
				label: deliveryDate.day,
				value: deliveryDate.day,
			});
		};

		if (dayRangeFrom) {
			getDeliveryDate();
		} else {
			setValue('dates.to.year', null);
			setValue('dates.to.month', null);
			setValue('dates.to.day', null);
		}
	}, [pickupDate, direction, setValue, dayRangeFrom, service]);
};

export default useDeliveryDate;
