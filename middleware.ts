import { NextRequest, NextResponse } from "next/server";

export const config = {
	matcher: ["/((?!_next).*)"],
};

const STATIC_FILE = /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/i;

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const url = request.url;

	// Lee el token de las cookies
	const accessToken = request.cookies.get("accessToken")?.value;
	const isAuthenticated = !!accessToken;

	if (STATIC_FILE.test(pathname)) {
		return NextResponse.next();
	}

	const isLoginRoute =
		pathname === "/auth/login" ||
		pathname.startsWith("/auth/login/") ||
		pathname === "/auth/forgot" ||
		pathname === "/auth/reset-password" ||
		pathname === "/auth/reset-password" ||
		pathname === "/auth/create/activate-account" ||
		pathname.startsWith("/auth/forgot/");

	if (!isAuthenticated && !isLoginRoute) {
		return NextResponse.redirect(new URL("/auth/login", url));
	}

	if (
		isAuthenticated &&
		(pathname === "/auth/login" || pathname === "/auth/create/activate-account" || pathname === "/auth/forgot" || pathname === "/auth/reset-password")
	) {
		return NextResponse.redirect(new URL("/", url));
	}

	return NextResponse.next();
}
