"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { countries } from "@/lib/data";
import Typewriter from "@/components/Typewriter";

const flagBubbles = [
  { code: "us", label: "USA", cls: "left-2 top-16 md:left-0 md:top-20", delay: 0 },
  { code: "gb", label: "UK", cls: "right-3 top-10 md:right-2 md:top-12", delay: 0.4 },
  { code: "de", label: "Germany", cls: "left-1/2 -top-2 -translate-x-1/2", delay: 0.8 },
  { code: "in", label: "India", cls: "left-0 bottom-28 md:-left-4", delay: 1.2 },
  { code: "au", label: "Australia", cls: "left-6 bottom-6 md:left-2 md:bottom-2", delay: 1.6 },
  { code: "ca", label: "Canada", cls: "right-2 bottom-2", delay: 2.0 },
  { code: "ru", label: "Russia", cls: "right-0 top-1/2 md:-right-3", delay: 2.4 },
];

const avatars = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
];

export default function Hero() {
  const { t } = useLang();
  const router = useRouter();
  const [country, setCountry] = useState("");

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push("/universities");
  }

  return (
    <section className="relative overflow-hidden bg-white">
      {/* decorative blobs */}
      <div className="blob -left-24 -top-24 h-72 w-72 bg-brand-100" />
      <div className="blob right-10 top-10 h-40 w-40 bg-mint-bg" />
      <div className="blob -right-20 bottom-0 h-72 w-72 bg-peach-bg" />
      <div className="dotgrid absolute bottom-10 left-6 h-24 w-32 text-ink-200" />

      <div className="container-x relative grid items-center gap-10 py-12 md:py-20 lg:grid-cols-2">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="section-label"
          >
            {t.hero.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 text-balance text-3xl font-extrabold leading-[1.15] tracking-tight text-ink-900 sm:text-4xl lg:text-5xl"
          >
            <Typewriter phrases={t.hero.typed} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-5 max-w-md text-base leading-relaxed text-ink-500"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Search bar */}
          <motion.form
            onSubmit={onSearch}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-7 flex max-w-lg items-center gap-2 rounded-full border border-ink-100 bg-white p-2 shadow-card"
          >
            <input
              type="text"
              placeholder={t.hero.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-ink-800 outline-none placeholder:text-ink-400"
            />
            <div className="relative hidden sm:block">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="appearance-none rounded-full bg-ink-50 py-2 pl-4 pr-9 text-sm font-medium text-ink-700 outline-none"
              >
                <option value="">All</option>
                {countries.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-ink-400" />
            </div>
            <button
              type="submit"
              className="grid h-10 w-12 shrink-0 place-items-center rounded-full bg-brand-600 text-white transition hover:bg-brand-700"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
          </motion.form>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-6 flex items-center gap-3"
          >
            <div className="flex -space-x-3">
              {avatars.map((src, i) => (
                <span key={i} className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white">
                  <Image src={src} alt="student" fill sizes="40px" className="object-cover" />
                </span>
              ))}
            </div>
            <p className="text-sm text-ink-600">
              <span className="font-bold text-ink-900">2.5K+ {t.hero.onboarded}</span>{" "}
              <Link href="/gallery" className="font-semibold text-brand-600 hover:underline">
                {t.hero.viewProfiles}
              </Link>
            </p>
          </motion.div>

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <Link href="/contact" className="btn btn-primary">
              {t.hero.ctaPrimary}
            </Link>
            <Link href="/study-abroad" className="btn btn-outline">
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>
        </div>

        {/* Right — circular flag composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          {/* dashed rings */}
          <div className="animate-spin-slow absolute inset-4 rounded-full border-2 border-dashed border-brand-200" />
          <div className="absolute inset-12 rounded-full border border-ink-100" />
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-brand-50 to-mint-bg/40" />

          {/* center photo */}
          <div className="absolute inset-[18%] overflow-hidden rounded-full border-4 border-white shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80"
              alt="Student ready to study abroad"
              fill
              sizes="(max-width:768px) 60vw, 400px"
              className="object-cover"
              priority
            />
          </div>

          {/* flag bubbles */}
          {flagBubbles.map((b, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: b.delay }}
              className={`absolute ${b.cls} h-12 w-12 overflow-hidden rounded-full border-2 border-white bg-white shadow-float`}
            >
              <Image
                src={`https://flagcdn.com/w80/${b.code}.png`}
                alt={b.label}
                fill
                sizes="48px"
                className="object-cover"
              />
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
