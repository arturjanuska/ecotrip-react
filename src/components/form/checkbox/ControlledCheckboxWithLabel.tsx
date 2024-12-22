/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { CSSProperties } from 'react';
import { Controller, RegisterOptions } from 'react-hook-form';
import SimpleTextError from '../error/SimpleTextError';
import { FormType } from '../../../utils/formTypes';
import '../../../styles/checkbox.css';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  children: React.ReactNode | Element;
  className?: string;
  style?: CSSProperties;
  name: keyof FormType;
  control: any;
  errorMessage?: string;
  rules?:
    | Omit<
        RegisterOptions<FormType, keyof FormType>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;
};

const ControlledCheckboxWithLabel = ({
  children,
  className,
  style,
  name,
  control,
  errorMessage,
  rules,
  ...rest
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        return (
          <>
            <div
              className={`form-control ${className ? className : ''}`}
              style={style}
            >
              <label className="label cursor-pointer">
                <input
                  {...field}
                  {...rest}
                  type="checkbox"
                  className={`checkbox checkbox-primary ${
                    errorMessage ? 'error' : ''
                  }`}
                  // @ts-ignore
                  checked={field.value ?? false}
                />
                <div className="custom-label-text">{children}</div>
              </label>
            </div>
            <SimpleTextError message={errorMessage} textAlign="right" />
          </>
        );
      }}
    />
  );
};

export default ControlledCheckboxWithLabel;
