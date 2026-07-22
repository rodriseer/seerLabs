import Link from "next/link";
import { AnimateIn } from "./AnimateIn";

export function CTASection() {
  return (
    <section id="contact-cta" className="relative py-20 md:py-28 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <AnimateIn>
          <div className="border-t border-ink/[0.08] dark:border-white/[0.08] pt-16 md:pt-20">
            <div className="max-w-3xl">
              <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-4">
                Let&apos;s talk
              </div>
              <h2 className="tracking-tighter-2 text-4xl md:text-5xl lg:text-6xl font-semibold text-ink leading-[1.05]">
                Let&apos;s build something
                <br />
                <span className="text-ink-muted">people actually use.</span>
              </h2>
              <p className="mt-6 text-base md:text-lg text-ink-muted max-w-xl leading-relaxed">
                Hiring? Need a site, a product, or a real system built?
                I&apos;m available for client projects and open to full-time
                roles where I can ship.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link href="/start-a-project" className="btn-primary">
                  Start a project
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
                <a
                  href="https://www.linkedin.com/in/rodrigo-seer-a692a0328/?skipRedirect=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                <Link
                  href="/reviews"
                  className="btn-ghost text-ink-muted hover:text-ink ml-1"
                >
                  See what people are saying
                </Link>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
