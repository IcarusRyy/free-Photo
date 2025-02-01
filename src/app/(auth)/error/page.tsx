"use client";
import { Button, Result } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

export default function Error() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  // 根据错误类型显示不同的信息
  const getErrorMessage = () => {
    switch (error) {
      case "Configuration":
        return "系统配置错误，请联系管理员";
      case "AccessDenied":
        return "访问被拒绝，您没有权限访问该页面";
      case "Verification":
        return "验证失败，请重新登录";
      default:
        return "发生了一些错误，请稍后重试";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Result
        status="error"
        title="出错了"
        subTitle={getErrorMessage()}
        extra={[
          <Button type="primary" key="login" onClick={() => router.push("/login")}>
            返回登录
          </Button>,
          <Button key="home" onClick={() => router.push("/")}>
            返回首页
          </Button>,
        ]}
      />
    </div>
  );
}
