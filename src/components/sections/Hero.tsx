"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowRight, ShieldCheck, GraduationCap, Globe2, Award } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { contactInfo } from "@/lib/data";
import BrochureModal from "@/components/BrochureModal";

const stats = [
  { key: "stat1", value: "13+", icon: Award },
  { key: "stat2", value: "2,500+", icon: GraduationCap },
  { key: "stat3", value: "30+", icon: ShieldCheck },
  { key: "stat4", value: "9", icon: Globe2 },
] as const;

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="hero-gradient relative overflow-hidden text-white">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="container-x relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-brand-200" />
            {t.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-[3.4rem]"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/contact" className="btn btn-gold text-base">
              {t.hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/universities" className="btn btn-ghost-white text-base">
              {t.hero.ctaSecondary}
            </Link>
            <BrochureModal />
            <a href={`tel:${contactInfo.phoneRaw}`} className="btn btn-ghost-white text-base">
              <Phone className="h-4 w-4" /> {t.hero.ctaCall}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.key} className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur">
                <s.icon className="h-5 w-5 text-brand-200" />
                <div className="mt-2 text-2xl font-extrabold">{s.value}</div>
                <div className="text-xs text-white/70">{t.hero[s.key]}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — quick lead card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="animate-float rounded-3xl border border-white/15 bg-white/95 p-6 text-ink-900 shadow-card md:p-7">
            <h3 className="text-lg font-extrabold">{t.leadForm.title}</h3>
            <p className="mt-1 text-sm text-ink-500">{t.leadForm.subtitle}</p>
            <div className="mt-5">
              <QuickForm />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// compact form reused inside hero
import LeadForm from "@/components/LeadForm";
function QuickForm() {
  return <LeadForm />;
}
