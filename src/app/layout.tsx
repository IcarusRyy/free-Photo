"use client";
// import Hyperspeed from "@/components/Hyperspeed";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { SessionProvider } from "next-auth/react";
import "../i18n";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="relative ">
        {/* <Hyperspeed className="fixed top-0 left-0 h-[100vh] w-full" /> */}

        <AntdRegistry>
          <SessionProvider>{children}</SessionProvider>
        </AntdRegistry>
        {/* <div className="h-[200px]">123</div> */}
      </body>
    </html>
  );
}
