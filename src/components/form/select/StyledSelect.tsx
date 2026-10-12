/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import Select, { Props } from 'react-select';
import { forwardRef } from 'react';
import SimpleTextError from '../error/SimpleTextError';
import { getSelectStyles } from './selectStyles';

const StyledSelect: React.ForwardRefExoticComponent<
  Props & {
    label?: string;
    testId?: string;
    errorMessage?: string;
  } & React.RefAttributes<Select>
> = forwardRef<
  Select,
  Props & {
    label?: string;
    testId?: string;
    errorMessage?: string;
  }
>(
  (
    props: Props & {
      label?: string;
      testId?: string;
      errorMessage?: string;
    },
    ref: React.Ref<Select>
  ) => {
    return (
      <div className="w-100">
        <Select
          styles={getSelectStyles({ hasError: !!props.errorMessage })}
          // @ts-ignore
          ref={ref}
          placeholder={false}
          {...props}
          aria-label={`${props.name}`}
        />
        <SimpleTextError message={props.errorMessage} />
      </div>
    );
  }
);

export default StyledSelect;
