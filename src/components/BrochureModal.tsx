"use client";

import { useState } from "react";
import { Download, X, FileText } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import LeadForm from "./LeadForm";

const BROCHURE_URL = "/brochure.pdf";

export default function BrochureModal({
  className = "btn btn-ghost-white text-base",
  label,
}: {
  className?: string;
  label?: string;
}) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  function triggerDownload() {
    const a = document.createElement("a");
    a.href = BROCHURE_URL;
    a.download = "Global-MedAdmit-Brochure.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => setOpen(false), 800);
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        <Download className="h-4 w-4" /> {label || t.brochure.download}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-ink-950/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hero-gradient relative p-6 text-white">
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 text-white/80 hover:text-white"
                aria-label="close"
              >
                <X className="h-5 w-5" />
              </button>
              <FileText className="h-8 w-8 text-brand-200" />
              <h3 className="mt-3 text-xl font-extrabold">{t.brochure.title}</h3>
              <p className="mt-1 text-sm text-white/85">{t.brochure.subtitle}</p>
            </div>
            <div className="p-6">
              <LeadForm source="brochure" onSuccess={triggerDownload} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
