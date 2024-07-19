import React from 'react';
import '../styles/input.css';
import { Control, Controller } from 'react-hook-form';
import { FormType } from '../utils/formTypes';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  control: Control<FormType, any>;
};

const CustomInput = ({ name, control, ...props }: InputProps) => {
  return (
    <>
      <Controller
        name={name as keyof FormType}
        control={control}
        render={({ field }) => (
          <div className='input-container'>
            <input {...field} {...props} />
          </div>
        )}
      />
    </>
  );
};

export default CustomInput;
