import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import {Routes} from "@/app/routes";

export async function middleware(req: NextRequest) {
    const isAuthPath = req.nextUrl.pathname === Routes.SignIn;
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const isAuth = !!token;

    if (!isAuth && !isAuthPath) {
        return NextResponse.redirect(new URL(Routes.SignIn, req.url));
    }

    if (isAuth && isAuthPath) {
        return NextResponse.redirect(new URL(Routes.Home, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
