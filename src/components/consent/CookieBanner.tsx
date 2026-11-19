import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useTranslation } from 'react-i18next';
import {
  closeCookieSettings,
  getSnapshot,
  openCookieSettings,
  saveChoice,
  subscribe,
} from '../../measurement/measurement';
import './cookieBanner.css';

const PRIVACY_URL = 'https://ecotrip.lt/privatumo-politika/';

const CookieBanner = () => {
  const { t } = useTranslation();
  const { choice, settingsOpen } = useSyncExternalStore(subscribe, getSnapshot);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [meta, setMeta] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (settingsOpen && !dialog.open) {
      setAnalytics(!!choice?.analytics);
      setMarketing(!!choice?.analytics && !!choice?.marketing);
      setMeta(!!choice?.meta);
      dialog.showModal();
    } else if (!settingsOpen && dialog.open) {
      dialog.close();
    }
    // choice is read only when the dialog opens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsOpen]);

  return (
    <>
      {!choice && (
        <section className="ecotrip-consent" aria-label={t('cookieTitle')}>
          <div className="ecotrip-consent__copy">
            <h2>{t('cookieTitle')}</h2>
            <p>{t('cookieIntro')}</p>
          </div>
          <div className="ecotrip-consent__actions">
            <button type="button" onClick={() => saveChoice(false, false, false)}>
              {t('cookieReject')}
            </button>
            <button
              type="button"
              className="ecotrip-consent__primary"
              onClick={() => saveChoice(true, true, true)}
            >
              {t('cookieAccept')}
            </button>
            <button type="button" onClick={openCookieSettings}>
              {t('cookieSettings')}
            </button>
          </div>
        </section>
      )}
      <dialog
        ref={dialogRef}
        className="ecotrip-consent-dialog"
        aria-labelledby="ecotrip-cookie-title"
        onClose={closeCookieSettings}
      >
        <div className="ecotrip-consent-dialog__header">
          <h2 id="ecotrip-cookie-title">{t('cookieTitle')}</h2>
          <button
            type="button"
            className="ecotrip-consent-dialog__close"
            aria-label={t('cookieClose')}
            onClick={closeCookieSettings}
          >
            ×
          </button>
        </div>
        <div className="ecotrip-consent-dialog__body">
          <p>{t('cookieIntro')}</p>
          <label className="ecotrip-consent-option">
            <input
              type="checkbox"
              name="analytics"
              checked={analytics}
              onChange={(e) => {
                setAnalytics(e.target.checked);
                if (!e.target.checked) setMarketing(false);
              }}
            />
            <span>
              <strong>{t('cookieAnalytics')}</strong>
              <span>{t('cookieAnalyticsText')}</span>
            </span>
          </label>
          <label className="ecotrip-consent-option">
            <input
              type="checkbox"
              name="marketing"
              checked={marketing}
              disabled={!analytics}
              onChange={(e) => setMarketing(e.target.checked)}
            />
            <span>
              <strong>{t('cookieMarketing')}</strong>
              <span>{t('cookieMarketingText')}</span>
            </span>
          </label>
          <label className="ecotrip-consent-option">
            <input
              type="checkbox"
              name="meta"
              checked={meta}
              onChange={(e) => setMeta(e.target.checked)}
            />
            <span>
              <strong>{t('cookieMeta')}</strong>
              <span>{t('cookieMetaText')}</span>
            </span>
          </label>
          <p className="ecotrip-consent__retention">{t('cookieRetention')}</p>
          <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
            {t('cookiePrivacy')}
          </a>
        </div>
        <div className="ecotrip-consent__actions">
          <button type="button" onClick={() => saveChoice(false, false, false)}>
            {t('cookieReject')}
          </button>
          <button
            type="button"
            className="ecotrip-consent__primary"
            onClick={() => saveChoice(analytics, marketing, meta)}
          >
            {t('cookieSave')}
          </button>
        </div>
      </dialog>
    </>
  );
};

export default CookieBanner;
