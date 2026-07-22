import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative -mt-20 min-h-[96vh] flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/hero.jpeg"
        alt="Illustration of a laptop with floating code windows"
        fill
        priority
        className="object-cover object-left md:object-left -z-20"
        sizes="100vw"
      />

      {/* Scrim: strong darken on right where the text sits */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(270deg, rgba(6,5,14,0.96) 0%, rgba(6,5,14,0.92) 22%, rgba(6,5,14,0.70) 42%, rgba(6,5,14,0.30) 62%, rgba(6,5,14,0) 80%)",
        }}
      />
      {/* Vignette at bottom for content edge */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,5,14,0.2) 0%, rgba(6,5,14,0) 25%, rgba(6,5,14,0) 70%, rgba(6,5,14,0.9) 100%)",
        }}
      />
      {/* Fine grain */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative z-10 w-full">
        <div className="w-full px-6 md:px-10 lg:px-16 xl:px-24 py-20 md:py-24 lg:py-28 pt-32">
          <div className="md:ml-auto md:mr-0 md:max-w-md lg:max-w-md xl:max-w-lg text-left md:text-right">
            <div className="hero-text-animate inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-white/75 mb-6">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Seer Labs · Rodrigo Seer
            </div>

            <h1
              className="hero-text-animate-delay-1 tracking-tighter-2 text-[2.7rem] leading-[1.02] sm:text-5xl md:text-[3.5rem] lg:text-6xl xl:text-7xl font-semibold text-white"
              style={{
                textShadow:
                  "0 2px 14px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.35)",
              }}
            >
              Custom software,
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white/90 via-white/75 to-white/60">
                built for your business.
              </span>
            </h1>

            <p
              className="hero-text-animate-delay-2 mt-6 md:mt-7 md:ml-auto text-[0.95rem] md:text-base text-white/90 leading-relaxed"
              style={{
                textShadow: "0 1px 8px rgba(0,0,0,0.55)",
              }}
            >
              I build booking systems, business websites, and internal tools
              for companies that need software made for them — not configured
              from a template. Free quotes, scoped phases, working software at
              every milestone.
            </p>

            <div className="hero-text-animate-delay-3 mt-9 flex flex-wrap items-center gap-3 justify-start md:justify-end">
              <Link
                href="/start-a-project"
                className="btn-magnetic inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-accent text-accent-fg text-sm font-medium hover:bg-accent-strong shadow-[0_10px_30px_-6px_rgba(79,70,229,0.55)]"
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
                className="btn-magnetic inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-white/10 text-white text-sm font-medium border border-white/25 backdrop-blur-md hover:bg-white/20"
              >
                See client work
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-hint" aria-hidden>
        Scroll
      </div>
    </section>
  );
}
