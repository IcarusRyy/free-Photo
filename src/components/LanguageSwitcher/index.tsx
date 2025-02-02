"use client";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    // localStorage.setItem("i18nextLng", value);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Select
      value={i18n.language}
      onChange={handleChange}
      options={[
        { value: "zh", label: "中文" },
        { value: "en", label: "English" },
      ]}
    />
  );
}
