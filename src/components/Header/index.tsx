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
import { useLocale } from "next-intl";
import Image from "next/image";
export default function Header() {
  // const { data: session } = useSession();
  const router = useRouter();
  const { logout, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false); // 添加状态
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const locale = useLocale();
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
      console.log(window.scrollY > 10);
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
        <div className="pr-[40px] border-r-solid w-30vw  border-r-[#dbdbdb] border-r-[2px] min-h-74 mb-4">
          <Image src="/nav/video2video.gif" alt="video2video" width={305} height={168} />
          <div className="mt-[16px] text-xl font-bold">视频转视频</div>
          <div className="mt-[12px] text-sm text-[#808080]">将你的视频转换为不同风格的动漫视频</div>
        </div>
        <div className="h-full flex-1">
          <div className="mb-2">
            <span>视频</span>
            <div className="mainColorHover  px-[16px] py-[8px]">价格</div>
            <div className="mainColorHover  px-[16px] py-[8px]">博客</div>
            <div className="mainColorHover  px-[16px] py-[8px]">工具集</div>
          </div>
          <div className="mb-2">
            <span>视频</span>
            <div className="mainColorHover  px-[16px] py-[8px]">价格</div>
            <div className="mainColorHover  px-[16px] py-[8px]">博客</div>
            <div className="mainColorHover  px-[16px] py-[8px]">工具集</div>
          </div>
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
          <h1 className="text-xl font-bold mainColorHover ">Logo</h1>
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
