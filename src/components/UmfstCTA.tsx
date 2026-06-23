"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { MessageCircle, Loader2, Send } from "lucide-react";
import { contactInfo } from "@/lib/data";
import { useAuth } from "@/lib/auth/AuthProvider";
import TriangleField from "@/components/TriangleField";

/**
 * Bottom-of-page call to action for the UMPhST microsite.
 * - A WhatsApp deep link (message pre-filled per page).
 * - A compact "request to admin panel" form that posts to /api/lead, so the
 *   admin sees the enquiry inside the admin panel (Supabase `leads` table).
 *
 * Sits on the dark triangle background that matches the new hero/footer look.
 */
export default function UmfstCTA({
  context = "G.E. Palade UMPhST of Targu Mures",
  heading = "Ready to start your application?",
  sub = "Talk to a counsellor on WhatsApp or send a request — our admin team will get back to you.",
}: {
  context?: string;
  heading?: string;
  sub?: string;
}) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ full_name: "", phone: "", email: "", message: "" });
  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const waMessage = encodeURIComponent(
    `Hi! I'm interested in ${context}. I'd like more details about admission, fees and the application process.`,
  );
  const waHref = `https://wa.me/${contactInfo.whatsapp}?text=${waMessage}`;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.full_name.trim() || !form.phone.trim()) {
      toast.error("Please add your name and phone.");
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
          interest: "study",
          message: `[${context}] ${form.message.trim()}`.trim(),
          source: "brochure",
          user_id: user?.id || null,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success("Request sent! Our admin team will contact you soon.");
      setForm({ full_name: "", phone: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again or use WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  const field =
    "w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-ink-300 focus:border-brand-300 focus:bg-white/15";

  return (
    <section className="tri-bg-dark text-white">
      <TriangleField tone="dark" className="right-0 top-0 h-full w-2/3 opacity-70" />
      <div className="container-x relative grid gap-10 py-16 md:py-20 lg:grid-cols-2 lg:items-center">
        {/* Pitch + WhatsApp */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-200">
            Get in touch
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-4xl">{heading}</h2>
          <p className="mt-4 max-w-md text-ink-200">{sub}</p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:bg-[#1fb855]"
          >
            <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
          </a>
        </div>

        {/* Admin-panel request form */}
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8"
        >
          <h3 className="text-lg font-bold text-white">Request a call back</h3>
          <p className="mt-1 text-sm text-ink-300">Sent straight to our admin panel.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <input
              className={field}
              placeholder="Full name *"
              value={form.full_name}
              onChange={(e) => update("full_name", e.target.value)}
              required
            />
            <input
              className={field}
              type="tel"
              placeholder="Phone *"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              required
            />
          </div>
          <input
            className={`${field} mt-3`}
            type="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
          <textarea
            className={`${field} mt-3`}
            rows={3}
            placeholder="Your message (optional)"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3 font-semibold text-white transition hover:bg-brand-400 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Send request to admin
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
