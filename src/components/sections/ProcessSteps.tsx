"use client";

import { UserPlus, MessagesSquare, CalendarCheck, MoveRight } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import Reveal from "@/components/Reveal";

const icons = [UserPlus, MessagesSquare, CalendarCheck];
const chip = [
  "bg-mint-bg text-[color:var(--color-mint)]",
  "bg-peach-bg text-[color:var(--color-peach)]",
  "bg-brand-50 text-brand-600",
];

export default function ProcessSteps() {
  const { t } = useLang();

  return (
    <section className="soft-section py-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-label">{t.process.label}</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
            {t.process.title}
          </h2>
          <p className="mt-3 text-ink-500">{t.process.subtitle}</p>
        </Reveal>

        <div className="mt-14 flex flex-col items-stretch gap-6 lg:flex-row lg:items-start lg:justify-center">
          {t.process.steps.map((step, i) => {
            const Icon = icons[i] ?? UserPlus;
            return (
              <div key={step.title} className="flex flex-1 items-center gap-6 lg:flex-col">
                <Reveal delay={i * 0.1} className="flex-1 text-center lg:flex-none">
                  <div className="flex flex-col items-center">
                    <span className={`grid h-20 w-20 place-items-center rounded-full ${chip[i]}`}>
                      <Icon className="h-9 w-9" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-ink-900">{step.title}</h3>
                    <p className="mx-auto mt-2 max-w-[15rem] text-sm leading-relaxed text-ink-500">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
                {i < t.process.steps.length - 1 && (
                  <MoveRight className="hidden h-7 w-10 shrink-0 text-brand-300 lg:mt-6 lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
