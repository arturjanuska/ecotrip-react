/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next';
import CustomInput from '../form/input/CustomInput';
import { getError } from '../../utils/validation/getError';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';

type Props = {
  control: Control<FormType, any>;
  index: number;
  formErrors: FieldErrors<FormType>;
  setValue: UseFormSetValue<FormType>;
  handleValidation: (name: string, value: string) => void;
  validationRules: Record<string, any>;
  isError?: boolean;
};

const HeightInput = ({
  control,
  index,
  formErrors,
  setValue,
  handleValidation,
  validationRules,
  isError,
}: Props) => {
  const { t } = useTranslation();

  return (
    <CustomInput
      name={`shipments.${index}.height`}
      control={control}
      placeholder={t('height')}
      type="number"
      onFocus={(e) => {
        const value = e.target.value;
        if (Number(value) === 0) {
          setValue(`shipments.${index}.height`, '');
        }
      }}
      onChange={(e) => {
        handleValidation('height', e.target.value);
      }}
      rules={validationRules.shipments.height}
      errorMessage={getError(`shipments.${index}.height`, formErrors)}
      isError={isError}
    />
  );
};

export default HeightInput;
