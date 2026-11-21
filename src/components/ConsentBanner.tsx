"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, X } from "lucide-react";

interface ConsentBannerProps {
  locale: string;
}

export function ConsentBanner({ locale }: ConsentBannerProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("soundfetch_privacy_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("soundfetch_privacy_consent", "accepted");
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("soundfetch_privacy_consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside
      aria-label="Privacy & Cookie Consent"
      className="fixed bottom-4 left-4 right-4 z-50 max-w-xl mx-auto rounded-2xl border border-zinc-200 bg-white/95 p-4 sm:p-5 shadow-2xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-xl bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
          <Cookie className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Privacy & Cookie Preferences
          </h4>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We use privacy-friendly anonymous analytics to monitor performance and Core Web Vitals. We never store personal data or downloaded audio files. Read our{" "}
            <Link
              href={`/${locale}/privacy`}
              className="text-brand-600 dark:text-brand-400 underline font-medium"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="rounded-lg bg-brand-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-600 transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="rounded-lg border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
        <button
          onClick={handleDecline}
          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}

