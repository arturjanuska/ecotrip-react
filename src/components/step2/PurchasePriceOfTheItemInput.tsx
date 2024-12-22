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
  handleValidation: (name: string, value: string) => void;
  validationRules: Record<string, any>;
  setValue: UseFormSetValue<FormType>;
};

const PurchasePriceOfTheItemInput = ({
  control,
  index,
  formErrors,
  handleValidation,
  validationRules,
  setValue,
}: Props) => {
  const { t } = useTranslation();

  return (
    <CustomInput
      name={`shipments.${index}.purchasePriceOfTheItem`}
      control={control}
      placeholder={t('purchasePriceOfTheItem')}
      type="number"
      onFocus={(e) => {
        const value = e.target.value;
        if (Number(value) === 0) {
          setValue(`shipments.${index}.purchasePriceOfTheItem`, '');
        }
      }}
      onChange={(e) => {
        handleValidation('purchasePriceOfTheItem', e.target.value);
      }}
      rules={validationRules.shipments.purchasePriceOfTheItem}
      errorMessage={getError(
        `shipments.${index}.purchasePriceOfTheItem`,
        formErrors
      )}
    />
  );
};

export default PurchasePriceOfTheItemInput;
