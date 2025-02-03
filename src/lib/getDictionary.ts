import "server-only";
import type { Locale } from "@/config/i18n";

const dictionaries: Record<Locale, any> = {
  en: () => import("../app/[lang]/dictionaries/en.json").then((module) => module.default),
  zh: () => import("../app/[lang]/dictionaries/zh.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
