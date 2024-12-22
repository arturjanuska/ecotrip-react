/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, UseFormSetValue } from 'react-hook-form';
import FieldContainer from '../layout/FieldContainer';
import { FormType } from '../../utils/formTypes';
import ControlledStyledSelect from '../form/select/ControlledStyledSelect';
import { useTranslation } from 'react-i18next';

type Props = {
  control: Control<FormType, any>;
  index: number;
  shipmentNumber: number;
  options: { label: string; value: string }[];
  selectedService: string;
  validationRules: Record<string, any>;
  setValue: UseFormSetValue<FormType>;
};

const CategorySelect = ({
  control,
  index,
  shipmentNumber,
  options,
  selectedService,
  validationRules,
  setValue,
}: Props) => {
  const { t } = useTranslation();

  const categoryOptions = options.map((option) => {
    if (
      option.value === 'shipments' &&
      selectedService === 'parcelForceShipment'
    ) {
      return {
        label: t('shipments'),
        value: 'shipments',
      };
    } else {
      return {
        label: t(option.label),
        value: option.value,
      };
    }
  });

  const onChange = () => {
    setValue(`shipments.${index}.productType`, null);
    setValue(`shipments.${index}.size`, null);
    setValue(`shipments.${index}.specification`, null);
    setValue(`shipments.${index}.amount`, 1);
    setValue(`shipments.${index}.estimatedPrice`, '0.00');
  };

  return (
    <FieldContainer
      label={t('shipmentLeftColumnLabel', { count: shipmentNumber })}
      description={t('shipmentLeftColumnDescription')}
      className="left-column-item"
    >
      <ControlledStyledSelect
        name={`shipments.${index}.category`}
        control={control}
        rules={validationRules.shipments.category}
        options={categoryOptions}
        isClearable
        placeholder={t('shipmentCategoryPlaceholder')}
        isDisabled={
          selectedService === 'parcelForceShipment' ||
          selectedService === 'shipmentWithAddressService' ||
          selectedService === 'productSalesService'
        }
        onChange={onChange}
      />
    </FieldContainer>
  );
};

export default CategorySelect;
