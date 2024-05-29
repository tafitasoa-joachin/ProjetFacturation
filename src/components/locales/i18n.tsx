import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from "../locales/en.json";
import translationFr from "../locales/fr.json";

export const resources = {
  en: {
    translation: translationEn,
  },
  fr: {
    translation: translationFr
  }
}


i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  }
})