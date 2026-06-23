"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Inbox, Clock, GraduationCap, Building2, ArrowRight, Loader2, Images } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { universities } from "@/lib/data";

export default function AdminOverview() {
  const [stats, setStats] = useState({ students: 0, queries: 0, newCount: 0, gallery: 0 });
  const [loading, setLoading] = useState(true);

  // Universities are static site content, so we can count them directly.
  const universityCount = universities.length;

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const [{ count: students }, { count: queries }, { count: newCount }, { count: gallery }] =
        await Promise.all([
          supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "student"),
          supabase.from("leads").select("*", { count: "exact", head: true }),
          supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
          supabase.from("gallery").select("*", { count: "exact", head: true }),
        ]);
      setStats({
        students: students || 0,
        queries: queries || 0,
        newCount: newCount || 0,
        gallery: gallery || 0,
      });
      setLoading(false);
    })();
  }, []);

  const cards = [
    { label: "Registered Students", value: stats.students, icon: GraduationCap, color: "text-brand-600 bg-brand-50", href: "/admin/students" },
    { label: "Total Request Queries", value: stats.queries, icon: Inbox, color: "text-blue-600 bg-blue-50", href: "/admin/queries" },
    { label: "Universities Listed", value: universityCount, icon: Building2, color: "text-emerald-600 bg-emerald-50", href: "/universities" },
    { label: "New / Unread Queries", value: stats.newCount, icon: Clock, color: "text-gold-600 bg-gold-500/15", href: "/admin/queries" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink-900">Overview</h1>
      <p className="mt-1 text-ink-500">A live snapshot of students, enquiries and content.</p>

      {loading ? (
        <div className="mt-8 grid place-items-center py-16">
          <Loader2 className="h-7 w-7 animate-spin text-brand-600" />
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <Link key={c.label} href={c.href} className="card p-5 transition hover:-translate-y-0.5">
              <span className={`grid h-11 w-11 place-items-center rounded-xl ${c.color}`}>
                <c.icon className="h-5 w-5" />
              </span>
              <div className="mt-3 text-3xl font-extrabold text-ink-900">{c.value}</div>
              <div className="text-sm text-ink-500">{c.label}</div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/queries" className="card flex items-center justify-between p-6 transition hover:-translate-y-0.5">
          <span className="flex items-center gap-3">
            <Inbox className="h-6 w-6 text-brand-600" />
            <span className="font-bold text-ink-900">Student Queries</span>
          </span>
          <ArrowRight className="h-5 w-5 text-ink-400" />
        </Link>
        <Link href="/admin/students" className="card flex items-center justify-between p-6 transition hover:-translate-y-0.5">
          <span className="flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-brand-600" />
            <span className="font-bold text-ink-900">Registered Students</span>
          </span>
          <ArrowRight className="h-5 w-5 text-ink-400" />
        </Link>
        <Link href="/admin/gallery" className="card flex items-center justify-between p-6 transition hover:-translate-y-0.5">
          <span className="flex items-center gap-3">
            <Images className="h-6 w-6 text-brand-600" />
            <span className="font-bold text-ink-900">Gallery</span>
          </span>
          <ArrowRight className="h-5 w-5 text-ink-400" />
        </Link>
      </div>
    </div>
  );
}
