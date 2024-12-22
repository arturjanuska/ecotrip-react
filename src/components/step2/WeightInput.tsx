/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import FieldContainer from '../layout/FieldContainer';
import { useTranslation } from 'react-i18next';
import CustomInput from '../form/input/CustomInput';
import { getError } from '../../utils/validation/getError';

type Props = {
  shipmentNumber: number;
  control: Control<FormType, any>;
  index: number;
  formErrors: FieldErrors<FormType>;
  setValue: UseFormSetValue<FormType>;
  handleValidation: (name: string, value: string) => void;
  validationRules: Record<string, any>;
  selectedService: string;
  weight: number;
  errorMessages: Record<string, string>;
};

const WeightInput = ({
  shipmentNumber,
  control,
  index,
  formErrors,
  setValue,
  handleValidation,
  validationRules,
  selectedService,
  weight,
  errorMessages,
}: Props) => {
  const { t } = useTranslation();

  return (
    <FieldContainer
      label={t('shipmentWeightFieldLabel', {
        number: shipmentNumber,
      })}
      description={
        selectedService !== 'parcelForceShipment' && weight > 35
          ? t('parcelForceShipmentWeightWarningMessage')
          : t('shipmentApproximateWeightMessage')
      }
    >
      <CustomInput
        name={`shipments.${index}.weight`}
        control={control}
        placeholder={t('shipmentWeight')}
        type="number"
        max={1000}
        min={0}
        onFocus={(e) => {
          const value = e.target.value;
          if (Number(value) === 0) {
            setValue(`shipments.${index}.weight`, '');
          }
        }}
        rules={validationRules.shipments.weight}
        errorMessage={
          errorMessages.weight ||
          getError(`shipments.${index}.weight`, formErrors)
        }
        onChange={(e) => {
          handleValidation('weight', e.target.value);
        }}
        onBlur={(e) => {
          const value = parseInt((e.target as HTMLInputElement).value, 10) || 0;
          if (value > 1000) {
            setValue(`shipments.${index}.weight`, '1000');
          }
        }}
      />
    </FieldContainer>
  );
};

export default WeightInput;
