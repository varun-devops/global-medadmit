"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import Reveal from "@/components/Reveal";

export default function CtaBand() {
  const { t } = useLang();

  return (
    <section className="py-20">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-50 to-mint-bg/40">
            <div className="blob -left-10 top-0 h-40 w-40 bg-brand-100" />
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="relative z-10 p-8 md:p-12">
                <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-4xl">
                  {t.fly.title}
                </h2>
                <p className="mt-3 max-w-md text-ink-600">{t.fly.subtitle}</p>
                <Link href="/contact" className="btn btn-primary mt-6">
                  {t.fly.button} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative h-64 md:h-80">
                <Image
                  src="https://images.unsplash.com/photo-1521119989659-a83eee488004?w=800&q=80"
                  alt="Student ready to fly"
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
