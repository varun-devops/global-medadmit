"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import TriangleField from "@/components/TriangleField";

/**
 * Full-width brand finale that sits just above the footer on the homepage.
 * Renders "GLOBERA" as oversized gradient lettering on the dark triangle band,
 * with the tagline and a primary call to action — an advanced, memorable sign-off.
 */
export default function BrandShowcase() {
  const { t } = useLang();
  const letters = "GLOBERA".split("");

  return (
    <section className="tri-bg-dark relative overflow-hidden">
      <span className="tri-mesh-light left-0 top-0 hidden h-full w-1/2 opacity-60 md:block" aria-hidden />
      <TriangleField tone="dark" className="right-0 top-0 hidden h-full w-1/2 opacity-70 lg:block" />

      <div className="container-x relative py-20 text-center md:py-28">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-200"
        >
          <Sparkles className="h-3.5 w-3.5" /> {t.brand}
        </motion.span>

        {/* Oversized animated wordmark */}
        <div className="mt-6 flex justify-center">
          <h2 className="flex select-none flex-wrap justify-center text-6xl font-black leading-none tracking-tighter sm:text-7xl md:text-8xl lg:text-[9rem]">
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, rotate: -6 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 220, damping: 18 }}
                className="bg-gradient-to-b from-white via-brand-100 to-brand-400 bg-clip-text text-transparent"
              >
                {ch}
              </motion.span>
            ))}
          </h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-5 max-w-xl text-base text-ink-200 md:text-lg"
        >
          {t.fly.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/contact" className="btn btn-primary">
            {t.fly.button} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/universities" className="btn btn-ghost-white">
            {t.nav.universities}
          </Link>
        </motion.div>

        <p className="mt-10 text-sm font-medium italic tracking-wide text-white/70">
          From Dreams to Degrees
        </p>
      </div>
    </section>
  );
}
