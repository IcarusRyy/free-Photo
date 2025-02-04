import { getDictionary } from "@/lib/getDictionary";
import TestJump from "./testJump";
import FirstPage from "./firstPage";
import { Locale } from "@/config/i18n";

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="relative h-screen">
      {/* 第一屏 */}
      <FirstPage />
      <div className="h-[100vh] w-[0]"></div>
      {/* 第二屏 */}
      <TestJump />
      {/* 第三屏及后续内容 */}
      <div className="py-10 sm:py-16 sm:px-16 bg-[#F1F1F1] flex flex-col md:flex-row border-b border-[#D1D3D6] px-4 text-black">
        <div className="md:w-2/5 md:order-1 md:pl-8 flex flex-col justify-center mb-4 md:mb-0">
          <div className="mb-4">
            <div un-sm="text-3xl" className="text-xl font-semibold leading-none tracking-tight">
              <h2 className="my-0">{dictionary.home.videoAnimation.title}</h2>
            </div>
          </div>
          <div className="mb-4">
            <div un-sm="text-xl" className="text-lg mb-6">
              {dictionary.home.videoAnimation.description}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="btn-primary py-2 px-2 sm:px-6 font-semibold flex items-center">
                {dictionary.home.videoAnimation.tryButton}
              </span>
            </div>
          </div>
        </div>
        <div className="md:w-3/5 md:order-2 flex items-center">
          <div className="w-full aspect-video">
            <video className="w-full h-full object-contain rounded" autoPlay loop muted playsInline>
              <source src="/videos/videoToCartoon.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div className="py-10 sm:py-16 sm:px-16 bg-[#F1F1F1] flex flex-col md:flex-row border-b border-[#D1D3D6] px-4 text-black">
        <div className="md:w-3/5 md:order-1 flex items-center">
          <div className="w-full aspect-video">
            <video className="w-full h-full object-contain rounded" autoPlay loop muted playsInline>
              <source src="/videos/ironMan.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="md:w-2/5 md:order-2 md:pl-8 flex flex-col justify-center mb-4 md:mb-0">
          <div className="mb-4">
            <div un-sm="text-3xl" className="text-xl font-semibold leading-none tracking-tight">
              <h2 className="my-0">{dictionary.home.faceSwap.title}</h2>
            </div>
          </div>
          <div className="mb-4">
            <div un-sm="text-xl" className="text-lg mb-6">
              {dictionary.home.faceSwap.description}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="btn-primary py-2 px-2 sm:px-6 font-semibold flex items-center">
                {dictionary.home.faceSwap.tryButton}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
