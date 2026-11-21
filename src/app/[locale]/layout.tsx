import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getDictionary, SupportedLocale } from "@/lib/i18n/translations";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ConsentBanner } from "@/components/ConsentBanner";
import { JsonLd, generateSoftwareApplicationSchema } from "@/components/JsonLd";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export async function generateStaticParams() {
  return siteConfig.locales.map((loc) => ({
    locale: loc.code,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  const locale = params.locale || siteConfig.defaultLocale;

  // Build hreflang alternates for all supported locales
  const languageAlternates: Record<string, string> = {};
  siteConfig.locales.forEach((loc) => {
    languageAlternates[loc.code] = `${siteConfig.url}/${loc.code}`;
  });
  languageAlternates["x-default"] = `${siteConfig.url}/${siteConfig.defaultLocale}`;

  return {
    title: {
      default: dict.meta.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: languageAlternates,
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      locale: locale,
      type: "website",
      images: [
        {
          url: `${siteConfig.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - SoundCloud Audio Downloader`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [`${siteConfig.url}/og-image.png`],
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const locale = (params.locale as SupportedLocale) || siteConfig.defaultLocale;
  const dict = getDictionary(locale);
  const localeObj = siteConfig.locales.find((l) => l.code === locale) || siteConfig.locales[0];
  const isRtl = localeObj.dir === "rtl";

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen flex flex-col justify-between">
        <JsonLd
          data={generateSoftwareApplicationSchema(siteConfig.name, siteConfig.url)}
        />
        <Navbar locale={locale} dict={dict} />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
        <ConsentBanner locale={locale} />
      </div>
    </ThemeProvider>
  );
}

