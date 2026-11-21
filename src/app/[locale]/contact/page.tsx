import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { JsonLd, generateBreadcrumbSchema } from "@/components/JsonLd";
import { Mail, MessageSquare, Send } from "lucide-react";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = params.locale || "en";
  return {
    title: "Contact Us & Support",
    description: `Get in touch with the ${siteConfig.name} engineering and support team for feedback, questions, or inquiries.`,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/contact`,
    },
  };
}

export default function ContactPage({ params }: PageProps) {
  const locale = params.locale || "en";
  const breadcrumbs = [
    { name: "Home", url: `${siteConfig.url}/${locale}` },
    { name: "Contact", url: `${siteConfig.url}/${locale}/contact` },
  ];

  return (
    <article className="max-w-2xl mx-auto py-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-500/20 dark:text-brand-400 mb-3">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Support & Inquiries</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
          Contact Us
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-md mx-auto">
          Have feedback, found a bug, or have questions about audio licensing? Reach out directly to our team.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900/60 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-800">
          <div className="h-12 w-12 rounded-xl bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400 flex items-center justify-center shrink-0">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Email Support</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">We typically reply within 24 business hours.</p>
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline mt-0.5 inline-block"
            >
              {siteConfig.supportEmail}
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form
          action={`mailto:${siteConfig.supportEmail}`}
          method="GET"
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Alex Smith"
              required
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              placeholder="SoundCloud Link question or feedback"
              required
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Message
            </label>
            <textarea
              name="body"
              rows={4}
              placeholder="Type your message here..."
              required
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-orange-500 py-3 text-xs font-semibold text-white shadow-md hover:from-brand-500 hover:to-orange-400 transition-all"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Send Inquiry</span>
          </button>
        </form>
      </div>
    </article>
  );
}

