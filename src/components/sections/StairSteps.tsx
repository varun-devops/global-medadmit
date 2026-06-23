"use client";

import { motion } from "framer-motion";
import { PhoneCall, GraduationCap, FileCheck2, Plane, HeartHandshake } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import Reveal from "@/components/Reveal";

const icons = [PhoneCall, GraduationCap, FileCheck2, Plane, HeartHandshake];
const letters = ["A", "B", "C", "D", "E"];
const palette = [
  { color: "#ef4444", bg: "#fef2f2" }, // red
  { color: "#f59e0b", bg: "#fffbeb" }, // amber
  { color: "#14b8a6", bg: "#f0fdfa" }, // teal
  { color: "#22c55e", bg: "#f0fdf4" }, // green
  { color: "#3b82f6", bg: "#eff6ff" }, // blue
];

export default function StairSteps() {
  const { t } = useLang();
  const steps = t.stairSteps.steps;

  return (
    <section className="relative overflow-hidden soft-section py-20">
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-label">{t.stairSteps.label}</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
            {t.stairSteps.title}
          </h2>
          <p className="mt-3 text-ink-500">{t.stairSteps.subtitle}</p>
        </Reveal>

        {/* ---------- Desktop staircase ---------- */}
        <div className="mt-16 hidden lg:flex lg:items-end lg:justify-center lg:gap-3">
          {steps.map((step, i) => {
            const Icon = icons[i] ?? PhoneCall;
            const c = palette[i];
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="flex w-1/5 flex-col items-center"
              >
                {/* card */}
                <div className="card flex min-h-[13.5rem] w-full flex-col items-center p-5 text-center">
                  <span
                    className="grid h-14 w-14 place-items-center rounded-2xl"
                    style={{ backgroundColor: c.bg, color: c.color }}
                  >
                    <Icon className="h-7 w-7" />
                  </span>
                  <span
                    className="mt-4 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white"
                    style={{ backgroundColor: c.color }}
                  >
                    Step {i + 1}
                  </span>
                  <h3 className="mt-3 text-base font-bold text-ink-900">{step.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-500">{step.desc}</p>
                </div>
                {/* colored ascending riser (the "stair" + bar) */}
                <div
                  className="mt-3 flex w-full items-center justify-center rounded-t-2xl text-2xl font-extrabold text-white shadow-soft"
                  style={{
                    height: `${(i + 1) * 2.3}rem`,
                    background: `linear-gradient(180deg, ${c.color}, ${c.color}cc)`,
                  }}
                >
                  {letters[i]}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ---------- Mobile / tablet vertical timeline ---------- */}
        <div className="mt-12 lg:hidden">
          {steps.map((step, i) => {
            const Icon = icons[i] ?? PhoneCall;
            const c = palette[i];
            const last = i === steps.length - 1;
            return (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="flex gap-4">
                  {/* letter + connector */}
                  <div className="flex flex-col items-center">
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-base font-extrabold text-white shadow-soft"
                      style={{ backgroundColor: c.color }}
                    >
                      {letters[i]}
                    </span>
                    {!last && <span className="my-1 w-0.5 flex-1 bg-ink-200" />}
                  </div>
                  {/* card */}
                  <div
                    className="card mb-4 flex flex-1 items-start gap-3 p-4"
                    style={{ borderLeft: `4px solid ${c.color}` }}
                  >
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                      style={{ backgroundColor: c.bg, color: c.color }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <span
                        className="text-[11px] font-extrabold uppercase tracking-wider"
                        style={{ color: c.color }}
                      >
                        Step {i + 1}
                      </span>
                      <h3 className="text-base font-bold text-ink-900">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-500">{step.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
