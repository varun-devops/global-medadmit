"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import Reveal from "@/components/Reveal";

const images = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80",
];

export default function BlogSection() {
  const { t } = useLang();

  return (
    <section className="py-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-label">{t.blog.label}</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
            {t.blog.title}
          </h2>
          <p className="mt-3 text-ink-500">{t.blog.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.blog.posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.08}>
              <article className="card group h-full overflow-hidden transition hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={images[i]}
                    alt={post.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-brand-700">
                    {post.tag}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs font-medium text-ink-400">{post.date}</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-ink-900 group-hover:text-brand-700">
                    {post.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                    {t.blog.readArticle} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
