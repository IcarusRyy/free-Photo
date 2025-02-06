import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserRole } from "@/types/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "用户名", type: "text" },
        password: { label: "密码", type: "password" },
        userInfo: { label: "用户信息", type: "text" }, // 添加用户信息字段
      },
      // async authorize(credentials) {
      //   console.log("credentials", credentials);
      //   if (!credentials?.username || !credentials?.password) {
      //     throw new Error("请输入用户名和密码");
      //   }

      //   try {
      //     // 调用 API 进行登录验证
      //     const response = await login({
      //       username: credentials.username,
      //       password: credentials.password,
      //     });

      //     // 返回用户信息
      //     return {
      //       id: response.user.id,
      //       name: response.user.name,
      //       email: response.user.email,
      //       role: response.user.role,
      //     };
      //   } catch (error: any) {
      //     throw new Error(error.message || "登录失败");
      //   }
      // },
      async authorize(credentials) {
        if (!credentials?.userInfo) {
          return null;
        }

        // 直接使用传递过来的用户信息
        const userInfo = JSON.parse(credentials.userInfo);

        return userInfo;
      },
    }),
  ],
  callbacks: {
    // 将用户信息添加到 JWT token 中
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    // 从 token 中获取用户信息添加到 session 中
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    // error: "/unauthorized",
    error: "/error",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};
