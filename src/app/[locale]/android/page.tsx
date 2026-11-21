import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getDictionary, SupportedLocale } from "@/lib/i18n/translations";
import { HeroSearch } from "@/components/HeroSearch";
import { FaqSection } from "@/components/FaqSection";
import { HowToSection } from "@/components/HowToSection";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd, generateBreadcrumbSchema } from "@/components/JsonLd";
import { Smartphone, DownloadCloud, ShieldCheck } from "lucide-react";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = params.locale || "en";
  return {
    title: "SoundCloud Downloader for Android - Save Songs in Chrome",
    description:
      "Fast and free SoundCloud downloader for Android smartphones and tablets. Download permitted songs and Creative Commons audio directly with Chrome.",
    alternates: {
      canonical: `${siteConfig.url}/${locale}/android`,
    },
  };
}

export default function AndroidDownloaderPage({ params }: PageProps) {
  const locale = (params.locale as SupportedLocale) || "en";
  const dict = getDictionary(locale);

  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/${locale}` },
    { name: "SoundCloud for Android", url: `${siteConfig.url}/${locale}/android` },
  ];

  return (
    <div className="flex flex-col items-center">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Header */}
      <section className="text-center max-w-3xl mx-auto pt-4 sm:pt-8 pb-8 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
          <Smartphone className="h-3.5 w-3.5" />
          <span>Android Mobile & Tablets</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
          SoundCloud Downloader for{" "}
          <span className="bg-gradient-to-r from-brand-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
            Android
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Download permitted SoundCloud songs and podcasts directly to your Android device. Works seamlessly with Chrome, Samsung Internet, Firefox, and the SoundCloud mobile app.
        </p>
      </section>

      {/* Core Tool */}
      <HeroSearch dict={dict} />

      <AdSlot slotType="leaderboard" />

      {/* Android Features */}
      <section className="w-full max-w-4xl my-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900/60 p-5 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400 flex items-center justify-center mb-3">
            <DownloadCloud className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Android Download Manager</h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Integrates natively with the Android download manager for fast, resilient background downloading.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900/60 p-5 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center mb-3">
            <Smartphone className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Share Sheet Shortcut</h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Copy links from the official SoundCloud Android app and use our one-tap Paste button for instant inspection.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900/60 p-5 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center mb-3">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">PWA Installable App</h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Add SoundFetch to your Android home screen as a lightweight Progressive Web App for instant access.
          </p>
        </div>
      </section>

      <HowToSection dict={dict} />
      <FaqSection dict={dict} />
    </div>
  );
}

