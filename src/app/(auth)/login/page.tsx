"use client";
import { Form, Input, Button, message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "./login.module.scss";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const onFinish = async (values: any) => {
    try {
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        message.error("登录失败：" + result.error);
        return;
      }

      message.success("登录成功！");
      router.push(callbackUrl);
    } catch (error) {
      message.error("登录失败！");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Form name="login" onFinish={onFinish} layout="vertical" className={styles.loginForm}>
        <h1>登录</h1>
        <Form.Item label="用户名" name="username" rules={[{ required: true, message: "请输入用户名！" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入密码！" }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
