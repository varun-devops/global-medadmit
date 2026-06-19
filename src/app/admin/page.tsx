"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Inbox, Clock, CheckCircle2, Images, ArrowRight, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminOverview() {
  const [stats, setStats] = useState({ total: 0, newCount: 0, closed: 0, gallery: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const [{ count: total }, { count: newCount }, { count: closed }, { count: gallery }] =
        await Promise.all([
          supabase.from("leads").select("*", { count: "exact", head: true }),
          supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
          supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "closed"),
          supabase.from("gallery").select("*", { count: "exact", head: true }),
        ]);
      setStats({
        total: total || 0,
        newCount: newCount || 0,
        closed: closed || 0,
        gallery: gallery || 0,
      });
      setLoading(false);
    })();
  }, []);

  const cards = [
    { label: "Total Queries", value: stats.total, icon: Inbox, color: "text-brand-600 bg-brand-50" },
    { label: "New / Unread", value: stats.newCount, icon: Clock, color: "text-gold-600 bg-gold-500/15" },
    { label: "Closed", value: stats.closed, icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
    { label: "Gallery Photos", value: stats.gallery, icon: Images, color: "text-blue-600 bg-blue-50" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink-900">Overview</h1>
      <p className="mt-1 text-ink-500">Quick snapshot of student activity.</p>

      {loading ? (
        <div className="mt-8 grid place-items-center py-16">
          <Loader2 className="h-7 w-7 animate-spin text-brand-600" />
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.label} className="card p-5">
              <span className={`grid h-11 w-11 place-items-center rounded-xl ${c.color}`}>
                <c.icon className="h-5 w-5" />
              </span>
              <div className="mt-3 text-3xl font-extrabold text-ink-900">{c.value}</div>
              <div className="text-sm text-ink-500">{c.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/admin/queries" className="card flex items-center justify-between p-6 transition hover:border-brand-200">
          <span className="flex items-center gap-3">
            <Inbox className="h-6 w-6 text-brand-600" />
            <span className="font-bold text-ink-900">Manage Student Queries</span>
          </span>
          <ArrowRight className="h-5 w-5 text-ink-400" />
        </Link>
        <Link href="/admin/gallery" className="card flex items-center justify-between p-6 transition hover:border-brand-200">
          <span className="flex items-center gap-3">
            <Images className="h-6 w-6 text-brand-600" />
            <span className="font-bold text-ink-900">Manage Gallery</span>
          </span>
          <ArrowRight className="h-5 w-5 text-ink-400" />
        </Link>
      </div>
    </div>
  );
}
