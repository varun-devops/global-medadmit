import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { universities } from "@/lib/data";
import { UMFST_SLUG, umfst } from "@/lib/umfst";
import UmfstLanding from "@/components/umfst/Landing";
import GenericUniversity from "@/components/umfst/GenericUniversity";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function generateStaticParams() {
  return universities.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const u = universities.find((x) => x.slug === slug);
  if (!u) return {};

  const title = `${u.name} — MBBS in ${u.country}`;
  const description = u.blurb;
  const url = `${base}/universities/${u.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [u.image], type: "website" },
    twitter: { card: "summary_large_image", title, description, images: [u.image] },
  };
}

export default async function UniversityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const u = universities.find((x) => x.slug === slug);
  if (!u) notFound();

  if (slug === UMFST_SLUG) {
    return (
      <>
        <UniversityJsonLd
          name={umfst.name}
          slug={umfst.slug}
          image={umfst.image}
          country={umfst.country}
          city={umfst.city}
          founded={umfst.established}
          url={umfst.website}
        />
        <UmfstLanding />
      </>
    );
  }

  return (
    <>
      <UniversityJsonLd name={u.name} slug={u.slug} image={u.image} country={u.country} founded={u.established} />
      <GenericUniversity u={u} />
    </>
  );
}

function UniversityJsonLd({
  name,
  slug,
  image,
  country,
  city,
  founded,
  url,
}: {
  name: string;
  slug: string;
  image: string;
  country: string;
  city?: string;
  founded: string;
  url?: string;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name,
    image,
    url: url || `${base}/universities/${slug}`,
    foundingDate: founded,
    address: {
      "@type": "PostalAddress",
      addressCountry: country,
      ...(city ? { addressLocality: city } : {}),
    },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}
