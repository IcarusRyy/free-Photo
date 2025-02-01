"use client";
import { Button } from "antd";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">加载中...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-blue-50 to-white">
      {session ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">欢迎回来, {session.user.name}</h1>
          <p className="text-gray-600 mb-8">当前角色: {session.user.role}</p>
          <div className="space-y-4">
            <Button type="primary" size="large" onClick={() => router.push("/dashboard")}>
              进入控制台
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">欢迎来到管理系统</h1>
          <p className="text-gray-600 mb-8">高效的企业管理解决方案</p>
          <div className="space-x-4">
            <Link href="/login">
              <Button type="primary" size="large">
                登录系统
              </Button>
            </Link>
            <Link href="/register">
              <Button size="large">立即注册</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
