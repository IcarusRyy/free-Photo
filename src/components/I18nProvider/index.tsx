"use client";
import { useEffect, useState } from "react";
import i18n from "i18next";
import "../../i18n";
import { I18nextProvider } from "react-i18next";

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 从localStorage获取保存的语言设置
    const savedLanguage = localStorage.getItem("i18nextLng");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
    setMounted(true);
  }, []);

  // 监听语言变化并保存到localStorage
  // useEffect(() => {
  //   const handleLanguageChanged = (lng: string) => {
  //     setCurrentLanguage(lng);
  //   };

  //   i18n.on("languageChanged", handleLanguageChanged);
  //   return () => {
  //     i18n.off("languageChanged", handleLanguageChanged);
  //   };
  // }, []);

  if (!mounted) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
