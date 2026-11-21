import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { JsonLd, generateBreadcrumbSchema } from "@/components/JsonLd";
import { ShieldCheck, FileText, AlertCircle } from "lucide-react";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = params.locale || "en";
  return {
    title: "Terms of Service",
    description: `Terms and conditions governing the use of ${siteConfig.name}. Permitted audio extraction and compliance policies.`,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/terms`,
    },
  };
}

export default function TermsPage({ params }: PageProps) {
  const locale = params.locale || "en";
  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/${locale}` },
    { name: "Terms of Service", url: `${siteConfig.url}/${locale}/terms` },
  ];

  return (
    <article className="max-w-3xl mx-auto py-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-500/20 dark:text-brand-400 mb-3">
          <FileText className="h-3.5 w-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
          Terms of Service
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Last Updated: November 2026 &bull; Effective immediately
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-6 text-zinc-700 dark:text-zinc-300">
        {/* Important Disclaimer Notice */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong>Non-Affiliation Notice:</strong> {siteConfig.name} is an independent utility and is NOT affiliated with, sponsored by, or endorsed by SoundCloud Ltd. or SoundCloud Global Limited & Co. KG.
            </div>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">1. Acceptance of Terms</h2>
          <p>
            By accessing or using {siteConfig.name} ("the Service"), you agree to be bound by these Terms of Service and all applicable copyright laws and regulations. If you do not agree to these terms, please refrain from using the Service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">2. Permitted Audio Policy</h2>
          <p>
            {siteConfig.name} is engineered exclusively to facilitate access to audio content that uploaders have explicitly authorized for free download or that has been published under Creative Commons (CC) or royalty-free licenses.
          </p>
          <p>
            We strictly respect artists' rights. When an artist or rights holder disables downloads or selects "All Rights Reserved", the Service will not offer a download link and will direct you to stream the work on SoundCloud.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">3. Zero Storage & Intermediary Technical Function</h2>
          <p>
            The Service operates strictly as a transient technical bridge between your web client and public streaming APIs. No audio files, copies, or database repositories are stored on our servers. All audio streams are ephemeral and piped in real time to your browser session.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">4. User Conduct and Responsibilities</h2>
          <p>
            You agree not to use the Service for any unlawful purpose, including the unauthorized distribution or commercial exploitation of copyrighted material without the copyright holder's authorization. You are solely responsible for ensuring that your usage complies with applicable domestic and international intellectual property laws.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">5. Limitation of Liability</h2>
          <p>
            {siteConfig.name} is provided on an "as-is" and "as-available" basis without warranties of any kind. Under no circumstances shall {siteConfig.name} or its operators be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the Service.
          </p>
        </section>
      </div>
    </article>
  );
}

