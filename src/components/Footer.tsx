import React from "react";
import Link from "next/link";
import { Music, ShieldCheck, Heart, AlertCircle, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { TranslationDictionary } from "@/lib/i18n/translations";

interface FooterProps {
  locale: string;
  dict: TranslationDictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const landingLinks = [
    { href: `/${locale}/playlist-downloader`, label: dict.nav.playlist },
    { href: `/${locale}/iphone`, label: dict.nav.iphone },
    { href: `/${locale}/android`, label: dict.nav.android },
    { href: `/${locale}/mac`, label: dict.nav.mac },
    { href: `/${locale}/podcast`, label: dict.nav.podcast },
    { href: `/${locale}/mix`, label: dict.nav.mix },
  ];

  const legalLinks = [
    { href: `/${locale}/terms`, label: dict.footer.terms },
    { href: `/${locale}/privacy`, label: dict.footer.privacy },
    { href: `/${locale}/dmca`, label: dict.footer.dmca },
    { href: `/${locale}/contact`, label: dict.footer.contact },
  ];

  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 font-bold text-lg text-zinc-900 dark:text-white"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white shadow-sm">
                <Music className="h-4 w-4" />
              </div>
              <span>{siteConfig.name}</span>
            </Link>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              {dict.meta.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="h-4 w-4" />
              <span>Zero server storage & DMCA compliant</span>
            </div>
          </div>

          {/* Landing Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 mb-3">
              SoundCloud Tools
            </h4>
            <ul className="space-y-2 text-xs">
              {landingLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 mb-3">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-xs">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 mb-3">
              Supported Languages
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {siteConfig.locales.map((loc) => (
                <Link
                  key={loc.code}
                  href={`/${loc.code}`}
                  className={`hover:text-brand-600 dark:hover:text-brand-400 transition-colors ${
                    locale === loc.code ? "font-bold text-brand-600 dark:text-brand-400" : ""
                  }`}
                >
                  {loc.nativeName}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mandatory Legal SoundCloud Disclaimer Box */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 mb-8">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                {dict.disclaimer.title}:{" "}
              </span>
              <span>{dict.disclaimer.text}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-6 text-xs text-zinc-500 dark:text-zinc-500 gap-4">
          <div>
            &copy; {currentYear} {siteConfig.name}. {dict.footer.rights}
          </div>
          <div className="flex items-center gap-1">
            <span>Built for fast & legal audio discovery</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 mx-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}

