"use server";

import { cookies } from "next/headers";
import { SignJWT } from "jose";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin1234";

export async function loginAction(password: string): Promise<{ ok: boolean; error?: string }> {
  if (password !== ADMIN_PASSWORD) return { ok: false, error: "비밀번호가 올바르지 않습니다" };

  const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET);
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set("admin-session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return { ok: true };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-session");
}
