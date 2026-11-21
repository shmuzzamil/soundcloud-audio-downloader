import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { JsonLd, generateBreadcrumbSchema } from "@/components/JsonLd";
import { Shield, Lock, EyeOff } from "lucide-react";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = params.locale || "en";
  return {
    title: "Privacy Policy",
    description: `Learn how ${siteConfig.name} protects your privacy with strict zero-storage, no user account requirement, and GDPR compliance.`,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/privacy`,
    },
  };
}

export default function PrivacyPage({ params }: PageProps) {
  const locale = params.locale || "en";
  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/${locale}` },
    { name: "Privacy Policy", url: `${siteConfig.url}/${locale}/privacy` },
  ];

  return (
    <article className="max-w-3xl mx-auto py-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 mb-3">
          <Lock className="h-3.5 w-3.5" />
          <span>Zero Server Storage</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Effective Date: November 2026 &bull; GDPR & CCPA Compliant
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-6 text-zinc-700 dark:text-zinc-300">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">1. Our Core Privacy Philosophy</h2>
          <p>
            At {siteConfig.name}, we believe in minimal data footprint. We do not require registration, we do not create user profiles, and we strictly <strong>never store or cache audio files</strong> on our infrastructure.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">2. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>
              <strong>SoundCloud URLs:</strong> URLs you submit to the search bar are processed transiently in memory to resolve metadata and are never permanently logged or tied to your identity.
            </li>
            <li>
              <strong>Technical Logs:</strong> Minimal server logs (IP address, browser user-agent) may be held temporarily in memory for rate-limiting, DoS mitigation, and security.
            </li>
            <li>
              <strong>Anonymous Analytics:</strong> Aggregated, non-personally identifiable metrics (such as page views and Core Web Vitals) may be analyzed to improve site speed.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">3. Zero Storage Guarantee</h2>
          <p>
            When you download an audio file or playlist ZIP, the stream is transferred directly from the audio provider through memory buffers to your device. No copy remains on our disks after the connection completes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">4. Cookies and Local Storage</h2>
          <p>
            We use browser `localStorage` solely to store your light/dark theme preference and your cookie banner acknowledgment. We do not use third-party tracking cookies across websites.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">5. GDPR & CCPA Rights</h2>
          <p>
            Under European GDPR and California CCPA regulations, you have the right to privacy and non-discrimination. Because we do not store personal identifying data or user databases, there is no personal profile to request or delete.
          </p>
        </section>
      </div>
    </article>
  );
}

