import React from 'react';
import '../styles/field-container.css';

type Props = {
  label?: string;
  children: React.ReactNode;
  description?: string;
  className?: string;
  width?: 'full' | 'half';
  instructions?: string;
};

const FieldContainer = ({
  label,
  children,
  description,
  className,
  instructions,
}: Props) => {
  return (
    <div className={`field-container ${className ? className : ''}`}>
      {instructions ? (
        <span className="instructions">{instructions}</span>
      ) : null}
      {label ? <label htmlFor="">{label}</label> : null}
      {children}
      {description ? <p>{description}</p> : null}
    </div>
  );
};

export default FieldContainer;
