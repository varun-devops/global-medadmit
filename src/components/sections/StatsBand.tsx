"use client";

import { useLang } from "@/lib/i18n/LanguageProvider";
import Reveal from "@/components/Reveal";

export default function StatsBand() {
  const { t } = useLang();

  return (
    <section className="py-12">
      <div className="container-x">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 md:text-3xl">
            {t.stats.title}
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {t.stats.items.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="text-center">
              <div className="text-4xl font-extrabold text-brand-600 md:text-5xl">{s.value}</div>
              <div className="mt-2 text-sm font-medium text-ink-500">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
