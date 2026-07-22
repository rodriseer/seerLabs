"use client";

import Link from "next/link";

/**
 * Route-level error boundary. If a client component throws during render or
 * hydration, this shows a recoverable UI (with a retry) instead of a blank
 * page — so a transient failure never leaves visitors staring at nothing.
 */
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-4">
          Something glitched
        </div>
        <h1 className="tracking-tighter-2 text-3xl md:text-4xl font-semibold text-ink leading-[1.05]">
          This page didn&apos;t load right.
        </h1>
        <p className="mt-4 text-ink-muted leading-relaxed">
          A quick reload usually fixes it. If it keeps happening, email me at{" "}
          <a
            href="mailto:rodrigoseer.dev@gmail.com"
            className="text-ink underline underline-offset-4 decoration-ink-muted/40 hover:decoration-ink transition-colors"
          >
            rodrigoseer.dev@gmail.com
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={reset} className="btn-primary">
            Try again
          </button>
          <Link href="/" className="btn-secondary">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
