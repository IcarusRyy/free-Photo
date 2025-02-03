export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const getLocaleFromPathname = (pathname: string): Locale => {
  const segments = pathname.split("/");
  const locale = segments[1] as Locale;
  return locales.includes(locale) ? locale : defaultLocale;
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
