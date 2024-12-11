import React from "react";
import "../styles/buttons.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const PrimaryButton = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`btn primary-button ${props.className ? props.className : ""}${
        props.disabled ? "disabled" : ""
      }`}
    >
      <span>{props.children}</span>
    </button>
  );
};

export default PrimaryButton;
