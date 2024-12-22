/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomInput from '../form/input/CustomInput';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { getError } from '../../utils/validation/getError';
import { useTranslation } from 'react-i18next';

type Props = {
  control: Control<FormType, any>;
  index: number;
  setValue: UseFormSetValue<FormType>;
  validationRules: Record<string, any>;
  formErrors: FieldErrors<FormType>;
  handleValidation: (field: string, value: string) => void;
  isError?: boolean;
};

const LengthInput = ({
  control,
  index,
  setValue,
  validationRules,
  formErrors,
  handleValidation,
  isError,
}: Props) => {
  const { t } = useTranslation();

  const onChange = (e: any) => {
    handleValidation('length', e.target.value);
  };

  return (
    <CustomInput
      name={`shipments.${index}.length`}
      control={control}
      placeholder={t('length')}
      type="number"
      onFocus={(e) => {
        const value = e.target.value;
        if (Number(value) === 0) {
          setValue(`shipments.${index}.length`, '');
        }
      }}
      onChange={onChange}
      rules={validationRules.shipments.length}
      errorMessage={getError(`shipments.${index}.length`, formErrors)}
      isError={isError}
    />
  );
};

export default LengthInput;
