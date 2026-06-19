"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { countries } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function CountriesPreview() {
  const { t } = useLang();
  const list = countries.filter((c) => c.type.includes("student")).slice(0, 8);

  return (
    <section className="py-20">
      <div className="container-x">
        <Reveal className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
              {t.countries.tiedUp}
            </h2>
            <p className="mt-1 text-lg text-ink-500">{t.countries.acrossCountries}</p>
          </div>
          <Link href="/countries" className="btn btn-outline shrink-0">
            {t.countries.viewAll} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {list.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05}>
              <Link
                href="/countries"
                className="group relative block aspect-[3/4] overflow-hidden rounded-[1.5rem]"
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-800 transition group-hover:bg-brand-600 group-hover:text-white">
                  <ArrowRight className="h-4 w-4 -rotate-45" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <span className="inline-block rounded-full bg-brand-600/90 px-3 py-1 text-xs font-bold">
                    {t.countries.studyIn} {c.name} {c.flag}
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
