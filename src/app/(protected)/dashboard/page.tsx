"use client";
import { useAuth } from "@/hooks/useAuth";
import { Button, Card, Spin } from "antd";
import Link from "next/link";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spin size="large" className="flex justify-center items-center min-h-screen" />;
  }

  return (
    <div className="p-6">
      <Link href="/">
        <Button type="primary" size="large">
          返回首页
        </Button>
      </Link>
      <h1 className="text-2xl mb-6">仪表盘</h1>
      <Card title="用户信息" className="mb-6">
        <p>用户名: {user?.name}</p>
        <p>邮箱: {user?.email}</p>
        <p>角色: {user?.role}</p>
      </Card>
    </div>
  );
}
