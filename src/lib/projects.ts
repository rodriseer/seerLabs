/**
 * Single source of truth for client work / case studies.
 *
 * Used by:
 *  - /client-work (index)
 *  - /client-work/[slug] (per-project case study)
 *  - / (homepage Featured Projects strip)
 *
 * To add a project, append a new entry. To update content (problem statement,
 * outcomes, etc.), edit it here — no other files need to change.
 */

export type ProjectStatus = "shipped" | "in-progress" | "case-study-soon";

export interface Project {
  /** URL slug, used at /client-work/[slug] */
  slug: string;
  /** Project title shown on cards and case study heros */
  title: string;
  /** Client / company name */
  client: string;
  /**
   * One-line business outcome. Phrased as a result for the client, not
   * a description of the build. Used as the headline on featured cards.
   */
  outcome: string;
  /** Short description used on the index card */
  description: string;
  /** Bullet highlights shown on the index card */
  highlights: string[];
  /** Stack / category tags */
  tags: string[];
  /** Hero / preview image */
  imageSrc: string;
  imageAlt: string;
  /** Live URL (production site, repo, etc.) */
  liveHref: string;
  /**
   * Service category this project demonstrates. Used to map projects to
   * the "What I build" homepage strip.
   */
  service: ServiceCategory;

  // ---- Case study fields ----
  /**
   * Whether this project should appear on the homepage Featured strip.
   * Curated subset, not all projects need to be featured.
   */
  featured?: boolean;
  /** "At a glance" chips shown on the case study page */
  meta?: {
    role?: string;
    timeline?: string;
    deliverables?: string;
  };
  /** The problem the client had, told from their perspective */
  problem?: string[];
  /** How Rodrigo approached the build */
  approach?: string[];
  /** Concrete things shipped, framed as client capabilities */
  features?: { title: string; body: string }[];
  /** Outcome — quantitative if possible, qualitative otherwise */
  outcomeDetail?: string;
  /** Stack details for the small block at the bottom */
  stack?: string[];
}

export type ServiceCategory =
  | "booking-systems"
  | "business-websites"
  | "internal-tools"
  | "marketing-sites";

export interface Service {
  id: ServiceCategory;
  label: string;
  blurb: string;
}

