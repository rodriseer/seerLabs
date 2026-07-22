import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

export function Section({ children, className = "", innerClassName = "" }: SectionProps) {
  return (
    <section className={`py-12 md:py-20 lg:py-24 ${className}`}>
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}
