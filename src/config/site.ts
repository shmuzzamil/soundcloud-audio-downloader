export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  url: string;
  supportEmail: string;
  ogImage: string;
  locales: {
    code: string;
    name: string;
    nativeName: string;
    dir: "ltr" | "rtl";
  }[];
  defaultLocale: string;
  links: {
    twitter?: string;
    github?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME || "SoundFetch",
  shortName: "SoundFetch",
  description:
    "Fast, free and legal SoundCloud link helper and downloader for permitted audio tracks and Creative Commons music. Mobile-first with zero file storage.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://soundfetch.app",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@soundfetch.app",
  ogImage: "/og-image.png",
  defaultLocale: "en",
  locales: [
    { code: "en", name: "English", nativeName: "English", dir: "ltr" },
    { code: "es", name: "Spanish", nativeName: "Español", dir: "ltr" },
    { code: "pt", name: "Portuguese", nativeName: "Português", dir: "ltr" },
    { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl" },
    { code: "ur", name: "Urdu", nativeName: "اردو", dir: "rtl" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "ltr" },
    { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", dir: "ltr" },
    { code: "tr", name: "Turkish", nativeName: "Türkçe", dir: "ltr" },
  ],
  links: {
    twitter: "https://twitter.com",
    github: "https://github.com",
  },
};

export const LANDING_PAGES = [
  { slug: "playlist-downloader", label: "Playlist Downloader", titleSuffix: "Playlist Downloader" },
  { slug: "iphone", label: "SoundCloud for iPhone", titleSuffix: "iPhone & iOS Audio Helper" },
  { slug: "android", label: "SoundCloud for Android", titleSuffix: "Android Downloader" },
  { slug: "mac", label: "SoundCloud for Mac", titleSuffix: "Mac & macOS MP3 Tool" },
  { slug: "podcast", label: "SoundCloud Podcast", titleSuffix: "Podcast Downloader" },
  { slug: "mix", label: "SoundCloud DJ Mix", titleSuffix: "DJ Sets & Mix Downloader" },
];

