"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, GraduationCap, Plane, Home } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import Reveal from "@/components/Reveal";

const images = [
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
];
const badgeIcons = [GraduationCap, Plane, Home];
const badgeChip = [
  "bg-peach-bg text-[color:var(--color-peach)]",
  "bg-mint-bg text-[color:var(--color-mint)]",
  "bg-brand-50 text-brand-600",
];

export default function FeatureRows() {
  const { t } = useLang();

  return (
    <section className="py-12">
      <div className="container-x space-y-20 md:space-y-28">
        {t.featureRows.items.map((row, i) => {
          const reversed = i % 2 === 1;
          const BadgeIcon = badgeIcons[i] ?? GraduationCap;
          return (
            <div
              key={row.title}
              className="grid items-center gap-10 lg:grid-cols-2"
            >
              {/* Image side with floating badge */}
              <Reveal className={reversed ? "lg:order-2" : ""}>
                <div className="relative mx-auto max-w-md">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
                    <Image
                      src={images[i]}
                      alt={row.badge}
                      fill
                      sizes="(max-width:768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  {/* floating badge card */}
                  <div className="float-badge absolute -bottom-5 left-4 flex max-w-[14rem] items-center gap-3 p-3">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${badgeChip[i]}`}>
                      <BadgeIcon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-ink-900">{row.badge}</span>
                      <span className="block text-xs text-ink-500">{row.badgeDesc}</span>
                    </span>
                  </div>
                </div>
              </Reveal>

              {/* Text side */}
              <Reveal delay={0.1} className={reversed ? "lg:order-1" : ""}>
                <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-4xl">
                  {row.title}{" "}
                  <span className="text-brand-600">{row.accent}</span>
                </h2>
                <p className="mt-4 max-w-lg leading-relaxed text-ink-500">{row.desc}</p>
                <Link href="/contact" className="btn btn-outline mt-6">
                  {t.featureRows.getStarted} <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
