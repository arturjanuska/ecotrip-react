/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomInput from '../form/input/CustomInput';
import { getError } from '../../utils/validation/getError';
import { useTranslation } from 'react-i18next';
import { FormType } from '../../utils/formTypes';
import { Control, FieldErrors } from 'react-hook-form';

type Props = {
  control: Control<FormType>;
  index: number;
  formErrors: FieldErrors<FormType>;
  handleValidation: (name: string, value: string) => void;
  validationRules: Record<string, any>;
};

const OrderedShipmentNumberInput = ({
  control,
  index,
  formErrors,
  handleValidation,
  validationRules,
}: Props) => {
  const { t } = useTranslation();

  return (
    <CustomInput
      name={`shipments.${index}.orderedShipmentNumber`}
      control={control}
      placeholder={t('orderedShipmentNumber')}
      onChange={(e) => {
        handleValidation('orderedShipmentNumber', e.target.value);
      }}
      rules={validationRules.shipments.orderedShipmentNumber}
      errorMessage={getError(
        `shipments.${index}.orderedShipmentNumber`,
        formErrors
      )}
    />
  );
};

export default OrderedShipmentNumberInput;
