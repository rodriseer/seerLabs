import type { Metadata } from "next";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Client Work | Seer Labs",
  description:
    "Custom software built for real businesses by Rodrigo Seer: reservation systems, bilingual business sites, internal tools, and conversion-focused experiences.",
};

export default function ClientWorkPage() {
  return (
    <div className="relative">
      <section className="relative pt-32 md:pt-40 pb-10 md:pb-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeader
            as="h1"
            eyebrow="Client work"
            title="Custom software, built for real businesses."
            description="Booking systems, business websites, internal tools. Each project started as a problem a client couldn't solve with off-the-shelf software."
          />
        </div>
      </section>

      <section className="relative pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {PROJECTS.map((project, i) => (
              <AnimateIn key={project.slug} delay={i * 100}>
                <ProjectCard
                  title={project.title}
                  client={project.client}
                  description={project.description}
                  highlights={project.highlights}
                  imageSrc={project.imageSrc}
                  imageAlt={project.imageAlt}
                  liveHref={project.liveHref}
                  caseStudyHref={`/client-work/${project.slug}`}
                  tags={project.tags}
                  reverse={i % 2 === 1}
                />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-6xl mx-auto" />

      <section className="relative py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-xl">
                <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-3">
                  Have a similar problem?
                </div>
                <h2 className="tracking-tighter-2 text-3xl md:text-4xl font-semibold text-ink leading-[1.05]">
                  Tell me what you&apos;re building.
                </h2>
                <p className="mt-4 text-ink-muted text-base md:text-lg leading-relaxed">
                  Send me a few sentences about your project. I&apos;ll tell
                  you how I&apos;d build it, what it would take, and what it
                  would cost. Free quote, no obligation.
                </p>
              </div>
              <Link
                href="/start-a-project"
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
    </div>
  );
}
