"use client";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Result
        status="error"
        title="出错了"
        subTitle={error.message || "发生了一些错误，请稍后重试"}
        extra={[
          <Button type="primary" key="retry" onClick={() => reset()}>
            重试
          </Button>,
          <Button key="back" onClick={() => router.push("/")}>
            返回首页
          </Button>,
        ]}
      />
    </div>
  );
}
