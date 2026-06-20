"use client";

import Link from "next/link";
import { Stethoscope, BookOpenCheck, ClipboardCheck, Globe2, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import Reveal from "@/components/Reveal";

const icons = [BookOpenCheck, Stethoscope, ClipboardCheck, Globe2];
const accents = [
  { color: "#5b34f5", bg: "#f1edff" },
  { color: "#14b8a6", bg: "#f0fdfa" },
  { color: "#f59e0b", bg: "#fffbeb" },
  { color: "#ef4444", bg: "#fef2f2" },
];

export default function Coaching() {
  const { t } = useLang();

  return (
    <section className="soft-section py-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-label">{t.coaching.label}</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
            {t.coaching.title}
          </h2>
          <p className="mt-3 text-ink-500">{t.coaching.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.coaching.items.map((item, i) => {
            const Icon = icons[i] ?? BookOpenCheck;
            const a = accents[i];
            return (
              <Reveal key={item.name} delay={i * 0.06}>
                <div
                  className="card group h-full overflow-hidden p-6 transition hover:-translate-y-1"
                  style={{ borderTop: `4px solid ${a.color}` }}
                >
                  <span
                    className="grid h-14 w-14 place-items-center rounded-2xl"
                    style={{ backgroundColor: a.bg, color: a.color }}
                  >
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold text-ink-900">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.desc}</p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold hover:gap-2"
                    style={{ color: a.color }}
                  >
                    {t.featureRows.getStarted} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
