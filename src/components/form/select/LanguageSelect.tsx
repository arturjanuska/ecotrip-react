/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useId, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormType } from '../../../utils/formTypes';
import useTranslateParcelData from '../../../hooks/useTranslateParcelData';
import useTranslatePayerInformation from '../../../hooks/useTranslatePayerInformation';
import '../../../styles/language-switch.css';

type Languages = 'lt' | 'en' | 'ru';

const LANGUAGES: { value: Languages; label: string }[] = [
  { value: 'lt', label: 'Lietuvių' },
  { value: 'en', label: 'English' },
  { value: 'ru', label: 'Русский' },
];

// Language switch as in the ecotrip.lt header: code and chevron, dark panel.
const LanguageSelect = ({
  methods,
}: {
  methods: UseFormReturn<FormType, any, undefined>;
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const current =
    LANGUAGES.find((language) => language.value === i18n.language) ??
    LANGUAGES[1];

  const onLanguageChange = (value: Languages) => {
    localStorage.setItem('lang', value);
    i18n.changeLanguage(value);
    setIsOpen(false);
    toggleRef.current?.focus();
  };

  // React 18 has no `inert` prop: set it by hand so a closed panel is not tabbable.
  useEffect(() => {
    panelRef.current?.toggleAttribute('inert', !isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  useTranslateParcelData({
    currentLanguage: i18n.language,
    methods,
  });

  useTranslatePayerInformation({
    currentLanguage: i18n.language,
    methods,
  });

  return (
    <div className="language-switch" ref={rootRef}>
      <button
        ref={toggleRef}
        type="button"
        className="language-switch__toggle"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={`${current.value.toUpperCase()} · ${current.label}`}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{current.value.toUpperCase()}</span>
        <i aria-hidden="true" />
      </button>
      <div
        ref={panelRef}
        id={panelId}
        className={`language-switch__panel ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
      >
        {LANGUAGES.map((language) => (
          <button
            key={language.value}
            type="button"
            lang={language.value}
            aria-current={language.value === current.value ? 'true' : undefined}
            onClick={() => onLanguageChange(language.value)}
          >
            <span>{language.value.toUpperCase()}</span>
            <small>{language.label}</small>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelect;
