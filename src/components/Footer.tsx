"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { contactInfo } from "@/lib/data";
import Logo from "./Logo";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-ink-200">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Logo size={48} light big tagline />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-300">{t.footer.tagline}</p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white transition hover:bg-brand-600"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">{t.footer.quickLinks}</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { href: "/about", label: t.nav.about },
              { href: "/study-abroad", label: t.nav.studyAbroad },
              { href: "/countries", label: t.nav.countries },
              { href: "/universities", label: t.nav.universities },
              { href: "/gallery", label: t.nav.gallery },
              { href: "/events", label: t.nav.events },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ink-300 transition hover:text-brand-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">{t.footer.services}</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {t.services.items.slice(0, 5).map((s) => (
              <li key={s.title} className="text-ink-300">
                {s.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">{t.footer.contactUs}</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <a href={`tel:${contactInfo.phoneRaw}`} className="hover:text-brand-400">
                {contactInfo.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-brand-400">
                {contactInfo.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span className="text-ink-300">{contactInfo.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-ink-400 md:flex-row md:items-center md:justify-between">
          <p>© {year} {t.brand}. {t.footer.rights}</p>
          <p className="max-w-2xl md:text-right">{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
