import Image from "next/image";
import Icon from "@/components/Icon";
import { faculties, facilities, amenities, erasmus, reasons } from "@/lib/umfst";

/* ----------------------------------------------------------------- Faculties */

export function FacultiesSection() {
  return (
    <div className="container-x py-16">
      <div className="space-y-14">
        {faculties.map((f) => (
          <article key={f.slug} id={f.slug} className="scroll-mt-24">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink-100 shadow-card">
                <Image src={f.image} alt={f.name} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink-800">
                  <Icon name={f.icon} className="h-3.5 w-3.5 text-brand-600" /> Since {f.since}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-ink-900">{f.name}</h2>
                <p className="mt-3 text-ink-600">{f.summary}</p>
                {f.body.map((p, i) => (
                  <p key={i} className="mt-3 text-sm leading-relaxed text-ink-500">{p}</p>
                ))}

                <div className="mt-5 flex flex-wrap gap-2">
                  {f.highlights.map((h) => (
                    <span key={h} className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
                      <Icon name="Check" className="h-3.5 w-3.5" /> {h}
                    </span>
                  ))}
                </div>

                {/* Programmes table */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-ink-100">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-ink-50 text-xs uppercase tracking-wider text-ink-500">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Programme</th>
                        <th className="px-4 py-3 font-semibold">Level</th>
                        <th className="px-4 py-3 font-semibold">Duration</th>
                        <th className="px-4 py-3 font-semibold">Language</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-100">
                      {f.programs.map((p) => (
                        <tr key={p.name} className="bg-white">
                          <td className="px-4 py-3 font-medium text-ink-900">{p.name}</td>
                          <td className="px-4 py-3 text-ink-600">{p.level}</td>
                          <td className="px-4 py-3 text-ink-600">{p.years}</td>
                          <td className="px-4 py-3 text-ink-600">{p.language}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Facilities */

export function FacilitiesSection() {
  return (
    <div className="container-x py-16">
      <div className="grid gap-6 sm:grid-cols-2">
        {facilities.map((fac) => (
          <div key={fac.slug} className="card flex gap-4 p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Icon name={fac.icon} className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-bold text-ink-900">{fac.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{fac.blurb}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Student life */

export function StudentLifeSection() {
  return (
    <div className="container-x py-16">
      <div className="max-w-3xl">
        <p className="text-lg leading-relaxed text-ink-600">
          Being a student in Targu Mures — the city many say is the most beautiful in Transylvania —
          means excellent networking, a harmonious mix of cultures, and an exciting urban life wrapped
          in traditional Transylvanian calm. Here is what campus life offers.
        </p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {amenities.map((a) => (
          <div key={a.title} className="card p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Icon name={a.icon} className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-bold text-ink-900">{a.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- Erasmus+ / careers */

export function ErasmusSection() {
  return (
    <div className="container-x py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <span className="section-label">Erasmus+ mobility</span>
          <h2 className="mt-4 text-2xl font-extrabold text-ink-900">
            Romania&apos;s largest Erasmus+ budget — {erasmus.budget}
          </h2>
          {erasmus.body.map((p, i) => (
            <p key={i} className="mt-3 text-sm leading-relaxed text-ink-500">{p}</p>
          ))}
        </div>
        <div>
          <span className="section-label">Successful careers</span>
          <h2 className="mt-4 text-2xl font-extrabold text-ink-900">Employed before you even graduate</h2>
          {erasmus.careers.map((p, i) => (
            <p key={i} className="mt-3 text-sm leading-relaxed text-ink-500">{p}</p>
          ))}
          <div className="mt-5 flex flex-wrap gap-2">
            {["Bosch", "Azomures", "Hirschmann", "Dent Estet", "Siemens"].map((c) => (
              <span key={c} className="rounded-full bg-ink-50 px-3 py-1.5 text-xs font-semibold text-ink-700">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- 10 reasons */

export function ReasonsSection() {
  return (
    <div className="container-x py-16">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
        {reasons.map((r, i) => (
          <div key={r.title} className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
              <Icon name={r.icon} className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-bold text-ink-900">
                <span className="text-brand-500">{String(i + 1).padStart(2, "0")}</span> · {r.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-ink-500">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
