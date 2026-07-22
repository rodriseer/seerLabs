"use client";

import { useEffect, useState } from "react";
import { CONTACT_EMAIL, mailtoHref } from "@/lib/contact";

const PROJECT_TYPES = [
  "Website / landing page",
  "Product / web app",
  "Custom system or integration",
  "Full-time role",
  "Other",
];

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "mailto" }
  | { kind: "error"; message: string };

export function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // Prefill from URL params so CTAs can carry context.
  //   ?type=Product / web app        -> preselects the project type
  //   ?ref=Open Door DMV             -> seeds the message with case-study context
  // Read from window (not useSearchParams) to avoid a Suspense boundary
  // requirement on statically generated pages.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const ref = params.get("ref");
    if (type && PROJECT_TYPES.includes(type)) {
      setProjectType(type);
    }
    if (ref) {
      setMessage(
        `I saw your ${ref} case study and I'm interested in something similar.\n\n`
      );
    }
  }, []);

  /** A prefilled email draft with everything the form captured. */
  function buildMailto(): string {
    const subject = `Project inquiry — ${projectType}${
      name ? ` (${name})` : ""
    }`;
    const body = [
      `Name: ${name || "—"}`,
      `Email: ${email || "—"}`,
      `Project type: ${projectType}`,
      "",
      message || "",
    ].join("\n");
    return mailtoHref({ subject, body });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot: if a bot fills this hidden field, silently "succeed" and drop.
    const botcheck = (
      e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null
    )?.value;
    if (botcheck) {
      setStatus({ kind: "success" });
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    // No inbox integration configured → still fully functional: open the
    // visitor's email app with a prefilled draft addressed to Rodrigo.
    if (!accessKey) {
      window.location.href = buildMailto();
      setStatus({ kind: "mailto" });
      return;
    }

    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Project inquiry — ${projectType}${
            name ? ` (${name})` : ""
          }`,
          from_name: "Seer Labs site",
          replyto: email,
          name,
          email,
          project_type: projectType,
          message,
          botcheck: "",
        }),
      });
      const data = (await res.json()) as { success?: boolean; message?: string };
      if (!res.ok || !data.success) {
        setStatus({
          kind: "error",
          message:
            data.message ||
            "Something went wrong sending your message. You can email me directly instead.",
        });
        return;
      }
      setStatus({ kind: "success" });
      setName("");
      setEmail("");
      setProjectType(PROJECT_TYPES[0]);
      setMessage("");
    } catch {
      setStatus({
        kind: "error",
        message:
          "Network error — your message didn't send. You can email me directly instead.",
      });
    }
  }

  // --- Success (sent straight to inbox via Web3Forms) ---
  if (status.kind === "success") {
    return (
      <div
        id="inquiry"
        className="surface-card p-6 md:p-8 scroll-mt-32"
        role="status"
      >
        <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-3">
          Sent
        </div>
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-ink">
          Got it — thanks for reaching out.
        </h3>
        <p className="mt-3 text-sm md:text-base text-ink-muted leading-relaxed">
          Your inquiry just landed in my inbox. I read every one and get back
          within a day.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-6 btn-ghost"
        >
          Send another
        </button>
      </div>
    );
  }

  // --- Mailto handoff (no inbox integration configured) ---
  if (status.kind === "mailto") {
    return (
      <div
        id="inquiry"
        className="surface-card p-6 md:p-8 scroll-mt-32"
        role="status"
      >
        <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-3">
          Almost there
        </div>
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-ink">
          Your email app should have opened.
        </h3>
        <p className="mt-3 text-sm md:text-base text-ink-muted leading-relaxed">
          Your message is drafted and ready — just hit send. If nothing opened,
          email me directly at{" "}
          <a
            href={buildMailto()}
            className="text-ink underline underline-offset-4 decoration-ink-muted/40 hover:decoration-ink transition-colors break-words"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href={buildMailto()} className="btn-primary">
            Reopen email draft
          </a>
          <button
            type="button"
            onClick={() => setStatus({ kind: "idle" })}
            className="btn-ghost"
          >
            Back to form
          </button>
        </div>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form
      id="inquiry"
      onSubmit={onSubmit}
      className="surface-card p-6 md:p-8 flex flex-col gap-5 scroll-mt-32"
    >
      <div>
        <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-2">
          Get a free quote
        </div>
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-ink">
          Tell me what you&apos;re building.
        </h3>
        <p className="mt-2 text-sm md:text-base text-ink-muted leading-relaxed">
          Fill this out and I&apos;ll get back within a day with how I&apos;d
          build it, what it would take, and what it would cost. Free quote, no
          obligation.
        </p>
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
          <span className="text-xs text-ink-muted">Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={120}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="review-input"
            disabled={submitting}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs text-ink-muted">Project type</span>
        <select
          name="project_type"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          className="review-input"
          disabled={submitting}
        >
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs text-ink-muted">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What are you building, what's the timeline, what does done look like?"
          className="review-input resize-y min-h-[140px]"
          disabled={submitting}
        />
        <span className="text-[0.7rem] text-ink-muted/80">
          {message.length}/2000
        </span>
      </label>

      {/* Honeypot field — hidden from humans, bots tend to fill it. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
        autoComplete="off"
      />

      {status.kind === "error" && (
        <div
          role="alert"
          className="text-sm text-red-500 dark:text-red-400 border border-red-500/30 rounded-lg px-4 py-3 flex flex-col gap-2"
        >
          <span>{status.message}</span>
          <a
            href={buildMailto()}
            className="inline-flex w-fit items-center gap-1.5 text-ink underline underline-offset-4 decoration-ink-muted/40 hover:decoration-ink transition-colors"
          >
            Email me directly instead →
          </a>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending..." : "Send inquiry"}
          {!submitting && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
        <span className="text-xs text-ink-muted">
          Reply within a day. Prefer email?{" "}
          <a
            href={mailtoHref({ subject: "Project inquiry" })}
            className="underline underline-offset-2 hover:text-ink transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
        </span>
      </div>
    </form>
  );
}
