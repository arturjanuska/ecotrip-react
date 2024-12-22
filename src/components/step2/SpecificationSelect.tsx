/* eslint-disable @typescript-eslint/no-explicit-any */
import FieldContainer from '../layout/FieldContainer';
import { useTranslation } from 'react-i18next';
import ControlledStyledSelect from '../form/select/ControlledStyledSelect';
import { getError } from '../../utils/validation/getError';
import { OptionType } from '../../utils/types';
import { Control, FieldErrors } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';

type Props = {
  control: Control<FormType, any>;
  index: number;
  shipmentNumber: number;
  options: OptionType[];
  validationRules: Record<string, any>;
  formErrors: FieldErrors<FormType>;
};

const SpecificationSelect = ({
  control,
  index,
  shipmentNumber,
  options,
  validationRules,
  formErrors,
}: Props) => {
  const { t } = useTranslation();

  return (
    <FieldContainer
      label={t('shipmentSpecificationFieldLabel', {
        number: shipmentNumber,
      })}
    >
      <ControlledStyledSelect
        name={`shipments.${index}.specification`}
        isClearable
        control={control}
        options={options}
        placeholder={t('shipmentSpecification')}
        rules={validationRules.shipments.specification}
        errorMessage={getError(`shipments.${index}.specification`, formErrors)}
      />
    </FieldContainer>
  );
};

export default SpecificationSelect;
