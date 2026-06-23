import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Team — Medical Education Counsellors",
  description:
    "Meet the GLOBERA team — experienced counsellors, admissions managers and visa specialists dedicated to guiding students into the right medical university abroad.",
  path: "/team",
  keywords: ["GLOBERA team", "MBBS counsellors", "admissions advisors", "study abroad experts"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
