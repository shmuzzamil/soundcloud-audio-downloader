import React from "react";

interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function generateSoftwareApplicationSchema(brandName: string, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${brandName} - SoundCloud Link Helper & Permitted Audio Downloader`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web, iOS, Android, macOS, Windows",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "12840",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Official SoundCloud API Resolution",
      "Creative Commons & Royalty-Free Filter",
      "Playlist Batch ZIP Downloader",
      "Zero Server Storage Privacy",
      "Mobile Share-Sheet Integration",
      "Lossless Stream Audio Proxying",
    ],
  };
}

export function generateHowToSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Download Permitted SoundCloud Tracks legally",
    description: "A step-by-step guide to verifying licensing and downloading permitted SoundCloud music to your mobile device or computer.",
    totalTime: "PT1M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Copy SoundCloud URL",
        text: "Locate your favorite track or playlist on SoundCloud. Tap 'Share' and choose 'Copy Link' or copy the link directly from your browser's address bar.",
        url: `${siteUrl}#step-1`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Paste & Check License",
        text: "Paste the URL into SoundFetch. Our system analyzes the official SoundCloud API to check whether the track is Creative Commons or authorized for download by the artist.",
        url: `${siteUrl}#step-2`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Download Permitted Audio",
        text: "Click the 'Download Permitted Audio' button to stream the high-quality MP3 file directly to your device with zero server storage.",
        url: `${siteUrl}#step-3`,
      },
    ],
  };
}

export function generateFaqSchema(faqItems: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

