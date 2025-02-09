import { useTranslations } from "next-intl";
import FirstPage from "./firstPage";
import TestJump from "./testJump";
import Footer from "@/components/Footer";
import Image from "next/image";
export default function Home() {
  const t = useTranslations("home");
  return (
    <div className="relative h-screen  ">
      {/* 第一屏 */}
      <FirstPage />
      <div className="h-[calc(100vh-64px)] !w-[0px] bg-[blue]"></div>
      {/* 第二屏 */}
      <div className="flex flex-col justify-center items-center bg-[#F1F1F1]  p-[40px] border border-[#D1D3D6] border-[3px]">
        <h2 className="mx-2 max-w-3xl text-center text-3xl font-bold leading-tight tracking-wide sm:text-4xl md:text-5xl lg:text-6xl  my-[50px]">
          Perfect for <span className="mainColor">Creator</span>
          <br />
          <span className="mainColor">Easy</span> to Use
        </h2>
        <div className="flex items-center py-[16px]">
          <p className="font-bold mr-[10px]">
            Trusted by <span className="mainColor">1,000,990+</span> Creators
          </p>

          <Image src="/fiveStar.svg" width={20} height={20} alt="fiveStar" />
          <Image src="/fiveStar.svg" width={20} height={20} alt="fiveStar" />
          <Image src="/fiveStar.svg" width={20} height={20} alt="fiveStar" />
          <Image src="/fiveStar.svg" width={20} height={20} alt="fiveStar" />
          <Image src="/fiveStar.svg" width={20} height={20} alt="fiveStar" />
        </div>
        <div className="flex flex-wrap justify-center mt-6 sm:mt-10 md:justify-around flex-nowrap w-full mb-2 gap-3">
          <Image src="/brand/tiktok.svg" width={80} height={80} alt="tiktok" />
          <Image src="/brand/youtube.svg" width={80} height={80} alt="youtube" />
          <Image src="/brand/x.svg" width={80} height={80} alt="x" />
          <Image src="/brand/facebook.svg" width={80} height={80} alt="facebook" />
          <Image src="/brand/pinterest.svg" width={80} height={80} alt="pinterest" />
          <Image src="/brand/instagram.svg" width={80} height={80} alt="instagram" />
        </div>
      </div>

      {/* <TestJump /> */}
      {/* 第三屏及后续内容 */}

      <div className="py-10 sm:py-16 sm:px-16 bg-[#F1F1F1] flex flex-col md:flex-row border-b border-[#D1D3D6] px-4 text-black">
        <div className="md:w-2/5 md:order-1 md:pl-8 flex flex-col justify-center mb-4 md:mb-0">
          <div className="mb-4">
            <div un-sm="text-3xl" className="text-xl font-semibold leading-none tracking-tight">
              <h2 className="my-0">{t("videoToAnimation_title")}</h2>
            </div>
          </div>
          <div className="mb-4">
            <div un-sm="text-xl" className="text-lg mb-6">
              {t("videoToAnimation_desc")}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="btn-primary py-2 px-2 sm:px-6 font-semibold flex items-center">
                {t("videoToAnimation_tryButton")}
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
              <h2 className="my-0">{t("videoFaceSwap_title")}</h2>
            </div>
          </div>
          <div className="mb-4">
            <div un-sm="text-xl" className="text-lg mb-6">
              {t("videoFaceSwap_desc")}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="btn-primary py-2 px-2 sm:px-6 font-semibold flex items-center">
                {t("videoFaceSwap_tryButton")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
