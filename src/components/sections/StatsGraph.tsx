"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/i18n/LanguageProvider";
import Reveal from "@/components/Reveal";

const ringColors = ["#5b34f5", "#14b8a6", "#f59e0b", "#22c55e"];

const countryBars = [
  { name: "Uzbekistan", value: 92, color: "#5b34f5" },
  { name: "Kyrgyzstan", value: 74, color: "#14b8a6" },
  { name: "Georgia", value: 61, color: "#f59e0b" },
  { name: "Russia", value: 80, color: "#ef4444" },
  { name: "Kazakhstan", value: 55, color: "#3b82f6" },
];

/* Count-up number that runs once when scrolled into view */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* Animated radial progress ring */
function Ring({ value, color, label }: { value: number; color: string; label: string }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-28 w-28 sm:h-32 sm:w-32">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={r} fill="none" stroke="#eef0f6" strokeWidth="11" />
          <motion.circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: circ * (1 - value / 100) }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-2xl font-extrabold" style={{ color }}>
            <CountUp to={value} suffix="%" />
          </span>
        </div>
      </div>
      <span className="mt-3 max-w-[8rem] text-center text-sm font-semibold text-ink-700">{label}</span>
    </div>
  );
}

export default function StatsGraph() {
  const { t } = useLang();

  return (
    <section className="soft-section py-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-label">{t.metrics.label}</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
            {t.metrics.title}
          </h2>
          <p className="mt-3 text-ink-500">{t.metrics.subtitle}</p>
        </Reveal>

        {/* Radial rings */}
        <Reveal className="mt-14">
          <div className="card grid grid-cols-2 gap-6 p-6 md:p-8 lg:grid-cols-4">
            {t.metrics.bars.map((bar, i) => (
              <Ring key={bar.label} value={bar.value} color={ringColors[i]} label={bar.label} />
            ))}
          </div>
        </Reveal>

        {/* Bar chart */}
        <Reveal delay={0.1} className="mt-8">
          <div className="card p-6 md:p-8">
            <h3 className="mb-8 text-center text-sm font-bold uppercase tracking-wider text-ink-500">
              {t.metrics.chartTitle}
            </h3>

            <div className="relative h-60 sm:h-72">
              {/* gridlines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="border-t border-dashed border-ink-100" />
                ))}
              </div>

              {/* bars */}
              <div className="absolute inset-0 flex items-end justify-between gap-3 sm:gap-6">
                {countryBars.map((c, i) => (
                  <div key={c.name} className="flex h-full flex-1 flex-col items-center justify-end">
                    <span className="mb-2 text-sm font-extrabold" style={{ color: c.color }}>
                      <CountUp to={c.value} />
                    </span>
                    <motion.div
                      className="w-full max-w-[3.5rem] rounded-t-xl"
                      style={{ background: `linear-gradient(180deg, ${c.color}, ${c.color}bb)` }}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${c.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* x-axis labels */}
            <div className="mt-3 flex justify-between gap-3 border-t border-ink-100 pt-3 sm:gap-6">
              {countryBars.map((c) => (
                <span
                  key={c.name}
                  className="flex-1 text-center text-[11px] font-medium leading-tight text-ink-500 sm:text-xs"
                >
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
