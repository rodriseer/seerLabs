import { Metadata } from "next";
import { HeroBanner } from "@/components/HeroBanner";
import { Section } from "@/components/Section";
import { AnimateIn } from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "CycleSeer | Seer Labs",
  description:
    "Cycling route scoring by surface, traffic, and scenery. Find the best rides.",
  openGraph: {
    title: "CycleSeer | Seer Labs",
    description:
      "Cycling route scoring by surface, traffic, and scenery. Find the best rides.",
    images: ["/images/og-placeholder.png"],
  },
};

const HIGHLIGHTS = [
  "Route scoring for surface quality and traffic",
  "Scenery and elevation factored into scores",
  "Mobile-first UX for planning on the go",
  "APIs and data pipelines for reliable scoring",
  "Deployed for fast, real-time route lookup",
];

export default function CycleSeerPage() {
  return (
    <>
      <HeroBanner
        src="/images/cycleseer.jpg"
        alt="Cycling and outdoor landscape"
        headline="CycleSeer"
        subline="Cycling route scoring"
      />
      <Section>
        <AnimateIn>
          <p className="text-lg text-charcoal-muted max-w-2xl leading-relaxed mb-10">
            CycleSeer scores cycling routes by surface type, traffic, and scenery
            so you can find the best rides. Plan from your phone or desktop with a
            simple, focused experience built for riders.
          </p>
          <ul className="space-y-3 mb-12">
            {HIGHLIGHTS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-charcoal-muted"
              >
<span className="text-charcoal mt-1.5 shrink-0" aria-hidden>
                •
              </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="https://cycleseer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-subtle-hover inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-charcoal rounded-md hover:bg-charcoal/90 transition-all duration-200"
          >
            Open CycleSeer
          </a>
        </AnimateIn>
      </Section>
    </>
  );
}
