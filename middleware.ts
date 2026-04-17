import { NextRequest, NextResponse } from "next/server";

const PASSWORD = process.env.SITE_PASSWORD ?? "sdjbrl2604@";
const COOKIE = "said_auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") ?? "";

  // satchel.saiddev.fr subdomain → rewrite every path under /satchel/*
  if (host.startsWith("satchel.")) {
    const url = request.nextUrl.clone();
    if (!pathname.startsWith("/satchel")) {
      url.pathname = pathname === "/" ? "/satchel" : `/satchel${pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // Satchel has its own auth — bypass site password gate entirely
  if (
    pathname.startsWith("/satchel") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/satchel")
  ) {
    return NextResponse.next();
  }

  // Allow login page and its API
  if (pathname.startsWith("/login") || pathname.startsWith("/api/login")) {
    return NextResponse.next();
  }

  // Check site password cookie
  const auth = request.cookies.get(COOKIE)?.value;
  if (auth === PASSWORD) {
    return NextResponse.next();
  }

  // Redirect to login
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|_next/webpack-hmr|favicon.ico|.*\\.png$|.*\\.svg$|.*\\.ico$).*)",
  ],
};
