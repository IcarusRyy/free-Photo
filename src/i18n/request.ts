import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
export default getRequestConfig(async ({ requestLocale }) => {
  // try {
  //   const messages = (await import(`@/messages/${locale}.json`)).default;
  //   return {
  //     messages,
  //   };
  // } catch (error) {
  //   return {
  //     messages: {},
  //   };
  // }
  let locale = await requestLocale;
  console.log(locale, "locale");
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return {
    messages,
  };
});
