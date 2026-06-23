"use client";

import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { team } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/sections/CtaBand";

export default function TeamPage() {
  const { t } = useLang();

  return (
    <>
      <PageHeader title={t.team.title} subtitle={t.team.subtitle} />

      <section className="py-16">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.06}>
                <article className="card group h-full overflow-hidden text-center transition hover:-translate-y-1">
                  <div className="relative h-64 overflow-hidden bg-ink-100">
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2 opacity-0 transition group-hover:opacity-100">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-brand-700">
                        <Linkedin className="h-4 w-4" />
                      </span>
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-brand-700">
                        <Mail className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-ink-900">{m.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-brand-600">{m.role}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
