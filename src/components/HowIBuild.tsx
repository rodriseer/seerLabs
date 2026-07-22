import { AnimateIn } from "./AnimateIn";

const PILLARS = [
  {
    title: "Real-time API integrations",
    description:
      "Marine models, weather forecasts, geolocation, and payments. External data stitched into responsive product experiences.",
  },
  {
    title: "Full-stack development",
    description:
      "From database schema to deployed UI. Next.js, TypeScript, Postgres, Vercel. Architecture that holds up as projects grow.",
  },
  {
    title: "UX-focused design",
    description:
      "I design before I code. Wireframes, typography, motion. Every surface considered, every tap intentional.",
  },
  {
    title: "Complex data, simple systems",
    description:
      "Scoring engines, reservation logic, pricing-by-distance. I turn messy data into clear answers users trust.",
  },
];

export function HowIBuild() {
  return (
    <section id="how-i-build" className="relative py-20 md:py-28 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <AnimateIn>
          <div className="max-w-2xl">
            <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-4">
              How I build
            </div>
            <h2 className="tracking-tighter-2 text-3xl md:text-4xl lg:text-5xl font-semibold text-ink">
              From complex data to software people rely on.
            </h2>
          </div>
        </AnimateIn>

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {PILLARS.map((p, i) => (
            <AnimateIn key={p.title} delay={i * 80}>
              <div className="relative pl-8">
                <span className="absolute left-0 top-1.5 text-[0.7rem] tracking-[0.12em] text-ink-muted">
                  0{i + 1}
                </span>
                <h3 className="text-base md:text-lg font-semibold tracking-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm md:text-[0.95rem] text-ink-muted leading-relaxed">
                  {p.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
