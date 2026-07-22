"use client";

import { useState } from "react";
import { CONTACT_EMAIL, mailtoHref } from "@/lib/contact";

export function ReviewForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "submitting" }
    | { kind: "success" }
    | { kind: "error"; errors: string[] }
  >({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot: if a bot filled the hidden field, silently "succeed" and drop.
    const botcheck = (
      e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null
    )?.value;
    if (botcheck) {
      setStatus({ kind: "success" });
      return;
    }

    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, rating, body, botcheck: "" }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus({
          kind: "error",
          errors: data.errors || [data.error || "Something went wrong."],
        });
        return;
      }
      setStatus({ kind: "success" });
      setName("");
      setRole("");
      setRating(5);
      setBody("");
    } catch {
      setStatus({
        kind: "error",
        errors: ["Network error. Please try again, or email your review."],
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="surface-card p-6 md:p-8">
        <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-3">
          Thank you
        </div>
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-ink">
          Your review is in.
        </h3>
        <p className="mt-3 text-sm md:text-base text-ink-muted leading-relaxed">
          It landed with me directly. I read and approve each one myself before
          it goes live, so it may take a day to appear. Really appreciate you
          taking the time.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-6 btn-ghost"
        >
          Leave another review
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      className="surface-card p-6 md:p-8 flex flex-col gap-5"
    >
      <div>
        <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-2">
          Leave a review
        </div>
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-ink">
          Worked with me? Tell people.
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-ink-muted">Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            maxLength={80}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="review-input"
            disabled={submitting}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-ink-muted">
            Role / Company <span className="opacity-60">(optional)</span>
          </span>
          <input
            type="text"
            name="role"
            autoComplete="organization-title"
            maxLength={80}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Founder, 365 Events"
            className="review-input"
            disabled={submitting}
          />
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs text-ink-muted">Rating</span>
        <StarInput rating={rating} onChange={setRating} disabled={submitting} />
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs text-ink-muted">Your review</span>
        <textarea
          name="body"
          required
          minLength={10}
          maxLength={1200}
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="How was working together? What did we build? What changed?"
          className="review-input resize-y min-h-[120px]"
          disabled={submitting}
        />
        <span className="text-[0.7rem] text-ink-muted/80">
          {body.length}/1200
        </span>
      </label>

      {/* Honeypot — hidden from humans, bots tend to fill it. */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
      />

      {status.kind === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="text-sm text-red-500 dark:text-red-400 border border-red-500/30 rounded-lg px-4 py-3 flex flex-col gap-2"
        >
          <ul className="list-disc pl-5 space-y-1">
            {status.errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <a
            href={mailtoHref({
              subject: "Review for Seer Labs",
              body: `Rating: ${rating}/5\n\n${body}`,
            })}
            className="inline-flex w-fit items-center gap-1.5 text-ink underline underline-offset-4 decoration-ink-muted/40 hover:decoration-ink transition-colors"
          >
            Email your review instead →
          </a>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending..." : "Submit review"}
        </button>
        <span className="text-xs text-ink-muted">
          I read and approve each review myself before it goes public.
        </span>
      </div>
    </form>
  );
}

function StarInput({
  rating,
  onChange,
  disabled = false,
}: {
  rating: number;
  onChange: (n: number) => void;
  disabled?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-1"
      role="radiogroup"
      aria-label="Star rating"
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= rating;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={rating === n}
            disabled={disabled}
            onClick={() => onChange(n)}
            aria-label={`Rate ${n} out of 5`}
            className="p-1 rounded-md hover:bg-ink/[0.04] dark:hover:bg-white/[0.06] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={active ? "currentColor" : "none"}
              className={
                active
                  ? "text-amber-500 dark:text-amber-400"
                  : "text-ink-muted/60"
              }
            >
              <path
                d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.77l-5.9 3.1L7.23 14.1 2.45 9.44l6.6-.96L12 2.5z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        );
      })}
      <span className="ml-2 text-sm text-ink-muted">{rating} / 5</span>
    </div>
  );
}
