import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getDictionary, SupportedLocale } from "@/lib/i18n/translations";
import { HeroSearch } from "@/components/HeroSearch";
import { FaqSection } from "@/components/FaqSection";
import { HowToSection } from "@/components/HowToSection";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd, generateBreadcrumbSchema } from "@/components/JsonLd";
import { Apple, Smartphone, ShieldCheck, FolderDown } from "lucide-react";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = params.locale || "en";
  return {
    title: "SoundCloud Downloader for iPhone & iOS - Save to Apple Files",
    description:
      "Learn how to download permitted SoundCloud tracks directly on iPhone and iPad using Mobile Safari and the iOS Files app. Fast, legal, and zero file storage.",
    alternates: {
      canonical: `${siteConfig.url}/${locale}/iphone`,
    },
  };
}

export default function IPhoneDownloaderPage({ params }: PageProps) {
  const locale = (params.locale as SupportedLocale) || "en";
  const dict = getDictionary(locale);

  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/${locale}` },
    { name: "SoundCloud for iPhone", url: `${siteConfig.url}/${locale}/iphone` },
  ];

  return (
    <div className="flex flex-col items-center">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Header */}
      <section className="text-center max-w-3xl mx-auto pt-4 sm:pt-8 pb-8 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
          <Apple className="h-3.5 w-3.5" />
          <span>Optimized for iOS & Safari</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
          SoundCloud Downloader on{" "}
          <span className="bg-gradient-to-r from-brand-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
            iPhone & iPad
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Downloading permitted audio on Apple iOS is seamless. Use the SoundCloud app share button, paste the link here in Safari, and save permitted MP3s directly to the native Apple Files app.
        </p>
      </section>

      {/* Core Tool */}
      <HeroSearch dict={dict} />

      <AdSlot slotType="leaderboard" />

      {/* iOS Specific Guide */}
      <section className="w-full max-w-4xl my-10 rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900/60 p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
          <FolderDown className="h-5 w-5 text-brand-500" />
          <span>Where do downloads go on iPhone?</span>
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <p>
            When you tap <strong>Download Permitted Audio</strong> in Mobile Safari, Safari will display a download confirmation prompt. Once accepted:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>The audio file is stored in your <strong>Files app → Downloads</strong> folder.</li>
            <li>You can listen offline anytime using the built-in iOS media player.</li>
            <li>You can share it to third-party music apps or AirDrop it to your Mac.</li>
          </ul>
        </div>
      </section>

      <HowToSection dict={dict} />
      <FaqSection dict={dict} />
    </div>
  );
}

