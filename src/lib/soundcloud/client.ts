/**
 * SoundCloud API Client & License Verifier
 * Official OAuth Client Credentials + /resolve endpoint
 */

import {
  NormalizedTrack,
  NormalizedPlaylist,
  SoundCloudRawTrack,
  SoundCloudRawPlaylist,
  SoundCloudRawResponse,
} from "@/types/soundcloud";
import { formatDuration, getHighResArtwork } from "@/lib/utils";

// Known Creative Commons license slugs from SoundCloud
const CC_LICENSES: Record<string, { name: string; description: string }> = {
  "cc-by": {
    name: "Creative Commons Attribution (CC BY)",
    description: "Free to share and adapt with credit to the original creator.",
  },
  "cc-by-nc": {
    name: "Creative Commons Non-Commercial (CC BY-NC)",
    description: "Free to download and share non-commercially with attribution.",
  },
  "cc-by-nd": {
    name: "Creative Commons No-Derivatives (CC BY-ND)",
    description: "Free to download and share without modifications.",
  },
  "cc-by-sa": {
    name: "Creative Commons Share-Alike (CC BY-SA)",
    description: "Free to download, modify, and share under identical license.",
  },
  "cc-by-nc-nd": {
    name: "Creative Commons Non-Commercial No-Derivatives (CC BY-NC-ND)",
    description: "Free to download and share non-commercially without remixes.",
  },
  "cc-by-nc-sa": {
    name: "Creative Commons Non-Commercial Share-Alike (CC BY-NC-SA)",
    description: "Free to download and remix non-commercially with attribution.",
  },
  "no-rights-reserved": {
    name: "Public Domain (CC0)",
    description: "Dedicated to the public domain. Free for all uses.",
  },
};

// In-memory OAuth token cache
let cachedToken: {
  accessToken: string;
  expiresAt: number;
} | null = null;

/**
 * Fetch or refresh OAuth client credentials token
 */
async function getSoundCloudToken(): Promise<string | null> {
  const clientId = process.env.SOUNDCLOUD_CLIENT_ID;
  const clientSecret = process.env.SOUNDCLOUD_CLIENT_SECRET;

  if (!clientId) {
    return null;
  }

  // If token is still valid (with 60-second safety margin)
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60000) {
    return cachedToken.accessToken;
  }

  if (clientSecret) {
    try {
      const res = await fetch("https://api.soundcloud.com/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        cachedToken = {
          accessToken: data.access_token,
          expiresAt: Date.now() + (data.expires_in || 3600) * 1000,
        };
        return cachedToken.accessToken;
      }
    } catch (err) {
      console.error("SoundCloud OAuth error:", err);
    }
  }

  // Fallback: return client_id directly if used as query param
  return clientId;
}

/**
 * Evaluate track licensing and download permissions
 * Strictest legal compliance: Only allows download when uploader enabled downloads
 * or license is an explicit Creative Commons / royalty-free license.
 */
export function evaluateLicense(track: SoundCloudRawTrack): NormalizedTrack["licenseDetails"] {
  const rawLicense = (track.license || "all-rights-reserved").toLowerCase().trim();
  const isCC = Boolean(CC_LICENSES[rawLicense]);
  const isArtistAllowed = Boolean(track.downloadable && track.download_url);
  const canDownload = isArtistAllowed || isCC;

  let badgeText = "All Rights Reserved";
  let description = "Downloads are disabled by the artist. Support the creator on SoundCloud.";

  if (isArtistAllowed) {
    badgeText = "Artist Authorized Download";
    description = "The artist has explicitly enabled free downloads for this track.";
  } else if (isCC) {
    const ccInfo = CC_LICENSES[rawLicense];
    badgeText = ccInfo.name;
    description = ccInfo.description;
  }

  return {
    isCreativeCommons: isCC,
    isArtistAllowed,
    canDownload,
    badgeText,
    description,
  };
}

