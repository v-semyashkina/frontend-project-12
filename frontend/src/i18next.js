import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './locales/index.js';

i18next
  .use(initReactI18next)
  // .use(LanguageDetector) // с помощью плагина определяем язык пользователя в браузере
  .init({
    resources, // передаем переводы текстов интерфейса в формате JSON
    fallbackLng: 'ru', // если переводы на языке пользователя недоступны, то будет использоваться язык, указанный в этом поле
    interpolation: {
      escapeValue: false, // экранирование уже есть в React, поэтому отключаем
    },
    debug: true,
  });

export default i18next;
