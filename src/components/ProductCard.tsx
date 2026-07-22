import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  description: string;
  keyFeature?: string;
  imageSrc: string;
  imageAlt: string;
  viewHref: string;
  caseStudyHref?: string;
  tag?: string;
}

export function ProductCard({
  title,
  description,
  imageSrc,
  imageAlt,
  viewHref,
  caseStudyHref,
  tag,
}: ProductCardProps) {
  return (
    <article className="group surface-card flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink/[0.04] dark:bg-white/[0.04] border-b border-ink/[0.06] dark:border-white/[0.06]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover img-hover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="p-6 md:p-7 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink">
            {title}
          </h3>
          {tag && (
            <span className="text-[0.7rem] uppercase tracking-[0.14em] text-ink-muted">
              {tag}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm md:text-[0.95rem] text-ink-muted leading-relaxed">
          {description}
        </p>

        <div className="mt-auto pt-6 flex items-center gap-5 text-sm">
          <a
            href={viewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Visit live
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-70"
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
          {caseStudyHref && (
            <Link
              href={caseStudyHref}
              className="btn-ghost text-ink-muted hover:text-ink"
            >
              Case study
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
