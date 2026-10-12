/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import Select, { Props } from 'react-select';
import { forwardRef } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { FormType } from '../../../utils/formTypes';
import SimpleTextError from '../error/SimpleTextError';
import { getSelectStyles } from './selectStyles';

// @ts-ignore
const ControlledStyledSelect: React.ForwardRefExoticComponent<
  Props & {
    label?: string;
    errorMessage?: string;
    name: string;
    control: Control<FormType>;
    onChange?: (value: any) => void;
    needMargin?: boolean;
    rules?:
      | Omit<
          RegisterOptions<FormType, keyof FormType>,
          'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
        >
      | undefined;
  } & React.RefAttributes<any>
> = forwardRef(
  (
    props: Props & {
      label?: string;
      errorMessage?: string;
      name: string;
      control: Control<FormType>;
      onChange?: (value: any) => void;
      needMargin?: boolean;
      rules?:
        | Omit<
            RegisterOptions<FormType, keyof FormType>,
            'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
          >
        | undefined;
    },
    ref: any
  ) => {
    return (
      <>
        <Controller
          name={props.name as keyof FormType}
          control={props.control}
          rules={props.rules}
          render={({ field }) => {
            const handleChange = (value: any) => {
              props.onChange?.(value);
              field.onChange(value);
            };
            return (
              <div
                className="w-100"
                style={
                  props.needMargin
                    ? {
                        marginBottom: '10px',
                      }
                    : {}
                }
              >
                <Select
                  {...field}
                  {...props}
                  styles={getSelectStyles({
                    hasError: !!props.errorMessage,
                  })}
                  ref={ref}
                  placeholder={props.placeholder}
                  aria-label={`${props.name}`}
                  onChange={handleChange}
                />
              </div>
            );
          }}
        />
        <SimpleTextError message={props.errorMessage} />
      </>
    );
  }
);

export default ControlledStyledSelect;
