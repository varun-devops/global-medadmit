"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Stethoscope, Phone, User, LayoutDashboard, Shield, LogOut } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { useAuth } from "@/lib/auth/AuthProvider";
import { contactInfo } from "@/lib/data";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { t } = useLang();
  const { user, isAdmin, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll + close on Escape while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const nav = [
    { href: "/", label: t.nav.home },
    { href: "/study-abroad", label: t.nav.studyAbroad },
    { href: "/countries", label: t.nav.countries },
    { href: "/universities", label: t.nav.universities },
    { href: "/work-visa", label: t.nav.workVisa },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/events", label: t.nav.events },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-ink-100 bg-white/90 backdrop-blur-md shadow-soft"
          : "bg-white",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-2 md:h-20 md:gap-4">
        {/* Logo */}
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-soft sm:h-10 sm:w-10">
            <Stethoscope className="h-5 w-5" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[14px] font-extrabold tracking-tight text-ink-900 sm:text-[15px]">
              Global MedAdmit
            </span>
            <span className="hidden text-[11px] font-semibold uppercase tracking-wider text-brand-600 sm:block">
              Consultants
            </span>
          </span>
        </Link>

        {/* Desktop nav (xl and up) */}
        <nav className="hidden items-center gap-0.5 xl:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-2.5 py-2 text-sm font-medium transition",
                pathname === item.href
                  ? "text-brand-700 bg-brand-50"
                  : "text-ink-600 hover:text-brand-700 hover:bg-ink-50",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <LanguageSwitcher />

          {/* Inline auth/apply only at xl+ */}
          {user ? (
            <div className="hidden items-center gap-1.5 xl:flex">
              <Link href="/dashboard" className="btn btn-outline !px-3 !py-2 text-sm">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden 2xl:inline">{t.nav.dashboard}</span>
              </Link>
              {isAdmin && (
                <Link href="/admin" className="btn btn-outline !px-3 !py-2 text-sm">
                  <Shield className="h-4 w-4" />
                  <span className="hidden 2xl:inline">{t.nav.admin}</span>
                </Link>
              )}
              <button
                onClick={signOut}
                className="btn !px-3 !py-2 text-sm text-ink-500 hover:text-ink-800"
                title={t.nav.logout}
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden btn btn-outline !px-3 !py-2 text-sm xl:inline-flex">
              <User className="h-4 w-4" />
              {t.nav.login}
            </Link>
          )}

          {/* Apply Now — visible from sm up (hidden on the smallest phones) */}
          <Link href="/contact" className="hidden btn btn-primary !px-4 !py-2 text-sm sm:inline-flex">
            {t.nav.applyNow}
          </Link>

          {/* Call shortcut on mobile/tablet */}
          <a
            href={`tel:${contactInfo.phoneRaw}`}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700 xl:hidden"
            aria-label="Call"
          >
            <Phone className="h-4 w-4" />
          </a>

          {/* Hamburger — below xl */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-ink-700 hover:bg-ink-50 xl:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile / tablet sidebar drawer */}
      <AnimatePresence>
        {open && (
          <div className="xl:hidden">
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-ink-950/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            {/* drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeInOut" }}
              className="fixed inset-y-0 right-0 z-[61] flex h-full w-[82%] max-w-sm flex-col bg-white shadow-card"
              role="dialog"
              aria-modal="true"
            >
              {/* drawer header */}
              <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
                <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">
                    <Stethoscope className="h-5 w-5" />
                  </span>
                  <span className="text-[15px] font-extrabold tracking-tight text-ink-900">
                    Global MedAdmit
                  </span>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-lg text-ink-600 hover:bg-ink-50"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* scrollable nav */}
              <nav className="flex-1 overflow-y-auto px-4 py-4">
                <div className="flex flex-col gap-1">
                  {nav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-lg px-3 py-3 text-[15px] font-medium transition",
                        pathname === item.href
                          ? "bg-brand-50 text-brand-700"
                          : "text-ink-700 hover:bg-ink-50",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* sticky footer actions */}
              <div className="space-y-2 border-t border-ink-100 px-4 py-4">
                {user ? (
                  <>
                    <Link href="/dashboard" className="btn btn-outline w-full justify-start">
                      <LayoutDashboard className="h-4 w-4" /> {t.nav.dashboard}
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" className="btn btn-outline w-full justify-start">
                        <Shield className="h-4 w-4" /> {t.nav.admin}
                      </Link>
                    )}
                    <button onClick={signOut} className="btn btn-outline w-full justify-start">
                      <LogOut className="h-4 w-4" /> {t.nav.logout}
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="btn btn-outline w-full justify-start">
                    <User className="h-4 w-4" /> {t.nav.login}
                  </Link>
                )}
                <Link href="/contact" className="btn btn-primary w-full">
                  {t.nav.applyNow}
                </Link>
                <a
                  href={`tel:${contactInfo.phoneRaw}`}
                  className="btn btn-outline w-full justify-start"
                >
                  <Phone className="h-4 w-4" /> {contactInfo.phone}
                </a>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
