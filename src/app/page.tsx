// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       123
//     </div>
//   );
// }

"use client";
import { Button } from "antd";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl mb-8">欢迎来到管理系统</h1>
      <div className="space-x-4">
        <Link href="/login">
          <Button type="primary">登录</Button>
        </Link>
        <Link href="/register">
          <Button>注册</Button>
        </Link>
      </div>
    </div>
  );
}