/**
 * Normalize raw track into frontend representation
 */
export function normalizeTrack(track: SoundCloudRawTrack): NormalizedTrack {
  const licenseDetails = evaluateLicense(track);
  const canDownload = licenseDetails.canDownload;

  return {
    id: track.id,
    title: track.title,
    artist: track.user?.username || "Unknown Artist",
    artistUrl: track.user?.permalink_url || `https://soundcloud.com`,
    artistAvatar: track.user?.avatar_url,
    durationFormatted: formatDuration(track.duration),
    durationMs: track.duration,
    artworkUrl: getHighResArtwork(track.artwork_url || track.user?.avatar_url),
    waveformUrl: track.waveform_url,
    permalinkUrl: track.permalink_url,
    license: track.license || "all-rights-reserved",
    licenseDetails,
    downloadAvailable: canDownload,
    downloadReason: canDownload
      ? licenseDetails.isArtistAllowed
        ? "Official Free Download Provided by Artist"
        : "Creative Commons / Royalty-Free License"
      : "Downloads are disabled by the artist. Only permitted or royalty-free audio can be downloaded.",
    downloadUrl: canDownload ? `/api/stream?trackId=${track.id}` : undefined,
  };
}

/**
 * Normalize raw playlist into frontend representation
 */
export function normalizePlaylist(playlist: SoundCloudRawPlaylist): NormalizedPlaylist {
  const rawTracks = Array.isArray(playlist.tracks) ? playlist.tracks : [];
  const normalizedTracks = rawTracks
    .filter((t) => t && t.id && t.title)
    .map(normalizeTrack);

  const permittedCount = normalizedTracks.filter((t) => t.downloadAvailable).length;

  return {
    id: playlist.id,
    kind: "playlist",
    title: playlist.title,
    artist: playlist.user?.username || "SoundCloud Curator",
    artistUrl: playlist.user?.permalink_url || "https://soundcloud.com",
    coverUrl: getHighResArtwork(playlist.artwork_url || playlist.user?.avatar_url),
    permalinkUrl: playlist.permalink_url,
    trackCount: playlist.track_count || normalizedTracks.length,
    durationFormatted: formatDuration(playlist.duration),
    permittedCount,
    tracks: normalizedTracks,
  };
}

/**
 * Resolve a SoundCloud URL using the official API with OAuth or fallback fixtures
 */
export async function resolveSoundCloudUrl(cleanUrl: string): Promise<
  | { success: true; kind: "track"; data: NormalizedTrack }
  | { success: true; kind: "playlist"; data: NormalizedPlaylist }
  | { success: false; code: "INVALID_URL" | "PRIVATE_RESOURCE" | "GEO_BLOCKED" | "NOT_FOUND" | "API_ERROR"; message: string }
> {
  const token = await getSoundCloudToken();

  // If no SoundCloud credentials are configured in development or deployment,
  // we check for mock / demo fixtures so developers and users can immediately test the UI and features!
  if (!token) {
    return handleMockResolution(cleanUrl);
  }

  try {
    const resolveEndpoint = `https://api.soundcloud.com/resolve?url=${encodeURIComponent(
      cleanUrl
    )}`;

    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (token.startsWith("Bearer ") || token.length > 32) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(resolveEndpoint, {
      headers,
      redirect: "follow",
    });

    if (res.status === 404) {
      return {
        success: false,
        code: "NOT_FOUND",
        message: "The track or playlist was not found. It may have been deleted or moved.",
      };
    }

    if (res.status === 403 || res.status === 401) {
      return {
        success: false,
        code: "PRIVATE_RESOURCE",
        message: "This track or playlist is private, requires authorization, or is geo-restricted.",
      };
    }

    if (!res.ok) {
      return {
        success: false,
        code: "API_ERROR",
        message: `SoundCloud API returned status ${res.status}. Please try again shortly.`,
      };
    }

    const rawData = (await res.json()) as any;

    if (rawData && rawData.kind === "track") {
      return {
        success: true,
        kind: "track",
        data: normalizeTrack(rawData as SoundCloudRawTrack),
      };
    }

    if (rawData && rawData.kind === "playlist") {
      return {
        success: true,
        kind: "playlist",
        data: normalizePlaylist(rawData as SoundCloudRawPlaylist),
      };
    }

    return {
      success: false,
      code: "INVALID_URL",
      message: "The provided SoundCloud link does not correspond to a supported track or playlist.",
    };
  } catch (err: any) {
    console.error("Error resolving SoundCloud URL:", err);
    return {
      success: false,
      code: "API_ERROR",
      message: "Failed to connect to the SoundCloud service. Please verify your internet connection.",
    };
  }
}

