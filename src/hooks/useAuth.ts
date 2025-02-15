// import { useSession, signIn, signOut } from "next-auth/react";
// import * as api from "@/api";

// export const useAuth = () => {
//   const { data: session, status } = useSession();

//   const login = async (username: string, password: string) => {
//     try {
//       // 先调用模拟的 API
//       const response = await api.login({ username, password });

//       // 然后使用 NextAuth 登录
//       return signIn("credentials", {
//         username,
//         password,
//         redirect: false,
//       });
//     } catch (error) {
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       // 先调用模拟的 API
//       await api.logout();
//       // 然后使用 NextAuth 登出
//       await signOut();
//     } catch (error) {
//       throw error;
//     }
//   };

//   return {
//     user: session?.user,
//     loading: status === "loading",
//     isAuthenticated: status === "authenticated",
//     login,
//     logout,
//   };
// };

// import { login } from "@/api";

// import { useSession, signIn, signOut } from "next-auth/react";

// export const useAuth = () => {
//   const { data: session, status } = useSession();

//   const loginFn = async (username: string, password: string) => {
//     try {
//       // 先调用 API 登录
//       // const test = await login({ username, password });
//       // console.log("test", test);
//       const apiResponse = await login({ username, password });

//       // 然后使用 NextAuth 登录
//       const result = await signIn("credentials", {
//         username,
//         password,
//         userInfo: JSON.stringify(apiResponse.user), // 将用户信息传递给 authorize
//         redirect: false,
//         callbackUrl: "/dashboard",
//       });
//       if (!result?.ok) {
//         throw new Error(result?.error || "登录失败");
//       }

//       return result;
//     } catch (error: any) {
//       console.log("登录失败111！", error);
//       throw new Error(error.message || "登录失败");
//     }
//   };

//   const logout = async () => {
//     try {
//       // 先调用 API 登出
//       await logout();
//       // 然后使用 NextAuth 登出
//       await signOut({ redirect: false });
//     } catch (error: any) {
//       throw new Error(error.message || "退出失败");
//     }
//   };

//   return {
//     user: session?.user,
//     loading: status === "loading",
//     isAuthenticated: status === "authenticated",
//     login: loginFn,
//     logout,
//   };
// };
import { login } from "@/api";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  const loginFn = async (username: string, password: string) => {
    try {
      const apiResponse = await login({ username, password });

      const result = await signIn("credentials", {
        username,
        password,
        userInfo: JSON.stringify(apiResponse.user),
        redirect: false,
        callbackUrl: `/${currentLocale}`,
      });
      if (!result?.ok) {
        throw new Error(result?.error || "登录失败");
      }

      return {
        ok: true,
        url: result.url,
        error: null,
      };
    } catch (error: any) {
      console.log("error", error);
      return {
        ok: false,
        url: null,
        error: error.message || "登录失败",
      };
    }
  };

  const logout = async () => {
    try {
      await signOut({
        redirect: false,
        callbackUrl: `/${currentLocale}/login`,
      });
    } catch (error: any) {
      throw new Error(error.message || "退出失败");
    }
  };

  return {
    user: session?.user,
    loading: status === "loading",
    isAuthenticated: status === "authenticated",
    login: loginFn,
    logout,
  };
};
