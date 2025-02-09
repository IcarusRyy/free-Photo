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
    <div style={{ width: "100%", height: "200px", backgroundColor: "white" }}>
      {/* 自定义下拉内容 */}
      <p>下拉内容</p>
    </div>
  );
  return (
    <header
      className={classNames(" z-50 backdrop-blur-sm Header_Comp ", {
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
            <div className="cursor-pointer mainColorHover">App</div>
          </Dropdown>
          <div className="mainColorHover">价格</div>
          <div className="mainColorHover">博客</div>
          <div className="mainColorHover">工具集</div>
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
