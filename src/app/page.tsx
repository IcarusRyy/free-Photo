"use client";
import { Button } from "antd";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Hyperspeed from "@/components/Hyperspeed";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">加载中...</div>;
  }

  return (
    <div className="relative h-screen ">
      {/* 第一屏 */}
      <Hyperspeed className="absolute inset-0" />
      <div className="h-[100vh] w-[0]"></div>
      {/* 第二屏 */}
      <div className=" z-10 h-full flex items-center justify-center flex-col">
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
      {/* 第三屏及后续内容 */}
      <div className=" bg-white text-black p-8">
        <h2 className="text-3xl font-bold mb-6">系统特点</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">高效管理</h3>
            <p>提供直观的界面和强大的功能，让管理变得简单高效。</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">数据安全</h3>
            <p>采用先进的加密技术，确保您的数据安全。</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">实时分析</h3>
            <p>提供实时数据分析和可视化报表，助您做出明智决策。</p>
          </div>
        </div>
      </div>
      <div className=" bg-white text-black p-8">
        <h2 className="text-3xl font-bold mb-6">系统特点</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">高效管理</h3>
            <p>提供直观的界面和强大的功能，让管理变得简单高效。</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">数据安全</h3>
            <p>采用先进的加密技术，确保您的数据安全。</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">实时分析</h3>
            <p>提供实时数据分析和可视化报表，助您做出明智决策。</p>
          </div>
        </div>
      </div>
      <div className=" bg-white text-black p-8">
        <h2 className="text-3xl font-bold mb-6">系统特点</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">高效管理</h3>
            <p>提供直观的界面和强大的功能，让管理变得简单高效。</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">数据安全</h3>
            <p>采用先进的加密技术，确保您的数据安全。</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">实时分析</h3>
            <p>提供实时数据分析和可视化报表，助您做出明智决策。</p>
          </div>
        </div>
      </div>
      <div className=" bg-white text-black p-8">
        <h2 className="text-3xl font-bold mb-6">系统特点</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">高效管理</h3>
            <p>提供直观的界面和强大的功能，让管理变得简单高效。</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">数据安全</h3>
            <p>采用先进的加密技术，确保您的数据安全。</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">实时分析</h3>
            <p>提供实时数据分析和可视化报表，助您做出明智决策。</p>
          </div>
        </div>
      </div>
      <div className=" bg-white text-black p-8">
        <h2 className="text-3xl font-bold mb-6">系统特点</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">高效管理</h3>
            <p>提供直观的界面和强大的功能，让管理变得简单高效。</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">数据安全</h3>
            <p>采用先进的加密技术，确保您的数据安全。</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">实时分析</h3>
            <p>提供实时数据分析和可视化报表，助您做出明智决策。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
