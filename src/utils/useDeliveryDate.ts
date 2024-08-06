/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs, { Dayjs } from 'dayjs';
import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { FormType } from './formTypes';
import { monthNames } from '../components/step3/monthNames';

type Props = {
	pickupDate: string;
	direction: 'UK-LT' | 'LT-UK' | null;
	setValue: UseFormSetValue<FormType>;
	dayFrom?: string;
};

const useDeliveryDate = ({
	pickupDate,
	direction,
	setValue,
	dayFrom,
}: Props) => {
	useEffect(() => {
		const getDeliveryDate = () => {
			if (!pickupDate || !direction) {
				setValue('dates.to.year', null);
				setValue('dates.to.month', null);
				setValue('dates.to.day', null);
				return;
			}

			const [pickupStart, pickupEnd] = pickupDate
				.split(' - ')
				.map((day) => day.trim());
			const [pickupYear, pickupMonth] = pickupStart
				.split('/')
				.map((part) => parseInt(part, 10));

			const deliveryDays = direction === 'UK-LT' ? [2, 3] : [5, 6];

			const findNextValidDay = (date: Dayjs, validDays: number[]) => {
				while (!validDays.includes(date.day())) {
					date = date.add(1, 'day');
				}
				return date;
			};

			const pickupEndDate = dayjs(
				`${pickupYear}-${pickupMonth}-${parseInt(pickupEnd, 10)}`
			).add(1, 'day');
			const deliveryStartDate = findNextValidDay(
				pickupEndDate,
				deliveryDays
			).subtract(1, 'day');
			console.log('deliveryStartDate ===', deliveryStartDate);
			const deliveryEndDate = deliveryStartDate.add(1, 'day');
			console.log('deliveryEndDate ===', deliveryEndDate);

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

		if (dayFrom) {
			getDeliveryDate();
		} else {
			setValue('dates.to.year', null);
			setValue('dates.to.month', null);
			setValue('dates.to.day', null);
		}
	}, [pickupDate, direction, setValue, dayFrom]);
};

export default useDeliveryDate;
