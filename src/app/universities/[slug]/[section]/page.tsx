import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UMFST_SLUG, umfst, microsite } from "@/lib/umfst";
import UmfstHeader from "@/components/UmfstHeader";
import UmfstCTA from "@/components/UmfstCTA";
import {
  FacultiesSection,
  FacilitiesSection,
  StudentLifeSection,
  ErasmusSection,
  ReasonsSection,
} from "@/components/umfst/sections";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

type SectionMeta = {
  eyebrow: string;
  title: string;
  subtitle: string;
  Section: () => React.JSX.Element;
};

const SECTIONS: Record<string, SectionMeta> = {
  faculties: {
    eyebrow: "Faculties & Programmes",
    title: "Medical, dental & pharmacy programmes at UMPhST",
    subtitle:
      "Six-year MD in English, dentistry and pharmacy degrees — accredited by ARACIS and recognised across the EU, taught in English, Romanian and Hungarian.",
    Section: FacultiesSection,
  },
  facilities: {
    eyebrow: "Educational Facilities",
    title: "World-class medical training infrastructure",
    subtitle:
      "Virtual-reality medicine, an internationally accredited simulation centre, an €11M research centre, integrated dental and pharmaceutical centres, and a 300,000-volume library.",
    Section: FacilitiesSection,
  },
  "student-life": {
    eyebrow: "Student Life",
    title: "Life as a student in Targu Mures",
    subtitle:
      "1,700+ accommodation places, an 11,000 m² sports centre, bike-sharing, dining, counselling and a vibrant Art Nouveau city in the heart of Transylvania.",
    Section: StudentLifeSection,
  },
  erasmus: {
    eyebrow: "Erasmus+ & Careers",
    title: "Erasmus+ mobility and graduate employability",
    subtitle:
      "The largest Erasmus+ budget of any Romanian university for 2023–2024, with strong industry partnerships that get students hired before graduation.",
    Section: ErasmusSection,
  },
  reasons: {
    eyebrow: "Why Choose Us",
    title: "10 reasons to be a student at G.E. Palade UMPhST",
    subtitle:
      "From a Nobel-laureate namesake and an EU campus in Germany to its own clinical hospital and Romania's largest Erasmus+ budget.",
    Section: ReasonsSection,
  },
};

export function generateStaticParams() {
  return microsite.map((m) => ({ slug: UMFST_SLUG, section: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}): Promise<Metadata> {
  const { slug, section } = await params;
  const meta = SECTIONS[section];
  if (slug !== UMFST_SLUG || !meta) return {};

  const title = `${meta.title} | ${umfst.shortName}`;
  const url = `${base}/universities/${slug}/${section}`;
  return {
    title,
    description: meta.subtitle,
    alternates: { canonical: url },
    openGraph: { title, description: meta.subtitle, url, images: [umfst.image], type: "article" },
    twitter: { card: "summary_large_image", title, description: meta.subtitle },
  };
}

export default async function MicrositeSectionPage({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}) {
  const { slug, section } = await params;
  const meta = SECTIONS[section];
  if (slug !== UMFST_SLUG || !meta) notFound();

  const { Section } = meta;

  return (
    <>
      <UmfstHeader eyebrow={meta.eyebrow} title={meta.title} subtitle={meta.subtitle} crumb={meta.eyebrow} />
      <Section />
      <UmfstCTA
        context={`${umfst.shortName} — ${meta.eyebrow}`}
        heading="Want to know more about UMPhST?"
        sub="Talk to a counsellor on WhatsApp or send a request — our admin team will get back to you with details on admission, fees and visas."
      />
    </>
  );
}
