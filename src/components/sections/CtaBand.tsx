"use client";

import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { contactInfo } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function CtaBand() {
  const { t } = useLang();

  return (
    <section className="hero-gradient">
      <div className="container-x py-16">
        <Reveal className="mx-auto max-w-3xl text-center text-white">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t.cta.title}</h2>
          <p className="mt-3 text-white/85">{t.cta.subtitle}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-gold text-base">
              {t.cta.button} <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={`tel:${contactInfo.phoneRaw}`} className="btn btn-ghost-white text-base">
              <Phone className="h-4 w-4" /> {contactInfo.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
