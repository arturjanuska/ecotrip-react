/* eslint-disable @typescript-eslint/no-explicit-any */
import Step from '../Step';
import Datepicker from '../Datepicker';
import './step3.css';
import { FieldErrors, UseFormReturn } from 'react-hook-form';
import { DirectionType, FormType } from '../../utils/formTypes';
import useTransportationDates from '../../hooks/useTransportationDates';
import { useTranslation } from 'react-i18next';
import type { PostcodeRecord } from '../../utils/postcodes';
import type { DateOverride } from '../../utils/transportDates';

type TransportationDatesProps = {
  methods: UseFormReturn<FormType, any, undefined>;
  formErrors: FieldErrors<FormType>;
  direction: DirectionType;
  postcodeDetails: PostcodeRecord | null;
  dateOverrides: DateOverride[];
};

const TransportationDates = ({
  methods,
  formErrors,
  direction,
  postcodeDetails,
  dateOverrides,
}: TransportationDatesProps) => {
  const { setValue } = methods;

  const { t } = useTranslation();

  const service = methods.watch('service');

  const resetToDates = () => {
    setValue('dates.to.year', null);
    setValue('dates.to.month', null);
    setValue('dates.to.day', null);
  };

  const options = useTransportationDates({
    methods,
    direction,
    service,
    calendar: postcodeDetails?.calendar,
    overrides: dateOverrides,
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
        </div>
      </>
    </Step>
  );
};

export default TransportationDates;
