"use client";

import React, { useState } from "react";
import {
  Download,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  Clock,
  User,
  Music2,
  FileCheck2,
  Volume2,
} from "lucide-react";
import { NormalizedTrack } from "@/types/soundcloud";
import { TranslationDictionary } from "@/lib/i18n/translations";

interface TrackCardProps {
  track: NormalizedTrack;
  dict: TranslationDictionary;
}

export function TrackCard({ track, dict }: TrackCardProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    if (!track.downloadAvailable || !track.downloadUrl) return;
    setDownloading(true);
    
    // Trigger browser download via stream endpoint
    const url = `${track.downloadUrl}&title=${encodeURIComponent(
      `${track.artist} - ${track.title}`
    )}`;
    
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.setAttribute("download", `${track.artist} - ${track.title}.mp3`);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-200/80 bg-white p-5 sm:p-7 shadow-xl shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900/90 transition-all">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Cover Artwork */}
        <div className="relative h-44 w-44 sm:h-48 sm:w-48 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 shadow-md border border-zinc-200 dark:border-zinc-800 mx-auto sm:mx-0">
          <img
            src={track.artworkUrl}
            alt={track.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              // fallback image if remote URL fails
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80";
            }}
          />
          <div className="absolute top-2 right-2 rounded-md bg-black/75 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
            {track.durationFormatted}
          </div>
        </div>

        {/* Track Details & Action */}
        <div className="flex flex-1 flex-col justify-between w-full">
          <div>
            {/* Permitted vs Disabled Banner */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {track.downloadAvailable ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {track.licenseDetails.badgeText}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  {dict.card.downloadDisabled}
                </span>
              )}

              <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                <Clock className="h-3 w-3" />
                {track.durationFormatted}
              </span>
            </div>

            {/* Title & Artist */}
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-snug line-clamp-2">
              {track.title}
            </h2>
            <div className="mt-1 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <User className="h-3.5 w-3.5 text-brand-500" />
              <a
                href={track.artistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-600 dark:hover:text-brand-400 hover:underline font-medium"
              >
                {track.artist}
              </a>
            </div>

            {/* Licensing Explanation Note */}
            <p className="mt-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              {track.licenseDetails.description}
            </p>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {track.downloadAvailable ? (
              <>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 hover:from-brand-500 hover:to-orange-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-75 transition-all"
                >
                  <Download className={`h-4 w-4 ${downloading ? "animate-bounce" : ""}`} />
                  <span>
                    {downloading ? "Downloading Audio..." : dict.card.downloadMp3}
                  </span>
                </button>

                <a
                  href={track.permalinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>{dict.card.openSoundCloud}</span>
                </a>
              </>
            ) : (
              <div className="w-full space-y-3">
                <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300">
                  <p className="font-semibold">{dict.card.downloadDisabled}</p>
                  <p className="mt-0.5 opacity-90">{dict.card.whyDisabled}</p>
                </div>

                <a
                  href={track.permalinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-brand-600 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>{dict.card.openSoundCloud}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

