"use client";

import Image from "next/image";
import { Check, Briefcase } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { countries } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/Reveal";
import Flag from "@/components/Flag";

export default function WorkVisaPage() {
  const { t } = useLang();
  const workCountries = countries.filter((c) => c.type.includes("work"));

  return (
    <>
      <PageHeader title={t.workVisa.title} subtitle={t.workVisa.subtitle} />

      <section className="py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="section-label">{t.workVisa.label}</span>
            <h2 className="mt-4 text-2xl font-extrabold text-ink-900 md:text-3xl">{t.workVisa.title}</h2>
            <p className="mt-3 text-ink-500">{t.workVisa.subtitle}</p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.workVisa.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 rounded-xl border border-ink-100 bg-brand-50/40 p-4 text-sm text-ink-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {p}
                </li>
              ))}
            </ul>

            <h3 className="mt-10 text-lg font-extrabold text-ink-900">{t.countries.label}</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {workCountries.map((c, i) => (
                <Reveal key={c.slug} delay={i * 0.05}>
                  <div className="card group overflow-hidden">
                    <div className="relative h-32 overflow-hidden">
                      <Image src={c.image} alt={c.name} fill sizes="50vw" className="object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
                      <span className="absolute bottom-2 left-3 inline-flex items-center gap-1.5 font-bold text-white">
                        <Flag code={c.code} name={c.name} className="h-4 w-6" /> {c.name}
                      </span>
                    </div>
                    <p className="p-4 text-sm text-ink-500">{c.blurb}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <div className="card sticky top-24 p-6 md:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/15 px-3 py-1 text-xs font-semibold text-gold-600">
                <Briefcase className="h-3.5 w-3.5" /> {t.workVisa.label}
              </span>
              <h3 className="mt-3 text-xl font-extrabold text-ink-900">{t.workVisa.cta}</h3>
              <div className="mt-5">
                <LeadForm defaultInterest="work" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
