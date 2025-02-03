"use client";
import { usePathname, useRouter } from "next/navigation";
import { Select } from "antd";
import { locales } from "@/config/i18n";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (newLocale: string) => {
    const segments = pathname.split("/");
    const currentScrollPosition = window.scrollY;
    segments[1] = newLocale;

    // 使用 replace 而不是 push，这样不会创建新的历史记录
    router.replace(segments.join("/"), {
      scroll: false, // 防止滚动重置
    });

    // 确保在路由变化后保持滚动位置
    window.scrollTo(0, currentScrollPosition);
  };

  const currentLocale = pathname.split("/")[1];

  return (
    <Select
      value={currentLocale}
      onChange={handleChange}
      options={[
        { value: "zh", label: "中文" },
        { value: "en", label: "English" },
      ]}
    />
  );
}
