"use client";
import { useTranslation } from "react-i18next";
import { Select } from "antd";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

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
