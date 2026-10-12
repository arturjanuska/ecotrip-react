import React from 'react';
import '../../styles/buttons.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

// The main action: brand green pill with the arrow.
const SecondaryButton = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`btn secondary-button ${props.className ? props.className : ''} ${
        props.disabled ? 'disabled' : ''
      }`}
    >
      <span>{props.children}</span>
      <span className="ecotrip-arrow ecotrip-arrow--right" aria-hidden="true" />
    </button>
  );
};

export default SecondaryButton;
