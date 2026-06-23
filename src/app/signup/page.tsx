"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Mail, Lock, User, Phone } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { createClient } from "@/lib/supabase/client";
import AuthCard from "@/components/AuthCard";

export default function SignupPage() {
  const { t } = useLang();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ full_name: "", phone: "", email: "", password: "" });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { full_name: form.full_name, phone: form.phone },
        },
      });
      if (error) throw error;

      // With email confirmation disabled in Supabase, sign-up returns an active
      // session and the user goes straight to their dashboard. If confirmation
      // is still on, sign them in directly so there's no "check your email" step.
      if (!data.session) {
        await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
      }
      toast.success("Account created!");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  const field =
    "w-full rounded-xl border border-ink-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

  return (
    <AuthCard title={t.auth.signupTitle} subtitle={t.auth.signupSubtitle}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-3.5 top-3.5 h-4 w-4 text-ink-400" />
          <input className={field} placeholder={t.auth.fullName} value={form.full_name} onChange={(e) => update("full_name", e.target.value)} required />
        </div>
        <div className="relative">
          <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-ink-400" />
          <input className={field} type="tel" placeholder={t.leadForm.phone} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
        <div className="relative">
          <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-ink-400" />
          <input className={field} type="email" placeholder={t.auth.email} value={form.email} onChange={(e) => update("email", e.target.value)} required />
        </div>
        <div className="relative">
          <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-ink-400" />
          <input className={field} type="password" placeholder={t.auth.password} value={form.password} onChange={(e) => update("password", e.target.value)} required minLength={6} />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary w-full disabled:opacity-60">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t.auth.signUp}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-ink-500">
        {t.auth.haveAccount}{" "}
        <Link href="/login" className="font-semibold text-brand-700 hover:underline">
          {t.auth.signIn}
        </Link>
      </p>
    </AuthCard>
  );
}
