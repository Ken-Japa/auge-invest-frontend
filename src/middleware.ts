import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  // Skip middleware for the demo-login route
  if (request.nextUrl.pathname.startsWith("/api/demo/demo-login")) {
    return NextResponse.next();
  }

  const cookieStore = await cookies();
  const authTokenCookie = cookieStore.get("authToken")?.value;

  let token: any = null;
  if (authTokenCookie && process.env.NEXTAUTH_SECRET) {
    try {
      token = jwt.verify(authTokenCookie, process.env.NEXTAUTH_SECRET);
    } catch (error) {
      console.error("Error decoding authToken in middleware:", error);
    }
  }
  const isHomePage = request.nextUrl.pathname === "/";
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");

  // If it's homepage and user is authenticated, redirect to dashboard
  if (isHomePage && token) {
    return NextResponse.redirect(new URL("/visao-economia", request.url));
  }

  // Protected routes check
  if (!token && !isAuthPage && !isHomePage) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Prevent authenticated users from accessing auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/visao-economia", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/dashboard/:path*",
    "/visao-economia/:path*",
    "/alertas/:path*",
    "/perfil/:path*",
    "/perfil/configuracoes/:path*",
  ],
};
