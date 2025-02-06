"use client";
// import Hyperspeed from "@/components/Hyperspeed";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="relative">
        <AntdRegistry>
          <SessionProvider>
            <Header />
            <main className="pt-16">{children}</main>
          </SessionProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
