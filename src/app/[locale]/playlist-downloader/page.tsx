import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getDictionary, SupportedLocale } from "@/lib/i18n/translations";
import { HeroSearch } from "@/components/HeroSearch";
import { FaqSection } from "@/components/FaqSection";
import { HowToSection } from "@/components/HowToSection";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd, generateBreadcrumbSchema } from "@/components/JsonLd";
import { ListMusic, Archive, ShieldCheck, Zap } from "lucide-react";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = params.locale || "en";
  return {
    title: "SoundCloud Playlist Downloader - Batch Permitted Sets to ZIP",
    description:
      "Paste any SoundCloud playlist (/sets/) link. Instantly list all tracks, verify artist licensing, and download all permitted Creative Commons audio in a single ZIP file.",
    alternates: {
      canonical: `${siteConfig.url}/${locale}/playlist-downloader`,
    },
  };
}

export default function PlaylistDownloaderPage({ params }: PageProps) {
  const locale = (params.locale as SupportedLocale) || "en";
  const dict = getDictionary(locale);

  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/${locale}` },
    { name: "Playlist Downloader", url: `${siteConfig.url}/${locale}/playlist-downloader` },
  ];

  return (
    <div className="flex flex-col items-center">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Hero Header */}
      <section className="text-center max-w-3xl mx-auto pt-4 sm:pt-8 pb-8 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
          <ListMusic className="h-3.5 w-3.5" />
          <span>SoundCloud Sets & Albums</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
          SoundCloud{" "}
          <span className="bg-gradient-to-r from-brand-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
            Playlist Downloader
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Analyze complete SoundCloud sets, playlists, and albums. Our tool filters out restricted tracks and packages all permitted, royalty-free audio files into an instant ZIP archive with zero server storage.
        </p>
      </section>

      {/* Core Tool */}
      <HeroSearch
        dict={dict}
        initialQuery="https://soundcloud.com/chillhopcollective/sets/lo-fi-beats-permitted"
      />

      <AdSlot slotType="leaderboard" />

      {/* Set-Specific Highlights */}
      <section className="w-full max-w-4xl my-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900/60 p-5 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400 flex items-center justify-center mb-3">
            <Archive className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">One-Click ZIP Packaging</h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Download all artist-approved and Creative Commons tracks in a playlist at once without opening each track individually.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900/60 p-5 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center mb-3">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Per-Track License Filter</h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Every track is individually inspected. Commercial tracks with all rights reserved are clearly labeled and linked to SoundCloud.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900/60 p-5 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 flex items-center justify-center mb-3">
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Streaming Compression</h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            The ZIP is assembled on-the-fly directly to your browser download stream. Zero storage footprint on our servers.
          </p>
        </div>
      </section>

      <HowToSection dict={dict} />
      <FaqSection dict={dict} />
    </div>
  );
}

