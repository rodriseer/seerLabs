import type { Metadata } from "next";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Start a project | Seer Labs",
  description:
    "Tell Rodrigo Seer what you're building — fill out a short brief and get a reply within a day.",
};

export default function StartAProjectPage() {
  return (
    <div className="relative">
      <section className="relative pt-32 md:pt-40 pb-10 md:pb-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-4">
              Start a project
            </div>
            <h1 className="tracking-tighter-2 text-4xl md:text-5xl lg:text-6xl font-semibold text-ink leading-[1.05]">
              Tell me what you&apos;re
              <br />
              <span className="text-ink-muted">building.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-ink-muted leading-relaxed max-w-xl">
              A quick brief is all I need to figure out if we&apos;re a fit and
              give you a real answer on scope and timing. I read every one and
              get back within a day.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="relative pb-20 md:pb-28">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <AnimateIn delay={120}>
            <InquiryForm />
          </AnimateIn>

          <AnimateIn delay={200}>
            <div className="mt-8 text-sm text-ink-muted">
              Prefer a different channel?{" "}
              <Link
                href="/contact"
                className="text-ink underline underline-offset-4 decoration-ink-muted/40 hover:decoration-ink transition-colors"
              >
                See all ways to reach me
              </Link>
              .
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
