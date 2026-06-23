import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Sponsored Work Visa Europe — Skilled Jobs Abroad",
  description:
    "Sponsored work-visa pathways to Europe for skilled professionals. We guide you through job placement, documentation and visa processing for a secure career abroad.",
  path: "/work-visa",
  keywords: ["work visa Europe", "sponsored work visa", "skilled jobs abroad", "Europe work permit", "job visa consultancy"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
