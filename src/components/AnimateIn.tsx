"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface AnimateInProps {
  children: ReactNode;
  /** Delay in ms before animation starts (for stagger) */
  delay?: number;
  /** Root margin for intersection (e.g. "0px 0px -40px 0px" to trigger slightly early) */
  rootMargin?: string;
  className?: string;
}

export function AnimateIn({
  children,
  delay = 0,
  rootMargin = "0px 0px -24px 0px",
  className = "",
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion: reveal immediately, no animation needed.
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    // If IntersectionObserver is unsupported for any reason, reveal immediately.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    let revealTimeoutId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealTimeoutId = setTimeout(() => {
            setVisible(true);
            observer.unobserve(el);
          }, delay);
        }
      },
      { threshold: 0.1, rootMargin }
    );

    observer.observe(el);

    // Safety net: if the observer never fires within a reasonable window
    // (background tab, layout edge case, etc.), show the content anyway so
    // it can never get stuck permanently invisible.
    const safetyTimeoutId = setTimeout(() => {
      setVisible(true);
      observer.unobserve(el);
    }, 1500 + delay);

    return () => {
      clearTimeout(revealTimeoutId);
      clearTimeout(safetyTimeoutId);
      observer.disconnect();
    };
  }, [delay, rootMargin]);

  return (
    <div
      ref={ref}
      className={`animate-in-place ${visible ? "animate-in-visible" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
