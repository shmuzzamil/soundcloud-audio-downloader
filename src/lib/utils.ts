import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format milliseconds into MM:SS or HH:MM:SS
 */
export function formatDuration(ms: number): string {
  if (!ms || isNaN(ms) || ms <= 0) return "0:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const paddedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  if (hours > 0) {
    const paddedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }

  return `${minutes}:${paddedSeconds}`;
}

/**
 * Safe high-res artwork URL generator from SoundCloud thumbnail
 * Changes -large.jpg (100x100) to -t500x500.jpg (500x500)
 */
export function getHighResArtwork(url?: string | null): string {
  if (!url) return "/artwork-placeholder.png";
  return url.replace("-large.jpg", "-t500x500.jpg");
}

/**
 * Sanitize filename for download headers
 */
export function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9-_\. ]/g, "").trim() || "soundcloud-audio";
}

