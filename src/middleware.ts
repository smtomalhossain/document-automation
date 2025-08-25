// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	const { nextUrl, cookies } = req;
	const { pathname, search } = nextUrl;

	// Allow login route and public assets
	const isPublicRoute = pathname === "/login" || pathname === "/favicon.ico" || pathname.startsWith("/_next/");

	const authToken = cookies.get("auth_token")?.value;

	// Not logged in and requesting a protected page → redirect to login with returnUrl
	if (!authToken && !isPublicRoute) {
		const returnUrl = encodeURIComponent(`${pathname}${search || ""}`);
		const loginUrl = new URL(`/login?returnUrl=${returnUrl}`, nextUrl.origin);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};