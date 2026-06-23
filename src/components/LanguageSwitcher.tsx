"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { LANGS } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import Flag from "./Flag";

export default function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition",
          light
            ? "text-white/90 hover:bg-white/15"
            : "text-ink-700 hover:bg-ink-50",
        )}
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <Flag code={current.cc} name={current.label} className="hidden h-3.5 w-5 sm:inline-block" />
        <span className="hidden md:inline">{current.label}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-ink-100 bg-white py-1 shadow-card">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-3.5 py-2.5 text-sm text-ink-700 transition hover:bg-brand-50"
            >
              <span className="flex items-center gap-2.5">
                <Flag code={l.cc} name={l.label} className="h-3.5 w-5" />
                {l.label}
              </span>
              {l.code === lang && <Check className="h-4 w-4 text-brand-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
