import type { Metadata } from "next";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Products | Seer Labs",
  description:
    "SurfSeer, CycleSeer, and CampSeer: marine forecasting, surf scores, cycling route scoring, and camp planning.",
};

const PRODUCTS = [
  {
    slug: "surfseer",
    title: "SurfSeer",
    tag: "Marine",
    description:
      "Surf forecasts with real-world surf scores. Blends swell, wind, tide and break quality into a single daily signal.",
    imageSrc: "/images/surfseer.jpg",
    imageAlt: "Coastal shoreline and ocean",
    viewHref: "https://surfcheckseer.com",
    caseStudyHref: "/products/surfseer",
  },
  {
    slug: "cycleseer",
    title: "CycleSeer",
    tag: "Cycling",
    description:
      "Cycling route scoring that ranks rides by surface, traffic, elevation and scenery. Find the best ride near you, not just the closest.",
    imageSrc: "/images/cycleseer.jpg",
    imageAlt: "Cycling landscape and open road",
    viewHref: "https://cycleseer.com",
    caseStudyHref: "/products/cycleseer",
  },
  {
    slug: "campseer",
    title: "CampSeer",
    tag: "Outdoor",
    description:
      "Find the best nights to camp. Weather, night-sky visibility and fire-risk scores condensed into a multi-day window.",
    imageSrc: "/images/campseer.jpeg",
    imageAlt: "Camping under a clear night sky",
    viewHref: "https://campseer.vercel.app",
    caseStudyHref: "/products/campseer",
  },
];

export default function ProductsPage() {
  return (
    <div className="relative">
      <section className="relative pt-32 md:pt-40 pb-10 md:pb-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeader
            as="h1"
            eyebrow="Seer Labs products"
            title="Data-driven tools I build and ship."
            description="A small family of outdoor products, each built around a single question: when is the best time to go?"
          />
        </div>
      </section>

      <section className="relative pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {PRODUCTS.map((p, i) => (
              <AnimateIn key={p.slug} delay={i * 90}>
                <ProductCard
                  title={p.title}
                  description={p.description}
                  imageSrc={p.imageSrc}
                  imageAlt={p.imageAlt}
                  viewHref={p.viewHref}
                  caseStudyHref={p.caseStudyHref}
                  tag={p.tag}
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
                <h2 className="tracking-tighter-2 text-3xl md:text-4xl font-semibold text-ink leading-[1.05]">
                  Need a tool like these built for your niche?
                </h2>
                <p className="mt-4 text-ink-muted text-base md:text-lg leading-relaxed">
                  I take on custom data + forecasting work. Let&apos;s talk
                  about what your users need.
                </p>
              </div>
              <Link href="/contact" className="btn-primary self-start">
                Get in touch
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
