import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Study MBBS Abroad — Admission, Visa & Coaching",
  description:
    "Study MBBS abroad in Europe with end-to-end guidance: university selection, admission, student visa, FMGE/NExT coaching and post-arrival support. Lowest fees, no hidden charges.",
  path: "/study-abroad",
  keywords: ["study MBBS abroad", "MBBS in Europe", "study medicine abroad", "MBBS admission", "student visa MBBS", "FMGE NExT coaching"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
