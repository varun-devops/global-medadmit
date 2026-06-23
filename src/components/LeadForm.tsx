"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Send, Loader2 } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { useAuth } from "@/lib/auth/AuthProvider";

export default function LeadForm({
  defaultInterest = "study",
  source = "website",
  onSuccess,
}: {
  defaultInterest?: "study" | "work";
  source?: "website" | "brochure";
  onSuccess?: () => void;
}) {
  const { t } = useLang();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    interest: defaultInterest,
    message: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.full_name.trim() || !form.phone.trim()) {
      toast.error(t.leadForm.error);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.full_name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || null,
          interest: form.interest,
          message: form.message.trim() || null,
          source,
          user_id: user?.id || null,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success(t.leadForm.success);
      setForm({ full_name: "", phone: "", email: "", interest: defaultInterest, message: "" });
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error(t.leadForm.error);
    } finally {
      setLoading(false);
    }
  }

  const field =
    "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
  const label = "mb-1.5 block text-sm font-semibold text-ink-700";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>{t.leadForm.name} *</label>
          <input
            className={field}
            placeholder={t.leadForm.namePlaceholder}
            value={form.full_name}
            onChange={(e) => update("full_name", e.target.value)}
            required
          />
        </div>
        <div>
          <label className={label}>{t.leadForm.phone} *</label>
          <input
            className={field}
            type="tel"
            placeholder={t.leadForm.phonePlaceholder}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>{t.leadForm.email}</label>
          <input
            className={field}
            type="email"
            placeholder={t.leadForm.emailPlaceholder}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
        <div>
          <label className={label}>{t.leadForm.interest}</label>
          <select
            className={field}
            value={form.interest}
            onChange={(e) => update("interest", e.target.value)}
          >
            <option value="study">{t.leadForm.interestStudy}</option>
            <option value="work">{t.leadForm.interestWork}</option>
          </select>
        </div>
      </div>

      <div>
        <label className={label}>{t.leadForm.message}</label>
        <textarea
          className={field}
          rows={4}
          placeholder={t.leadForm.messagePlaceholder}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      <button type="submit" disabled={loading} className="btn btn-primary w-full text-base disabled:opacity-60">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> {t.leadForm.submitting}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> {t.leadForm.submit}
          </>
        )}
      </button>
    </form>
  );
}
