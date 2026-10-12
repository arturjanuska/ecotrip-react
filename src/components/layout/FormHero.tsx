import { useTranslation } from 'react-i18next';
import '../../styles/form-hero.css';

// Dark opening band of the order form, in the ecotrip.lt hero style.
const FormHero = () => {
  const { t } = useTranslation();

  return (
    <section className="form-hero">
      <div className="form-hero__inner">
        <p className="ecotrip-eyebrow form-hero__marker">{t('heroEyebrow')}</p>
        <h1 className="form-hero__title">
          <span>{t('heroTitle')}</span>
          <span className="form-hero__accent">{t('heroAccent')}</span>
        </h1>
        <p className="form-hero__lead">{t('heroLead')}</p>
        <div className="form-hero__route" aria-hidden="true">
          <span className="form-hero__stop">LT</span>
          <span className="form-hero__line">
            <i />
          </span>
          <span className="form-hero__stop">UK</span>
        </div>
      </div>
    </section>
  );
};

export default FormHero;
