import React from 'react';
import '../styles/step.css';

type Props = {
  id?: string;
  title: string;
  step: number;
  children: React.ReactNode;
  className?: string;
  instructions?: string;
};

const Step = ({
  title,
  step,
  children,
  className,
  id,
  instructions,
}: Props) => {
  const stepTitle = `${step}. ${title}`;

  return (
    <div className={`step-columns ${className ? className : ''}`} id={id}>
      <div className='title-column'>
        <span>{stepTitle}</span>
        {instructions && <span className='instructions'>{instructions}</span>}
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <div className='content-column'>{children}</div>
      </div>
    </div>
  );
};

export default Step;
