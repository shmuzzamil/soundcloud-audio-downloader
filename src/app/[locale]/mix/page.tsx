import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getDictionary, SupportedLocale } from "@/lib/i18n/translations";
import { HeroSearch } from "@/components/HeroSearch";
import { FaqSection } from "@/components/FaqSection";
import { HowToSection } from "@/components/HowToSection";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd, generateBreadcrumbSchema } from "@/components/JsonLd";
import { SlidersHorizontal, Disc3, ShieldCheck, Zap } from "lucide-react";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = params.locale || "en";
  return {
    title: "SoundCloud DJ Mix Downloader - Live Sets & Electronic Sessions",
    description:
      "Inspect licensing and download permitted DJ sets, live festival recordings, radio mixes, and electronic podcasts from SoundCloud. High bitrate audio.",
    alternates: {
      canonical: `${siteConfig.url}/${locale}/mix`,
    },
  };
}

export default function MixDownloaderPage({ params }: PageProps) {
  const locale = (params.locale as SupportedLocale) || "en";
  const dict = getDictionary(locale);

  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/${locale}` },
    { name: "DJ Mix Downloader", url: `${siteConfig.url}/${locale}/mix` },
  ];

  return (
    <div className="flex flex-col items-center">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Header */}
      <section className="text-center max-w-3xl mx-auto pt-4 sm:pt-8 pb-8 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
          <Disc3 className="h-3.5 w-3.5" />
          <span>DJ Sets & Extended Mixes</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
          SoundCloud{" "}
          <span className="bg-gradient-to-r from-brand-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
            DJ Mix Downloader
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Many DJs and producers provide free downloads for their promo mixes and live festival recordings. Inspect licensing and download authorized mixes seamlessly.
        </p>
      </section>

      {/* Core Tool */}
      <HeroSearch dict={dict} />

      <AdSlot slotType="leaderboard" />

      <HowToSection dict={dict} />
      <FaqSection dict={dict} />
    </div>
  );
}

