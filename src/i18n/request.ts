import { getRequestConfig } from "next-intl/server";
import { locales } from "./settings";

export default getRequestConfig(async ({ locale }) => {
  try {
    const messages = (await import(`@/messages/${locale}.json`)).default;
    return {
      messages,
    };
  } catch (error) {
    return {
      messages: {},
    };
  }
});
