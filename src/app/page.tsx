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
      <Hyperspeed className={classNames("absolute  inset-0", "!h-[calc(100vh-64px)]")} />
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
      <div className="py-10 sm:py-16 sm:px-16 bg-[#F1F1F1] flex flex-col md:flex-row border-b border-[#D1D3D6] px-4 text-black">
        <div className="md:w-2/5 md:order-1 md:pl-8 flex flex-col justify-center mb-4 md:mb-0">
          <div className="mb-4">
            <div un-sm="text-3xl" className="text-xl font-semibold leading-none tracking-tight">
              <h2 className="my-0">
                <Trans>Video to Animation</Trans>
              </h2>
            </div>
          </div>
          <div className="mb-4">
            <div un-sm="text-xl" className="text-lg mb-6">
              <Trans>
                Breathe new artistic life into your videos! Our AI video-to-animation tool opens a world of creative
                possibilities: choose from over 30 meticulously crafted artistic styles and watch as your ordinary
                footage transforms into stunning animated masterpieces in high definition. From brief moments to
                complete productions, every frame becomes a canvas for animation artistry, taking your creative work to
                the next level.
              </Trans>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="btn-primary py-2 px-2 sm:px-6 font-semibold flex items-center">
                <Trans>Try Video to Animation</Trans>
              </span>
            </div>
          </div>
        </div>
        <div className="md:w-3/5 md:order-2 flex items-center">
          <div className="w-full aspect-video">
            <video className="w-full h-full object-contain rounded" autoPlay loop muted playsInline>
              <source src="/video/videoToCartoon.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div className="py-10 sm:py-16 sm:px-16 bg-[#F1F1F1] flex flex-col md:flex-row border-b border-[#D1D3D6] px-4 text-black">
        <div className="md:w-3/5 md:order-1 flex items-center">
          <div className="w-full aspect-video">
            <video className="w-full h-full object-contain rounded" autoPlay loop muted playsInline>
              <source src="/video/ironMan.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="md:w-2/5 md:order-2 md:pl-8 flex flex-col justify-center mb-4 md:mb-0">
          <div className="mb-4">
            <div un-sm="text-3xl" className="text-xl font-semibold leading-none tracking-tight">
              <h2 className="my-0">
                <Trans>Video Face Swap</Trans>
              </h2>
            </div>
          </div>
          <div className="mb-4">
            <div un-sm="text-xl" className="text-lg mb-6">
              <Trans>
                Imagine transforming any face in your videos or photos with just a few clicks. Our AI wizard brings you
                a revolutionary visual experience: say goodbye to technical barriers and let your creativity soar.
                Whether you're a professional creator or an enthusiastic explorer, this face transformation tool puts
                the power of imagination at your fingertips. Let AI unlock endless possibilities and create a unique
                visual world that's truly yours.
              </Trans>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="btn-primary py-2 px-2 sm:px-6 font-semibold flex items-center">
                <Trans>Try Face Swap</Trans>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
