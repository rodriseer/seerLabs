import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { AnimateIn } from "@/components/AnimateIn";
import { SectionHeader } from "@/components/SectionHeader";
import { SERVICES, getFeaturedProjects } from "@/lib/projects";
import { CONTACT_EMAIL, mailtoHref } from "@/lib/contact";

type EngagementStep = {
  index: string;
  title: string;
  body: string;
};

const ENGAGEMENT_STEPS: EngagementStep[] = [
  {
    index: "01",
    title: "Tell me about your project",
    body: "A short intake call or email thread. I learn your business, your users, and what you're trying to move.",
  },
  {
    index: "02",
    title: "Free quote and scope",
    body: "A written proposal with fixed milestones, timeline, and price. No obligation, no surprise invoices.",
  },
  {
    index: "03",
    title: "Phased build",
    body: "We ship in phases. Working software at the end of every one, so you can see progress — not a slide deck.",
  },
  {
    index: "04",
    title: "Handoff and support",
    body: "Clean code, documentation, and optional ongoing support if you want me around after launch.",
  },
];

type Principle = {
  index: string;
  title: string;
  body: string;
};

const PRINCIPLES: Principle[] = [
  {
    index: "01",
    title: "Outcomes over output.",
    body: "I optimize for the result your business actually needs. Fewer features, clearer wins, software that moves a real number.",
  },
  {
    index: "02",
    title: "Fewer, better pieces.",
    body: "Small, composable systems you can maintain without me. Clean code, typed interfaces, predictable deploys.",
  },
  {
    index: "03",
    title: "Honest timelines.",
    body: "Scoped phases, fixed milestones, working software at the end of every one. No vague promises, no surprise invoices.",
  },
];

type TrustMarker = { label: string };

