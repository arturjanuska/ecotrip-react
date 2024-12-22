/* eslint-disable @typescript-eslint/no-explicit-any */
import FieldContainer from '../layout/FieldContainer';
import { useTranslation } from 'react-i18next';
import ControlledStyledSelect from '../form/select/ControlledStyledSelect';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { OptionType } from '../../utils/types';
import { getError } from '../../utils/validation/getError';

type Props = {
  control: Control<FormType, any>;
  index: number;
  options: OptionType[];
  shipmentNumber: number;
  validationRules: Record<string, any>;
  formErrors: FieldErrors<FormType>;
  setValue: UseFormSetValue<FormType>;
};

const SizeSelect = ({
  control,
  index,
  shipmentNumber,
  validationRules,
  formErrors,
  setValue,
  options,
}: Props) => {
  const { t } = useTranslation();

  const name = `shipments.${index}.size`;

  return (
    <FieldContainer
      label={t('shipmentSizeFieldLabel', { number: shipmentNumber })}
    >
      <ControlledStyledSelect
        name={name}
        isClearable
        control={control}
        options={options}
        placeholder={t('shipmentSize')}
        onChange={() => {
          setValue(`shipments.${index}.specification`, null);
        }}
        rules={validationRules.shipments.size}
        errorMessage={getError(name, formErrors)}
      />
    </FieldContainer>
  );
};

export default SizeSelect;
