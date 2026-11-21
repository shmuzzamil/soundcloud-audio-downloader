import React from "react";
import { Shield, Zap, Archive, HeartHandshake } from "lucide-react";
import { TranslationDictionary } from "@/lib/i18n/translations";

interface FeaturesSectionProps {
  dict: TranslationDictionary;
}

export function FeaturesSection({ dict }: FeaturesSectionProps) {
  const features = [
    {
      icon: Shield,
      title: dict.features.f1Title,
      desc: dict.features.f1Desc,
      tag: "Zero Storage",
    },
    {
      icon: Archive,
      title: dict.features.f2Title,
      desc: dict.features.f2Desc,
      tag: "Batch Sets",
    },
    {
      icon: Zap,
      title: dict.features.f3Title,
      desc: dict.features.f3Desc,
      tag: "< 2s LCP",
    },
    {
      icon: HeartHandshake,
      title: dict.features.f4Title,
      desc: dict.features.f4Desc,
      tag: "Artist-First",
    },
  ];

  return (
    <section className="w-full my-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {dict.features.title}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          {dict.features.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 flex flex-col justify-between hover:border-brand-500/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="h-10 w-10 rounded-xl bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
                  {feat.title}
                </h3>
                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {feat.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

