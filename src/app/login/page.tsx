"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Mail, Lock } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { createClient } from "@/lib/supabase/client";
import AuthCard from "@/components/AuthCard";

function LoginInner() {
  const { t } = useLang();
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Welcome back!");

      // Admins go to the panel; students to their dashboard.
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();
      const fallback = profile?.role === "admin" ? "/admin" : "/dashboard";
      router.push(params.get("redirect") || fallback);
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed";
      // Friendlier wording for common Supabase auth errors.
      if (/email not confirmed/i.test(msg)) {
        toast.error("Please confirm your email, or ask the admin to disable email confirmation.");
      } else if (/rate limit|email.*(limit|exceeded)/i.test(msg)) {
        toast.error("Too many attempts. Please wait a minute and try again.");
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  const field =
    "w-full rounded-xl border border-ink-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

  return (
    <AuthCard title={t.auth.loginTitle} subtitle={t.auth.loginSubtitle}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-ink-400" />
          <input
            className={field}
            type="email"
            placeholder={t.auth.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-ink-400" />
          <input
            className={field}
            type="password"
            placeholder={t.auth.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary w-full disabled:opacity-60">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t.auth.signIn}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-ink-500">
        {t.auth.noAccount}{" "}
        <Link href="/signup" className="font-semibold text-brand-700 hover:underline">
          {t.auth.signUp}
        </Link>
      </p>
      <p className="mt-2 text-center text-xs text-ink-400">
        <Link href="/admin/login" className="hover:text-brand-600">
          Admin login
        </Link>
      </p>
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginInner />
    </Suspense>
  );
}
