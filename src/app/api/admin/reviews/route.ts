import { NextResponse } from "next/server";
import { listAllReviews } from "@/lib/reviews";
import { isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const reviews = await listAllReviews();
  return NextResponse.json({ reviews });
}
