"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Globe,
  Music,
  Menu,
  X,
  ShieldCheck,
  Smartphone,
  ListMusic,
  Radio,
  SlidersHorizontal,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { TranslationDictionary } from "@/lib/i18n/translations";

interface NavbarProps {
  locale: string;
  dict: TranslationDictionary;
}

export function Navbar({ locale, dict }: NavbarProps) {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/playlist-downloader`, label: dict.nav.playlist },
    { href: `/${locale}/iphone`, label: dict.nav.iphone },
    { href: `/${locale}/android`, label: dict.nav.android },
    { href: `/${locale}/mac`, label: dict.nav.mac },
    { href: `/${locale}/podcast`, label: dict.nav.podcast },
    { href: `/${locale}/mix`, label: dict.nav.mix },
  ];

  // Helper to switch language keeping current subpage
  const getLangSwitchUrl = (targetLocale: string) => {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${targetLocale}`;
    if (siteConfig.locales.some((l) => l.code === segments[0])) {
      segments[0] = targetLocale;
      return `/${segments.join("/")}`;
    }
    return `/${targetLocale}${pathname}`;
  };

  const currentLocaleObj =
    siteConfig.locales.find((l) => l.code === locale) || siteConfig.locales[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/90 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-zinc-900 dark:text-white group"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 via-orange-500 to-amber-400 text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Music className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="leading-tight font-extrabold text-zinc-900 dark:text-zinc-50">
              {siteConfig.name}
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-brand-600 dark:text-brand-400">
              Link Helper & MP3
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-xs xl:text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Change language"
              aria-expanded={langMenuOpen}
            >
              <Globe className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              <span className="hidden sm:inline">{currentLocaleObj.nativeName}</span>
              <span className="uppercase sm:hidden">{currentLocaleObj.code}</span>
            </button>

            {langMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 z-50 w-44 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 animate-in fade-in slide-in-from-top-2">
                  <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Languages
                  </div>
                  {siteConfig.locales.map((loc) => (
                    <Link
                      key={loc.code}
                      href={getLangSwitchUrl(loc.code)}
                      onClick={() => setLangMenuOpen(false)}
                      className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                        locale === loc.code
                          ? "bg-brand-500 text-white font-semibold"
                          : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <span>{loc.nativeName}</span>
                      <span className="text-[10px] uppercase opacity-70">
                        {loc.code}
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-lg border border-zinc-200 p-2 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-zinc-700" />
              )}
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-zinc-200 p-2 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800 lg:hidden transition-colors"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 px-4 py-4 space-y-2 animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-500 text-white font-semibold"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              100% Legal & Zero File Storage
            </span>
          </div>
        </div>
      )}
    </header>
  );
}

