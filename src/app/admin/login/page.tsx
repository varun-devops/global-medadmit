"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Loader2, Mail, Lock, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";
import Logo from "@/components/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Already an admin? Skip straight to the panel.
  useEffect(() => {
    if (!authLoading && user && isAdmin) router.replace("/admin");
  }, [authLoading, user, isAdmin, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Verify the signed-in user actually has the admin role.
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profile?.role !== "admin") {
        await supabase.auth.signOut();
        toast.error("This account is not an administrator.");
        return;
      }

      toast.success("Welcome, admin!");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const field =
    "w-full rounded-xl border border-ink-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

  return (
    <div className="grid min-h-screen place-items-center bg-ink-50 px-5">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Logo size={44} />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            <ShieldCheck className="h-3.5 w-3.5" /> Admin Panel
          </span>
        </div>

        <div className="card p-6 md:p-7">
          <h1 className="text-xl font-extrabold text-ink-900">Administrator sign in</h1>
          <p className="mt-1 text-sm text-ink-500">Restricted area — staff only.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-ink-400" />
              <input
                className={field}
                type="email"
                placeholder="admin@globera.com"
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary w-full disabled:opacity-60">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in to admin"}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-ink-500">
          Are you a student?{" "}
          <Link href="/login" className="font-semibold text-brand-700 hover:underline">
            Student login
          </Link>
        </p>
      </div>
    </div>
  );
}
