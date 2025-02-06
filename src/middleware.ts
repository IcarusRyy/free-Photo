// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { UserRole } from "@/types/auth";

// // 路由权限配置
// const routeConfig: Record<UserRole, string[]> = {
//   [UserRole.USER]: ["/dashboard", "/profile"],
//   [UserRole.VIP]: ["/dashboard", "/profile", "/vip"],
//   [UserRole.ADMIN]: ["/dashboard", "/profile", "/vip", "/admin"],
//   [UserRole.GUEST]: [],
// };

// export async function middleware(req: NextRequest) {
//   // 获取 token
//   const token = await getToken({ req, secret: "test-secret-please-change-me" });
//   const { pathname } = req.nextUrl;
//   // 已登录用户访问登录页时重定向到首页
//   if (pathname === "/login") {
//     if (token) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//     // 未登录用户访问登录页,直接放行
//     return NextResponse.next();
//   }
//   if (!token) {
//     // 未登录，重定向到登录页
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   const userRole = token.role as UserRole;

//   // 检查用户是否有权限访问当前路由
//   const allowedRoutes = routeConfig[userRole] || [];
//   const hasPermission = allowedRoutes.some((route) => pathname.startsWith(route));

//   if (!hasPermission) {
//     return NextResponse.redirect(new URL("/unauthorized", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/login", "/dashboard/:path*", "/profile/:path*", "/vip/:path*", "/admin/:path*"],
// };

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { UserRole } from "@/types/auth";
// import createIntlMiddleware from "next-intl/middleware";
// import { locales, defaultLocale } from "@/i18n/settings";
// // 路由权限配置
// const routeConfig: Record<UserRole, string[]> = {
//   [UserRole.USER]: ["/dashboard", "/profile"],
//   [UserRole.VIP]: ["/dashboard", "/profile", "/vip"],
//   [UserRole.ADMIN]: ["/dashboard", "/profile", "/vip", "/admin"],
//   [UserRole.GUEST]: ["/", "/login"],
// };

// // 创建国际化中间件
// const intlMiddleware = createIntlMiddleware({
//   locales,
//   defaultLocale,
//   localePrefix: "as-needed",
// });

// export async function middleware(req: NextRequest) {
//   // 先处理国际化
//   const response = await intlMiddleware(req);

//   const pathname = req.nextUrl.pathname;

//   // 对于公共路由，直接返回国际化处理结果
//   if (pathname === "/" || pathname === "/login") {
//     return response;
//   }

//   // 获取 token
//   const token = await getToken({ req, secret: "test-secret-please-change-me" });

//   if (!token) {
//     // 未登录，重定向到登录页
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   const userRole = token.role as UserRole;
//   const allowedRoutes = routeConfig[userRole] || [];
//   const hasPermission = allowedRoutes.some((route) => pathname.startsWith(route));

//   if (!hasPermission) {
//     return NextResponse.redirect(new URL("/unauthorized", req.url));
//   }

//   return response;
// }

// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { UserRole } from "@/types/auth";
// import createIntlMiddleware from "next-intl/middleware";
// import { locales, defaultLocale } from "@/i18n/settings";

// // 路由权限配置
// const routeConfig: Record<UserRole, string[]> = {
//   [UserRole.USER]: ["/dashboard", "/profile"],
//   [UserRole.VIP]: ["/dashboard", "/profile", "/vip"],
//   [UserRole.ADMIN]: ["/dashboard", "/profile", "/vip", "/admin"],
//   [UserRole.GUEST]: ["/", "/login", "/unauthorized", "/error"],
// };

// // 创建国际化中间件
// const intlMiddleware = createIntlMiddleware({
//   locales,
//   defaultLocale,
//   localePrefix: "as-needed",
// });

// export async function middleware(req: NextRequest) {
//   const pathname = req.nextUrl.pathname;

//   // 处理公共路由
//   const publicPaths = ["/", "/login", "/unauthorized", "/error"];
//   const isPublicPath = publicPaths.some(
//     (path) =>
//       pathname === path || pathname.startsWith(`/${locales[0]}${path}`) || pathname.startsWith(`/${locales[1]}${path}`),
//   );

//   if (isPublicPath) {
//     return intlMiddleware(req);
//   }

//   // 获取 token
//   const token = await getToken({ req, secret: "test-secret-please-change-me" });

//   if (!token) {
//     // 未登录，重定向到登录页
//     const loginUrl = new URL("/login", req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   const userRole = token.role as UserRole;
//   const allowedRoutes = routeConfig[userRole] || [];

//   // 检查权限时需要考虑带有语言前缀的路径
//   const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");
//   const hasPermission = allowedRoutes.some((route) => pathWithoutLocale.startsWith(route));

//   if (!hasPermission) {
//     const unauthorizedUrl = new URL("/unauthorized", req.url);
//     return NextResponse.redirect(unauthorizedUrl);
//   }

//   return intlMiddleware(req);
// }

// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserRole } from "@/types/auth";
import createIntlMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n/settings";

// 路由权限配置
const routeConfig: Record<UserRole, string[]> = {
  [UserRole.USER]: ["/dashboard", "/profile"],
  [UserRole.VIP]: ["/dashboard", "/profile", "/vip"],
  [UserRole.ADMIN]: ["/dashboard", "/profile", "/vip", "/admin"],
  [UserRole.GUEST]: [],
};

// 公共路由，所有角色都可以访问
const publicPaths = ["/", "/login", "/unauthorized", "/error"];

// 创建国际化中间件
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 移除语言前缀后的路径
  const pathWithoutLocale = pathname.replace(/^\/(?:en|zh)/, "");

  // 如果是公共路径，直接返回国际化中间件处理结果
  if (publicPaths.includes(pathWithoutLocale)) {
    return intlMiddleware(req);
  }

  // 获取 token
  const token = await getToken({ req });

  // 对于需要权限的路由才进行权限检查
  if (
    pathWithoutLocale.startsWith("/dashboard") ||
    pathWithoutLocale.startsWith("/profile") ||
    pathWithoutLocale.startsWith("/vip") ||
    pathWithoutLocale.startsWith("/admin")
  ) {
    if (!token) {
      const locale = pathname.startsWith("/en") ? "en" : "zh";
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }

    const userRole = token.role as UserRole;
    const allowedRoutes = routeConfig[userRole] || [];
    const hasPermission = allowedRoutes.some((route) => pathWithoutLocale.startsWith(route));

    if (!hasPermission) {
      const locale = pathname.startsWith("/en") ? "en" : "zh";
      return NextResponse.redirect(new URL(`/${locale}/unauthorized`, req.url));
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)", "/", "/(zh|en)/:path*"],
};
