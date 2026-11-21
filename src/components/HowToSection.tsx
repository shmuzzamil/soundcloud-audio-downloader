import React from "react";
import { Copy, Sparkles, Download, CheckCircle2 } from "lucide-react";
import { TranslationDictionary } from "@/lib/i18n/translations";
import { JsonLd, generateHowToSchema } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";

interface HowToSectionProps {
  dict: TranslationDictionary;
}

export function HowToSection({ dict }: HowToSectionProps) {
  const steps = [
    {
      num: "01",
      icon: Copy,
      title: dict.howto.step1,
      desc: dict.howto.step1Text,
      color: "from-blue-500 to-indigo-500",
    },
    {
      num: "02",
      icon: Sparkles,
      title: dict.howto.step2,
      desc: dict.howto.step2Text,
      color: "from-orange-500 to-brand-500",
    },
    {
      num: "03",
      icon: Download,
      title: dict.howto.step3,
      desc: dict.howto.step3Text,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section className="w-full my-12" id="how-to-download">
      <JsonLd data={generateHowToSchema(siteConfig.url)} />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {dict.howto.title}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          {dict.howto.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="relative rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`h-11 w-11 rounded-xl bg-gradient-to-tr ${s.color} text-white flex items-center justify-center shadow-md`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-2xl font-black text-zinc-200 dark:text-zinc-800">
                    {s.num}
                  </span>
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  {s.title}
                </h3>
                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

