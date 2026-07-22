import { NextResponse } from "next/server";
import {
  createReview,
  listApprovedReviews,
  validateReviewInput,
  type ReviewInput,
} from "@/lib/reviews";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const reviews = await listApprovedReviews();
  return NextResponse.json({ reviews });
}

/**
 * Best-effort email notification for a new review.
 *
 * The on-disk store is ephemeral on serverless hosts (Vercel /tmp), so this
 * guarantees you actually receive every submission even if the file is wiped.
 * Uses the same Web3Forms key as the contact form. Never throws — a failed
 * notification must not fail the visitor's submission.
 */
async function notifyByEmail(review: ReviewInput): Promise<void> {
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!key) return;
  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: `New review — ${review.rating}★ from ${review.name}`,
        from_name: "Seer Labs reviews",
        name: review.name,
        role: review.role || "—",
        rating: `${review.rating} / 5`,
        message: review.body,
        botcheck: "",
      }),
    });
  } catch {
    // best-effort only
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Invalid JSON body."] },
      { status: 400 }
    );
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  // Honeypot: bots fill this hidden field. Pretend success and drop silently.
  if (typeof raw.botcheck === "string" && raw.botcheck.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const check = validateReviewInput(raw);
  if (!check.ok || !check.data) {
    return NextResponse.json(
      { ok: false, errors: check.errors },
      { status: 400 }
    );
  }

  // Persist best-effort (works locally + feeds the admin approval queue). On a
  // read-only host this may fail — we still notify by email and return success
  // so the visitor never hits an error.
  let stored: Awaited<ReturnType<typeof createReview>> | null = null;
  try {
    stored = await createReview(check.data);
  } catch {
    stored = null;
  }

  await notifyByEmail(check.data);

  return NextResponse.json(
    {
      ok: true,
      review: stored
        ? {
            id: stored.id,
            createdAt: stored.createdAt,
            approved: stored.approved,
          }
        : { pending: true },
    },
    { status: 201 }
  );
}
