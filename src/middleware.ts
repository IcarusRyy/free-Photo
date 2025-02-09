import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserRole } from "@/types/auth";
import createIntlMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n/settings";

// 路由权限配置对象：定义不同用户角色可以访问的路由路径
const routeConfig: Record<UserRole, string[]> = {
  [UserRole.USER]: ["/dashboard", "/profile"], // 普通用户可访问的路径
  [UserRole.VIP]: ["/dashboard", "/profile", "/vip"], // VIP用户可访问的路径
  [UserRole.ADMIN]: ["/dashboard", "/profile", "/vip", "/admin"], // 管理员可访问的路径
  [UserRole.GUEST]: [], // 游客不可访问任何受保护路径
};

// 定义公共路由数组：这些路径无需登录即可访问
const publicPaths = ["/", "/login", "/unauthorized", "/error"];

// 创建next-intl国际化中间件实例
// 配置支持的语言、默认语言和语言前缀策略
const intlMiddleware = createIntlMiddleware({
  locales, // 支持的语言列表
  defaultLocale, // 默认语言
  localePrefix: "always", // URL中始终显示语言前缀
});

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 正确处理正则表达式，确保特殊字符被转义
  const localePattern = locales.map((locale) => escapeRegExp(locale)).join("|");
  const localePrefix = new RegExp(`^/(${localePattern})`);
  const pathWithoutLocale = pathname.replace(localePrefix, "");

  // 如果请求的是公共路径，直接通过国际化中间件处理后返回
  if (publicPaths.includes(pathWithoutLocale)) {
    return intlMiddleware(req);
  }

  // 从请求中获取JWT token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 对需要权限验证的路由进行检查
  if (
    pathWithoutLocale.startsWith("/dashboard") ||
    pathWithoutLocale.startsWith("/profile") ||
    pathWithoutLocale.startsWith("/vip") ||
    pathWithoutLocale.startsWith("/admin")
  ) {
    // 如果用户未登录（没有token），重定向到登录页面
    if (!token) {
      const locale = getLocaleFromPath(pathname) || defaultLocale;
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }

    // 获取用户角色并检查权限
    const userRole = token.role as UserRole;
    const allowedRoutes = routeConfig[userRole] || [];
    // 检查用户是否有权限访问当前路径
    const hasPermission = allowedRoutes.some((route) => pathWithoutLocale.startsWith(route));

    // 如果没有权限，重定向到未授权页面
    if (!hasPermission) {
      const locale = getLocaleFromPath(pathname) || defaultLocale;
      return NextResponse.redirect(new URL(`/${locale}/unauthorized`, req.url));
    }
  }

  // 通过所有权限检查后，交由国际化中间件处理
  return intlMiddleware(req);
}

// 辅助函数：转义正则表达式特殊字符
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// 辅助函数：从路径中获取语言
function getLocaleFromPath(pathname: string): string | undefined {
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale;
    }
  }
  return undefined;
}

// 中间件配置：定义哪些路径需要经过中间件处理
// export const config = {
//   matcher: [
//     "/((?!api|_next|.*\\..*).*)", // 匹配所有路径，但排除api路由、_next路径和带文件扩展名的路径
//     "/", // 匹配根路径
//     `/(${locales.map((locale) => escapeRegExp(locale)).join("|")})/:path*`, // 匹配带有语言前缀的所有路径
//   ],
// };
export const config = {
  matcher: [
    // 排除 api 路由、_next 和静态资源
    "/((?!api|_next|.*\\..*).*)",
    // "/((?!api|_next|_vercel|baseIcons|.*\\..*).*)",
    // 匹配带有语言前缀的路径
    "/:locale(zh|en)/:path*",
  ],
};