export const SERVICES: Service[] = [
  {
    id: "booking-systems",
    label: "Reservation & booking systems",
    blurb:
      "Custom availability logic, distance-based pricing, and mobile-first booking flows that handle real production volume.",
  },
  {
    id: "business-websites",
    label: "Bilingual business websites",
    blurb:
      "Fast, modern company sites with bilingual content, a clear conversion path, and a structure your team can update.",
  },
  {
    id: "internal-tools",
    label: "Internal tools & desktop apps",
    blurb:
      "Workflow tools, dashboards, and desktop utilities that automate the parts of your business that off-the-shelf software won't touch.",
  },
  {
    id: "marketing-sites",
    label: "Conversion-focused marketing sites",
    blurb:
      "Landing pages and product sites built to move a specific number — signups, bookings, demo requests — not just to look good.",
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "open-door-dmv",
    title: "Open Door DMV",
    client: "Open Door DMV",
    outcome:
      "A bilingual directory and digital magazine that gives local Latino-owned businesses a trust and visibility layer, not just a map pin.",
    description:
      "A bilingual (EN/ES) business directory and digital magazine for Latino, Caribbean, and immigrant-owned businesses across DC, Maryland, and Virginia. Built to tell each business's story, surface real reviews, and turn discovery into paid listings.",
    highlights: [
      "Bilingual directory across 26 categories and 7 cities",
      "Digital magazine with long-form business stories",
      "Verified listings, reviews, and business profiles",
      "Self-serve onboarding for paid business features",
    ],
    tags: ["React", "Bilingual", "Directory", "CMS"],
    imageSrc: "/opendoordmv.jpg",
    imageAlt: "Open Door DMV bilingual directory homepage preview",
    liveHref: "https://opendoordmv.com/",
    service: "business-websites",
    featured: true,
    meta: {
      role: "Design + full-stack build",
      timeline: "Multi-phase",
      deliverables: "Directory platform, digital magazine, business onboarding",
    },
    problem: [
      "Local Latino- and immigrant-owned businesses are hard to discover online. A Google Maps pin tells a customer where a business is, but nothing about who runs it, why it exists, or whether it can serve them in Spanish. Owners were relying on word of mouth and scattered social posts with no home base.",
      "Open Door DMV needed a single, trusted place that celebrated these businesses in both English and Spanish — one that could grow into a real magazine and a paid product for owners, not just a static list.",
    ],
    approach: [
      "Built the site as a bilingual-first platform where English and Spanish are treated as equals across the directory, magazine, and business profiles — not a bolted-on translation. Structured content around categories and cities so a customer can find a trusted business the way they actually search.",
      "Designed each listing to carry a story and reviews, not just an address and phone number, so the platform earns trust rather than only cataloging it. Added a self-serve path for owners to list and upgrade their business, laying the groundwork for a recurring-revenue feature package.",
    ],
    features: [
      {
        title: "Story-first business profiles",
        body: "Each listing leads with who the business is and why it exists, backed by reviews — the trust layer a map pin can't provide.",
      },
      {
        title: "True bilingual experience",
        body: "The directory, magazine, and profiles all work in English and Spanish, so the platform serves the community in the language it lives in.",
      },
      {
        title: "Directory by category and city",
        body: "26 categories across 7 DMV cities, so customers find trusted businesses the way they naturally search.",
      },
      {
        title: "Self-serve business onboarding",
        body: "Owners can list and upgrade their business themselves, turning discovery into a paid, recurring feature package.",
      },
    ],
    outcomeDetail:
      "Open Door DMV launched its first issue with verified businesses live across the DMV, giving local owners a story-driven home base and the platform a foundation for paid listings and advertising.",
    stack: ["React", "TypeScript", "Tailwind", "Bilingual (EN/ES) content architecture"],
  },
  {
    slug: "365-events-and-rentals",
    title: "365 Events & Rentals",
    client: "365 Events & Rentals",
    outcome:
      "A reservation engine that turns delivery quoting and inventory checks into one mobile-first flow.",
    description:
      "Full website redesign and development for a growing event rental company. Mobile-first booking with real-time availability and delivery pricing.",
    highlights: [
      "Full website redesign and custom development",
      "Reservation system with availability logic per item",
      "Delivery pricing engine based on distance",
      "Mobile-first booking experience",
    ],
    tags: ["Next.js", "Reservation logic", "Geo pricing"],
    imageSrc: "/365.png",
    imageAlt: "365 Events & Rentals reservation site preview",
    liveHref: "https://365eventsandrentals.com/",
    service: "booking-systems",
    featured: true,
    meta: {
      role: "Design + full-stack build",
      timeline: "Multi-phase",
      deliverables: "Website, reservation engine, pricing logic",
    },
    problem: [
      "365 was growing fast but managing rentals through phone calls, spreadsheets, and back-and-forth on delivery quotes. Off-the-shelf rental SaaS didn't model their inventory or their distance-based delivery pricing well enough to use.",
      "They needed an online booking experience that worked on mobile, knew what was available on a given date, and could quote delivery fees automatically — without losing the flexibility their team relied on.",
    ],
    approach: [
      "Started with a redesign focused on the mobile booking flow, since most customers come in from phones. Modeled inventory and availability per item so the site can answer 'is this available on this date?' instantly.",
      "Built a delivery pricing engine that calculates fees based on distance to the venue, so quotes come back in seconds rather than hours. Kept the admin side intentionally simple so the team can update inventory without a developer.",
    ],
    features: [
      {
        title: "Real-time availability per item",
        body: "Customers see what's actually available on the date they pick — no more double-booking or back-and-forth.",
      },
      {
        title: "Distance-based delivery quotes",
        body: "Delivery fees are calculated automatically based on distance to the venue, removing a manual step from every quote.",
      },
      {
        title: "Mobile-first booking flow",
        body: "Designed for phones first, where the majority of inquiries actually come from.",
      },
      {
        title: "Updatable without a developer",
        body: "The team can manage inventory and content through a simple admin, not by emailing me.",
      },
    ],
    outcomeDetail:
      "Quoting time dropped from a phone-call cycle to a self-serve flow, and the team now spends time confirming bookings rather than calculating delivery fees.",
    stack: ["Next.js", "TypeScript", "Custom availability logic", "Geo-distance pricing"],
  },
  {
    slug: "clickond",
    title: "ClickOnD",
    client: "ClickOnD",
    outcome:
      "A bilingual business site that turns visitors into qualified inbound, with a structure the team can update themselves.",
    description:
      "Business website with a focus on conversion and a clean, modern UI. Bilingual, optimized for speed, structured so the team can update it without a developer.",
    highlights: [
      "Business website designed for conversion",
      "Clean, modern UI and motion language",
      "Bilingual content architecture",
      "Component-based system, easy to scale",
    ],
    tags: ["Next.js", "UX", "Bilingual", "Performance"],
    imageSrc: "/clickond.png",
    imageAlt: "ClickOnD business website preview",
    liveHref: "https://www.clickond.com/en",
    service: "business-websites",
    featured: true,
    meta: {
      role: "Design + full-stack build",
      timeline: "Single phase",
      deliverables: "Bilingual website, design system, deploy pipeline",
    },
    problem: [
      "ClickOnD needed a site that worked across two languages without feeling like a translated afterthought, and that converted visitors into leads instead of just describing the business.",
      "Their previous site was slow, hard to update, and didn't reflect the quality of their work.",
    ],
    approach: [
      "Built a content architecture where both languages are first-class — no awkward fallbacks, no broken routes. Kept the design clean and motion subtle so the page feels modern without getting in the way of the message.",
      "Componentized the entire site so the team can ship copy changes and new sections without touching layout code.",
    ],
    features: [
      {
        title: "True bilingual content",
        body: "English and a second language treated as equals, with clean URL structure and proper hreflang.",
      },
      {
        title: "Conversion-focused layout",
        body: "Every page has a clear next action — not just information.",
      },
      {
        title: "Fast on every device",
        body: "Optimized for performance so it ranks well and feels good on slow connections.",
      },
      {
        title: "Component-based",
        body: "New sections and pages are composable from existing pieces, so the site grows without rewrites.",
      },
    ],
    outcomeDetail:
      "ClickOnD now has a site that matches the quality of their work, ranks well, and the team can update without a developer in the loop.",
    stack: ["Next.js", "TypeScript", "Tailwind", "i18n routing"],
  },
  {
    slug: "sidea",
    title: "sideA: Photo Metadata Assistant",
    client: "sideA",
    outcome:
      "A desktop tool that gives photographers automatic metadata and keyword suggestions without ever touching the original files.",
    description:
      "A Lightroom-compatible desktop tool that analyzes photo folders via the Google Vision API and generates metadata, keyword suggestions, and XMP sidecars, all without touching the original files.",
    highlights: [
      "Desktop app (Python + customtkinter) for photographers",
      "Google Vision API integration for automatic classification",
      "Generates metadata.csv, keyword suggestions, and XMP sidecars",
      "Lightroom-safe: never moves or alters original images",
    ],
    tags: ["Python", "Google Vision API", "Desktop app", "Lightroom"],
    imageSrc: "/sidea.png",
    imageAlt: "sideA Photo Metadata Assistant preview",
    liveHref: "https://github.com/rodriseer/sideA",
    service: "internal-tools",
    featured: true,
    meta: {
      role: "Design + build",
      timeline: "Iterative",
      deliverables: "Cross-platform desktop app, Lightroom-compatible output",
    },
    problem: [
      "Photographers spend hours tagging and keywording large folders of images so they're searchable in Lightroom and clients can actually find what they need. The work is repetitive, and most automation tools either touch the original files or break the Lightroom workflow.",
      "sideA needed something that could read a folder, classify the images, and produce metadata Lightroom would pick up — without ever modifying the photos themselves.",
    ],
    approach: [
      "Built a desktop app in Python with a clean GUI so photographers don't need a terminal. Integrated Google Vision for classification and keyword extraction.",
      "Output goes into separate sidecar files (metadata.csv, XMP sidecars) so the originals are untouched and Lightroom can ingest the metadata natively.",
    ],
    features: [
      {
        title: "Folder-level analysis",
        body: "Point it at a folder, get classification and keyword suggestions for every image inside.",
      },
      {
        title: "Lightroom-native output",
        body: "Generates XMP sidecars and a metadata.csv so the work shows up wherever Lightroom looks.",
      },
      {
        title: "Originals never touched",
        body: "All output is sidecar — the source photos are read-only.",
      },
      {
        title: "Desktop GUI",
        body: "No terminal, no scripting — a simple app a photographer can run.",
      },
    ],
    outcomeDetail:
      "What was a multi-hour manual keywording session becomes a folder-scan job that runs in the background.",
    stack: ["Python", "customtkinter", "Google Vision API", "XMP sidecars"],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

export function getProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
