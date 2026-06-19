"use client";

import { useLang } from "@/lib/i18n/LanguageProvider";
import PageHeader from "@/components/PageHeader";
import Services from "@/components/sections/Services";
import CountriesPreview from "@/components/sections/CountriesPreview";
import UniversitiesPreview from "@/components/sections/UniversitiesPreview";
import CtaBand from "@/components/sections/CtaBand";
import Reveal from "@/components/Reveal";

const steps = [
  { n: "01", title: "Free Counseling", body: "We understand your goals, budget and NEET score, then shortlist the best-fit universities." },
  { n: "02", title: "University Selection", body: "Choose from NMC/WHO-approved universities with transparent fee structures." },
  { n: "03", title: "Admission & Offer Letter", body: "We prepare documents and secure your official admission offer letter." },
  { n: "04", title: "Visa Processing", body: "Complete visa filing, invitation letter and travel arrangements handled by us." },
  { n: "05", title: "Travel & Arrival", body: "Airport pickup, accommodation and local orientation in your university city." },
  { n: "06", title: "Ongoing Support", body: "FMGE/NExT coaching, Indian mess facilities and continuous student support." },
];

export default function StudyAbroadPage() {
  const { t } = useLang();

  return (
    <>
      <PageHeader title={t.nav.studyAbroad} subtitle={t.services.subtitle} />

      <section className="py-16">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="section-label">Admission Process</span>
            <h2 className="mt-4 text-3xl font-extrabold text-ink-900 md:text-4xl">
              Your 6-Step Journey to Studying MBBS Abroad
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className="card h-full p-6">
                  <span className="text-3xl font-extrabold text-brand-200">{s.n}</span>
                  <h3 className="mt-2 text-lg font-bold text-ink-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Services />
      <CountriesPreview />
      <UniversitiesPreview />
      <CtaBand />
    </>
  );
}
