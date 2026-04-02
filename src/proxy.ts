import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin/login은 통과
  if (pathname === "/admin/login") return NextResponse.next();

  // /admin/* 경로 보호
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin-session")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    try {
      const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
