import type { Metadata } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * Build consistent, SEO-rich metadata for a route. Client-component pages can't
 * export `metadata` themselves, so each route folder ships a tiny server
 * `layout.tsx` that calls this.
 */
export function pageMeta({
  title,
  description,
  path,
  keywords = [],
  image = "/logo-1.png",
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const url = `${base}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "GLOBERA International Private Limited",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
