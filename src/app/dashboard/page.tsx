"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Clock, CheckCircle2, Loader2, MessageSquarePlus } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { createClient } from "@/lib/supabase/client";
import PageHeader from "@/components/PageHeader";

type Lead = {
  id: string;
  interest: string;
  message: string | null;
  status: string;
  created_at: string;
};

const statusStyle: Record<string, string> = {
  new: "bg-ink-100 text-ink-600",
  contacted: "bg-blue-50 text-blue-700",
  in_progress: "bg-gold-500/15 text-gold-600",
  closed: "bg-brand-50 text-brand-700",
};

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { t } = useLang();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("leads")
        .select("id,interest,message,status,created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setLeads(data || []);
      setLoading(false);
    })();
  }, [user]);

  if (authLoading) {
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      </div>
    );
  }

  return (
    <>
      <PageHeader title={`${t.nav.dashboard}`} subtitle={user?.email || ""} />

      <section className="py-12">
        <div className="container-x">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-ink-900">My Inquiries</h2>
            <Link href="/contact" className="btn btn-primary !py-2 text-sm">
              <MessageSquarePlus className="h-4 w-4" /> New Inquiry
            </Link>
          </div>

          {loading ? (
            <div className="grid place-items-center py-16">
              <Loader2 className="h-7 w-7 animate-spin text-brand-600" />
            </div>
          ) : leads.length === 0 ? (
            <div className="card grid place-items-center gap-3 py-16 text-center text-ink-500">
              <FileText className="h-12 w-12 text-ink-300" />
              <p>You haven&apos;t submitted any inquiries yet.</p>
              <Link href="/contact" className="btn btn-primary !py-2 text-sm">
                Book Free Counseling
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {leads.map((l) => (
                <div key={l.id} className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                        {l.interest === "work" ? "Work Visa" : "Study Abroad"}
                      </span>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle[l.status]}`}>
                        {l.status.replace("_", " ")}
                      </span>
                    </div>
                    {l.message && <p className="mt-2 text-sm text-ink-600">{l.message}</p>}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-ink-400">
                    {l.status === "closed" ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    {new Date(l.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
