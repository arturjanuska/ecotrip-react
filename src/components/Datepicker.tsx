import StyledSelect from './StyledSelect';
import FieldContainer from './FieldContainer';
import ControlledStyledSelect from './ControlledStyledSelect';
import { Control, UseFormSetValue } from 'react-hook-form';
import { FormType } from '../utils/formTypes';
import { OptionType } from '../utils/types';

type Props = {
  fiedsDisabled: boolean;
  label: string;
  options?: {
    years: { label: string; value: string }[];
    months: { label: string; value: string }[];
    days: { label: string; value: string }[];
  };
  className?: string;
  control: Control<FormType, any>;
  name: string;
};

const Datepicker = ({
  fiedsDisabled,
  label,
  options,
  className,
  control,
  name,
}: Props) => {
  return (
    <FieldContainer label={label} className={className}>
      <div className='date-picker-wrapper'>
        <div
          style={{
            flex: '1 1 0%',
          }}
        >
          <ControlledStyledSelect
            placeholder='YYYY'
            options={options?.years || []}
            isDisabled={fiedsDisabled}
            control={control}
            name={`dates.${name}.year`}
          />
        </div>
        <div
          style={{
            flex: '1 1 0%',
          }}
        >
          <ControlledStyledSelect
            placeholder='MM'
            options={options?.months || []}
            isDisabled={fiedsDisabled}
            control={control}
            name={`dates.${name}.month`}
          />
        </div>
        <div
          style={{
            flex: '1 1 0%',
          }}
        >
          <ControlledStyledSelect
            placeholder='DD'
            options={options?.days || []}
            isDisabled={fiedsDisabled}
            control={control}
            name={`dates.${name}.day`}
          />
        </div>
      </div>
    </FieldContainer>
  );
};

export default Datepicker;
