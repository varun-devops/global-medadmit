"use client";

import Image from "next/image";
import { ShieldCheck, BadgeCheck, HeartHandshake } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import Reveal from "@/components/Reveal";

export default function SeoIntro() {
  const { t } = useLang();
  const paragraphs = t.seo.body.split("\n\n");

  return (
    <section className="py-20">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative mx-auto max-w-md">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
                alt="Medical students studying abroad"
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* floating trust chips */}
            <div className="float-badge absolute -bottom-5 right-4 flex items-center gap-2 p-3">
              <BadgeCheck className="h-5 w-5 text-[color:var(--color-mint)]" />
              <span className="text-sm font-bold text-ink-900">NMC &amp; WHO Approved</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="section-label">{t.about.label}</span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-4xl">
            {t.seo.title}
          </h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-ink-600">
              {p}
            </p>
          ))}
          <div className="mt-6 flex flex-wrap gap-4">
            {[
              { icon: ShieldCheck, label: "Transparent process" },
              { icon: HeartHandshake, label: "No donation" },
              { icon: BadgeCheck, label: "Lowest fees" },
            ].map((f) => (
              <span key={f.label} className="inline-flex items-center gap-2 text-sm font-semibold text-ink-700">
                <f.icon className="h-5 w-5 text-brand-600" /> {f.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
