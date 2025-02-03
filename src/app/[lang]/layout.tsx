// "use client";
// import Hyperspeed from "@/components/Hyperspeed";
import "../globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import SessionProvider from "@/components/Providers/SessionProvider";
import { locales } from "@/config/i18n";
import { getDictionary } from "@/lib/getDictionary";
import Header from "@/components/Header";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dict = await getDictionary(lang as "en" | "zh");

  return (
    <html lang={lang}>
      <body className="relative">
        {/* <Hyperspeed className="fixed top-0 left-0 h-[100vh] w-full" /> */}

        <SessionProvider>
          <AntdRegistry>
            <Header />
            <main className="pt-16">{children}</main>
          </AntdRegistry>
        </SessionProvider>
        {/* <div className="h-[200px]">123</div> */}
      </body>
    </html>
  );
}
