import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  validatePassword,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { password?: string } = {};
  try {
    body = await request.json();
  } catch {
    /* fall through — invalid body becomes invalid password */
  }

  const token = validatePassword(body.password || "");
  if (!token) {
    // Small constant-ish delay to blunt rapid guessing.
    await new Promise((r) => setTimeout(r, 500));
    return NextResponse.json(
      { ok: false, error: "Invalid password." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, adminCookieOptions());
  return response;
}
