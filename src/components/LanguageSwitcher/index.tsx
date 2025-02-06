"use client";
import { Select } from "antd";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (value: string) => {
    // i18n.changeLanguage(value);
    // localStorage.setItem("i18nextLng", value);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Select
      value={"en"}
      onChange={handleChange}
      options={[
        { value: "zh", label: "中文" },
        { value: "en", label: "English" },
      ]}
    />
  );
}
