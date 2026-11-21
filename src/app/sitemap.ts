import { MetadataRoute } from "next";
import { siteConfig, LANDING_PAGES } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];
  const baseUrl = siteConfig.url;

  const subpages = [
    "",
    "playlist-downloader",
    "iphone",
    "android",
    "mac",
    "podcast",
    "mix",
    "terms",
    "privacy",
    "dmca",
    "contact",
  ];

  // Build entries for every locale and subpage
  for (const sub of subpages) {
    for (const loc of siteConfig.locales) {
      const path = sub ? `/${loc.code}/${sub}` : `/${loc.code}`;
      const url = `${baseUrl}${path}`;

      // Alternate hreflang language URLs
      const languages: Record<string, string> = {};
      for (const otherLoc of siteConfig.locales) {
        const otherPath = sub ? `/${otherLoc.code}/${sub}` : `/${otherLoc.code}`;
        languages[otherLoc.code] = `${baseUrl}${otherPath}`;
      }

      routes.push({
        url,
        lastModified: new Date(),
        changeFrequency: sub === "" ? "daily" : "weekly",
        priority: sub === "" ? 1.0 : sub.includes("downloader") ? 0.9 : 0.7,
        alternates: {
          languages,
        },
      });
    }
  }

  return routes;
}

