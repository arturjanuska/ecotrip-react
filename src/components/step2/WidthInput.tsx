/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomInput from '../form/input/CustomInput';
import { useTranslation } from 'react-i18next';
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

const WidthInput = ({
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
      name={`shipments.${index}.width`}
      control={control}
      placeholder={t('width')}
      type="number"
      onFocus={(e) => {
        const value = e.target.value;
        if (Number(value) === 0) {
          setValue(`shipments.${index}.width`, '');
        }
      }}
      onChange={(e) => {
        handleValidation('width', e.target.value);
      }}
      rules={validationRules.shipments.width}
      errorMessage={getError(`shipments.${index}.width`, formErrors)}
      isError={isError}
    />
  );
};

export default WidthInput;
