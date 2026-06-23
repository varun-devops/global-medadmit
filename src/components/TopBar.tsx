"use client";

import { Phone, Mail } from "lucide-react";
import { contactInfo } from "@/lib/data";
import VisitorCounter from "./VisitorCounter";

/**
 * Thin announcement strip above the header. Hosts the global visitor counter
 * (animated count-up) on the left and quick contact links on the right.
 */
export default function TopBar() {
  return (
    <div className="tri-bg-dark relative z-40 hidden text-ink-200 sm:block">
      <div className="container-x flex h-9 items-center justify-between gap-4 text-xs">
        <VisitorCounter />

        <div className="flex items-center gap-4">
          <a
            href={`tel:${contactInfo.phoneRaw}`}
            className="inline-flex items-center gap-1.5 transition hover:text-white"
          >
            <Phone className="h-3.5 w-3.5 text-brand-200" /> {contactInfo.phone}
          </a>
          <a
            href={`mailto:${contactInfo.email}`}
            className="hidden items-center gap-1.5 transition hover:text-white md:inline-flex"
          >
            <Mail className="h-3.5 w-3.5 text-brand-200" /> {contactInfo.email}
          </a>
        </div>
      </div>
    </div>
  );
}
