import "../globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import SessionProvider from "@/components/Providers/SessionProvider";
import { locales } from "@/config/i18n";
import Header from "@/components/Header";
import GlobalLoading from "@/components/GlobalLoading";

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
  return (
    <html lang={lang}>
      <body className="relative">
        <SessionProvider>
          <AntdRegistry>
            <GlobalLoading />
            <Header />
            <main className="pt-16">{children}</main>
          </AntdRegistry>
        </SessionProvider>
      </body>
    </html>
  );
}
