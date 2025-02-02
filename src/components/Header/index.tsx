import { useSession } from "next-auth/react";
import { Avatar, Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { Trans, useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const router = useRouter();
  const { logout } = useAuth();

  const items: MenuProps["items"] = [
    {
      key: "dashboard",
      label: t("common.dashboard"),
      onClick: () => router.push("/dashboard"),
    },
    {
      key: "profile",
      label: t("common.profile"),
      onClick: () => router.push("/profile"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: t("common.logout"),
      onClick: () => logout(),
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-white">
            <Trans>Logo</Trans>
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          {session ? (
            <Dropdown menu={{ items }} placement="bottomRight">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Avatar>{session.user.name?.[0]}</Avatar>
                <span className="text-white">{session.user.name}</span>
              </div>
            </Dropdown>
          ) : (
            <Button type="primary" onClick={() => router.push("/login")}>
              {t("auth.login.title")}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
