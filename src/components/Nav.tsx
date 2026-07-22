"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "/client-work", label: "Client Work" },
  { href: "/how-i-build", label: "How I Build" },
  { href: "/products", label: "Labs" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Only home page has the dark hero background; elsewhere the nav sits on bg.
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On non-home pages, always render as if scrolled (light/dark aware).
  const onHeroMode = isHome && !scrolled;

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-colors duration-300 ${
          onHeroMode
            ? "bg-transparent"
            : "bg-bg/85 backdrop-blur-md border-b border-ink/[0.06] dark:border-white/[0.06]"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              aria-label="Seer Labs, home"
              className="group inline-flex items-center transition-opacity hover:opacity-90"
            >
              <span
                className={`inline-flex items-center gap-2.5 rounded-full transition-all duration-300 ${
                  onHeroMode
                    ? "pl-2 pr-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
                    : "pl-0 pr-0 py-0 bg-transparent border border-transparent"
                }`}
              >
                <span
                  className={`relative inline-flex items-center justify-center rounded-full transition-all duration-300 shrink-0 ${
                    onHeroMode
                      ? "h-9 w-9 bg-white shadow-sm"
                      : "h-9 md:h-10 w-auto"
                  }`}
                >
                  <Image
                    src="/logo.png"
                    alt="Seer Labs"
                    width={653}
                    height={524}
                    priority
                    className={`w-auto transition-[height,filter] duration-300 ${
                      onHeroMode ? "h-6" : "h-8 md:h-9 dark:invert"
                    }`}
                  />
                </span>
                {onHeroMode && (
                  <span className="text-sm font-semibold tracking-tight text-white">
                    Seer Labs
                  </span>
                )}
              </span>
            </Link>

            <div
              className={`hidden md:flex items-center gap-7 text-sm transition-colors ${
                onHeroMode ? "text-white/80" : "text-ink-muted"
              }`}
            >
              {LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link transition-colors ${
                      onHeroMode
                        ? "hover:text-white"
                        : active
                        ? "text-accent"
                        : "hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle onDark={onHeroMode} />
              <Link
                href="/start-a-project"
                className="btn-primary !px-4 !py-2.5 text-[0.8rem]"
              >
                Get a quote
              </Link>
            </div>

            {/* Mobile */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle onDark={onHeroMode} />
              <button
                onClick={() => setOpen((o) => !o)}
                aria-label="Toggle navigation"
                className={`inline-flex items-center justify-center w-9 h-9 rounded-md transition-colors ${
                  onHeroMode
                    ? "border border-white/25 bg-white/10 text-white backdrop-blur-sm"
                    : "border border-ink/[0.1] bg-surface text-ink"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  {open ? (
                    <path
                      d="M6 6l12 12M6 18L18 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  ) : (
                    <path
                      d="M4 8h16M4 16h16"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {open && (
            <div className="md:hidden pb-4">
              <div className="bg-surface border border-ink/[0.08] dark:border-white/[0.08] rounded-xl p-1 flex flex-col">
                {LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`px-4 py-3 text-sm rounded-md transition-colors ${
                        active
                          ? "text-accent bg-accent/[0.08]"
                          : "text-ink hover:bg-ink/[0.03] dark:hover:bg-white/[0.04]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  href="/start-a-project"
                  onClick={() => setOpen(false)}
                  className="mt-1 mx-1 mb-1 btn-primary !py-2.5 text-sm"
                >
                  Get a free quote
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
