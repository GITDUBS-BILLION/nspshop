import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import Link from "next/link";
import { site } from "@/config/site";
import "./globals.css";

// next/font downloads these at BUILD time and serves them from your own domain.
// No request to Google at runtime, so it is faster and sets no third-party cookies.
const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${syne.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <header className="border-b border-rule">
          <div className="mx-auto flex max-w-6xl items-baseline justify-between px-5 py-5 sm:px-8">
            <Link
              href="/"
              className="font-display text-xl font-extrabold tracking-tight"
            >
              {site.name}
            </Link>
            <nav className="flex gap-6 text-sm text-mid">
              <Link href="/shop" className="hover:text-ink">
                Shop
              </Link>
              <Link href="/about" className="hover:text-ink">
                About
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-24 border-t border-rule">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-mid sm:flex-row sm:justify-between sm:px-8">
            <p>
              {site.name} — {site.tagline}
            </p>
            <div className="flex gap-6">
              <a href={`mailto:${site.email}`} className="hover:text-ink">
                {site.email}
              </a>
              <a href={site.instagram} className="hover:text-ink">
                Instagram
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
