/**
 * SoundCloud URL Validation & Extraction
 */

export interface ParsedSoundCloudUrl {
  isValid: boolean;
  type: "track" | "playlist" | "user" | "shortlink" | "unknown";
  cleanUrl: string;
}

// Regular expressions for SoundCloud URLs
// Covers:
// 1. Tracks: https://soundcloud.com/artist-slug/track-slug
// 2. Secret token tracks: https://soundcloud.com/artist-slug/track-slug/s-xxxx
// 3. Playlists / Sets: https://soundcloud.com/artist-slug/sets/playlist-slug
// 4. Mobile short links: https://on.soundcloud.com/xxxx
// 5. Profiles: https://soundcloud.com/artist-slug
// 6. Subdomains: https://m.soundcloud.com/...

const SOUNDCLOUD_DOMAIN_REGEX = /^(https?:\/\/)?((m|www|on)\.)?soundcloud\.com(\/.*)?$/i;
const PLAYLIST_REGEX = /^(https?:\/\/)?((m|www)\.)?soundcloud\.com\/[\w-]+\/sets\/[\w-]+(?:\/s-[\w-]+)?(?:\?.*)?$/i;
const TRACK_REGEX = /^(https?:\/\/)?((m|www)\.)?soundcloud\.com\/[\w-]+\/(?!sets\/|you\/|discover\/|stream\/|search\/|settings\/|upload\/|pages\/|pro\/|charts\/|station\/|feed\/|people\/)[\w-]+(?:\/s-[\w-]+)?(?:\?.*)?$/i;
const USER_PROFILE_REGEX = /^(https?:\/\/)?((m|www)\.)?soundcloud\.com\/[\w-]+(?:\/(?:tracks|albums|sets|reposts|likes))?\/?(?:\?.*)?$/i;
const SHORT_LINK_REGEX = /^(https?:\/\/)?on\.soundcloud\.com\/[\w-]+(?:\?.*)?$/i;

/**
 * Test whether a string is a potentially valid SoundCloud URL
 */
export function isSoundCloudUrl(input: string): boolean {
  if (!input || typeof input !== "string") return false;
  const trimmed = input.trim();
  return (
    SOUNDCLOUD_DOMAIN_REGEX.test(trimmed) ||
    SHORT_LINK_REGEX.test(trimmed)
  );
}

/**
 * Parse and classify a SoundCloud URL
 */
export function parseSoundCloudUrl(rawUrl: string): ParsedSoundCloudUrl {
  if (!rawUrl || typeof rawUrl !== "string") {
    return { isValid: false, type: "unknown", cleanUrl: "" };
  }

  let trimmed = rawUrl.trim();

  // Prepend https:// if protocol is omitted
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    trimmed = "https://" + trimmed;
  }

  try {
    const urlObj = new URL(trimmed);

    // Clean tracking params like ?si=, ?ref=, etc., but keep ?secret_token= if present
    const secretToken = urlObj.searchParams.get("secret_token");
    const cleanUrl = `${urlObj.origin}${urlObj.pathname}${secretToken ? `?secret_token=${secretToken}` : ""}`;

    if (SHORT_LINK_REGEX.test(cleanUrl) || SHORT_LINK_REGEX.test(trimmed)) {
      return { isValid: true, type: "shortlink", cleanUrl };
    }

    if (PLAYLIST_REGEX.test(cleanUrl) || PLAYLIST_REGEX.test(trimmed)) {
      return { isValid: true, type: "playlist", cleanUrl };
    }

    if (TRACK_REGEX.test(cleanUrl) || TRACK_REGEX.test(trimmed)) {
      return { isValid: true, type: "track", cleanUrl };
    }

    if (USER_PROFILE_REGEX.test(cleanUrl) || USER_PROFILE_REGEX.test(trimmed)) {
      return { isValid: true, type: "user", cleanUrl };
    }

    if (SOUNDCLOUD_DOMAIN_REGEX.test(cleanUrl)) {
      return { isValid: true, type: "unknown", cleanUrl };
    }

    return { isValid: false, type: "unknown", cleanUrl };
  } catch {
    return { isValid: false, type: "unknown", cleanUrl: "" };
  }
}

