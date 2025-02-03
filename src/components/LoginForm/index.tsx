"use client";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Dictionary } from "@/types/i18n";

type LoginFormProps = {
  dictionary: Dictionary["auth"]["login"];
  locale: string;
};

export default function LoginForm({ dictionary, locale }: LoginFormProps) {
  const router = useRouter();
  const { login } = useAuth();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const result = await login(values.username, values.password);
      if (!result.ok) {
        message.error(dictionary.error);
        return;
      }
      message.success(dictionary.success);

      // 使用返回的 URL 进行跳转
      if (result.url) {
        router.replace(result.url);
      } else {
        router.replace(`/${locale}/dashboard`);
      }
    } catch (error) {
      message.error(dictionary.error);
    }
  };

  return (
    <Form name="login" onFinish={onFinish} layout="vertical">
      <h1>{dictionary.title}</h1>
      <Form.Item
        label={dictionary.username}
        name="username"
        rules={[{ required: true, message: dictionary.usernamePlaceholder }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={dictionary.password}
        name="password"
        rules={[{ required: true, message: dictionary.passwordPlaceholder }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {dictionary.submit}
        </Button>
      </Form.Item>
    </Form>
  );
}
