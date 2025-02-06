import "../globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Header from "@/components/Header";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import SessionProvider from "@/components/SessionProvider";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="relative">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AntdRegistry>
            <SessionProvider>
              <Header />
              <main className="pt-16">{children}</main>
            </SessionProvider>
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
