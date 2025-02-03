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
// // import type { NextRequest } from "next/server";

// // // 路由权限配置
// // const routeConfig: Record<UserRole, string[]> = {
// //   [UserRole.USER]: ["/dashboard", "/profile"],
// //   [UserRole.VIP]: ["/dashboard", "/profile", "/vip"],
// //   [UserRole.ADMIN]: ["/dashboard", "/profile", "/vip", "/admin"],
// //   [UserRole.GUEST]: [], // 添加 GUEST 角色
// // };

// // // export default withAuth(
// // //   function middleware(req) {
// // //     const { pathname } = req.nextUrl;
// // //     const userRole = req.nextauth?.token?.role as UserRole;

// // //     // 检查用户是否有权限访问当前路由
// // //     const allowedRoutes = routeConfig[userRole] || [];
// // //     const hasPermission = allowedRoutes.some((route) => pathname.startsWith(route));

// // //     if (!hasPermission) {
// // //       return NextResponse.redirect(new URL("/unauthorized", req.url));
// // //     }

// // //     return NextResponse.next();
// // //   },
// // //   {
// // //     callbacks: {
// // //       authorized: ({ token }) => !!token,
// // //     },
// // //   },
// // // );

// // // export const config = {
// // //   matcher: ["/dashboard/:path*", "/profile/:path*", "/vip/:path*", "/admin/:path*"],
// // // };
// // import { withAuth } from "next-auth/middleware";
// // import { NextResponse } from "next/server";
// // import { UserRole } from "@/types/auth";
// // import type { NextRequest } from "next/server";

// // // 路由权限配置
// // const routeConfig: Record<UserRole, string[]> = {
// //   [UserRole.USER]: ["/dashboard", "/profile"],
// //   [UserRole.VIP]: ["/dashboard", "/profile", "/vip"],
// //   [UserRole.ADMIN]: ["/dashboard", "/profile", "/vip", "/admin"],
// //   [UserRole.GUEST]: [],
// // };
// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// import { UserRole } from "@/types/auth";
// import type { NextRequest } from "next/server";

// // // export default withAuth(
// // //   function middleware(req) {
// // //     const { pathname } = req.nextUrl;
// // //     const userRole = req.nextauth?.token?.role as UserRole;

// // //     // 添加调试信息
// // //     console.log("Debug middleware:", {
// // //       pathname,
// // //       userRole,
// // //       token: req.nextauth?.token,
// // //     });
// // //     // 检查用户是否有权限访问当前路由
// // //     const allowedRoutes = routeConfig[userRole] || [];
// // //     console.log("allowedRoutes------", allowedRoutes);
// // //     const hasPermission = allowedRoutes.some((route) => pathname.startsWith(route));
// // //     console.log("hasPermission------", hasPermission);

// // //     if (!hasPermission) {
// // //       return NextResponse.redirect(new URL("/unauthorized", req.url));
// // //     }
// // //     // if (!hasPermission) {
// // //     //   return NextResponse.redirect(new URL("/error?error=AccessDenied", req.url));
// // //     // }

// // //     return NextResponse.next();
// // //   },
// // //   {
// // //     callbacks: {
// // //       authorized: ({ token }) => {
// // //         console.log("Debug authorized callback:", token);
// // //         return !!token;
// // //       },
// // //     },
// // //   },
// // // );
// // // export function middleware(req) {
// // //   console.log("================");
// // //   console.log("Middleware Triggered");
// // //   console.log("Request URL:", req.url);
// // //   console.log("================");

// // //   return NextResponse.next();
// // // }
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { getToken } from "next-auth/jwt";
import { UserRole } from "@/types/auth";

const locales = ["en", "zh"];
const defaultLocale = "en";

// 路由权限配置
const routeConfig: Record<UserRole, string[]> = {
  [UserRole.USER]: ["/dashboard", "/profile", "/"],
  [UserRole.VIP]: ["/dashboard", "/profile", "/vip", "/"],
  [UserRole.ADMIN]: ["/dashboard", "/profile", "/vip", "/admin", "/"],
  [UserRole.GUEST]: ["/"],
};

// 不需要验证的公共路径
const publicPaths = ["/login", "/register", "/", "/unauthorized", "/error"];

function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locale = matchLocale(languages, locales, defaultLocale);
  return locale;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 检查路径是否已包含语言前缀
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // 如果缺少语言前缀，重定向到带有语言前缀的路径
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  // 提取当前语言和实际路径
  const currentLocale = pathname.split("/")[1];
  const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "");

  // 如果是公共路径，直接放行
  if (publicPaths.includes(pathWithoutLocale)) {
    return NextResponse.next();
  }

  // 权限验证
  const token: any = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || "test-secret-please-change-me",
  });

  // 如果是公共路径或已登录用户，允许访问
  if (publicPaths.includes(pathWithoutLocale) || token) {
    return NextResponse.next();
  }

  // 如果未登录且不是公共路径，重定向到登录页
  if (!token) {
    return NextResponse.redirect(new URL(`/${currentLocale}/login`, request.url));
  }

  // 检查路由权限
  const userRole = token.role as UserRole;
  const allowedRoutes = routeConfig[userRole] || [];
  const hasPermission = allowedRoutes.some(
    (route) => pathWithoutLocale === route || pathWithoutLocale.startsWith(route + "/"),
  );

  // 如果没有权限访问当前路径，重定向到未授权页面
  if (!hasPermission) {
    return NextResponse.redirect(new URL(`/${currentLocale}/unauthorized`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 需要中间件处理的路径
    "/((?!api|_next/static|_next/image|videos|images|favicon.ico).*)",
  ],
};
