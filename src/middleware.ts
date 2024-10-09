import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth.mutate.service";

const authRoutes = ["/login", "/register"];
const roleBasedRoutes = {
  USER: [
    "^/user/dashboard(/.*)?$",
    "^/profile(/.*)?$",
    "^/posts/update-post/[^/]+$",
  ],
  ADMIN: ["^/admin(/.*)?$", "^/profile(/.*)?$", "^/posts/update-post/[^/]+$"],
};

export async function middleware(request: NextRequest) {
  const user = await getCurrentUser();
  const { pathname } = request.nextUrl;
  if (!user) {
    if (authRoutes.includes(pathname)) return NextResponse.next();
    else
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
  }
  const userRole = user?.role;
  const routes = roleBasedRoutes[userRole];
  if (userRole && routes) {
    // console.log(
    //   routes.some((routePattern) => {
    //     if (pathname.match(routePattern)) {
    //       console.log(pathname, routePattern);
    //     }
    //     return "mahi";
    //   })
    // );
    if (routes.some((routePattern) => pathname.match(routePattern))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/profile/:path*",
    "/admin/:path*",
    "/user/:path*",
    "/posts/update-post/:path*",
  ],
};
