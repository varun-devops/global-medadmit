import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarDays, Languages, Quote } from "lucide-react";
import Icon from "@/components/Icon";
import Flag from "@/components/Flag";
import UmfstHeader from "@/components/UmfstHeader";
import UmfstCTA from "@/components/UmfstCTA";
import { umfst, faculties, facilities, microsite, reasons } from "@/lib/umfst";

/** The UMPhST microsite landing page (rich, brochure-driven, SEO-first). */
export default function UmfstLanding() {
  return (
    <>
      <UmfstHeader
        eyebrow="Featured Medical University · Romania"
        title={umfst.name}
        subtitle={umfst.tagline}
      />

      {/* Quick facts bar */}
      <section className="border-b border-ink-100 bg-white">
        <div className="container-x flex flex-wrap items-center gap-x-6 gap-y-3 py-5 text-sm text-ink-600">
          <span className="inline-flex items-center gap-1.5">
            <Flag code={umfst.code} name={umfst.country} className="h-3.5 w-5" /> {umfst.city}, {umfst.country}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-brand-600" /> Established {umfst.established}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Languages className="h-4 w-4 text-brand-600" /> {umfst.medium}
          </span>
          <span className="ml-auto flex flex-wrap gap-1.5">
            {umfst.recognition.map((r) => (
              <span
                key={r}
                className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700"
              >
                <BadgeCheck className="h-3.5 w-3.5" /> {r}
              </span>
            ))}
          </span>
        </div>
      </section>

      {/* Intro + stats */}
      <section className="py-16">
        <div className="container-x grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <span className="section-label">An experience of academic excellence</span>
            <h2 className="mt-4 text-3xl font-extrabold text-ink-900">
              Where the journey to the top begins
            </h2>
            <p className="mt-4 leading-relaxed text-ink-600">{umfst.intro}</p>
            <p className="mt-4 italic text-ink-500">“{umfst.motto}”</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/universities/${umfst.slug}/faculties`} className="btn btn-primary">
                Explore programmes <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={`/universities/${umfst.slug}/reasons`} className="btn btn-outline">
                10 reasons to choose us
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {umfst.stats.map((s) => (
              <div key={s.label} className="card p-5 text-center">
                <p className="text-3xl font-extrabold text-brand-600">{s.value}</p>
                <p className="mt-1 text-sm text-ink-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore the microsite */}
      <section className="soft-section py-16">
        <div className="container-x">
          <span className="section-label">Explore the university</span>
          <h2 className="mt-4 text-3xl font-extrabold text-ink-900">Everything you need to know</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {microsite.map((m) => (
              <Link
                key={m.slug}
                href={`/universities/${umfst.slug}/${m.slug}`}
                className="card group flex flex-col p-6 transition hover:-translate-y-1"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={m.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink-900">{m.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{m.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:gap-2">
                  Read more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Medical faculties preview */}
      <section className="py-16">
        <div className="container-x">
          <span className="section-label">Medical faculties</span>
          <h2 className="mt-4 text-3xl font-extrabold text-ink-900">Study medicine, dentistry & pharmacy</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {faculties.map((f) => (
              <article key={f.slug} className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1">
                <div className="relative h-40 overflow-hidden">
                  <Image src={f.image} alt={f.name} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink-800">
                    <Icon name={f.icon} className="h-3.5 w-3.5 text-brand-600" /> Since {f.since}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-bold leading-snug text-ink-900">{f.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{f.summary}</p>
                  <Link
                    href={`/universities/${umfst.slug}/faculties#${f.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2"
                  >
                    View programmes <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities strip */}
      <section className="soft-section py-16">
        <div className="container-x">
          <span className="section-label">Educational facilities</span>
          <h2 className="mt-4 text-3xl font-extrabold text-ink-900">World-class medical training infrastructure</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((fac) => (
              <div key={fac.slug} className="card p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={fac.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-ink-900">{fac.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{fac.blurb}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href={`/universities/${umfst.slug}/facilities`} className="btn btn-outline">
              All facilities <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reasons teaser */}
      <section className="py-16">
        <div className="container-x">
          <span className="section-label">Why choose us</span>
          <h2 className="mt-4 text-3xl font-extrabold text-ink-900">A few reasons students from 83 countries choose UMPhST</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.slice(0, 6).map((r) => (
              <div key={r.title} className="flex gap-3 rounded-2xl border border-ink-100 bg-white p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={r.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-ink-900">{r.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="soft-section py-16">
        <div className="container-x max-w-3xl">
          <Quote className="h-10 w-10 text-brand-300" />
          <blockquote className="mt-4 text-xl font-medium leading-relaxed text-ink-800">
            “We chose G.E. Palade UMPhST as our stepping stone to a successful career because of its
            international prestige, practical approach to teaching and the large community around it.
            From conferences and workshops to volunteer opportunities and great mentors — this
            university has it all!”
          </blockquote>
          <p className="mt-4 font-semibold text-ink-900">Patrick Lechsner</p>
          <p className="text-sm text-ink-500">International student, G.E. Palade UMPhST of Targu Mures</p>
        </div>
      </section>

      <UmfstCTA
        context="George Emil Palade University (UMPhST), Targu Mures"
        heading="Apply to study medicine in Romania"
        sub="Talk to a counsellor on WhatsApp or send a request — our admin team will guide you through admission, fees and visas for UMPhST."
      />
    </>
  );
}
