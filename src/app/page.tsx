"use client";
import { Button } from "antd";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Hyperspeed from "@/components/Hyperspeed/index";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">加载中...</div>;
  }

  return (
    <div className="relative  ">
      {/* Hyperspeed背景 */}
      <div className="z-[1] h-full w-full ">
        {session ? (
          <div className="text-center h-full w-full">
            <h1 className="text-4xl font-bold mb-4 text-gray-800 !text-[red] ">欢迎回来, {session.user.name}</h1>
            <p className="text-gray-600 mb-8">当前角色: {session.user.role}</p>
            <div className="space-y-4">
              <Button type="primary" size="large" onClick={() => router.push("/dashboard")}>
                进入控制台
              </Button>
              <Button type="primary" size="large" onClick={() => router.push("/profile")}>
                进入个人中心
              </Button>
              <Button type="primary" size="large" onClick={() => router.push("/vip")}>
                进入VIP中心
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
    </div>
  );
}
