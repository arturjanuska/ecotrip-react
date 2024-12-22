/* eslint-disable @typescript-eslint/no-explicit-any */
import FieldContainer from '../layout/FieldContainer';
import { useTranslation } from 'react-i18next';
import CustomInput from '../form/input/CustomInput';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { getError } from '../../utils/validation/getError';

type Props = {
  shipmentNumber: number;
  control: Control<FormType, any>;
  index: number;
  formErrors: FieldErrors<FormType>;
  setValue: UseFormSetValue<FormType>;
  handleValidation: (name: string, value: string) => void;
  validationRules: Record<string, any>;
  errorMessages: Record<string, string>;
};

const ExtendInput = ({
  shipmentNumber,
  control,
  index,
  formErrors,
  setValue,
  handleValidation,
  validationRules,
  errorMessages,
}: Props) => {
  const { t } = useTranslation();

  const name = `shipments.${index}.extent` as keyof FormType;

  return (
    <FieldContainer
      label={t('extentFieldContainerLabel', {
        number: shipmentNumber,
      })}
    >
      <CustomInput
        name={name}
        control={control}
        type="number"
        onFocus={(e) => {
          const value = e.target.value;
          if (Number(value) === 0) {
            setValue(name, '');
          }
        }}
        placeholder={t('extent')}
        onChange={(e) => {
          handleValidation('extent', e.target.value);
        }}
        rules={validationRules.shipments.extent}
        errorMessage={errorMessages.extent || getError(name, formErrors)}
      />
    </FieldContainer>
  );
};

export default ExtendInput;
