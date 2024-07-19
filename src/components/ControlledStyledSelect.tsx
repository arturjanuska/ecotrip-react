import Select, { Props } from 'react-select';
import React, { forwardRef } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormType } from '../utils/formTypes';

const customStyles = {
  // @ts-ignore
  placeholder: (provided, state) => ({
    ...provided,
    color: '#7a777680',
    fontFamily: 'Arial',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '16.1px',
    textAlign: 'left',
  }),
  // @ts-ignore
  option: (provided, state) => ({
    ...provided,
    color: '#7a7776',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '16.1px',
    textAlign: 'left',
  }),
  // @ts-ignore
  singleValue: (provided, state) => ({
    ...provided,
    color: '#7a7776',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '16.1px',
    textAlign: 'left',
  }),
  // @ts-ignore
  valueContainer: (provided, state) => ({
    ...provided,
  }),
  // @ts-ignore
  control: (provided, state) => ({
    ...provided,
    border: '1px solid #0000001A',
    '&:hover': {
      border: state.isFocused ? '1px solid #9aa61e' : '1px solid #0000001A',
    },
    '&:focus-within': {
      border: '1px solid #9aa61e',
      boxShadow: 'none',
    },
  }),
};

const ControlledStyledSelect = forwardRef(
  (
    props: Props & {
      label?: string;
      errorMessage?: string;
      name: string;
      control: Control<FormType>;
    },
    ref: any
  ) => {
    return (
      <>
        <Controller
          name={props.name as keyof FormType}
          control={props.control}
          render={({ field }) => {
            return (
              <div className='w-100'>
                <Select
                  {...field}
                  {...props}
                  styles={customStyles}
                  ref={ref}
                  placeholder={props.placeholder}
                  aria-label={`${props.name}`}
                />
              </div>
            );
          }}
        />
        {/* <SimpleTextError message={props.errorMessage} /> */}
      </>
    );
  }
);

export default ControlledStyledSelect;
