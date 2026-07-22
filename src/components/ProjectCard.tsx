import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  client: string;
  description: string;
  highlights: string[];
  imageSrc?: string;
  imageAlt: string;
  liveHref: string;
  /** Internal route for the in-depth case study, e.g. /client-work/[slug] */
  caseStudyHref?: string;
  tags?: string[];
  previewFallback?: React.ReactNode;
  reverse?: boolean;
}

export function ProjectCard({
  title,
  client,
  description,
  highlights,
  imageSrc,
  imageAlt,
  liveHref,
  caseStudyHref,
  tags,
  previewFallback,
  reverse = false,
}: ProjectCardProps) {
  return (
    <article className="group surface-card overflow-hidden grid md:grid-cols-5 items-stretch">
      <div
        className={`relative md:col-span-3 aspect-[16/10] md:aspect-auto md:min-h-[340px] overflow-hidden bg-ink/[0.04] dark:bg-white/[0.04] md:border-r border-b md:border-b-0 border-ink/[0.06] dark:border-white/[0.06] ${
          reverse ? "md:order-2 md:border-l md:border-r-0" : ""
        }`}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-top img-hover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        ) : previewFallback ? (
          <div className="absolute inset-0 flex items-center justify-center">
            {previewFallback}
          </div>
        ) : (
          <div aria-label={imageAlt} className="absolute inset-0" />
        )}
      </div>

      <div className="md:col-span-2 p-6 md:p-8 lg:p-10 flex flex-col">
        <div className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted mb-3">
          {client}
        </div>
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-ink">
          {title}
        </h3>
        <p className="mt-3 text-sm md:text-[0.95rem] text-ink-muted leading-relaxed">
          {description}
        </p>

        <ul className="mt-5 space-y-2.5">
          {highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2.5 text-sm text-ink/85"
            >
              <span className="mt-2 inline-block w-1 h-1 rounded-full bg-ink/30 dark:bg-white/40 shrink-0" />
              <span className="leading-snug">{h}</span>
            </li>
          ))}
        </ul>

        {tags && tags.length > 0 && (
          <div className="mt-6 text-xs text-ink-muted">
            {tags.join(" · ")}
          </div>
        )}

        <div className="mt-auto pt-6 flex flex-wrap items-center gap-4">
          {caseStudyHref && (
            <Link href={caseStudyHref} className="btn-primary !py-2 !px-4 text-sm">
              Read case study
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
          <a
            href={liveHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Visit live site
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17L17 7M17 7H8M17 7V16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
