"use client";

import { useLang } from "@/lib/i18n/LanguageProvider";
import PageHeader from "@/components/PageHeader";
import WhyUs from "@/components/sections/WhyUs";
import CtaBand from "@/components/sections/CtaBand";
import Reveal from "@/components/Reveal";
import { Target, Eye, Heart } from "lucide-react";

export default function AboutPage() {
  const { t } = useLang();

  const pillars = [
    { icon: Target, title: "Our Mission", body: "To make quality medical education abroad accessible and affordable for every deserving student through honest, transparent counseling." },
    { icon: Eye, title: "Our Vision", body: "To be the most trusted bridge between aspiring doctors and globally recognized medical universities." },
    { icon: Heart, title: "Our Values", body: "Transparency, integrity and student-first support — no donations, no hidden charges, ever." },
  ];

  return (
    <>
      <PageHeader title={t.about.title} subtitle={t.about.label} />

      <section className="py-16">
        <div className="container-x grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="section-label">{t.about.label}</span>
            <h2 className="mt-4 text-3xl font-extrabold text-ink-900">{t.about.title}</h2>
            <p className="mt-4 leading-relaxed text-ink-600">{t.about.body}</p>
          </Reveal>
          <div className="grid gap-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-bold text-ink-900">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WhyUs />
      <CtaBand />
    </>
  );
}
