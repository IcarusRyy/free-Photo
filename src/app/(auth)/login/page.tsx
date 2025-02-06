// "use client";
// import { Form, Input, Button, message } from "antd";
// import { useRouter, useSearchParams } from "next/navigation";
// import styles from "./login.module.scss";
// import { useAuth } from "@/hooks/useAuth";

// export default function Login() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
//   const { login } = useAuth();

//   const onFinish = async (values: any) => {
//     // const result = await login(values.username, values.password);
//     // // console.log("result", result);
//     // if (result?.error) {
//     //   message.error("登录失败：" + result.error);
//     //   return;
//     // }

//     // message.success("登录成功！");
//     // router.push(callbackUrl);
//     try {
//       const result = await login(values.username, values.password);
//       if (result?.error) {
//         message.error("登录失败：" + result.error);
//         return;
//       }

//       message.success("登录成功！");
//       router.push(callbackUrl);
//     } catch (error) {
//       console.error("登录失败！", error);
//       message.error("登录失败！");
//     }
//   };

//   return (
//     <div className={styles.loginContainer}>
//       <Form name="login" onFinish={onFinish} layout="vertical" className={styles.loginForm}>
//         <h1>登录</h1>
//         <Form.Item label="用户名" name="username" rules={[{ required: true, message: "请输入用户名！" }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入密码！" }]}>
//           <Input.Password />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" block>
//             登录
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }

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
    message.success("登录成功！");
    router.push(callbackUrl);
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
