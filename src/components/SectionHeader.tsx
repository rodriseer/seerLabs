import { AnimateIn } from "./AnimateIn";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  /** When true, lets the heading stretch wide enough to sit on a single line */
  wide?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  wide = false,
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "";
  const Heading = as;
  const containerWidth = wide ? "max-w-5xl" : "max-w-2xl";

  return (
    <AnimateIn>
      <div className={`${containerWidth} ${alignment}`}>
        <div
          className={`eyebrow-accent mb-5 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          {eyebrow}
        </div>
        <Heading className="tracking-tighter-2 text-[2rem] md:text-4xl lg:text-[3.4rem] font-semibold text-ink leading-[1.03]">
          {title}
        </Heading>
        {description && (
          <p className="mt-5 text-ink-muted text-base md:text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </AnimateIn>
  );
}
