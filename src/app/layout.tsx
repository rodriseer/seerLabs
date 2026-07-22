import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://theseerlab.com"
  ),
  title: {
    default: "Seer Labs — Custom software, built for your business.",
    template: "%s | Seer Labs",
  },
  description:
    "Seer Labs is Rodrigo Seer's studio building custom software for real businesses: booking and reservation systems, bilingual business websites, internal tools, and conversion-focused sites. Free quotes, phased builds.",
  keywords: [
    "Seer Labs",
    "Rodrigo Seer",
    "custom software",
    "booking systems",
    "bilingual websites",
    "internal tools",
    "full-stack developer",
    "Next.js",
  ],
  openGraph: {
    title: "Seer Labs — Custom software, built for your business.",
    description:
      "Custom software for real businesses by Rodrigo Seer: booking systems, bilingual sites, and internal tools. Free quotes, working software at every milestone.",
    images: ["/images/og-placeholder.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seer Labs — Custom software, built for your business.",
    description:
      "Custom software for real businesses by Rodrigo Seer. Free quotes, phased builds, working software at every milestone.",
  },
};

/**
 * No-flash theme script.
 * Runs before React hydration so the initial paint is the correct theme.
 * Resolution order: localStorage override → system preference → default (dark).
 */
const themeScript = `
(function() {
  document.documentElement.classList.add('js');
  try {
    var stored = localStorage.getItem('seer-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-bg text-ink">
        <Analytics />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
