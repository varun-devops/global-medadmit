"use client";

import Link from "next/link";
import { Briefcase, Check, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import Reveal from "@/components/Reveal";

export default function WorkVisaBanner() {
  const { t } = useLang();

  return (
    <section className="py-20">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 p-8 text-white md:p-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
            <div className="relative grid items-center gap-8 lg:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold">
                  <Briefcase className="h-3.5 w-3.5 text-brand-300" /> {t.workVisa.label}
                </span>
                <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">{t.workVisa.title}</h2>
                <p className="mt-3 max-w-lg text-white/80">{t.workVisa.subtitle}</p>
                <Link href="/work-visa" className="btn btn-gold mt-6">
                  {t.workVisa.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {t.workVisa.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
