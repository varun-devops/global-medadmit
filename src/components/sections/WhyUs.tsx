"use client";

import { CheckCircle2 } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import Reveal from "@/components/Reveal";

export default function WhyUs() {
  const { t } = useLang();

  return (
    <section className="py-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-label">{t.why.label}</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
            {t.why.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {t.why.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="flex h-full items-start gap-3.5 rounded-2xl border border-ink-100 bg-gradient-to-br from-white to-brand-50/40 p-5">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-brand-600" />
                <div>
                  <h3 className="font-bold text-ink-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
