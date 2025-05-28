import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || '';
  const { pathname } = request.nextUrl;

  if (token) {
    if (pathname.startsWith("/auth") || pathname === "/")
      return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/auth") || pathname.startsWith("/dashboard"))
    return NextResponse.next();

  if (pathname === "/")
    return NextResponse.redirect(new URL("/dashboard", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|static|icons|assets|favicon.ico|robots.txt|images|api/auth|dashboard).*)",
  ],
};
