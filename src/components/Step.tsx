import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <section className={`step-columns ${className ? className : ''}`} id={id}>
      <div className="title-column">
        <p className="ecotrip-eyebrow step-marker">
          {String(step).padStart(2, '0')} / {t('stepLabel')}
        </p>
        <h2 className="step-title">{title}</h2>
        {instructions && <p className="instructions">{instructions}</p>}
      </div>
      <div className="content-column">{children}</div>
    </section>
  );
};

export default Step;
