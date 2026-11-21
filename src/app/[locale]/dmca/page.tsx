import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { JsonLd, generateBreadcrumbSchema } from "@/components/JsonLd";
import { ShieldAlert, Mail, CheckCircle2 } from "lucide-react";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = params.locale || "en";
  return {
    title: "DMCA Copyright & Takedown Policy",
    description: `Official DMCA takedown notice procedure and designated copyright agent information for ${siteConfig.name}.`,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/dmca`,
    },
  };
}

export default function DmcaPage({ params }: PageProps) {
  const locale = params.locale || "en";
  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/${locale}` },
    { name: "DMCA Policy", url: `${siteConfig.url}/${locale}/dmca` },
  ];

  return (
    <article className="max-w-3xl mx-auto py-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 mb-3">
          <ShieldAlert className="h-3.5 w-3.5" />
          <span>Copyright Protection</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
          DMCA / Copyright Takedown Policy
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Digital Millennium Copyright Act Notice & Procedure
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-6 text-zinc-700 dark:text-zinc-300">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Commitment to Copyright Protection</h2>
          <p>
            {siteConfig.name} respects the intellectual property rights of others and strictly complies with the provisions of the Digital Millennium Copyright Act (17 U.S.C. § 512) and international copyright treaties.
          </p>
          <p>
            Our tool proactively filters links and restricts download actions solely to works where the author has enabled downloads or chosen a Creative Commons license. Because we do not store, host, or catalog any files on our servers, content originates directly from SoundCloud.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Filing a Takedown Notice</h2>
          <p>
            If you are a copyright owner or an authorized agent and believe that a link processed through our tool infringes your copyright, you may submit a formal notification to our Designated Copyright Agent with the following details:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>The exact SoundCloud URL or link in question.</li>
            <li>Your contact information (name, address, telephone number, and email address).</li>
            <li>A statement that you have a good faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement made under penalty of perjury that the information in the notification is accurate and that you are authorized to act on behalf of the owner.</li>
            <li>A physical or electronic signature of the copyright owner or authorized representative.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Designated Agent Contact</h2>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4 space-y-1 text-xs">
            <p><strong>Designated Agent:</strong> Copyright Compliance Officer</p>
            <p><strong>Service:</strong> {siteConfig.name}</p>
            <p className="flex items-center gap-1.5 pt-1">
              <Mail className="h-4 w-4 text-brand-500" />
              <span>Email: </span>
              <a href={`mailto:${siteConfig.supportEmail}`} className="text-brand-600 dark:text-brand-400 font-semibold underline">
                {siteConfig.supportEmail}
              </a>
            </p>
          </div>
          <p className="text-xs text-zinc-500 pt-2">
            Upon receipt of a valid notice complying with 17 U.S.C. § 512(c)(3), we will expeditiously block resolution and proxying of the specified URL across our system.
          </p>
        </section>
      </div>
    </article>
  );
}

