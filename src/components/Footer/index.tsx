import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const ItemList = ({ title, items }: { title: string; items: { url: string; text: string }[] }) => {
  const t = useTranslations("footer");
  return (
    <div className="w-full sm:w-[180px] text-left mt-10 sm:mt-3" style={{ opacity: 1, transform: "none" }}>
      <h3 className="font-medium text-xl mb-2 sm:mb-6 mt-0  LandingLayout_title">{t(title)}</h3>
      <ul className="pl-0">
        {items.map((item, index) => (
          <li className="list-none overflow-hidden" key={index}>
            <Link
              href="/"
              className="text-[#D1D1D1] w-full block mt-3 w-full overflow-hidden  LandingLayout_headerItem"
            >
              <div className="w-full  text-[16px] overflow-hidden">{t(item.text)}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
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
          />
          <ItemList
            title="Community"
            items={[
              { url: "/", text: "Discord" },
              { url: "/", text: "twitter" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
