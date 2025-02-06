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
  // 已登录用户访问登录页时重定向到首页
  if (pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    // 未登录用户访问登录页,直接放行
    return NextResponse.next();
  }
  if (!token) {
    // 未登录，重定向到登录页
    return NextResponse.redirect(new URL("/login", req.url));
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
