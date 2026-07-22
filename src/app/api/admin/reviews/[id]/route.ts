import { NextResponse } from "next/server";
import { deleteReview, setReviewApproved } from "@/lib/reviews";
import { isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  let body: { approved?: boolean } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid body." },
      { status: 400 }
    );
  }

  if (typeof body.approved !== "boolean") {
    return NextResponse.json(
      { ok: false, error: "Missing boolean `approved`." },
      { status: 400 }
    );
  }

  const updated = await setReviewApproved(id, body.approved);
  if (!updated) {
    return NextResponse.json(
      { ok: false, error: "Review not found." },
      { status: 404 }
    );
  }
  return NextResponse.json({ ok: true, review: updated });
}

export async function DELETE(_request: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  const ok = await deleteReview(id);
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: "Review not found." },
      { status: 404 }
    );
  }
  return NextResponse.json({ ok: true });
}
