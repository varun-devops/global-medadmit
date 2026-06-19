"use client";

import { Star, Quote } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { testimonials } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function Testimonials() {
  const { t } = useLang();

  return (
    <section className="bg-ink-50 py-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-label">{t.testimonials.label}</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
            {t.testimonials.title}
          </h2>
          <p className="mt-3 text-ink-500">{t.testimonials.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((tm, i) => (
            <Reveal key={tm.name} delay={i * 0.06}>
              <figure className="card relative h-full p-6">
                <Quote className="absolute right-5 top-5 h-8 w-8 text-brand-100" />
                <div className="flex gap-0.5">
                  {Array.from({ length: tm.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-ink-600">
                  &ldquo;{tm.text}&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3 border-t border-ink-100 pt-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {tm.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-ink-900">{tm.name}</span>
                    <span className="block text-xs text-ink-500">{tm.location}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
