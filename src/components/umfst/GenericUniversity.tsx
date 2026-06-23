import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, CalendarDays, Languages, MapPin, MessageCircle } from "lucide-react";
import Flag from "@/components/Flag";
import TriangleField from "@/components/TriangleField";
import UmfstCTA from "@/components/UmfstCTA";
import type { University } from "@/lib/data";

/** Standard detail template for the medical universities other than UMPhST. */
export default function GenericUniversity({ u }: { u: University }) {
  return (
    <>
      <section className="tri-bg-dark relative overflow-hidden text-white">
        <span className="tri-mesh-light right-0 top-0 hidden h-full w-1/2 md:block" aria-hidden />
        <TriangleField tone="dark" className="right-0 top-0 hidden h-full w-1/2 lg:block" />
        <div className="container-x relative grid gap-10 py-14 md:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Link href="/universities" className="text-sm text-ink-300 hover:text-white">
              ← All universities
            </Link>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-200">
              <Flag code={u.code} name={u.country} className="h-3 w-4" /> {u.country}
            </span>
            <h1 className="mt-4 text-balance text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              {u.name}
            </h1>
            <p className="mt-5 max-w-xl text-ink-200 md:text-lg">{u.blurb}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-200">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-brand-300" /> Established {u.established}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Languages className="h-4 w-4 text-brand-300" /> {u.medium}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-brand-300" /> {u.country}
              </span>
            </div>
            <div className="mt-7 flex flex-wrap gap-1.5">
              {u.recognition.map((r) => (
                <span key={r} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  <BadgeCheck className="h-3.5 w-3.5 text-brand-300" /> {r}
                </span>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-card">
            <Image src={u.image} alt={u.name} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" priority />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <span className="section-label">About the university</span>
            <h2 className="mt-4 text-2xl font-extrabold text-ink-900">An MBBS pathway recognised across the world</h2>
            <p className="mt-4 leading-relaxed text-ink-600">
              {u.name} offers an English-medium medical degree in {u.country}, established in {u.established}.
              Graduates qualify to appear for screening exams such as the FMGE/NExT and pursue licensure in
              their home country, with recognition including {u.recognition.join(", ")}.
            </p>
            <p className="mt-4 leading-relaxed text-ink-600">{u.blurb}</p>
          </div>
          <aside className="card h-fit p-6">
            <h3 className="font-bold text-ink-900">Key facts</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-ink-500">Country</dt><dd className="font-semibold text-ink-900">{u.country}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-ink-500">Established</dt><dd className="font-semibold text-ink-900">{u.established}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-ink-500">Medium</dt><dd className="font-semibold text-ink-900">{u.medium}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-ink-500">Recognition</dt><dd className="font-semibold text-ink-900">{u.recognition.join(", ")}</dd></div>
            </dl>
            <Link href="/contact" className="btn btn-primary mt-6 w-full">
              <MessageCircle className="h-4 w-4" /> Enquire now
            </Link>
          </aside>
        </div>
      </section>

      <UmfstCTA
        context={u.name}
        heading={`Apply to ${u.name}`}
        sub="Talk to a counsellor on WhatsApp or send a request — our admin team will handle admission, fees and visa guidance for you."
      />
    </>
  );
}
