/**
 * Automated Verification Script for Core Engine Logic
 */

import { parseSoundCloudUrl, isSoundCloudUrl } from "../src/lib/soundcloud/regex.ts";
import { formatDuration, sanitizeFilename } from "../src/lib/utils.ts";
import { evaluateLicense } from "../src/lib/soundcloud/client.ts";
import { checkRateLimit } from "../src/lib/security/ratelimit.ts";

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

console.log("=== Testing URL Regex & Parser ===");
const trackUrl = "https://soundcloud.com/chillhopdotcom/streambreeze?si=123";
assert(isSoundCloudUrl(trackUrl), "isSoundCloudUrl detects standard track");
const parsedTrack = parseSoundCloudUrl(trackUrl);
assert(parsedTrack.isValid && parsedTrack.type === "track", "parseSoundCloudUrl parses track");

const setUrl = "https://soundcloud.com/artist/sets/summer-vibes-2026";
const parsedSet = parseSoundCloudUrl(setUrl);
assert(parsedSet.isValid && parsedSet.type === "playlist", "parseSoundCloudUrl parses playlist (/sets/)");

const shortUrl = "https://on.soundcloud.com/xyz123";
const parsedShort = parseSoundCloudUrl(shortUrl);
assert(parsedShort.isValid && parsedShort.type === "shortlink", "parseSoundCloudUrl parses on.soundcloud.com");

const invalidUrl = "https://youtube.com/watch?v=123";
assert(!isSoundCloudUrl(invalidUrl), "Rejects non-SoundCloud domain");

console.log("\n=== Testing Licensing & Copyright Decision Engine ===");
// Case A: Creative Commons track
const ccTrack = {
  id: 1,
  title: "Test CC",
  license: "cc-by",
  downloadable: false,
};
const ccResult = evaluateLicense(ccTrack);
assert(ccResult.canDownload === true, "Creative Commons track allows download");
assert(ccResult.isCreativeCommons === true, "Flagged as isCreativeCommons");

// Case B: Artist explicitly enabled download
const artistAllowedTrack = {
  id: 2,
  title: "Free Track",
  license: "all-rights-reserved",
  downloadable: true,
  download_url: "https://api.soundcloud.com/tracks/2/download",
};
const artistResult = evaluateLicense(artistAllowedTrack);
assert(artistResult.canDownload === true, "Artist-enabled track allows download");
assert(artistResult.isArtistAllowed === true, "Flagged as isArtistAllowed");

// Case C: Protected / All Rights Reserved track without download enabled
const protectedTrack = {
  id: 3,
  title: "Commercial Single",
  license: "all-rights-reserved",
  downloadable: false,
};
const protectedResult = evaluateLicense(protectedTrack);
assert(protectedResult.canDownload === false, "Protected track disallows download");

console.log("\n=== Testing Utilities ===");
assert(formatDuration(65000) === "1:05", "Formats 65000ms to 1:05");
assert(formatDuration(3665000) === "1:01:05", "Formats 3665000ms to 1:01:05");
assert(sanitizeFilename("Artist - Song! @#$%.mp3") === "Artist - Song .mp3", "Sanitizes filename safely");

console.log("\n=== Testing Rate Limiter ===");
const rl1 = checkRateLimit("test-ip-1");
assert(rl1.success === true, "First request passes rate limit");

console.log(`\nResults: ${passed} Passed, ${failed} Failed.`);
if (failed > 0) {
  process.exit(1);
}

