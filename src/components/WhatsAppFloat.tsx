"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { contactInfo } from "@/lib/data";

export default function WhatsAppFloat() {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(id);
  }, []);

  const message = encodeURIComponent(
    "Hi! I'd like to know more about studying MBBS abroad / work visa options.",
  );
  const href = `https://wa.me/${contactInfo.whatsapp}?text=${message}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {show && (
        <div className="flex max-w-[260px] items-start gap-2 rounded-2xl rounded-br-sm border border-ink-100 bg-white p-3 pr-2 shadow-card">
          <p className="text-sm text-ink-700">{t.whatsapp}</p>
          <button
            onClick={() => setShow(false)}
            className="shrink-0 text-ink-300 hover:text-ink-600"
            aria-label="dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1fb855]"
        aria-label="WhatsApp"
      >
        <span className="absolute inline-flex h-14 w-14 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <MessageCircle className="h-7 w-7 relative" />
      </a>
    </div>
  );
}
