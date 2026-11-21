export type SoundCloudItemKind = "track" | "playlist" | "user" | "unknown";

export interface SoundCloudUser {
  id: number;
  kind?: "user";
  username: string;
  permalink: string;
  permalink_url: string;
  avatar_url: string;
  followers_count?: number;
  verified?: boolean;
}

export interface SoundCloudMediaFormat {
  protocol: "progressive" | "hls";
  mime_type: string;
}

export interface SoundCloudTranscoding {
  url: string;
  preset: string;
  duration: number;
  snippets?: any[];
  format: SoundCloudMediaFormat;
  quality: string;
}

export interface SoundCloudTrackMedia {
  transcodings: SoundCloudTranscoding[];
}

export interface SoundCloudRawTrack {
  id: number;
  kind: "track";
  title: string;
  description?: string;
  duration: number; // in milliseconds
  genre?: string;
  permalink_url: string;
  artwork_url?: string | null;
  waveform_url?: string;
  user: SoundCloudUser;
  license?: string;
  downloadable?: boolean;
  download_url?: string;
  streamable?: boolean;
  media?: SoundCloudTrackMedia;
  created_at?: string;
  playback_count?: number;
  likes_count?: number;
}

export interface SoundCloudRawPlaylist {
  id: number;
  kind: "playlist";
  title: string;
  description?: string;
  duration: number;
  permalink_url: string;
  artwork_url?: string | null;
  user: SoundCloudUser;
  track_count: number;
  tracks: SoundCloudRawTrack[];
  created_at?: string;
  likes_count?: number;
}

export type SoundCloudRawResponse = SoundCloudRawTrack | SoundCloudRawPlaylist | SoundCloudUser;

/**
 * Normalized track data sent to the frontend
 */
export interface NormalizedTrack {
  id: number;
  title: string;
  artist: string;
  artistUrl: string;
  artistAvatar?: string;
  durationFormatted: string;
  durationMs: number;
  artworkUrl: string;
  waveformUrl?: string;
  permalinkUrl: string;
  license: string;
  licenseDetails: {
    isCreativeCommons: boolean;
    isArtistAllowed: boolean;
    canDownload: boolean;
    badgeText: string;
    description: string;
  };
  downloadAvailable: boolean;
  downloadReason?: string;
  downloadUrl?: string; // Direct backend proxy endpoint if permitted
}

/**
 * Normalized playlist data sent to the frontend
 */
export interface NormalizedPlaylist {
  id: number;
  kind: "playlist";
  title: string;
  artist: string;
  artistUrl: string;
  coverUrl: string;
  permalinkUrl: string;
  trackCount: number;
  durationFormatted: string;
  permittedCount: number;
  tracks: NormalizedTrack[];
}

/**
 * Unified API Response for resolution
 */
export interface ResolveSuccessResponse {
  success: true;
  kind: "track" | "playlist" | "user";
  data: NormalizedTrack | NormalizedPlaylist;
}

export interface ResolveErrorResponse {
  success: false;
  code: "INVALID_URL" | "PRIVATE_RESOURCE" | "GEO_BLOCKED" | "NOT_FOUND" | "RATE_LIMITED" | "CAPTCHA_FAILED" | "API_ERROR";
  message: string;
  details?: string;
}

export type ResolveApiResponse = ResolveSuccessResponse | ResolveErrorResponse;
