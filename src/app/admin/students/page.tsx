"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Loader2, Phone, Search, GraduationCap, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  created_at: string;
};

export default function AdminStudents() {
  const [people, setPeople] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, phone, role, created_at")
      .order("created_at", { ascending: false });
    if (error) toast.error("Failed to load students");
    setPeople(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const students = people.filter((p) => p.role === "student");

  const filtered = students.filter((p) => {
    const needle = q.toLowerCase();
    return (
      !needle ||
      (p.full_name || "").toLowerCase().includes(needle) ||
      (p.phone || "").includes(needle)
    );
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900">Registered Students</h1>
          <p className="mt-1 text-ink-500">Everyone who created an account on the website.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
          <GraduationCap className="h-4 w-4" /> {students.length} students
        </span>
      </div>

      <div className="mt-6 flex justify-end">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name / phone"
            className="w-full rounded-lg border border-ink-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-500 sm:w-72"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid place-items-center py-20">
          <Loader2 className="h-7 w-7 animate-spin text-brand-600" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="card mt-6 grid place-items-center py-16 text-ink-400">No students found.</div>
      ) : (
        <div className="card mt-6 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-50 text-xs uppercase tracking-wider text-ink-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Phone</th>
                <th className="px-5 py-3 font-semibold">Role</th>
                <th className="px-5 py-3 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-ink-50/60">
                  <td className="px-5 py-3 font-medium text-ink-900">{p.full_name || "—"}</td>
                  <td className="px-5 py-3 text-ink-600">
                    {p.phone ? (
                      <a href={`tel:${p.phone}`} className="inline-flex items-center gap-1.5 hover:text-brand-700">
                        <Phone className="h-3.5 w-3.5" /> {p.phone}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold capitalize text-brand-700">
                      <ShieldCheck className="h-3 w-3" /> {p.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-ink-500">{new Date(p.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
