"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Briefcase } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { countries } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export default function CountriesPage() {
  const { t } = useLang();

  return (
    <>
      <PageHeader title={t.countries.title} subtitle={t.countries.subtitle} />
      <section className="py-16">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.04}>
              <article className="card group h-full overflow-hidden transition hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-3xl">{c.flag}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-extrabold text-ink-900">{c.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {c.type.includes("student") && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                        <GraduationCap className="h-3.5 w-3.5" /> {t.countries.studentVisa}
                      </span>
                    )}
                    {c.type.includes("work") && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold-500/15 px-2.5 py-1 text-xs font-semibold text-gold-600">
                        <Briefcase className="h-3.5 w-3.5" /> {t.countries.workVisaTag}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{c.blurb}</p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2"
                  >
                    {t.hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
