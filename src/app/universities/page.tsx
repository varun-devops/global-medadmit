"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, CalendarDays, Languages, MapPin, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { universities } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export default function UniversitiesPage() {
  const { t } = useLang();

  return (
    <>
      <PageHeader title={t.universities.title} subtitle={t.universities.subtitle} />
      <section className="py-16">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {universities.map((u, i) => (
            <Reveal key={u.slug} delay={i * 0.04}>
              <article className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={u.image}
                    alt={u.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-ink-800">
                    <MapPin className="h-3.5 w-3.5" /> {u.flag} {u.country}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-bold leading-snug text-ink-900">{u.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-ink-500">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" /> {t.universities.established} {u.established}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Languages className="h-3.5 w-3.5" /> {u.medium}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">{u.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {u.recognition.map((r) => (
                      <span
                        key={r}
                        className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700"
                      >
                        <BadgeCheck className="h-3.5 w-3.5" /> {r}
                      </span>
                    ))}
                  </div>
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
