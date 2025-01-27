"use client";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Unauthorized() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Result
        status="403"
        title="访问受限"
        subTitle={user ? "抱歉，您的当前角色没有权限访问此页面" : "请先登录后再访问此页面"}
        extra={[
          <Button type="primary" key="back" onClick={() => router.push(user ? "/dashboard" : "/login")}>
            {user ? "返回仪表盘" : "去登录"}
          </Button>,
          user && (
            <Button key="home" onClick={() => router.push("/")}>
              返回首页
            </Button>
          ),
        ].filter(Boolean)}
      />
    </div>
  );
}
