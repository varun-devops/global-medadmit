"use client";

import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { contactInfo } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import LeadForm from "@/components/LeadForm";

export default function ContactPage() {
  const { t } = useLang();

  const items = [
    { icon: Phone, label: t.leadForm.phone, value: contactInfo.phone, href: `tel:${contactInfo.phoneRaw}` },
    { icon: Mail, label: t.leadForm.email, value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: MessageCircle, label: "WhatsApp", value: contactInfo.phone, href: `https://wa.me/${contactInfo.whatsapp}` },
    { icon: MapPin, label: t.footer.contactUs, value: contactInfo.address },
  ];

  return (
    <>
      <PageHeader title={t.leadForm.title} subtitle={t.leadForm.subtitle} />
      <section className="py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Info */}
          <div>
            <span className="section-label">{t.leadForm.label}</span>
            <h2 className="mt-4 text-2xl font-extrabold text-ink-900">{t.about.title}</h2>
            <p className="mt-3 text-ink-500">{t.about.body}</p>

            <div className="mt-8 space-y-3">
              {items.map((it) => (
                <a
                  key={it.label}
                  href={it.href}
                  className="flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-4 transition hover:border-brand-200 hover:shadow-soft"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <it.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-ink-400">
                      {it.label}
                    </span>
                    <span className="block font-semibold text-ink-900">{it.value}</span>
                  </span>
                </a>
              ))}
              <div className="flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Clock className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-ink-400">
                    Mon – Sat
                  </span>
                  <span className="block font-semibold text-ink-900">10:00 AM – 7:00 PM</span>
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="card p-6 md:p-8">
            <h3 className="text-xl font-extrabold text-ink-900">{t.leadForm.title}</h3>
            <p className="mt-1 text-sm text-ink-500">{t.leadForm.subtitle}</p>
            <div className="mt-6">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
