import Image from "next/image";
import ItemList from "./ItemList";
const Footer = () => {
  return (
    <div className="overflow-hidden pb-[40px] sm:pb-[40px] ">
      <div className="relative w-[90vw] sm:w-[88vw] xl:w-[76vw] mx-auto max-w-[1400px] flex-center flex-col">
        <div className="mt-6 sm:mt-16 flex sm:gap-x-10  pb-10 px-8 sm:px-0 sm:pb-10 flex-wrap sm:gap-y-8">
          <div className="w-full sm:w-[220px] mt-3">
            <div>
              {/* <Image
                alt="test"
                src={"https://cdn.goenhance.ai/images/static/logo/enhance-logo-name.png"}
                width={183}
                height={48}
              /> */}
              <div className="w-[183px] h-[48px]">Logo</div>
              <div className="text-sm font-bold mt-4 text-[#d1d1d1]">
                AI Video & Image Art Tool For Human Imagination.
              </div>
            </div>
          </div>
          <ItemList
            title="Product"
            items={[
              { url: "/", text: "Video to Video" },
              { url: "/", text: "Video Face Swap" },
              { url: "/", text: "Text To Image" },
              { url: "/", text: "AI Video Generator" },
              { url: "/", text: "Character Animation" },
              { url: "/", text: "Image Enhance" },
            ]}
            animationDelay="0.1s"
          />
          <ItemList
            title="RESOURCES"
            items={[
              { url: "/", text: "Blog" },
              { url: "/", text: "Tools" },
              { url: "/", text: "Affiliate" },
              { url: "/", text: "Tutorials" },
              { url: "/", text: "FAQ" },
            ]}
            animationDelay="0.4s"
          />
          <ItemList
            title="CONNECT"
            items={[
              { url: "/", text: "Email" },
              { url: "/", text: "Youtube" },
              { url: "/", text: "X" },
              { url: "/", text: "Discord" },
              { url: "/", text: "Github" },
            ]}
            animationDelay="0.8s"
          />
          <ItemList
            title="Community"
            items={[
              { url: "/", text: "Discord" },
              { url: "/", text: "twitter" },
            ]}
            animationDelay="1s"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
