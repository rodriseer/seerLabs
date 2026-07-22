import type { Metadata } from "next";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { CONTACT_EMAIL, mailtoHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact | Seer Labs",
  description:
    "Hiring or need a site, product, or system built? Get in touch with Rodrigo Seer.",
};

const CHANNELS = [
  {
    label: "Email",
    value: CONTACT_EMAIL,
    href: mailtoHref({
      subject: "Project inquiry",
      body: "Hi Rodrigo,\n\nI'm working on ",
    }),
    hint: "Best for project inquiries.",
  },
  {
    label: "Phone",
    value: "(240) 713-0122",
    href: "tel:+12407130122",
    hint: "Call or text for a quick chat.",
  },
  {
    label: "LinkedIn",
    value: "Rodrigo Seer",
    href: "https://www.linkedin.com/in/rodrigo-seer-a692a0328/?skipRedirect=true",
    hint: "For recruiters and formal intros.",
  },
  {
    label: "GitHub",
    value: "@rodriseer",
    href: "https://github.com/rodriseer",
    hint: "Peek at the code.",
  },
  {
    label: "Instagram",
    value: "@rodrigoseer.dev",
    href: "https://www.instagram.com/rodrigoseer.dev/",
    hint: "Behind the scenes and ship logs.",
  },
];

export default function ContactPage() {
  return (
    <div className="relative">
      <section className="relative pt-32 md:pt-40 pb-10 md:pb-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-4">
              Let&apos;s talk
            </div>
            <h1 className="tracking-tighter-2 text-4xl md:text-5xl lg:text-6xl font-semibold text-ink leading-[1.05]">
              Let&apos;s build something
              <br />
              <span className="text-ink-muted">people actually use.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-ink-muted leading-relaxed max-w-xl">
              Hiring? Need a site, a product, or a real system built? I&apos;m
              available for client projects and open to full-time roles where I
              can ship.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="relative pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {CHANNELS.map((c, i) => (
              <AnimateIn key={c.label} delay={i * 80}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    c.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="group surface-card p-6 md:p-7 flex flex-col h-full"
                >
                  <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-3">
                    {c.label}
                  </div>
                  <div className="text-base md:text-lg font-semibold tracking-tight text-ink break-words leading-snug">
                    {c.value}
                  </div>
                  <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                    {c.hint}
                  </p>
                  <div className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm text-ink-muted group-hover:text-ink transition-colors">
                    Open
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      <path
                        d="M7 17L17 7M17 7H8M17 7V16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </a>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={240}>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <Link href="/start-a-project" className="btn-primary">
                Start a project
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
              <Link href="/reviews" className="btn-secondary">
                See what people are saying
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
