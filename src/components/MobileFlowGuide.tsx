"use client";

import React, { useState } from "react";
import {
  Apple,
  Smartphone,
  Share2,
  Copy,
  ArrowRight,
  ClipboardCheck,
  CheckCircle2,
} from "lucide-react";
import { TranslationDictionary } from "@/lib/i18n/translations";

interface MobileFlowGuideProps {
  dict: TranslationDictionary;
}

export function MobileFlowGuide({ dict }: MobileFlowGuideProps) {
  const [activeTab, setActiveTab] = useState<"ios" | "android">("ios");

  return (
    <section className="w-full rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-6 sm:p-8 dark:border-zinc-800/80 dark:bg-zinc-900/40 my-8 transition-colors">
      <div className="text-center max-w-xl mx-auto mb-6">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {dict.mobileHelper.title}
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Quick 30-second mobile workflow to grab links from the official SoundCloud app
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-xl bg-zinc-200/70 p-1 dark:bg-zinc-800">
          <button
            onClick={() => setActiveTab("ios")}
            className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "ios"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-white"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Apple className="h-4 w-4" />
            <span>{dict.mobileHelper.iosTab}</span>
          </button>
          <button
            onClick={() => setActiveTab("android")}
            className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "android"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-white"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>{dict.mobileHelper.androidTab}</span>
          </button>
        </div>
      </div>

      {/* Flow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 shadow-sm">
          <div className="h-10 w-10 rounded-full bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400 flex items-center justify-center mb-3">
            <Share2 className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {dict.mobileHelper.step1Title}
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {activeTab === "ios"
              ? "In the SoundCloud iOS app, tap the track's share arrow icon."
              : "In the SoundCloud Android app, tap the share icon under any song."}
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 shadow-sm">
          <div className="h-10 w-10 rounded-full bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 flex items-center justify-center mb-3">
            <Copy className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {dict.mobileHelper.step2Title}
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {activeTab === "ios"
              ? "From the native iOS Share Sheet, select 'Copy Link'."
              : "In Android's share modal, tap 'Copy to clipboard'."}
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 shadow-sm">
          <div className="h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center mb-3">
            <ClipboardCheck className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {dict.mobileHelper.step3Title}
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {dict.mobileHelper.step3Desc}
          </p>
        </div>
      </div>
    </section>
  );
}

