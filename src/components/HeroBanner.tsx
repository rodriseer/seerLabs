import Image from "next/image";

interface HeroBannerProps {
  src: string;
  alt: string;
  headline: string;
  subline?: string;
  priority?: boolean;
}

export function HeroBanner({ src, alt, headline, subline, priority = false }: HeroBannerProps) {
  return (
    <div className="relative w-full aspect-[21/9] min-h-[280px] md:min-h-[360px] lg:min-h-[420px] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover hero-image-zoom"
        sizes="100vw"
        priority={priority}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="hero-text-animate text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight drop-shadow-lg max-w-3xl">
          {headline}
        </h1>
        {subline && (
          <p className="hero-text-animate-delay mt-3 text-lg md:text-xl text-white/90 drop-shadow max-w-xl">
            {subline}
          </p>
        )}
      </div>
    </div>
  );
}