const TRUST_MARKERS: TrustMarker[] = [
  { label: "Reply within 24 hours" },
  { label: "Free quote, fixed milestones" },
  { label: "Available for remote work globally" },
];

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <Hero />

      {/* WHAT I BUILD — explicit service categories */}
      <section className="relative py-20 md:py-28 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="What I build"
            title="Software made for your business, not configured from a template."
            description="A few categories I focus on. If what you need looks like one of these, we'll probably fit."
          />

          <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {SERVICES.map((service, i) => (
              <AnimateIn key={service.id} delay={i * 80}>
                <div className="premium-card p-7 md:p-8 h-full">
                  <span className="shine" aria-hidden />
                  <div className="relative z-[2]">
                    <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-4">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-ink">
                      {service.label}
                    </h3>
                    <p className="mt-3 text-sm md:text-[0.95rem] text-ink-muted leading-relaxed">
                      {service.blurb}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-6xl mx-auto" />

      {/* FEATURED CLIENT PROJECTS — proof of capability */}
      <section className="relative py-20 md:py-28 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Featured client work"
            title="Real businesses. Real production software."
            description="A few recent builds. Each one started as a problem a client couldn't solve with off-the-shelf tools."
          />

          <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {featured.map((project, i) => (
              <AnimateIn key={project.slug} delay={i * 90}>
                <Link
                  href={`/client-work/${project.slug}`}
                  className="group surface-card overflow-hidden flex flex-col h-full"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink/[0.04] dark:bg-white/[0.04] border-b border-ink/[0.06] dark:border-white/[0.06]">
                    <Image
                      src={project.imageSrc}
                      alt={project.imageAlt}
                      fill
                      className="object-cover object-top img-hover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <div className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted mb-3">
                      {project.client}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink leading-snug">
                      {project.outcome}
                    </h3>
                    <div className="mt-auto pt-6 flex items-center justify-between text-sm text-ink-muted">
                      <span>{project.tags.slice(0, 3).join(" · ")}</span>
                      <span className="text-ink group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                        Read case study
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 12h14M13 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>

          <div className="mt-10 md:mt-12 flex justify-center">
            <Link
              href="/client-work"
              className="btn-ghost"
            >
              See all client work
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
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
        </div>
      </section>

      <div className="section-divider max-w-6xl mx-auto" />

      {/* HOW WE'LL WORK TOGETHER — engagement model */}
      <section className="relative py-20 md:py-28 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="How we'll work together"
            title="From first email to live software, in four steps."
            description="No agency song-and-dance. Phased work, written quotes, working software at the end of every milestone."
          />

          <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {ENGAGEMENT_STEPS.map((step, i) => (
              <AnimateIn key={step.index} delay={i * 70}>
                <div className="surface-card p-6 md:p-7 h-full">
                  <div className="flex items-start justify-between mb-5">
                    <span className="display-numeral">{step.index}</span>
                    <span className="mt-2 inline-flex h-px w-10 bg-gradient-to-r from-ink/30 to-transparent dark:from-white/40" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold tracking-tight text-ink leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-6xl mx-auto" />

      {/* PRINCIPLES — what it feels like to work with me */}
      <section className="relative py-20 md:py-28 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="The way I work"
            title="What it feels like to work with me."
            description="A short list of things I care about, and what you can expect when we ship something together."
          />

          <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/[0.08] dark:bg-white/[0.08] border border-ink/[0.08] dark:border-white/[0.08] rounded-2xl overflow-hidden">
            {PRINCIPLES.map((p) => (
              <div
                key={p.index}
                className="group relative bg-bg p-8 md:p-10 flex flex-col h-full transition-colors duration-500 hover:bg-surface"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="display-numeral">{p.index}</span>
                  <span className="mt-3 inline-flex h-px w-12 bg-gradient-to-r from-ink/30 to-transparent dark:from-white/40" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-ink leading-tight">
                  {p.title}
                </h3>
                <p className="mt-4 text-sm md:text-[0.95rem] text-ink-muted leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-6xl mx-auto" />

      {/* LABS STRIP — demoted products */}
      <section className="relative py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <Link
              href="/products"
              className="group surface-card p-7 md:p-9 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
            >
              <div>
                <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-2">
                  Seer Labs
                </div>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-ink">
                  Also: I build my own products.
                </h3>
                <p className="mt-2 text-sm md:text-[0.95rem] text-ink-muted leading-relaxed max-w-xl">
                  SurfSeer, CycleSeer, CampSeer — forecasting and scoring tools
                  for the outdoors. The lab where I try ideas before they
                  become client work.
                </p>
              </div>
              <span className="text-ink group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-2 text-sm font-medium shrink-0">
                Explore Labs
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* START A PROJECT CTA */}
      <section className="relative pb-24 md:pb-32 pt-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="ambient-panel relative overflow-hidden rounded-3xl bg-[#0a0a0c] text-white p-10 md:p-16 lg:p-20 border border-white/[0.08] shadow-[0_30px_120px_-20px_rgba(0,0,0,0.6)]">
            {/* animated ambient glow + subtle dot grid + fine grain overlay */}
            <div aria-hidden className="dot-grid absolute inset-0 pointer-events-none opacity-70" />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              }}
            />

            <div className="relative z-[1] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-white/70 mb-6">
                  <span className="relative inline-flex w-1.5 h-1.5">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Open for new work
                </div>
                <h2 className="tracking-tighter-2 text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] font-semibold text-white">
                  Tell me what you&apos;re building.
                </h2>
                <p className="mt-6 md:mt-8 text-base md:text-lg text-white/75 leading-relaxed max-w-xl">
                  Send me a few sentences about your project. I&apos;ll tell
                  you how I&apos;d build it, what it would take, and what it
                  would cost. Quotes are free. No obligation.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link
                    href="/start-a-project"
                    className="btn-magnetic inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-accent text-accent-fg text-sm font-medium hover:bg-accent-strong shadow-[0_12px_36px_-8px_rgba(79,70,229,0.55)]"
                  >
                    Get a free quote
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="opacity-80"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="/client-work"
                    className="btn-magnetic inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-white/10 text-white text-sm font-medium border border-white/25 backdrop-blur-md hover:bg-white/20"
                  >
                    See client work
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-white/[0.08]">
                <div className="text-[0.7rem] uppercase tracking-[0.22em] text-white/60 mb-5">
                  What you get
                </div>
                <ul className="flex flex-col gap-4">
                  {TRUST_MARKERS.map((m) => (
                    <li
                      key={m.label}
                      className="flex items-start gap-3 text-sm md:text-[0.95rem] text-white/85"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="mt-0.5 shrink-0 text-emerald-400"
                      >
                        <path
                          d="M5 12l5 5L20 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {m.label}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-white/[0.08]">
                  <div className="text-[0.7rem] uppercase tracking-[0.22em] text-white/60 mb-2">
                    Prefer email?
                  </div>
                  <a
                    href={mailtoHref({ subject: "Project inquiry" })}
                    className="text-sm md:text-[0.95rem] text-white hover:text-white/80 transition-colors break-words"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
