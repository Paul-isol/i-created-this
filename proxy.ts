import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);
    const { pathname } = request.nextUrl;
    

    // Protect product pages: redirect unauthenticated users to login
    if (pathname.startsWith("/products")) {
        if (!sessionCookie) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // Redirect authenticated users away from login/register to home page
    if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
        if (sessionCookie) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/products", "/products/:path*", "/login", "/register", "/profile"],
};