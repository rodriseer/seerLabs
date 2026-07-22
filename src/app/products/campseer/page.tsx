import { Metadata } from "next";
import { HeroBanner } from "@/components/HeroBanner";
import { Section } from "@/components/Section";
import { AnimateIn } from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "CampSeer | Seer Labs",
  description:
    "Find the best nights to camp with weather, night sky, and fire risk scores.",
  openGraph: {
    title: "CampSeer | Seer Labs",
    description:
      "Find the best nights to camp with weather, night sky, and fire risk scores.",
    images: ["/images/og-placeholder.png"],
  },
};

const HIGHLIGHTS = [
  "CampScore for weather, night sky, and fire risk",
  "Night sky scoring based on cloud cover and moon phase",
  "Fire safety ratings (LOW, MED, HIGH) for planning",
  "Search by location or find campgrounds near you",
  "Mobile-first UX for planning on the go",
];

export default function CampSeerPage() {
  return (
    <>
      <HeroBanner
        src="/images/campseer.jpeg"
        alt="Camping and night sky"
        headline="CampSeer"
        subline="Find the best nights to camp"
      />
      <Section>
        <AnimateIn>
          <p className="text-lg text-charcoal-muted max-w-2xl leading-relaxed mb-10">
            CampSeer brings together weather, night sky visibility, and fire risk
            in one score. Know before you camp, so you can plan around the clearest, safest
            nights for stargazing and outdoor adventures.
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
            href="https://campseer.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-subtle-hover inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-charcoal rounded-md hover:bg-charcoal/90 transition-all duration-200"
          >
            Open CampSeer
          </a>
        </AnimateIn>
      </Section>
    </>
  );
}
