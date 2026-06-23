import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Events & Seminars — Free MBBS Counselling",
  description:
    "Join GLOBERA's free MBBS-abroad counselling events, seminars and webinars. Meet our advisors, get your questions answered and plan your medical career abroad.",
  path: "/events",
  keywords: ["MBBS counselling events", "study abroad seminar", "MBBS webinar", "free counselling MBBS"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
