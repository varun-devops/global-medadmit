"use client";

import {
  HeartHandshake,
  Building2,
  FileCheck2,
  Plane,
  BookOpenCheck,
  HomeIcon,
} from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import Reveal from "@/components/Reveal";

const icons = [HeartHandshake, Building2, FileCheck2, Plane, BookOpenCheck, HomeIcon];
const accents = [
  { color: "#5b34f5", bg: "#f1edff" },
  { color: "#14b8a6", bg: "#f0fdfa" },
  { color: "#f59e0b", bg: "#fffbeb" },
  { color: "#3b82f6", bg: "#eff6ff" },
  { color: "#22c55e", bg: "#f0fdf4" },
  { color: "#ef4444", bg: "#fef2f2" },
];

export default function Services() {
  const { t } = useLang();

  return (
    <section className="py-20" id="services">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-label">{t.services.label}</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
            {t.services.title}
          </h2>
          <p className="mt-3 text-ink-500">{t.services.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item, i) => {
            const Icon = icons[i] ?? HeartHandshake;
            const a = accents[i % accents.length];
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <div
                  className="card group h-full p-6 transition hover:-translate-y-1"
                  style={{ borderTop: `4px solid ${a.color}` }}
                >
                  <span
                    className="grid h-12 w-12 place-items-center rounded-xl transition group-hover:scale-110"
                    style={{ backgroundColor: a.bg, color: a.color }}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
