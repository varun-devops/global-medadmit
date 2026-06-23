import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Us — Book Free MBBS Counselling",
  description:
    "Get in touch with GLOBERA International for free MBBS-abroad counselling. Call, email or WhatsApp us, or submit the form and our advisors will reach out shortly.",
  path: "/contact",
  keywords: ["contact MBBS consultant", "free MBBS counselling", "study abroad enquiry", "GLOBERA contact"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
