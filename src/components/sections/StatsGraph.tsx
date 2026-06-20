"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n/LanguageProvider";
import Reveal from "@/components/Reveal";

const barColors = ["#5b34f5", "#14b8a6", "#f59e0b", "#22c55e"];

const countryBars = [
  { name: "Uzbekistan", value: 92, color: "#5b34f5" },
  { name: "Kyrgyzstan", value: 74, color: "#14b8a6" },
  { name: "Georgia", value: 61, color: "#f59e0b" },
  { name: "Russia", value: 80, color: "#ef4444" },
  { name: "Kazakhstan", value: 55, color: "#3b82f6" },
];

export default function StatsGraph() {
  const { t } = useLang();

  return (
    <section className="py-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-label">{t.metrics.label}</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
            {t.metrics.title}
          </h2>
          <p className="mt-3 text-ink-500">{t.metrics.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
          {/* Horizontal progress bars */}
          <Reveal className="card p-6 md:p-8">
            <div className="space-y-6">
              {t.metrics.bars.map((bar, i) => (
                <div key={bar.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-semibold text-ink-800">{bar.label}</span>
                    <span className="font-extrabold" style={{ color: barColors[i] }}>
                      {bar.value}%
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-ink-100">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${barColors[i]}, ${barColors[i]}bb)` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.12, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Vertical bar chart */}
          <Reveal delay={0.1} className="card p-6 md:p-8">
            <h3 className="mb-6 text-center text-sm font-bold uppercase tracking-wider text-ink-500">
              {t.metrics.chartTitle}
            </h3>
            <div className="flex h-56 items-end justify-between gap-3 border-b border-ink-100">
              {countryBars.map((c, i) => (
                <div key={c.name} className="flex flex-1 flex-col items-center justify-end">
                  <motion.div
                    className="w-full rounded-t-lg"
                    style={{ background: `linear-gradient(180deg, ${c.color}, ${c.color}bb)` }}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${c.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.1, ease: "easeOut" }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between gap-3">
              {countryBars.map((c) => (
                <span
                  key={c.name}
                  className="flex-1 text-center text-[10px] font-medium leading-tight text-ink-500 sm:text-xs"
                >
                  {c.name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
