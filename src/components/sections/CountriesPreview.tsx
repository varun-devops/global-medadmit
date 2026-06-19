"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { countries } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function CountriesPreview() {
  const { t } = useLang();
  const list = countries.filter((c) => c.type.includes("student")).slice(0, 6);

  return (
    <section className="py-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-label">{t.countries.label}</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
            {t.countries.title}
          </h2>
          <p className="mt-3 text-ink-500">{t.countries.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05}>
              <Link
                href="/countries"
                className="group relative block h-56 overflow-hidden rounded-2xl"
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="text-2xl">{c.flag}</div>
                  <h3 className="mt-1 text-xl font-extrabold">{c.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/80">{c.blurb}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-200">
                    {t.countries.studentVisa} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
