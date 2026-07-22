import Image from "next/image";
import Link from "next/link";
import { mailtoHref } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="relative mt-16 border-t border-ink/[0.08] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-5">
            <Link
              href="/"
              aria-label="Seer Labs, home"
              className="inline-flex items-center transition-opacity hover:opacity-80"
            >
              <Image
                src="/logo.png"
                alt="Seer Labs"
                width={653}
                height={524}
                className="h-12 w-auto dark:invert"
              />
            </Link>
            <p className="mt-4 text-sm text-ink-muted max-w-sm leading-relaxed">
              Custom software, built for real businesses. By Rodrigo Seer.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={mailtoHref({ subject: "Project inquiry" })}
                className="btn-secondary !py-1.5 !px-3 text-xs"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/rodrigo-seer-a692a0328/?skipRedirect=true"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !py-1.5 !px-3 text-xs"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/rodriseer"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !py-1.5 !px-3 text-xs"
              >
                GitHub
              </a>
              <a
                href="https://www.instagram.com/rodrigoseer.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !py-1.5 !px-3 text-xs"
              >
                Instagram
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted/80 mb-4">
              Products
            </div>
            <ul className="flex flex-col gap-2.5 text-sm text-ink-muted">
              <li>
                <a
                  href="https://surfcheckseer.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  SurfSeer
                </a>
              </li>
              <li>
                <a
                  href="https://cycleseer.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  CycleSeer
                </a>
              </li>
              <li>
                <a
                  href="https://campseer.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  CampSeer
                </a>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-ink transition-colors"
                >
                  All products
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted/80 mb-4">
              Site
            </div>
            <ul className="flex flex-col gap-2.5 text-sm text-ink-muted">
              <li>
                <Link
                  href="/client-work"
                  className="hover:text-ink transition-colors"
                >
                  Client Work
                </Link>
              </li>
              <li>
                <Link
                  href="/how-i-build"
                  className="hover:text-ink transition-colors"
                >
                  How I Build
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-ink transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="hover:text-ink transition-colors"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-ink transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted/80 mb-4">
              Elsewhere
            </div>
            <ul className="flex flex-col gap-2.5 text-sm text-ink-muted">
              <li>
                <a
                  href={mailtoHref({ subject: "Project inquiry" })}
                  className="hover:text-ink transition-colors"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/rodrigo-seer-a692a0328/?skipRedirect=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/rodriseer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/rodrigoseer.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ink/[0.06] dark:border-white/[0.06] flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-ink-muted">
          <div>© {new Date().getFullYear()} Seer Labs. All rights reserved.</div>
          <div>Built by Rodrigo Seer.</div>
        </div>
      </div>
    </footer>
  );
}
