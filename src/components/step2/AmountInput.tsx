/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FieldContainer from '../layout/FieldContainer';
import { useTranslation } from 'react-i18next';
import CustomInput from '../form/input/CustomInput';
import { getError } from '../../utils/validation/getError';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { OptionType } from '../../utils/types';

type Props = {
  shipmentNumber: number;
  control: Control<FormType>;
  index: number;
  formErrors: FieldErrors<FormType>;
  validationRules: Record<string, any>;
  setValue: UseFormSetValue<FormType>;
  selectedCategory: OptionType | null;
};

const AmountInput = ({
  shipmentNumber,
  control,
  index,
  formErrors,
  validationRules,
  setValue,
  selectedCategory,
}: Props) => {
  const { t } = useTranslation();

  if (!selectedCategory?.value) {
    return null;
  }

  return (
    <FieldContainer
      label={t('shipmentPriceFieldContainerLabel', {
        number: shipmentNumber,
      })}
      description={`${
        selectedCategory.value === 'palettes' ? t('wrongDirectionMessage1') : ''
      }`}
    >
      <CustomInput
        name={`shipments.${index}.amount`}
        type="number"
        control={control}
        placeholder={t('shipmentAmount')}
        defaultValue={1}
        onBlur={(e) => {
          // @ts-ignore
          const value = e.target?.value as unknown as string;
          if (!value) {
            setValue(`shipments.${index}.amount`, 1);
          }
        }}
        rules={validationRules.shipments.amount}
        errorMessage={getError(`shipments.${index}.amount`, formErrors)}
      />
    </FieldContainer>
  );
};

export default AmountInput;
