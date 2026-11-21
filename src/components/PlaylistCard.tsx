"use client";

import React, { useState } from "react";
import {
  Archive,
  Download,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  Clock,
  ListMusic,
  CheckCircle2,
  FolderArchive,
  Music,
} from "lucide-react";
import { NormalizedPlaylist, NormalizedTrack } from "@/types/soundcloud";
import { TranslationDictionary } from "@/lib/i18n/translations";

interface PlaylistCardProps {
  playlist: NormalizedPlaylist;
  dict: TranslationDictionary;
}

export function PlaylistCard({ playlist, dict }: PlaylistCardProps) {
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownloadZip = async () => {
    if (playlist.permittedCount === 0) return;
    setDownloadingZip(true);
    setDownloadError(null);

    try {
      const res = await fetch("/api/download-zip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playlistTitle: playlist.title,
          tracks: playlist.tracks,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Failed to generate ZIP");
      }

      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${playlist.title.replace(/[^a-zA-Z0-9-_\. ]/g, "")}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err: any) {
      setDownloadError(err.message || "Failed to download ZIP archive");
    } finally {
      setDownloadingZip(false);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-200/80 bg-white p-5 sm:p-7 shadow-xl shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900/90 transition-all space-y-6">
      {/* Playlist Header */}
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="relative h-40 w-40 sm:h-44 sm:w-44 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 shadow-md border border-zinc-200 dark:border-zinc-800 mx-auto sm:mx-0">
          <img
            src={playlist.coverUrl}
            alt={playlist.title}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80";
            }}
          />
          <div className="absolute top-2 left-2 rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wider backdrop-blur-sm">
            Playlist / Set
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between w-full">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                <ListMusic className="h-3.5 w-3.5" />
                {playlist.trackCount} Tracks
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                {playlist.permittedCount} {dict.card.permittedOfTotal}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-snug">
              {playlist.title}
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Curated by{" "}
              <a
                href={playlist.artistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-600 dark:text-brand-400 hover:underline"
              >
                {playlist.artist}
              </a>
            </p>
          </div>

          {/* Batch ZIP Download Action */}
          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center gap-3">
            {playlist.permittedCount > 0 ? (
              <button
                onClick={handleDownloadZip}
                disabled={downloadingZip}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 hover:from-emerald-500 hover:to-teal-400 disabled:opacity-75 transition-all"
              >
                <FolderArchive className={`h-4 w-4 ${downloadingZip ? "animate-spin" : ""}`} />
                <span>
                  {downloadingZip
                    ? "Compressing ZIP Archive..."
                    : `${dict.card.downloadAllPermitted} (${playlist.permittedCount})`}
                </span>
              </button>
            ) : (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-2 text-xs text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
                No permitted Creative Commons or downloadable tracks in this playlist.
              </div>
            )}

            <a
              href={playlist.permalinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>{dict.card.openSoundCloud}</span>
            </a>
          </div>

          {downloadError && (
            <p className="mt-2 text-xs text-rose-500">{downloadError}</p>
          )}
        </div>
      </div>

      {/* Playlist Track Listing */}
      <div className="mt-8 border-t border-zinc-100 dark:border-zinc-800 pt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4 flex items-center gap-2">
          <Music className="h-4 w-4 text-brand-500" />
          <span>{dict.card.playlistTracks} ({playlist.tracks.length})</span>
        </h3>

        <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80 rounded-xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden">
          {playlist.tracks.map((track, idx) => (
            <div
              key={track.id || idx}
              className="flex items-center justify-between p-3 sm:p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors gap-4"
            >
              {/* Left track details */}
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-mono text-zinc-400 w-5 shrink-0">
                  {idx + 1}
                </span>
                <img
                  src={track.artworkUrl}
                  alt={track.title}
                  className="h-10 w-10 rounded-lg object-cover bg-zinc-100 dark:bg-zinc-800 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    {track.title}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                    {track.artist} &bull; {track.durationFormatted}
                  </p>
                </div>
              </div>

              {/* Right status & individual download */}
              <div className="flex items-center gap-2 shrink-0">
                {track.downloadAvailable ? (
                  <a
                    href={`${track.downloadUrl}&title=${encodeURIComponent(
                      `${track.artist} - ${track.title}`
                    )}`}
                    download={`${track.artist} - ${track.title}.mp3`}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 text-xs font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{dict.card.downloadPermitted}</span>
                  </a>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/20 px-2 py-1 rounded-md">
                    <ShieldAlert className="h-3 w-3" />
                    <span className="hidden sm:inline">Disabled by Artist</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

