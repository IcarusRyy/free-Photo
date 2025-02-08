"use client";
import { useAuth } from "@/hooks/useAuth";
import { Button, Card, Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VipPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <Spin size="large" className="flex justify-center items-center min-h-screen" />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6">VIP 专区</h1>
      <Card title="VIP 特权内容" className="mb-6">
        <p>欢迎 VIP 用户: {user?.name}</p>
        {/* VIP 专属内容 */}
        <Button type="primary" size="large" onClick={() => router.push("/dashboard")}>
          进入控制台
        </Button>
        <Link href="/">
          <Button type="primary" size="large">
            返回首页
          </Button>
        </Link>
      </Card>
    </div>
  );
}
