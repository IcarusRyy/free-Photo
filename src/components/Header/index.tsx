"use client";
import { useSession } from "next-auth/react";
import { Avatar, Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  // const { data: session } = useSession();
  const router = useRouter();
  const { logout, user } = useAuth();

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-white">Logo</h1>
        </div>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          {user ? (
            <Dropdown menu={{ items }} placement="bottomRight">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Avatar>{user.name?.[0]}</Avatar>
                <span className="text-white">{user.name}</span>
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
