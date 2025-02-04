"use client";
import { usePathname, useRouter } from "next/navigation";
import { Select } from "antd";
import { locales } from "@/config/i18n";
import { useGlobalStore } from "@/store/useGlobalStore";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const setLoading = useGlobalStore((state) => state.setLoading);

  const handleChange = async (newLocale: string) => {
    try {
      setLoading(true);
      const segments = pathname.split("/");
      const currentScrollPosition = window.scrollY;
      segments[1] = newLocale;

      await router.replace(segments.join("/"), {
        scroll: false,
      });

      // 保持滚动位置
      window.scrollTo(0, currentScrollPosition);
    } finally {
      // 给一个短暂的延迟以确保内容加载完成
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
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
