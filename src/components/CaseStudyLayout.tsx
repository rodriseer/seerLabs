import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "./AnimateIn";
import type { Project } from "@/lib/projects";

interface CaseStudyLayoutProps {
  project: Project;
  /** Next project in the sequence, for the "Next" link at the bottom */
  nextProject?: { slug: string; title: string; client: string } | null;
}

/**
 * Case study page template, client-problem-first.
 *
 * Every section is written from the client's point of view. The closing
 * CTA is explicit: "Have a similar problem? Tell me about your project."
 */
export function CaseStudyLayout({ project, nextProject }: CaseStudyLayoutProps) {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-14 md:pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-5">
              {project.client}
            </div>
            <h1 className="tracking-tighter-2 text-3xl md:text-5xl lg:text-[3.5rem] font-semibold text-ink leading-[1.05] max-w-3xl">
              {project.outcome}
            </h1>
            <p className="mt-6 md:mt-8 text-ink-muted text-base md:text-lg leading-relaxed max-w-2xl">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={project.liveHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Visit live site
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M17 7H8M17 7V16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <Link href="/client-work" className="btn-ghost">
                All client work
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="relative pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-ink/[0.06] dark:border-white/[0.06] bg-ink/[0.04] dark:bg-white/[0.04]">
              <Image
                src={project.imageSrc}
                alt={project.imageAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* THE PROBLEM */}
      {project.problem && project.problem.length > 0 && (
        <section className="relative py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <AnimateIn>
              <div className="eyebrow-accent mb-5">The problem</div>
              <div className="space-y-5 text-ink text-base md:text-lg leading-relaxed">
                {project.problem.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* AT A GLANCE */}
      {project.meta && (
        <section className="relative py-8 md:py-10">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <AnimateIn>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-ink/[0.08] dark:bg-white/[0.08] border border-ink/[0.08] dark:border-white/[0.08] rounded-2xl overflow-hidden">
                {project.meta.role && (
                  <div className="bg-bg p-6 md:p-7">
                    <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-2">
                      Role
                    </div>
                    <div className="text-sm md:text-base text-ink">
                      {project.meta.role}
                    </div>
                  </div>
                )}
                {project.meta.timeline && (
                  <div className="bg-bg p-6 md:p-7">
                    <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-2">
                      Timeline
                    </div>
                    <div className="text-sm md:text-base text-ink">
                      {project.meta.timeline}
                    </div>
                  </div>
                )}
                {project.meta.deliverables && (
                  <div className="bg-bg p-6 md:p-7">
                    <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-2">
                      Deliverables
                    </div>
                    <div className="text-sm md:text-base text-ink">
                      {project.meta.deliverables}
                    </div>
                  </div>
                )}
              </div>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* THE APPROACH */}
      {project.approach && project.approach.length > 0 && (
        <section className="relative py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <AnimateIn>
              <div className="eyebrow-accent mb-5">The approach</div>
              <div className="space-y-5 text-ink text-base md:text-lg leading-relaxed">
                {project.approach.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* WHAT I BUILT / FEATURES */}
      {project.features && project.features.length > 0 && (
        <section className="relative py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <AnimateIn>
              <div className="eyebrow-accent mb-5">What I built</div>
              <h2 className="tracking-tighter-2 text-2xl md:text-3xl font-semibold text-ink leading-tight max-w-2xl">
                The capabilities {project.client} now has.
              </h2>
            </AnimateIn>
            <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {project.features.map((feature, i) => (
                <AnimateIn key={feature.title} delay={i * 70}>
                  <div className="surface-card p-6 md:p-7 h-full">
                    <h3 className="text-base md:text-lg font-semibold tracking-tight text-ink">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                      {feature.body}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OUTCOME */}
      {project.outcomeDetail && (
        <section className="relative py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <AnimateIn>
              <div className="eyebrow-accent mb-5">The outcome</div>
              <p className="text-ink text-xl md:text-2xl leading-snug font-medium">
                {project.outcomeDetail}
              </p>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* STACK */}
      {project.stack && project.stack.length > 0 && (
        <section className="relative py-10 md:py-14">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <AnimateIn>
              <div className="eyebrow-accent mb-4">Stack</div>
              <div className="text-sm md:text-base text-ink-muted">
                {project.stack.join(" · ")}
              </div>
            </AnimateIn>
          </div>
        </section>
      )}

      <div className="section-divider max-w-6xl mx-auto" />

      {/* SALES CTA — "Have a similar problem?" */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-3">
                  Have a similar problem?
                </div>
                <h2 className="tracking-tighter-2 text-3xl md:text-4xl font-semibold text-ink leading-[1.05]">
                  Tell me what you&apos;re building.
                </h2>
                <p className="mt-4 text-ink-muted text-base md:text-lg leading-relaxed">
                  Send me a few sentences about your project. Free quote, no
                  obligation.
                </p>
              </div>
              <Link
                href={`/start-a-project?ref=${encodeURIComponent(
                  project.title
                )}`}
                className="btn-primary self-start"
              >
                Get a free quote
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

      {/* NEXT PROJECT */}
      {nextProject && (
        <section className="relative pb-24 md:pb-32">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateIn>
              <Link
                href={`/client-work/${nextProject.slug}`}
                className="group surface-card p-7 md:p-9 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
              >
                <div>
                  <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-2">
                    Next case study
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-ink">
                    {nextProject.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted">
                    {nextProject.client}
                  </p>
                </div>
                <span className="text-ink group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-2 text-sm font-medium shrink-0">
                  Read
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
      )}
    </div>
  );
}
