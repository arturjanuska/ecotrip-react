import React, { CSSProperties } from 'react';
import { Controller } from 'react-hook-form';
import '../styles/checkbox.css';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  children: React.ReactNode | Element;
  className?: string;
  style?: CSSProperties;
  name: string;
  control: any;
};

const ControlledCheckboxWithLabel = ({
  children,
  className,
  style,
  name,
  control,
  ...rest
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div
            className={`form-control ${className ? className : ''}`}
            style={style}
          >
            <label className='label cursor-pointer'>
              <input
                {...field}
                {...rest}
                type='checkbox'
                className='checkbox checkbox-primary'
                checked={field.value} // Ensure the checkbox is controlled by react-hook-form
              />
              <div className='custom-label-text'>{children}</div>
            </label>
          </div>
        );
      }}
    />
  );
};

export default ControlledCheckboxWithLabel;
