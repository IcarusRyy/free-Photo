import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserRole } from "@/types/auth";

// 模拟用户数据
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    username: "admin",
    password: "password", // 实际项目中应该使用加密密码
    role: UserRole.ADMIN,
  },
  {
    id: "2",
    name: "Normal User",
    email: "user@example.com",
    username: "user",
    password: "password",
    role: UserRole.USER,
  },
  {
    id: "3",
    name: "VIP User",
    email: "vip@example.com",
    username: "vip",
    password: "password",
    role: UserRole.VIP,
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "用户名", type: "text" },
        password: { label: "密码", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("请输入用户名和密码");
        }

        // 在实际项目中，这里应该是数据库查询
        const user = users.find(
          (user) => user.username === credentials.username && user.password === credentials.password,
        );

        if (!user) {
          throw new Error("用户名或密码错误");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
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
    error: "/unauthorized",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key", // 在生产环境中使用环境变量
};
