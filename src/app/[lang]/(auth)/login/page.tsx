import { isValidLocale } from "@/config/i18n";
import LoginForm from "@/components/LoginForm";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import styles from "./login.module.scss";
import { getDictionary } from "@/lib/getDictionary";

export default async function LoginPage({ params: { lang } }: { params: { lang: string } }) {
  if (!isValidLocale(lang)) {
    throw new Error("Invalid locale");
  }

  const dictionary = await getDictionary(lang);

  return (
    <div className={styles.loginContainer}>
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <LoginForm dictionary={dictionary.auth.login} locale={lang} />
    </div>
  );
}
