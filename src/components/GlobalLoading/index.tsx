"use client";
import { Spin } from "antd";
import { useGlobalStore } from "@/store/useGlobalStore";

export default function GlobalLoading() {
  const isLoading = useGlobalStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <Spin size="large" />
    </div>
  );
}
