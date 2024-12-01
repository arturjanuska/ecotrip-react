import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ltLang from './locales/lt/lt.json';
import enLang from './locales/en/en.json';
import ruLang from './locales/ru/ru.json';

const initialLanguage = localStorage.getItem('lang') || 'en';

i18n.use(initReactI18next).init({
  lng: initialLanguage,
  resources: {
    lt: {
      translation: ltLang,
    },
    en: {
      translation: enLang,
    },
    ru: {
      translation: ruLang,
    },
  },
  fallbackLng: 'en',
  supportedLngs: ['en', 'lt', 'ru'],

  interpolation: {
    escapeValue: false,
  },
});
