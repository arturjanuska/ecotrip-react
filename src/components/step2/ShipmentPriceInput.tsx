/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomInput from '../form/input/CustomInput';
import { getError } from '../../utils/validation/getError';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { useTranslation } from 'react-i18next';

type Props = {
  control: Control<FormType>;
  index: number;
  formErrors: FieldErrors<FormType>;
  validationRules: Record<string, any>;
  setShipmentPriceError: (value: string) => void;
  setValue: UseFormSetValue<FormType>;
};

const ShipmentPriceInput = ({
  control,
  index,
  formErrors,
  validationRules,
  setShipmentPriceError,
  setValue,
}: Props) => {
  const { t } = useTranslation();

  const name = `shipments.${index}.shipmentPrice` as keyof FormType;

  return (
    <CustomInput
      name={name}
      control={control}
      placeholder={t('enterShipmentPrice')}
      type="number"
      onFocus={(e) => {
        const value = e.target.value;
        if (Number(value) === 0) {
          setValue(name, '');
        }
      }}
      onChange={(e) => {
        if (Number(e.target.value) >= 250) {
          setShipmentPriceError(t('shipmentPriceFieldErrorMessage'));
        } else {
          setShipmentPriceError('');
        }
      }}
      rules={validationRules.shipments.shipmentPrice}
      errorMessage={getError(name, formErrors)}
    />
  );
};

export default ShipmentPriceInput;
