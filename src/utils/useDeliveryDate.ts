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
		const getDeliveryDate = ({ pickupDate, direction, setValue }: Props) => {
			if (!pickupDate || !direction) return;

			const [pickupStart, pickupEnd] = pickupDate
				.split(' - ')
				.map((day) => parseInt(day, 10));

			const pickupMonth = dayjs(pickupDate.split('/')[1], 'MM').month() + 1;
			const pickupYear = dayjs(pickupDate.split('/')[0], 'YYYY').year();

			const deliveryDays = direction === 'UK-LT' ? [2, 3] : [5, 6];

			const findNextValidDay = (date: Dayjs, validDays: number[]) => {
				console.log('date ===', date);
				console.log('validDays ===', validDays);
				while (!validDays.includes(date.day())) {
					date = date.add(1, 'day');
				}
				return date;
			};

			const pickupDateEnd = dayjs(
				`${pickupYear}-${pickupMonth}-${pickupEnd.toString().padStart(2, '0')}`
			);
			const deliveryStartDate = findNextValidDay(
				pickupDateEnd.add(1, 'day'),
				deliveryDays
			);

			const deliveryEndDate = deliveryStartDate.add(1, 'day');

			const deliveryDate = {
				year: deliveryStartDate.format('YYYY'),
				month: deliveryStartDate.format('M'),
				day: `${deliveryStartDate.format('D')} - ${deliveryEndDate.format(
					'D'
				)}`,
			};

			setValue('dates.to.year', {
				label: deliveryDate.year,
				value: deliveryDate.year,
			});

			setValue('dates.to.month', {
				label: monthNames[Number(deliveryDate.month) - 1],
				value: deliveryDate.month,
			});

			setValue('dates.to.day', {
				label: deliveryDate.day,
				value: deliveryDate.day,
			});
		};
		if (dayFrom) {
			getDeliveryDate({ pickupDate, direction, setValue });
		} else {
			setValue('dates.to.year', null);
			setValue('dates.to.month', null);
			setValue('dates.to.day', null);
		}
	}, [dayFrom]);
};

export default useDeliveryDate;
