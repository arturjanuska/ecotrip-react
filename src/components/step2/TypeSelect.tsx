/* eslint-disable @typescript-eslint/no-explicit-any */
import FieldContainer from '../layout/FieldContainer';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { useTranslation } from 'react-i18next';
import { OptionType } from '../../utils/types';
import ControlledStyledSelect from '../form/select/ControlledStyledSelect';
import { productTypesWithRequiredManagerCall } from '../../utils/shipmentsExlusions';
import { getError } from '../../utils/validation/getError';

type Props = {
  control: Control<FormType, any>;
  index: number;
  shipmentNumber: number;
  options: OptionType[];
  validationRules: Record<string, any>;
  formErrors: FieldErrors<FormType>;
  setValue: UseFormSetValue<FormType>;
  selectedProductTypeValue?: string;
};

const TypeSelect = ({
  control,
  index,
  shipmentNumber,
  options,
  validationRules,
  formErrors,
  setValue,
  selectedProductTypeValue,
}: Props) => {
  const { t } = useTranslation();

  return (
    <FieldContainer
      label={t('productTypeLabel', { count: shipmentNumber })}
      description={`${
        productTypesWithRequiredManagerCall.includes(
          selectedProductTypeValue ?? ''
        )
          ? t('wrongDirectionMessage1')
          : ''
      }`}
    >
      <ControlledStyledSelect
        name={`shipments.${index}.productType`}
        control={control}
        isClearable
        rules={validationRules.shipments.productType}
        errorMessage={getError(`shipments.${index}.productType`, formErrors)}
        options={options}
        placeholder={t('productTypeSelectPlaceholder')}
        onChange={() => {
          setValue(`shipments.${index}.size`, null);
          setValue(`shipments.${index}.specification`, null);
          setValue(`shipments.${index}.estimatedPrice`, '0.00');
        }}
      />
    </FieldContainer>
  );
};
export default TypeSelect;
