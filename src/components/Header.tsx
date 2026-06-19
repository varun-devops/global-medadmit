"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  useEffect(() => setOpen(false), [pathname]);

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
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white shadow-soft">
            <Stethoscope className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-extrabold tracking-tight text-ink-900">
              Global MedAdmit
            </span>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-brand-600">
              Consultants
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition",
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
        <div className="flex items-center gap-1.5">
          <LanguageSwitcher />

          {user ? (
            <div className="hidden items-center gap-1.5 sm:flex">
              <Link href="/dashboard" className="btn btn-outline !px-3 !py-2 text-sm">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:inline">{t.nav.dashboard}</span>
              </Link>
              {isAdmin && (
                <Link href="/admin" className="btn btn-outline !px-3 !py-2 text-sm">
                  <Shield className="h-4 w-4" />
                  <span className="hidden md:inline">{t.nav.admin}</span>
                </Link>
              )}
              <button onClick={signOut} className="btn !px-3 !py-2 text-sm text-ink-500 hover:text-ink-800" title={t.nav.logout}>
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden items-center btn btn-outline !px-3 !py-2 text-sm sm:inline-flex">
              <User className="h-4 w-4" />
              {t.nav.login}
            </Link>
          )}

          <Link href="/contact" className="hidden btn btn-primary !py-2 text-sm md:inline-flex">
            {t.nav.applyNow}
          </Link>

          <a
            href={`tel:${contactInfo.phoneRaw}`}
            className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700 lg:hidden"
            aria-label="Call"
          >
            <Phone className="h-4 w-4" />
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-lg text-ink-700 hover:bg-ink-50 lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ink-100 bg-white lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium",
                  pathname === item.href ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-ink-50",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-ink-100 pt-3">
              {user ? (
                <>
                  <Link href="/dashboard" className="btn btn-outline justify-start">
                    <LayoutDashboard className="h-4 w-4" /> {t.nav.dashboard}
                  </Link>
                  {isAdmin && (
                    <Link href="/admin" className="btn btn-outline justify-start">
                      <Shield className="h-4 w-4" /> {t.nav.admin}
                    </Link>
                  )}
                  <button onClick={signOut} className="btn btn-outline justify-start">
                    <LogOut className="h-4 w-4" /> {t.nav.logout}
                  </button>
                </>
              ) : (
                <Link href="/login" className="btn btn-outline justify-start">
                  <User className="h-4 w-4" /> {t.nav.login}
                </Link>
              )}
              <Link href="/contact" className="btn btn-primary">
                {t.nav.applyNow}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
