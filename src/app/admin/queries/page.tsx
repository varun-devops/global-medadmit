"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Loader2, Phone, Mail, Trash2, Search, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Lead = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  interest: string;
  message: string | null;
  status: string;
  created_at: string;
};

const STATUSES = ["new", "contacted", "in_progress", "closed"] as const;
const statusStyle: Record<string, string> = {
  new: "bg-ink-100 text-ink-700",
  contacted: "bg-blue-50 text-blue-700",
  in_progress: "bg-gold-500/15 text-gold-600",
  closed: "bg-brand-50 text-brand-700",
};

export default function AdminQueries() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [q, setQ] = useState("");

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Failed to load queries");
    setLeads(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, status: string) {
    const supabase = createClient();
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) {
      toast.error("Update failed");
      load();
    } else {
      toast.success("Status updated");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this query permanently?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) toast.error("Delete failed");
    else {
      toast.success("Deleted");
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }
  }

  const filtered = leads.filter((l) => {
    const matchesStatus = filter === "all" || l.status === filter;
    const needle = q.toLowerCase();
    const matchesSearch =
      !needle ||
      l.full_name.toLowerCase().includes(needle) ||
      l.phone.includes(needle) ||
      (l.email || "").toLowerCase().includes(needle);
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink-900">Student Queries</h1>
      <p className="mt-1 text-ink-500">All counseling inquiries submitted through the website.</p>

      {/* Controls */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {["all", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition",
                filter === s ? "bg-brand-600 text-white" : "bg-white text-ink-600 hover:bg-ink-100",
              )}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name / phone / email"
            className="w-full rounded-lg border border-ink-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-500 sm:w-72"
          />
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="grid place-items-center py-20">
          <Loader2 className="h-7 w-7 animate-spin text-brand-600" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="card mt-6 grid place-items-center py-16 text-ink-400">No queries found.</div>
      ) : (
        <div className="mt-6 grid gap-4">
          {filtered.map((l) => (
            <div key={l.id} className="card p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-ink-900">{l.full_name}</h3>
                    <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                      {l.interest === "work" ? "Work Visa" : "Study Abroad"}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-500">
                    <a href={`tel:${l.phone}`} className="inline-flex items-center gap-1 hover:text-brand-700">
                      <Phone className="h-3.5 w-3.5" /> {l.phone}
                    </a>
                    {l.email && (
                      <a href={`mailto:${l.email}`} className="inline-flex items-center gap-1 hover:text-brand-700">
                        <Mail className="h-3.5 w-3.5" /> {l.email}
                      </a>
                    )}
                    <a
                      href={`https://wa.me/${l.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[#1fb855] hover:underline"
                    >
                      <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                    </a>
                  </div>
                  {l.message && <p className="mt-2 rounded-lg bg-ink-50 p-3 text-sm text-ink-600">{l.message}</p>}
                  <p className="mt-2 text-xs text-ink-400">{new Date(l.created_at).toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={l.status}
                    onChange={(e) => updateStatus(l.id, e.target.value)}
                    className={cn(
                      "rounded-lg border-0 px-3 py-1.5 text-sm font-semibold capitalize outline-none",
                      statusStyle[l.status],
                    )}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => remove(l.id)}
                    className="grid h-9 w-9 place-items-center rounded-lg text-ink-400 transition hover:bg-red-50 hover:text-red-600"
                    aria-label="delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
