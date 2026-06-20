import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Handles counseling / brochure inquiries:
 *  1. Saves the lead to Supabase.
 *  2. Sends an email notification to the admin (only if RESEND_API_KEY is set).
 *
 * Email is optional — if Resend isn't configured the lead is still saved.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { full_name, phone, email, interest, message, source } = body || {};

    if (!full_name?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anon) {
      return NextResponse.json({ error: "Server not configured." }, { status: 500 });
    }

    const supabase = createClient(url, anon);

    const { error } = await supabase.from("leads").insert({
      full_name: full_name.trim(),
      phone: phone.trim(),
      email: email?.trim() || null,
      interest: interest === "work" ? "work" : "study",
      message: message?.trim() || null,
      source: source === "brochure" ? "brochure" : "website",
    });

    if (error) {
      console.error("Lead insert failed:", error.message);
      return NextResponse.json({ error: "Could not save your request." }, { status: 500 });
    }

    // Fire-and-forget email notification (optional).
    await sendAdminEmail({ full_name, phone, email, interest, message, source }).catch((e) =>
      console.error("Email notification failed:", e),
    );

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}

async function sendAdminEmail(lead: Record<string, any>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  if (!apiKey || !to) return; // not configured — skip silently

  const html = `
    <h2>New ${lead.source === "brochure" ? "Brochure" : "Counseling"} Inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(lead.full_name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(lead.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email || "—")}</p>
    <p><strong>Interest:</strong> ${lead.interest === "work" ? "Work Visa" : "Study Abroad"}</p>
    <p><strong>Message:</strong> ${escapeHtml(lead.message || "—")}</p>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `GLOBERA International <${from}>`,
      to: [to],
      subject: `New inquiry from ${lead.full_name}`,
      html,
    }),
  });
}

function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
