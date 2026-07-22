import Image from "next/image";

export function LogoHero() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/hero.png"
        alt="Coastal landscape"
        fill
        priority
        className="object-cover hero-image-zoom"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/45 to-black/30"
        aria-hidden
      />
      <div className="relative flex flex-col items-center justify-center px-4 text-center">
        <Image
          src="/images/logo.png"
          alt="Seer Labs"
          width={1024}
          height={1024}
          className="hero-text-animate logo-glow h-20 md:h-24 lg:h-28 w-auto"
          priority
        />
        <p className="hero-text-animate-delay mt-8 md:mt-10 text-sm sm:text-base md:text-lg text-white/90 tracking-[0.18em] font-medium max-w-md">
          Intelligence for the Elements.
        </p>
      </div>
    </section>
  );
}

