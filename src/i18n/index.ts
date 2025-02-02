import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en";
import zh from "./locales/zh";

const initI18n = () => {
  // 仅在客户端初始化
  if (typeof window !== "undefined") {
    i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources: {
          en: {
            translation: en,
          },
          zh: {
            translation: zh,
          },
        },
        fallbackLng: "zh",
        interpolation: {
          escapeValue: false,
        },
      });
  }
  return i18n;
};

export default initI18n();
