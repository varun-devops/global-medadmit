"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import Reveal from "@/components/Reveal";

export default function Faq() {
  const { t } = useLang();

  return (
    <section className="py-20">
      <div className="container-x max-w-3xl">
        <Reveal className="text-center">
          <span className="section-label">{t.faq.label}</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
            {t.faq.title}
          </h2>
          <p className="mt-3 text-ink-500">{t.faq.subtitle}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <Accordion.Root type="single" collapsible className="space-y-3">
            {t.faq.items.map((item, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                className="card overflow-hidden"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 p-5 text-left text-base font-semibold text-ink-900">
                    {item.q}
                    <ChevronDown className="h-5 w-5 shrink-0 text-brand-600 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-none">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-ink-500">{item.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </div>
    </section>
  );
}
