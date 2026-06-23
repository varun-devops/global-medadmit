import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Gallery — Our Students & Success Stories",
  description:
    "See real photos of GLOBERA students who fulfilled their dream of studying MBBS abroad — campus life, admissions, departures and graduations across Europe.",
  path: "/gallery",
  keywords: ["MBBS abroad gallery", "student success stories", "study abroad photos", "GLOBERA students"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
