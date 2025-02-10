"use client";
import { useSession } from "next-auth/react";
import { Avatar, Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useEffect, useState } from "react"; // 添加导入
import classNames from "classnames";
import "./index.scss";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import HEADER_CONFIG from "./headerConfig";
export default function Header() {
  // const { data: session } = useSession();
  const router = useRouter();
  const { logout, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false); // 添加状态
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const locale = useLocale();
  const [activeItem, setActiveItem] = useState(HEADER_CONFIG[0].items[0]); // 添加新状态，默认显示第一个项目
  const t = useTranslations("header");
  const commonT = useTranslations("common");
  const items: MenuProps["items"] = [
    {
      key: "dashboard",

      label: "Dashboard",
      onClick: () => router.push("/dashboard"),
    },
    {
      key: "profile",
      label: "Profile",
      onClick: () => router.push("/profile"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      onClick: () => logout(),
    },
  ];
  useEffect(() => {
    setIsScrolled(window.scrollY > 10);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // 根据滚动距离更新状态
    };

    window.addEventListener("scroll", handleScroll); // 添加滚动事件监听
    return () => {
      window.removeEventListener("scroll", handleScroll); // 清理事件监听
    };
  }, [locale]);
  const dropdownContent = () => (
    <div style={{ width: "100%", backgroundColor: "white" }}>
      <div className="pt-6 pb-4  w-[70%] mx-auto flex justify-center  gap-[64px]">
        <div className="pr-[40px] border-r-solid w-30vw  border-r-[#dbdbdb] border-r-[2px] min-h-74 mb-4  w-[407px] flex-shrink-0">
          {/* <Image
            src={`/nav/${activeItem.constantName}`}
            alt={activeItem.title}
            width={367}
            height={168}
            className="object-cover"
          /> */}
          <div className="w-[367px] h-[168px] relative">
            <Image src={`/nav/${activeItem.constantName}`} alt={t(activeItem.title)} fill className="object-cover" />
          </div>
          <div className="mt-[16px] text-xl font-bold truncate">{t(activeItem.title)}</div>

          <div className="mt-[12px] text-sm text-[#808080] line-clamp-2">{t(activeItem.desc)}</div>
        </div>
        <div className="h-full flex-1 flex flex-col gap-[20px]">
          {HEADER_CONFIG.map((item) => (
            <div key={item.title}>
              <div className="text-base text-[#808080]">{t(item.title)}</div>
              <div className="grid grid-cols-3 ml-[20px]">
                {item.items.map((child) => (
                  <div
                    key={child.title}
                    className=" text-[14px] cursor-pointer h-[64px] flex items-center px-[12px] mainColorHover"
                    onMouseEnter={() => setActiveItem(child)}
                  >
                    <div className=" font-[500]">{t(child.title)}</div>
                    {child.isNew && (
                      <div className="ml-[12px] text-[16px] text-[#FFF] mainBg px-[4px]  rounded-[6px] ">New</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  return (
    <header
      className={classNames(" z-50 backdrop-blur-sm Header_Comp", {
        Header_Comp_Opaque: isScrolled || isOpenMenu,
      })}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4 border border-white px-[2px] py-[2px] rounded-[4px] relative w-[32px] h-[32px] ">
            <Image src="/logo/logo.jpg" alt="logo" fill className="object-cover rounded-[4px] "></Image>
          </div>
          <div className=" text-xl font-bold">{commonT("WuKong AI")}</div>
        </div>

        <div className="flex items-center gap-[16px] cursor-pointer" id="nav_box">
          <Dropdown
            dropdownRender={dropdownContent}
            // open={true}
            trigger={["hover"]}
            overlayClassName="w-full !top-[64px]"
            placement="bottom"
            onOpenChange={setIsOpenMenu}
            getPopupContainer={() => {
              return document.getElementById("nav_box") || document.body;
            }}
          >
            <div className="cursor-pointer mainColorHover px-[16px] py-[8px] flex items-center gap-[4px] group">
              <span
                className={classNames({
                  mainColor: isOpenMenu,
                })}
              >
                App
              </span>
              <Image
                src="/baseIcons/down.svg"
                alt="down"
                width={20}
                height={20}
                className={classNames({
                  invert: !isScrolled && !isOpenMenu, // 当背景透明时使用白色图标
                  "group-hover:hidden": true, // hover时隐藏
                  hidden: isOpenMenu,
                })}
              />
              <Image
                src="/baseIcons/up.svg"
                className={classNames("hidden group-hover:block", {
                  "!block": isOpenMenu,
                })}
                alt="up"
                width={20}
                height={20}
              />
            </div>
          </Dropdown>
          <div className="mainColorHover  px-[16px] py-[8px]">价格</div>
          <div className="mainColorHover  px-[16px] py-[8px]">博客</div>
          <div className="mainColorHover  px-[16px] py-[8px]">工具集</div>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          {user ? (
            <Dropdown menu={{ items }} placement="bottomRight">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Avatar>{user.name?.[0]}</Avatar>
                <span className="">{user.name}</span>
              </div>
            </Dropdown>
          ) : (
            <Button type="primary" onClick={() => router.push("/login")}>
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
