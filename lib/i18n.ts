import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import termsEn from '../public/locales/en/terms.json';
import translationEN from '../public/locales/en/translation.json';
import termsSv from '../public/locales/sv/terms.json';
import translationSV from '../public/locales/sv/translation.json';

// === Get language from the localStrorage ===
const savedLanguage =
  typeof window !== 'undefined' ? localStorage.getItem('language') : null;

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
      terms: termsEn,
    },
    sv: {
      translation: translationSV,
      terms: termsSv,
    },
  },
  lng: savedLanguage ?? 'en',
  fallbackLng: 'en',
  ns: ['translation', 'terms'],
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
