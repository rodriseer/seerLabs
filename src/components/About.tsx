import Image from "next/image";
import { AnimateIn } from "./AnimateIn";

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <AnimateIn className="md:col-span-4">
            <div className="md:sticky md:top-24">
              <div className="relative w-full max-w-[280px] aspect-square rounded-2xl overflow-hidden border border-ink/[0.08] dark:border-white/[0.08]">
                <Image
                  src="/profile.jpg"
                  alt="Rodrigo Seer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 60vw, 280px"
                />
              </div>
            </div>
          </AnimateIn>

          <AnimateIn delay={100} className="md:col-span-8">
            <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-4">
              About
            </div>
            <h2 className="tracking-tighter-2 text-3xl md:text-4xl lg:text-5xl font-semibold text-ink">
              Rodrigo Seer.
              <br />
              <span className="text-ink-muted">Founder, Seer Labs.</span>
            </h2>

            <div className="mt-8 space-y-5 text-base md:text-lg text-ink/85 leading-relaxed">
              <p>
                I&apos;m an Information Science student and the founder of Seer
                Labs, a small studio building data-driven products for the
                outdoors and custom software for businesses that need something
                better than a template.
              </p>
              <p>
                My focus is systems that actually ship: marine forecasting with
                SurfSeer, ride scoring with CycleSeer, camp-night windows with
                CampSeer. The same craft applies to client work: reservation
                engines, distance-based pricing, conversion-focused sites.
              </p>
              <p>
                I care about clarity over cleverness, real-world impact over
                pixel-perfect demos, and building software people come back to.
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
