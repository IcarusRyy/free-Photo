import { usePathname } from "next/navigation";

export const handleConstantsUrl = (url: string) => {
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1];
  return `/${currentLocale}` + url;
};
