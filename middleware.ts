import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/((?!_next).*)"],
};

const STATIC_FILE = /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/i;

const loginRoutes = [
    "/auth/login",
    "/auth/forgot",
    "/auth/reset-password",
    "/auth/create/activate-account"
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const url = request.url;

    const accessToken = request.cookies.get("accessToken")?.value;
    const isAuthenticated = !!accessToken;

    if (STATIC_FILE.test(pathname)) {
        return NextResponse.next();
    }

    const isLoginRoute = loginRoutes.some(route => pathname === route || pathname.includes(route + "/"));

    if (!isAuthenticated && !isLoginRoute) {
        return NextResponse.redirect(new URL("/auth/login", url));
    }

    if (
        isAuthenticated &&
        loginRoutes.some(route => pathname === route || pathname.includes(route + "/"))
    ) {
        return NextResponse.redirect(new URL("/", url));
	}

    return NextResponse.next();
}