import { Metadata } from "next";
import { HeroBanner } from "@/components/HeroBanner";
import { Section } from "@/components/Section";
import { AnimateIn } from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "SurfSeer | Seer Labs",
  description:
    "Marine forecasting and surf scores. Know when to go and when to stay home.",
  openGraph: {
    title: "SurfSeer | Seer Labs",
    description:
      "Marine forecasting and surf scores. Know when to go and when to stay home.",
    images: ["/images/og-placeholder.png"],
  },
};

const HIGHLIGHTS = [
  "Marine and weather APIs for accurate conditions",
  "Surf score and break quality scoring",
  "Mobile-first UX for checking from the beach",
  "Fast, reliable deployment for real-time data",
];

export default function SurfSeerPage() {
  return (
    <>
      <HeroBanner
        src="/images/surfseer.jpg"
        alt="Coastal shoreline"
        headline="SurfSeer"
        subline="Marine forecasting and surf scores"
      />
      <Section>
        <AnimateIn>
          <p className="text-lg text-charcoal-muted max-w-2xl leading-relaxed mb-10">
            SurfSeer brings together marine forecasts and surf scores in one place.
            Check conditions, break quality, and wind before you go, so you know when
            it’s worth the drive and when to wait for a better day.
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
            href="https://surfcheckseer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-subtle-hover inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-charcoal rounded-md hover:bg-charcoal/90 transition-all duration-200"
          >
            Open SurfSeer
          </a>
        </AnimateIn>
      </Section>
    </>
  );
}
