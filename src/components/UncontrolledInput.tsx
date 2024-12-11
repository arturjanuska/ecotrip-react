import React from "react";
import "../styles/input.css";
import SimpleTextError from "./SimpleTextError";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isError: boolean;
  errorMessage?: string;
};

const UncontrolledInput = ({ isError, errorMessage, ...props }: InputProps) => {
  return (
    <>
      <div className={`input-container ${isError ? "error-input" : ""}`}>
        <input {...props}></input>
      </div>
      <SimpleTextError message={errorMessage} />
    </>
  );
};

export default UncontrolledInput;
