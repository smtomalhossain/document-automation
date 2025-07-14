// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLoginRoute = pathname === "/login";
  const isBaseRoute = pathname === "/";

  const cookie = req.cookies.get("user.sms");
  const user = cookie ? JSON.parse(cookie.value || "{}") : null;

  // 🚫 Not logged in — redirect to /login (except for login page)
  if (!user && !isLoginRoute) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  // ✅ Logged in but trying to access /login or root — redirect to proper page
  if (user && (isLoginRoute || isBaseRoute)) {
    const redirectTo = user.username === "Tomal1" ? "/create-new-file" : "/admin";
    return NextResponse.redirect(new URL(redirectTo, req.nextUrl.origin));
  }

  // 🔒 Restrict /create-new-file to only Tomal1
  if (pathname.startsWith("/create-new-file") && user?.username !== "Tomal1") {
    return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
