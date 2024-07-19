import React from 'react';
import '../styles/input.css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isError: boolean;
};

const UncontrolledInput = ({ isError, ...props }: InputProps) => {
  return (
    <div className={`input-container ${isError ? 'error-input' : ''}`}>
      <input {...props}></input>
    </div>
  );
};

export default UncontrolledInput;
