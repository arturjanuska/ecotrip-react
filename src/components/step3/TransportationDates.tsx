/* eslint-disable @typescript-eslint/no-explicit-any */
import Step from '../Step';
import Datepicker from '../Datepicker';
import './step3.css';
import { FieldErrors, UseFormReturn } from 'react-hook-form';
import { DirectionType, FormType } from '../../utils/formTypes';
import useDeliveryDate from '../../hooks/useDeliveryDate';
import useDateOptions from '../../hooks/useDateOptions';
import { useTranslation } from 'react-i18next';
import type { PostcodeRecord } from '../../utils/postcodes';

type TransportationDatesProps = {
  methods: UseFormReturn<FormType, any, undefined>;
  formErrors: FieldErrors<FormType>;
  direction: DirectionType;
  postcodeDetails: PostcodeRecord | null;
};

const TransportationDates = ({
  methods,
  formErrors,
  direction,
  postcodeDetails,
}: TransportationDatesProps) => {
  const { watch, setValue } = methods;

  const { t } = useTranslation();

  const yearFrom = watch('dates.from.year.value');
  const monthFrom = watch('dates.from.month.value');
  const dayRangeFrom = watch('dates.from.day.value');

  const service = methods.watch('service');

  const resetToDates = () => {
    setValue('dates.to.year', null);
    setValue('dates.to.month', null);
    setValue('dates.to.day', null);
  };

  const pickupDate =
    yearFrom && monthFrom && dayRangeFrom
      ? `${yearFrom}/${monthFrom}/${dayRangeFrom.split(' - ')[0]}`
      : '';

  useDeliveryDate({
    pickupDate,
    direction,
    setValue,
    dayRangeFrom,
    service,
  });

  const options = useDateOptions({
    selectedMonth: monthFrom || null,
    direction,
    service,
    postcodeDetails,
  });

  return (
    <Step step={3} title={t('step3Title')}>
      <>
        <div className="date-fields-container">
          <Datepicker
            fiedsDisabled={false}
            label={t('datepickerFromFieldLabel')}
            options={options}
            control={methods.control}
            name="from"
            formErrors={formErrors}
            resetToDates={resetToDates}
            setValue={setValue}
            service={service}
          />

          <Datepicker
            fiedsDisabled={true}
            label={t('datepickerToFieldLabel')}
            control={methods.control}
            name="to"
            formErrors={formErrors}
            resetToDates={resetToDates}
            service={service}
          />
          {/* {direction === 'LT-UK' && dayRangeFrom === '17 - 18' ? (
            <div className='warning-text'>
              <p>
                Informuojame, kad gruodžio 18 d. išvykstame į
                paskutinį 2024 metų reisą iš Lietuvos į Didžiąją
                Britaniją.
              </p>
              <p>Rezervacijas priimame telefonu arba el paštu:</p>
              <p>+370 60122 060</p>
              <p>+44 7479 622299</p>
              <p>info@ecotrip.lt</p>
            </div>
          ) : null} */}
        </div>
      </>
    </Step>
  );
};

export default TransportationDates;
