import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Us — Trusted MBBS Abroad Consultants",
  description:
    "Learn about GLOBERA International — experienced medical-education consultants helping students study MBBS abroad in NMC & WHO-approved universities with transparent fees and full support.",
  path: "/about",
  keywords: ["about GLOBERA", "MBBS abroad consultants", "medical education consultancy", "study abroad agency India"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
