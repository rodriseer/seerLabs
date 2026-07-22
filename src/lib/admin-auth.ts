import { cookies } from "next/headers";
import crypto from "crypto";

// ---------------------------------------------------------------------------
// Single-user admin auth via password-derived signed token.
//
// - Password is read from the ADMIN_PASSWORD env var.
// - Login sets an httpOnly cookie containing an HMAC of a fixed string using
//   the password as the secret. We never store the password itself in the
//   cookie. On each request we re-derive the expected token and compare with
//   constant-time equality.
// - If ADMIN_PASSWORD is unset, the admin area is inaccessible.
// ---------------------------------------------------------------------------

export const ADMIN_COOKIE = "seer-admin";
const TOKEN_PAYLOAD = "seer-admin-v1";

function adminPassword(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  return pw && pw.length > 0 ? pw : null;
}

function deriveToken(password: string): string {
  return crypto
    .createHmac("sha256", password)
    .update(TOKEN_PAYLOAD)
    .digest("hex");
}

export function expectedAdminToken(): string | null {
  const pw = adminPassword();
  if (!pw) return null;
  return deriveToken(pw);
}

export function validatePassword(candidate: string): string | null {
  const pw = adminPassword();
  if (!pw) return null;
  if (candidate.length === 0) return null;
  const a = Buffer.from(candidate);
  const b = Buffer.from(pw);
  if (a.length !== b.length) return null;
  if (!crypto.timingSafeEqual(a, b)) return null;
  return deriveToken(pw);
}

export async function isAdmin(): Promise<boolean> {
  const expected = expectedAdminToken();
  if (!expected) return false;
  const store = await cookies();
  const provided = store.get(ADMIN_COOKIE)?.value;
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function adminCookieOptions() {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  };
}
