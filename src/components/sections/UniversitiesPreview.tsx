"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, CalendarDays, Languages } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { universities } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function UniversitiesPreview() {
  const { t } = useLang();
  const list = universities.slice(0, 6);

  return (
    <section className="bg-ink-50 py-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-label">{t.universities.label}</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
            {t.universities.title}
          </h2>
          <p className="mt-3 text-ink-500">{t.universities.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((u, i) => (
            <Reveal key={u.slug} delay={i * 0.05}>
              <article className="card group h-full overflow-hidden transition hover:-translate-y-1">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={u.image}
                    alt={u.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-ink-800">
                    {u.flag} {u.country}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold leading-snug text-ink-900">{u.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-ink-500">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" /> {t.universities.established} {u.established}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Languages className="h-3.5 w-3.5" /> {u.medium}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500 line-clamp-3">{u.blurb}</p>
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
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/universities" className="btn btn-outline">
            {t.universities.viewAll} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
