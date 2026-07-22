import type { Metadata } from "next";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "How I Build | Seer Labs",
  description:
    "The craft behind Seer Labs: real-time API integrations, full-stack development, UX-focused design, and turning complex data into simple systems.",
};

const PILLARS = [
  {
    num: "01",
    title: "Real-time API integrations",
    description:
      "Marine models, weather forecasts, geolocation, and payments. External data stitched into responsive product experiences.",
  },
  {
    num: "02",
    title: "Full-stack development",
    description:
      "From database schema to deployed UI. Next.js, TypeScript, Postgres, Vercel. Architecture that holds up as projects grow.",
  },
  {
    num: "03",
    title: "UX-focused design",
    description:
      "I design before I code. Wireframes, typography, motion. Every surface considered, every tap intentional.",
  },
  {
    num: "04",
    title: "Complex data, simple systems",
    description:
      "Scoring engines, reservation logic, pricing-by-distance. I turn messy data into clear answers users trust.",
  },
];

const STACK = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Postgres",
  "Prisma",
  "Vercel",
  "Python",
  "Node.js",
];

export default function HowIBuildPage() {
  return (
    <div className="relative">
      <section className="relative pt-32 md:pt-40 pb-10 md:pb-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeader
            as="h1"
            eyebrow="How I build"
            title="From complex data to software people rely on."
            description="A handful of principles I come back to on every project, whether it's a forecasting product or a client website."
          />
        </div>
      </section>

      <section className="relative pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {PILLARS.map((p, i) => (
              <AnimateIn key={p.title} delay={i * 80}>
                <div className="surface-card p-7 md:p-8 h-full">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-[0.7rem] tracking-[0.16em] text-ink-muted">
                      {p.num}
                    </span>
                    <div className="h-px flex-1 bg-ink/[0.08] dark:bg-white/[0.08]" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-[0.95rem] text-ink-muted leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-6xl mx-auto" />

      <section className="relative py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <div className="grid md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-4">
                <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-3">
                  Stack
                </div>
                <h2 className="tracking-tighter-2 text-2xl md:text-3xl font-semibold text-ink">
                  Tools I reach for.
                </h2>
              </div>
              <div className="md:col-span-8">
                <div className="flex flex-wrap gap-2">
                  {STACK.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm rounded-md border border-ink/[0.1] dark:border-white/[0.12] text-ink-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-ink-muted leading-relaxed max-w-xl">
                  I pick tools for the job, not the hype. Most projects start
                  in Next.js with TypeScript and Tailwind, backed by Postgres.
                  Python joins when the work is data- or ML-flavored.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <div className="section-divider max-w-6xl mx-auto" />

      <section className="relative py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="tracking-tighter-2 text-3xl md:text-4xl font-semibold text-ink leading-[1.05]">
                  Curious how I&apos;d approach your project?
                </h2>
                <p className="mt-4 text-ink-muted text-base md:text-lg leading-relaxed">
                  Send me a note. Happy to sketch an approach before you
                  commit to anything.
                </p>
              </div>
              <Link href="/contact" className="btn-primary self-start">
                Get in touch
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
