"use client";
import { useAuth } from "@/hooks/useAuth";
import { Card, Spin } from "antd";

export default function VipPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spin size="large" className="flex justify-center items-center min-h-screen" />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6">VIP 专区</h1>
      <Card title="VIP 特权内容" className="mb-6">
        <p>欢迎 VIP 用户: {user?.name}</p>
        {/* VIP 专属内容 */}
      </Card>
    </div>
  );
}
