import { Button } from "antd";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TestJump = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <>
      <div className=" z-10 h-full flex  justify-center ">
        {user ? (
          <div className="text-center h-full w-full">
            <h1 className="text-4xl font-bold mb-4 text-gray-800 !text-[red] ">Welcome back, {user.name}</h1>
            <p className="text-gray-600 mb-8">Current role: {user.role}</p>
            <div className="space-y-4">
              <Button type="primary" size="large" onClick={() => router.push("/dashboard")}>
                Enter the control panel
              </Button>
              <Button type="primary" size="large" onClick={() => router.push("/profile")}>
                Enter the personal center
              </Button>
              <Button type="primary" size="large" onClick={() => router.push("/vip")}>
                Enter the VIP center
              </Button>
              <Button type="primary" size="large" onClick={() => router.push("/vip")}>
                123
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">欢迎来到管理系统</h1>
            <p className="text-gray-600 mb-8">高效的企业管理解决方案</p>
            <div className="space-x-4">
              <Link href="/login">
                <Button type="primary" size="large">
                  登录系统
                </Button>
              </Link>
              <Link href="/register">
                <Button size="large">立即注册</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TestJump;
