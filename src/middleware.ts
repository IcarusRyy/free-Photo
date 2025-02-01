// // import { withAuth } from "next-auth/middleware";
// // import { NextResponse } from "next/server";
// // import { UserRole } from "@/types/auth";

// // // 路由权限配置
// // const routeConfig = {
// //   [UserRole.USER]: ["/dashboard", "/profile"],
// //   [UserRole.VIP]: ["/dashboard", "/profile", "/vip"],
// //   [UserRole.ADMIN]: ["/dashboard", "/profile", "/vip", "/admin"],
// // };

// // export default withAuth(
// //   function middleware(req) {
// //     const { pathname } = req.nextUrl;
// //     const userRole: any = req.nextauth?.token?.role as UserRole;

// //     // 检查用户是否有权限访问当前路由
// //     const allowedRoutes = routeConfig[userRole] || [];
// //     const hasPermission = allowedRoutes.some((route) => pathname.startsWith(route));

// //     if (!hasPermission) {
// //       return NextResponse.redirect(new URL("/unauthorized", req.url));
// //     }

// //     return NextResponse.next();
// //   },
// //   {
// //     callbacks: {
// //       authorized: ({ token }) => !!token,
// //     },
// //   },
// // );

// // export const config = {
// //   matcher: ["/dashboard/:path*", "/profile/:path*", "/vip/:path*", "/admin/:path*"],
// // };
// // import { withAuth } from "next-auth/middleware";
// // import { NextResponse } from "next/server";
// // import { UserRole } from "@/types/auth";

// // // 路由权限配置
// // const routeConfig: Record<UserRole, string[]> = {
// //   [UserRole.USER]: ["/dashboard", "/profile"],
// //   [UserRole.VIP]: ["/dashboard", "/profile", "/vip"],
// //   [UserRole.ADMIN]: ["/dashboard", "/profile", "/vip", "/admin"],
// //   [UserRole.GUEST]: [], // 添加 GUEST 角色
// // };

// // export default withAuth(
// //   function middleware(req) {
// //     const { pathname } = req.nextUrl;
// //     const userRole = req.nextauth?.token?.role as UserRole;

// //     // 检查用户是否有权限访问当前路由
// //     const allowedRoutes = routeConfig[userRole] || [];
// //     const hasPermission = allowedRoutes.some((route) => pathname.startsWith(route));

// //     if (!hasPermission) {
// //       return NextResponse.redirect(new URL("/unauthorized", req.url));
// //     }

// //     return NextResponse.next();
// //   },
// //   {
// //     callbacks: {
// //       authorized: ({ token }) => !!token,
// //     },
// //   },
// // );

// // export const config = {
// //   matcher: ["/dashboard/:path*", "/profile/:path*", "/vip/:path*", "/admin/:path*"],
// // };
// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// import { UserRole } from "@/types/auth";
// import type { NextRequest } from "next/server";

// // 路由权限配置
// const routeConfig: Record<UserRole, string[]> = {
//   [UserRole.USER]: ["/dashboard", "/profile"],
//   [UserRole.VIP]: ["/dashboard", "/profile", "/vip"],
//   [UserRole.ADMIN]: ["/dashboard", "/profile", "/vip", "/admin"],
//   [UserRole.GUEST]: [],
// };

// // export default withAuth(
// //   function middleware(req) {
// //     const { pathname } = req.nextUrl;
// //     const userRole = req.nextauth?.token?.role as UserRole;

// //     // 添加调试信息
// //     console.log("Debug middleware:", {
// //       pathname,
// //       userRole,
// //       token: req.nextauth?.token,
// //     });
// //     // 检查用户是否有权限访问当前路由
// //     const allowedRoutes = routeConfig[userRole] || [];
// //     console.log("allowedRoutes------", allowedRoutes);
// //     const hasPermission = allowedRoutes.some((route) => pathname.startsWith(route));
// //     console.log("hasPermission------", hasPermission);

// //     if (!hasPermission) {
// //       return NextResponse.redirect(new URL("/unauthorized", req.url));
// //     }
// //     // if (!hasPermission) {
// //     //   return NextResponse.redirect(new URL("/error?error=AccessDenied", req.url));
// //     // }

// //     return NextResponse.next();
// //   },
// //   {
// //     callbacks: {
// //       authorized: ({ token }) => {
// //         console.log("Debug authorized callback:", token);
// //         return !!token;
// //       },
// //     },
// //   },
// // );
// // export function middleware(req) {
// //   console.log("================");
// //   console.log("Middleware Triggered");
// //   console.log("Request URL:", req.url);
// //   console.log("================");

// //   return NextResponse.next();
// // }

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserRole } from "@/types/auth";

// 路由权限配置
const routeConfig: Record<UserRole, string[]> = {
  [UserRole.USER]: ["/dashboard", "/profile"],
  [UserRole.VIP]: ["/dashboard", "/profile", "/vip"],
  [UserRole.ADMIN]: ["/dashboard", "/profile", "/vip", "/admin"],
  [UserRole.GUEST]: [],
};

export async function middleware(req: NextRequest) {
  // 获取 token
  const token = await getToken({ req, secret: "test-secret-please-change-me" });
  const { pathname } = req.nextUrl;

  if (!token) {
    // 未登录，重定向到登录页
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  const userRole = token.role as UserRole;

  // 检查用户是否有权限访问当前路由
  const allowedRoutes = routeConfig[userRole] || [];
  const hasPermission = allowedRoutes.some((route) => pathname.startsWith(route));

  if (!hasPermission) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/profile/:path*", "/vip/:path*", "/admin/:path*"],
};
