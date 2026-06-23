"use client";

import { useEffect, useRef, useState } from "react";
import { Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

/**
 * Global visitor counter — a single shared total across ALL users, persisted in
 * Supabase (public.site_stats via the increment_visits() RPC). Each browser
 * counts once per session (sessionStorage guard) so a page navigation doesn't
 * inflate the number. The displayed value animates up (scrolling/odometer feel).
 *
 * Degrades gracefully: if the RPC/table isn't set up yet, it just reads the
 * current count, and if that also fails it shows a sensible baseline.
 */
const BASELINE = 12480; // shown only if the DB isn't reachable/seeded yet

function useCountUp(target: number | null, duration = 1400) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (target == null || started.current) return;
    started.current = true;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

export default function VisitorCounter({ className = "" }: { className?: string }) {
  const [total, setTotal] = useState<number | null>(null);
  const display = useCountUp(total);

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    (async () => {
      try {
        // Only increment once per browser session.
        const alreadyCounted = sessionStorage.getItem("globera_visit_counted");

        if (!alreadyCounted) {
          const { data, error } = await supabase.rpc("increment_visits");
          if (!error && typeof data === "number") {
            sessionStorage.setItem("globera_visit_counted", "1");
            if (active) setTotal(data);
            return;
          }
        }

        // Read-only path (already counted this session, or increment failed).
        const { data: row } = await supabase
          .from("site_stats")
          .select("visits")
          .eq("id", 1)
          .single();
        if (active) setTotal(typeof row?.visits === "number" ? row.visits : BASELINE);
      } catch {
        if (active) setTotal(BASELINE);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${className}`}
      aria-label={`${display.toLocaleString()} total visitors`}
    >
      <Users className="h-3.5 w-3.5 shrink-0 text-brand-200" />
      <span className="tabular-nums font-bold tracking-tight text-white">
        {display.toLocaleString()}
      </span>
      <span className="text-[11px] font-medium uppercase tracking-wide text-brand-100/80">
        visitors
      </span>
    </span>
  );
}
