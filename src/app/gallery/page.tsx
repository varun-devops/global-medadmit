"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { createClient } from "@/lib/supabase/client";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

type GalleryItem = {
  id: string;
  title: string;
  caption: string | null;
  image_url: string;
};

// Fallback images shown when the gallery table is empty / unconfigured.
const fallback: GalleryItem[] = [
  { id: "f1", title: "Campus Visit", caption: "University tour with students", image_url: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80" },
  { id: "f2", title: "Counseling Session", caption: "Personalized guidance", image_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
  { id: "f3", title: "Student Send-off", caption: "Departure celebration", image_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80" },
  { id: "f4", title: "Seminar", caption: "MBBS abroad awareness", image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" },
  { id: "f5", title: "Graduation", caption: "Our students, now doctors", image_url: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=800&q=80" },
  { id: "f6", title: "Hostel Life", caption: "Comfortable accommodation", image_url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80" },
];

export default function GalleryPage() {
  const { t } = useLang();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<GalleryItem | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("gallery")
          .select("id,title,caption,image_url")
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false });
        setItems(data && data.length ? data : fallback);
      } catch {
        setItems(fallback);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <PageHeader title={t.gallery.title} subtitle={t.gallery.subtitle} />

      <section className="py-16">
        <div className="container-x">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 animate-pulse rounded-2xl bg-ink-100" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-ink-400">
              <ImageIcon className="h-12 w-12" />
              <p className="mt-3">{t.gallery.empty}</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((it, i) => (
                <Reveal key={it.id} delay={i * 0.04}>
                  <button
                    onClick={() => setActive(it)}
                    className="group relative block h-64 w-full overflow-hidden rounded-2xl text-left"
                  >
                    <Image
                      src={it.image_url}
                      alt={it.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-90" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <h3 className="font-bold">{it.title}</h3>
                      {it.caption && <p className="text-sm text-white/80">{it.caption}</p>}
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-ink-950/85 p-4 backdrop-blur"
          onClick={() => setActive(null)}
        >
          <button className="absolute right-5 top-5 text-white/80 hover:text-white" aria-label="close">
            <X className="h-7 w-7" />
          </button>
          <div className="relative max-h-[85vh] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
              <Image src={active.image_url} alt={active.title} fill className="object-contain" />
            </div>
            <div className="mt-3 text-center text-white">
              <h3 className="text-lg font-bold">{active.title}</h3>
              {active.caption && <p className="text-sm text-white/70">{active.caption}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
