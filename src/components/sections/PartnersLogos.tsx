"use client";

import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import Reveal from "@/components/Reveal";

const partnerNames = [
  "Andijan State Medical",
  "Bukhara State Medical",
  "Fergana Public Health",
  "Intl. Medical University",
  "Georgian National SEU",
  "Bukhara Innovative",
  "Tashkent Medical",
  "Osh State University",
];

export default function PartnersLogos() {
  const { t } = useLang();

  return (
    <section className="soft-section py-20">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        {/* Logo grid */}
        <Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {partnerNames.map((name) => (
              <div
                key={name}
                className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-ink-100 bg-white p-4 text-center shadow-soft transition hover:-translate-y-1 hover:border-brand-200"
              >
                <Building2 className="h-7 w-7 text-brand-400" />
                <span className="text-xs font-semibold leading-tight text-ink-600">{name}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Text */}
        <Reveal delay={0.1}>
          <span className="section-label">{t.partners.label}</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
            {t.partners.title}
          </h2>
          <p className="mt-3 text-ink-500">{t.partners.subtitle}</p>
          <Link href="/contact" className="btn btn-outline mt-6">
            {t.partners.areYou} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
