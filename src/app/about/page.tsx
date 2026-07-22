import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "About | Seer Labs",
  description:
    "Rodrigo Seer: Information Science student and founder of Seer Labs. Building data-driven tools and custom software.",
};

export default function AboutPage() {
  return (
    <div className="relative">
      <section className="relative pt-32 md:pt-40 pb-10 md:pb-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeader
            as="h1"
            wide
            eyebrow="About"
            title="Rodrigo Seer. Founder, Seer Labs."
            description="Information Science student, independent developer, and the person behind every product and project on this site."
          />
        </div>
      </section>

      <section className="relative pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
            <AnimateIn className="md:col-span-5 lg:col-span-4">
              <div className="relative w-full max-w-[360px] aspect-square rounded-2xl overflow-hidden border border-ink/[0.08] dark:border-white/[0.08]">
                <Image
                  src="/profile.jpg"
                  alt="Rodrigo Seer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 360px"
                />
              </div>
            </AnimateIn>

            <AnimateIn delay={120} className="md:col-span-7 lg:col-span-8">
              <div className="space-y-5 text-base md:text-lg text-ink/90 leading-relaxed">
                <p>
                  I&apos;m an Information Science student and the founder of Seer Labs, a small studio building data-driven products for the outdoors and custom software for businesses that need something better than a template.
                </p>
                <p>
                  My focus is systems that actually ship: marine forecasting with SurfSeer, ride scoring with CycleSeer, camp-night windows with CampSeer. The same craft applies to client work: reservation engines, distance-based pricing, conversion-focused sites.
                </p>
                <p>
                  I care about clarity over cleverness, real-world impact over pixel-perfect demos, and building software people come back to.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link href="/contact" className="btn-primary">
                  Get in touch
                </Link>
                <Link href="/how-i-build" className="btn-secondary">
                  How I build
                </Link>
                <a
                  href="https://github.com/rodriseer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-ink-muted hover:text-ink"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/rodrigo-seer-a692a0328/?skipRedirect=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-ink-muted hover:text-ink"
                >
                  LinkedIn
                </a>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </div>
  );
}
