import React from 'react';
import { Controller } from 'react-hook-form';
import '../styles/textarea.css';

type CustomTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  name: string;
  control: any;
};

const CustomTextarea = ({
  label,
  name,
  control,
  placeholder,
  ...restProps
}: CustomTextareaProps) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className='custom-textarea'>
            {label && <label htmlFor={name}>{label}</label>}
            <textarea
              {...field}
              {...restProps}
              placeholder={placeholder}
              name={name}
            />
          </div>
        )}
      />
    </>
  );
};

export default CustomTextarea;