/**
 * Realistic Mock / Sandbox Fixtures for Development or Testing
 * Demonstrates:
 * 1. A Creative Commons royalty-free permitted track
 * 2. An artist-allowed downloadable track
 * 3. A copyrighted / downloads-disabled track ("Downloads are disabled by the artist")
 * 4. A playlist with mixed permissions and batch ZIP support
 */
export function handleMockResolution(cleanUrl: string) {
  const lower = cleanUrl.toLowerCase();

  // Test Case 1: Playlist / Sets
  if (lower.includes("/sets/")) {
    const mockPlaylist: NormalizedPlaylist = {
      id: 987654321,
      kind: "playlist",
      title: "Lo-Fi Beats & Study Instrumentals (Permitted Selection)",
      artist: "ChillHop Collective",
      artistUrl: "https://soundcloud.com/chillhopcollective",
      coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
      permalinkUrl: cleanUrl,
      trackCount: 4,
      durationFormatted: "13:45",
      permittedCount: 3,
      tracks: [
        {
          id: 1001,
          title: "Autumn Breeze (Free DL)",
          artist: "ChillHop Collective",
          artistUrl: "https://soundcloud.com/chillhopcollective",
          durationFormatted: "3:20",
          durationMs: 200000,
          artworkUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=80",
          permalinkUrl: `${cleanUrl}/autumn-breeze`,
          license: "cc-by",
          licenseDetails: {
            isCreativeCommons: true,
            isArtistAllowed: true,
            canDownload: true,
            badgeText: "Creative Commons (CC BY)",
            description: "Free to download and use with credit to the creator.",
          },
          downloadAvailable: true,
          downloadReason: "Creative Commons / Royalty-Free License",
          downloadUrl: "/api/stream?trackId=1001&mock=true",
        },
        {
          id: 1002,
          title: "Midnight Coffee (Official Download)",
          artist: "ChillHop Collective",
          artistUrl: "https://soundcloud.com/chillhopcollective",
          durationFormatted: "2:45",
          durationMs: 165000,
          artworkUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=80",
          permalinkUrl: `${cleanUrl}/midnight-coffee`,
          license: "all-rights-reserved",
          licenseDetails: {
            isCreativeCommons: false,
            isArtistAllowed: true,
            canDownload: true,
            badgeText: "Artist Authorized Download",
            description: "The artist has enabled direct free download for this release.",
          },
          downloadAvailable: true,
          downloadReason: "Official Free Download Provided by Artist",
          downloadUrl: "/api/stream?trackId=1002&mock=true",
        },
        {
          id: 1003,
          title: "Rainy Rooftop (Protected Release)",
          artist: "ChillHop Collective feat. Sony Music",
          artistUrl: "https://soundcloud.com/chillhopcollective",
          durationFormatted: "4:10",
          durationMs: 250000,
          artworkUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
          permalinkUrl: `${cleanUrl}/rainy-rooftop`,
          license: "all-rights-reserved",
          licenseDetails: {
            isCreativeCommons: false,
            isArtistAllowed: false,
            canDownload: false,
            badgeText: "All Rights Reserved",
            description: "Downloads are disabled by the artist. Support the creator on SoundCloud.",
          },
          downloadAvailable: false,
          downloadReason: "Downloads are disabled by the artist. Only permitted or royalty-free audio can be downloaded.",
        },
        {
          id: 1004,
          title: "Sunrise Glow (CC0 Public Domain)",
          artist: "Acoustic Explorers",
          artistUrl: "https://soundcloud.com/chillhopcollective",
          durationFormatted: "3:30",
          durationMs: 210000,
          artworkUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80",
          permalinkUrl: `${cleanUrl}/sunrise-glow`,
          license: "no-rights-reserved",
          licenseDetails: {
            isCreativeCommons: true,
            isArtistAllowed: false,
            canDownload: true,
            badgeText: "Public Domain (CC0)",
            description: "Dedicated to the public domain. Free for all uses.",
          },
          downloadAvailable: true,
          downloadReason: "Creative Commons / Royalty-Free License",
          downloadUrl: "/api/stream?trackId=1004&mock=true",
        },
      ],
    };

    return {
      success: true as const,
      kind: "playlist" as const,
      data: mockPlaylist,
    };
  }

  // Test Case 2: Protected / Disabled track if URL contains 'disabled' or 'copyright'
  if (lower.includes("disabled") || lower.includes("copyright") || lower.includes("protected")) {
    const mockDisabledTrack: NormalizedTrack = {
      id: 555001,
      title: "Commercial Radio Hit (Downloads Disabled)",
      artist: "Major Label Artist",
      artistUrl: "https://soundcloud.com/majorlabel",
      durationFormatted: "3:42",
      durationMs: 222000,
      artworkUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
      permalinkUrl: cleanUrl,
      license: "all-rights-reserved",
      licenseDetails: {
        isCreativeCommons: false,
        isArtistAllowed: false,
        canDownload: false,
        badgeText: "All Rights Reserved",
        description: "Downloads are disabled by the artist. Support the creator on SoundCloud.",
      },
      downloadAvailable: false,
      downloadReason: "Downloads are disabled by the artist. Only permitted or royalty-free audio can be downloaded.",
    };

    return {
      success: true as const,
      kind: "track" as const,
      data: mockDisabledTrack,
    };
  }

  // Test Case 3: Error simulation triggers
  if (lower.includes("private")) {
    return {
      success: false as const,
      code: "PRIVATE_RESOURCE" as const,
      message: "This track is private or requires authorization. Please verify the link.",
    };
  }

  if (lower.includes("geoblock") || lower.includes("blocked")) {
    return {
      success: false as const,
      code: "GEO_BLOCKED" as const,
      message: "This track is not available in your region due to territorial licensing restrictions.",
    };
  }

  if (lower.includes("404") || lower.includes("notfound")) {
    return {
      success: false as const,
      code: "NOT_FOUND" as const,
      message: "This track has been removed or the URL is incorrect.",
    };
  }

  // Default Fallback Track: Permitted Creative Commons Track
  const defaultTrack: NormalizedTrack = {
    id: 888123456,
    title: "Summer Horizon (Creative Commons / Permitted Audio)",
    artist: "SoundScape Studio",
    artistUrl: "https://soundcloud.com/soundscapestudio",
    artistAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    durationFormatted: "3:54",
    durationMs: 234000,
    artworkUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80",
    waveformUrl: "https://wis.sndcdn.com/waveform.png",
    permalinkUrl: cleanUrl,
    license: "cc-by",
    licenseDetails: {
      isCreativeCommons: true,
      isArtistAllowed: true,
      canDownload: true,
      badgeText: "Creative Commons (CC BY 4.0)",
      description: "Free to download, share, and remix with attribution to the artist.",
    },
    downloadAvailable: true,
    downloadReason: "Creative Commons / Royalty-Free License",
    downloadUrl: "/api/stream?trackId=888123456&mock=true",
  };

  return {
    success: true as const,
    kind: "track" as const,
    data: defaultTrack,
  };
}
