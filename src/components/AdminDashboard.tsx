"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Review } from "@/lib/reviews";

export function AdminDashboard() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/reviews", { cache: "no-store" });
      if (res.status === 401) {
        router.refresh();
        return;
      }
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setReviews(data.reviews);
    } catch {
      setError("Could not load reviews.");
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  async function setApproved(id: string, approved: boolean) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved }),
      });
      if (!res.ok) throw new Error();
      await load();
    } catch {
      setError("Update failed.");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this review? This cannot be undone.")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      await load();
    } catch {
      setError("Delete failed.");
    } finally {
      setBusyId(null);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  const pending = reviews?.filter((r) => !r.approved) ?? [];
  const approved = reviews?.filter((r) => r.approved) ?? [];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-2">
            Admin
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-ink">
            Reviews
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={load} className="btn-ghost">
            Refresh
          </button>
          <button onClick={logout} className="btn-secondary">
            Sign out
          </button>
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-500 dark:text-red-400">{error}</div>
      )}

      {reviews === null ? (
        <div className="text-sm text-ink-muted">Loading…</div>
      ) : (
        <>
          <ReviewGroup
            title="Pending approval"
            subtitle={`${pending.length} ${
              pending.length === 1 ? "review" : "reviews"
            } awaiting your decision`}
            reviews={pending}
            busyId={busyId}
            onApprove={(id) => setApproved(id, true)}
            onDelete={remove}
            emptyLabel="Nothing pending. Inbox zero."
          />
          <ReviewGroup
            title="Approved"
            subtitle={`${approved.length} live on /reviews`}
            reviews={approved}
            busyId={busyId}
            onUnapprove={(id) => setApproved(id, false)}
            onDelete={remove}
            emptyLabel="No approved reviews yet."
          />
        </>
      )}
    </div>
  );
}

function ReviewGroup({
  title,
  subtitle,
  reviews,
  busyId,
  onApprove,
  onUnapprove,
  onDelete,
  emptyLabel,
}: {
  title: string;
  subtitle: string;
  reviews: Review[];
  busyId: string | null;
  onApprove?: (id: string) => void;
  onUnapprove?: (id: string) => void;
  onDelete: (id: string) => void;
  emptyLabel: string;
}) {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-lg font-semibold tracking-tight text-ink">
          {title}
        </h2>
        <p className="text-xs text-ink-muted mt-1">{subtitle}</p>
      </div>

      {reviews.length === 0 ? (
        <div className="surface-card p-6 text-sm text-ink-muted">
          {emptyLabel}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((r) => (
            <AdminReviewRow
              key={r.id}
              review={r}
              busy={busyId === r.id}
              onApprove={onApprove ? () => onApprove(r.id) : undefined}
              onUnapprove={onUnapprove ? () => onUnapprove(r.id) : undefined}
              onDelete={() => onDelete(r.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function AdminReviewRow({
  review,
  busy,
  onApprove,
  onUnapprove,
  onDelete,
}: {
  review: Review;
  busy: boolean;
  onApprove?: () => void;
  onUnapprove?: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="surface-card p-5 md:p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-sm font-semibold text-ink">{review.name}</div>
          {review.role && (
            <div className="text-xs text-ink-muted mt-0.5">{review.role}</div>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-ink-muted">
          <span>{review.rating} / 5</span>
          <span>·</span>
          <time dateTime={review.createdAt}>
            {new Date(review.createdAt).toLocaleString()}
          </time>
        </div>
      </div>

      <p className="text-sm md:text-[0.95rem] text-ink/90 leading-relaxed whitespace-pre-wrap">
        {review.body}
      </p>

      <div className="flex items-center gap-2 flex-wrap pt-1">
        {onApprove && (
          <button
            onClick={onApprove}
            disabled={busy}
            className="btn-primary !py-1.5 !px-3 text-xs disabled:opacity-60"
          >
            Approve
          </button>
        )}
        {onUnapprove && (
          <button
            onClick={onUnapprove}
            disabled={busy}
            className="btn-secondary !py-1.5 !px-3 text-xs disabled:opacity-60"
          >
            Unapprove
          </button>
        )}
        <button
          onClick={onDelete}
          disabled={busy}
          className="btn-ghost text-red-500 dark:text-red-400 hover:opacity-70 text-xs"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
