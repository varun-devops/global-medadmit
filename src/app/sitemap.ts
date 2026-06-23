import type { MetadataRoute } from "next";
import { universities } from "@/lib/data";
import { UMFST_SLUG, microsite } from "@/lib/umfst";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const routes = [
    "",
    "/about",
    "/study-abroad",
    "/countries",
    "/universities",
    "/work-visa",
    "/gallery",
    "/events",
    "/team",
    "/contact",
    "/login",
    "/signup",
  ];

  // Every university detail page.
  const uniRoutes = universities.map((u) => `/universities/${u.slug}`);
  // UMPhST microsite sub-pages.
  const micrositeRoutes = microsite.map((m) => `/universities/${UMFST_SLUG}/${m.slug}`);

  const all = [...routes, ...uniRoutes, ...micrositeRoutes];

  return all.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r === "" ? 1 : r === `/universities/${UMFST_SLUG}` ? 0.9 : 0.7,
  }));
}
