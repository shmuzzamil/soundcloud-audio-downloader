"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Clipboard,
  X,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Music,
  ListMusic,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { parseSoundCloudUrl, isSoundCloudUrl } from "@/lib/soundcloud/regex";
import { NormalizedTrack, NormalizedPlaylist, ResolveApiResponse } from "@/types/soundcloud";
import { TrackCard } from "@/components/TrackCard";
import { PlaylistCard } from "@/components/PlaylistCard";
import { TranslationDictionary } from "@/lib/i18n/translations";

interface HeroSearchProps {
  dict: TranslationDictionary;
  initialQuery?: string;
}

export function HeroSearch({ dict, initialQuery = "" }: HeroSearchProps) {
  const [url, setUrl] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);
  const [result, setResult] = useState<{
    kind: "track" | "playlist" | "user";
    data: NormalizedTrack | NormalizedPlaylist;
  } | null>(null);

  // Client validation state
  const parsed = parseSoundCloudUrl(url);

  // Auto-resolve if initialQuery is passed
  useEffect(() => {
    if (initialQuery && isSoundCloudUrl(initialQuery)) {
      handleAnalyze(initialQuery);
    }
  }, [initialQuery]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        setError(null);
      }
    } catch (err) {
      // Clipboard permissions or not supported
      console.warn("Clipboard access denied or unavailable");
    }
  };

  const handleClear = () => {
    setUrl("");
    setError(null);
    setResult(null);
  };

  const handleAnalyze = async (overrideUrl?: string) => {
    const targetUrl = (overrideUrl || url).trim();
    if (!targetUrl) return;

    const validation = parseSoundCloudUrl(targetUrl);
    if (!validation.isValid) {
      setError({
        code: "INVALID_URL",
        message: dict.errors.invalidUrl,
      });
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: validation.cleanUrl }),
      });

      const json: ResolveApiResponse = await res.json();

      if (!json.success) {
        setError({
          code: json.code,
          message: json.message || dict.errors.serverError,
        });
      } else {
        setResult({
          kind: json.kind,
          data: json.data,
        });
      }
    } catch (err: any) {
      setError({
        code: "API_ERROR",
        message: dict.errors.serverError,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Search Input Box Card */}
      <div className="relative rounded-2xl border border-zinc-200/80 bg-white/95 p-3 sm:p-4 shadow-xl shadow-brand-500/5 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90 transition-all">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAnalyze();
          }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
        >
          {/* Text Input Container */}
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-3.5 h-5 w-5 text-zinc-400 dark:text-zinc-500 shrink-0" />
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError(null);
              }}
              placeholder={dict.hero.inputPlaceholder}
              className="w-full rounded-xl bg-zinc-50/80 dark:bg-zinc-800/80 py-3.5 pl-11 pr-24 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-500 transition-all"
              required
            />

            {/* Quick action buttons inside input */}
            <div className="absolute right-2.5 flex items-center gap-1">
              {url ? (
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-700/60 transition-colors"
                  title={dict.hero.buttonClear}
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePaste}
                  className="flex items-center gap-1 rounded-lg bg-zinc-200/70 dark:bg-zinc-700/70 px-2 py-1 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                >
                  <Clipboard className="h-3.5 w-3.5" />
                  <span>{dict.hero.buttonPaste}</span>
                </button>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 via-orange-500 to-amber-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 hover:from-brand-500 hover:to-amber-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-60 transition-all shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{dict.hero.buttonProcessing}</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>{dict.hero.buttonSubmit}</span>
              </>
            )}
          </button>
        </form>

        {/* Live URL Type Indicator Pill */}
        {url.trim().length > 8 && (
          <div className="mt-2.5 flex items-center justify-between px-1 text-xs">
            <div className="flex items-center gap-1.5">
              {parsed.isValid ? (
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {parsed.type === "playlist"
                    ? "SoundCloud Playlist (/sets/) detected"
                    : parsed.type === "track"
                    ? "SoundCloud Track detected"
                    : parsed.type === "shortlink"
                    ? "SoundCloud Mobile Short Link detected"
                    : "SoundCloud Profile link detected"}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Must be a soundcloud.com link
                </span>
              )}
            </div>

            <span className="text-[11px] text-zinc-400">
              Zero server storage
            </span>
          </div>
        )}
      </div>

      {/* Quick Test Links / Presets for Users */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="font-medium text-zinc-600 dark:text-zinc-300">Quick Test Samples:</span>
        <button
          onClick={() => {
            const sample = "https://soundcloud.com/chillhopcollective/summer-breeze";
            setUrl(sample);
            handleAnalyze(sample);
          }}
          className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1 hover:border-brand-500 dark:hover:border-brand-500 transition-colors"
        >
          🎵 Permitted CC Track
        </button>
        <button
          onClick={() => {
            const sample = "https://soundcloud.com/chillhopcollective/sets/lo-fi-beats-permitted";
            setUrl(sample);
            handleAnalyze(sample);
          }}
          className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1 hover:border-brand-500 dark:hover:border-brand-500 transition-colors"
        >
          📂 Permitted Playlist (ZIP)
        </button>
        <button
          onClick={() => {
            const sample = "https://soundcloud.com/majorlabel/copyright-protected-track";
            setUrl(sample);
            handleAnalyze(sample);
          }}
          className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1 hover:border-brand-500 dark:hover:border-brand-500 transition-colors"
        >
          🔒 Disabled by Artist
        </button>
      </div>

      {/* Error Alert Box */}
      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-4 dark:border-rose-900/60 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold">
                {error.code === "INVALID_URL"
                  ? "Invalid SoundCloud URL"
                  : error.code === "NOT_FOUND"
                  ? "Resource Not Found"
                  : error.code === "PRIVATE_RESOURCE"
                  ? "Private Resource"
                  : error.code === "GEO_BLOCKED"
                  ? "Territorial Geo-Restriction"
                  : error.code === "RATE_LIMITED"
                  ? "Rate Limit Reached"
                  : "Unable to Resolve Link"}
              </h4>
              <p className="mt-1 text-xs opacity-90">{error.message}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-400 hover:text-rose-600 dark:hover:text-rose-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Result Presentation */}
      {result && (
        <div className="animate-in fade-in zoom-in-95 duration-200">
          {result.kind === "track" && (
            <TrackCard track={result.data as NormalizedTrack} dict={dict} />
          )}

          {result.kind === "playlist" && (
            <PlaylistCard
              playlist={result.data as NormalizedPlaylist}
              dict={dict}
            />
          )}
        </div>
      )}
    </div>
  );
}

