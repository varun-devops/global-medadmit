"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, CalendarClock, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { createClient } from "@/lib/supabase/client";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

type EventItem = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  event_date: string;
  image_url: string | null;
};

const fallback: EventItem[] = [
  {
    id: "e1",
    title: "Free MBBS Abroad Counseling Seminar",
    description: "Meet our counselors, learn about fees, universities and the admission process. Open to students and parents.",
    location: "New Delhi (and online)",
    event_date: new Date(Date.now() + 12 * 86400000).toISOString().slice(0, 10),
    image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
  {
    id: "e2",
    title: "NEET Results — What Next? Webinar",
    description: "Live webinar on choosing the right country and university after your NEET results.",
    location: "Online (Zoom)",
    event_date: new Date(Date.now() + 25 * 86400000).toISOString().slice(0, 10),
    image_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
  },
  {
    id: "e3",
    title: "School Awareness Program",
    description: "An awareness session for senior-secondary students about careers in medicine abroad.",
    location: "Partner schools, NCR",
    event_date: new Date(Date.now() - 20 * 86400000).toISOString().slice(0, 10),
    image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
  },
];

function EventCard({ ev, t }: { ev: EventItem; t: any }) {
  const date = new Date(ev.event_date);
  return (
    <article className="card group h-full overflow-hidden transition hover:-translate-y-1">
      <div className="relative h-44 overflow-hidden bg-ink-100">
        {ev.image_url && (
          <Image
            src={ev.image_url}
            alt={ev.title}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute left-3 top-3 rounded-xl bg-white/95 px-3 py-1.5 text-center leading-none shadow-soft">
          <span className="block text-lg font-extrabold text-brand-700">{date.getDate()}</span>
          <span className="block text-[10px] font-semibold uppercase text-ink-500">
            {date.toLocaleString("en", { month: "short" })}
          </span>
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-bold leading-snug text-ink-900">{ev.title}</h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-500">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            {date.toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" })}
          </span>
          {ev.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {ev.location}
            </span>
          )}
        </div>
        {ev.description && <p className="mt-3 text-sm leading-relaxed text-ink-500">{ev.description}</p>}
        <Link href="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2">
          {t.events.register} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export default function EventsPage() {
  const { t } = useLang();
  const [items, setItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("events")
          .select("id,title,description,location,event_date,image_url")
          .order("event_date", { ascending: true });
        setItems(data && data.length ? data : fallback);
      } catch {
        setItems(fallback);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = items.filter((e) => e.event_date >= today);
  const past = items.filter((e) => e.event_date < today).reverse();

  return (
    <>
      <PageHeader title={t.events.title} subtitle={t.events.subtitle} />
      <section className="py-16">
        <div className="container-x">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-72 animate-pulse rounded-2xl bg-ink-100" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-ink-400">
              <CalendarClock className="h-12 w-12" />
              <p className="mt-3">{t.events.empty}</p>
            </div>
          ) : (
            <div className="space-y-14">
              {upcoming.length > 0 && (
                <div>
                  <h2 className="mb-6 text-2xl font-extrabold text-ink-900">{t.events.upcoming}</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {upcoming.map((ev, i) => (
                      <Reveal key={ev.id} delay={i * 0.05}>
                        <EventCard ev={ev} t={t} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}
              {past.length > 0 && (
                <div>
                  <h2 className="mb-6 text-2xl font-extrabold text-ink-900">{t.events.past}</h2>
                  <div className="grid gap-6 opacity-90 sm:grid-cols-2 lg:grid-cols-3">
                    {past.map((ev, i) => (
                      <Reveal key={ev.id} delay={i * 0.05}>
                        <EventCard ev={ev} t={t} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
