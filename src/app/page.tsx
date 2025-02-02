"use client";
import { Button } from "antd";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Hyperspeed from "@/components/Hyperspeed";
import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import WaveButton from "@/components/BaseComp";
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useTranslation();

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">加载中...</div>;
  }

  return (
    <div className="relative h-screen ">
      {/* 第一屏 */}
      <Hyperspeed className={classNames("absolute  inset-0", "h-[calc(100vh-64px)]")} />
      <div className="absolute top-[35%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <WaveButton
          onClick={() => router.push("/profile")}
          className="
            flex-1"
        >
          <Trans>Join the Cyberpunk Plan</Trans>
        </WaveButton>
      </div>
      <div className="h-[100vh] w-[0]"></div>
      {/* 第二屏 */}
      <div className=" z-10 h-full flex  justify-center ">
        {session ? (
          <div className="text-center h-full w-full">
            <h1 className="text-4xl font-bold mb-4 text-gray-800 !text-[red] ">
              <Trans>Welcome back</Trans>, {session.user.name}
            </h1>
            <p className="text-gray-600 mb-8">
              <Trans>Current role</Trans>: {session.user.role}
            </p>
            <div className="space-y-4">
              <Button type="primary" size="large" onClick={() => router.push("/dashboard")}>
                <Trans>Enter the control panel</Trans>
              </Button>
              <Button type="primary" size="large" onClick={() => router.push("/profile")}>
                <Trans>Enter the personal center</Trans>
              </Button>
              <Button type="primary" size="large" onClick={() => router.push("/vip")}>
                <Trans>Enter the VIP center</Trans>
              </Button>
              <Button type="primary" size="large" onClick={() => router.push("/vip")}>
                {t("common.logout")}
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
