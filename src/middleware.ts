// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// import { UserRole } from "@/types/auth";

// // 路由权限配置
// const routeConfig = {
//   [UserRole.USER]: ["/dashboard", "/profile"],
//   [UserRole.VIP]: ["/dashboard", "/profile", "/vip"],
//   [UserRole.ADMIN]: ["/dashboard", "/profile", "/vip", "/admin"],
// };

// export default withAuth(
//   function middleware(req) {
//     const { pathname } = req.nextUrl;
//     const userRole: any = req.nextauth?.token?.role as UserRole;

//     // 检查用户是否有权限访问当前路由
//     const allowedRoutes = routeConfig[userRole] || [];
//     const hasPermission = allowedRoutes.some((route) => pathname.startsWith(route));

//     if (!hasPermission) {
//       return NextResponse.redirect(new URL("/unauthorized", req.url));
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   },
// );

// export const config = {
//   matcher: ["/dashboard/:path*", "/profile/:path*", "/vip/:path*", "/admin/:path*"],
// };
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { UserRole } from "@/types/auth";

// 路由权限配置
const routeConfig: Record<UserRole, string[]> = {
  [UserRole.USER]: ["/dashboard", "/profile"],
  [UserRole.VIP]: ["/dashboard", "/profile", "/vip"],
  [UserRole.ADMIN]: ["/dashboard", "/profile", "/vip", "/admin"],
  [UserRole.GUEST]: [], // 添加 GUEST 角色
};

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const userRole = req.nextauth?.token?.role as UserRole;

    // 检查用户是否有权限访问当前路由
    const allowedRoutes = routeConfig[userRole] || [];
    const hasPermission = allowedRoutes.some((route) => pathname.startsWith(route));

    if (!hasPermission) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/vip/:path*", "/admin/:path*"],
};
