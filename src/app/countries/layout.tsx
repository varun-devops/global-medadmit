import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Study Destinations — MBBS Countries in Europe",
  description:
    "Explore top countries to study MBBS abroad — Romania, Hungary, Ukraine, Moldova, Latvia, Serbia and more. Compare fees, recognition and student-visa pathways across Europe.",
  path: "/countries",
  keywords: ["MBBS countries", "study MBBS Romania", "MBBS Hungary", "MBBS Ukraine", "MBBS Moldova", "study medicine Europe"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
