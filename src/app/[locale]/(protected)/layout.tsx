"use client";
import Hyperspeed from "@/components/Hyperspeed";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Hyperspeed className="fixed inset-0" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
