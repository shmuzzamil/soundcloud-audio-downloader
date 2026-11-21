import React from "react";
import { getDictionary, SupportedLocale } from "@/lib/i18n/translations";
import { HeroSearch } from "@/components/HeroSearch";
import { MobileFlowGuide } from "@/components/MobileFlowGuide";
import { HowToSection } from "@/components/HowToSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { FaqSection } from "@/components/FaqSection";
import { AdSlot } from "@/components/AdSlot";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default function HomePage({ params }: HomePageProps) {
  const locale = (params.locale as SupportedLocale) || "en";
  const dict = getDictionary(locale);

  return (
    <div className="flex flex-col items-center">
      {/* Hero Header Section */}
      <section className="text-center max-w-3xl mx-auto pt-4 sm:pt-8 pb-8 space-y-4">
        {/* Compliance & Speed Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-500/20 dark:text-brand-400 backdrop-blur-sm shadow-sm animate-pulse-fast">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{dict.hero.badge}</span>
          <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" /> Zero File Storage
          </span>
        </div>

        {/* SEO Title H1 */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
          {dict.hero.title}{" "}
          <span className="bg-gradient-to-r from-brand-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
            {dict.hero.titleHighlight}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          {dict.hero.subtitle}
        </p>
      </section>

      {/* Main Core Tool: Input, Validation & Results */}
      <section className="w-full">
        <HeroSearch dict={dict} />
      </section>

      {/* Non-intrusive Ad slot */}
      <AdSlot slotType="leaderboard" />

      {/* Mobile Flow (iOS / Android Share Sheet) */}
      <MobileFlowGuide dict={dict} />

      {/* HowTo 3-step guide with Schema */}
      <HowToSection dict={dict} />

      {/* Key Architectural & Legal Features */}
      <FeaturesSection dict={dict} />

      {/* Comprehensive FAQ with FAQPage Schema */}
      <FaqSection dict={dict} />
    </div>
  );
}

