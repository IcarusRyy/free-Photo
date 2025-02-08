"use client";
import { Form, Input, Button, message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./login.module.scss";
import { useAuth } from "@/hooks/useAuth";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const { login } = useAuth();

  const onFinish = async (values: any) => {
    const result = await login(values.username, values.password);
    if (result?.error) {
      message.error("登录失败：" + result.error);
      return;
    }
    console.log("result", result);
    console.log("callbackUrl", callbackUrl);
    message.success("登录成功！");
    // router.push(callbackUrl);
    if (result.url) {
      router.push(result.url);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <Form name="login" onFinish={onFinish} layout="vertical" className={styles.loginForm}>
        <h1>Login</h1>
        <Form.Item label="Username" name="username" rules={[{ required: true, message: "Username is required" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password is required" }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
