import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import SiteShell from "@/components/SiteShell";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Global MedAdmit Consultants | Study MBBS Abroad at Lowest Fees",
    template: "%s | Global MedAdmit Consultants",
  },
  description:
    "Expert, transparent counseling for affordable MBBS abroad in NMC & WHO-approved universities — Uzbekistan, Kyrgyzstan, Georgia, Russia, Kazakhstan & more. Free counseling, admission, visa & post-arrival support. Sponsored work-visa assistance for Europe.",
  keywords: [
    "MBBS abroad",
    "study medicine abroad",
    "MBBS Uzbekistan",
    "MBBS Kyrgyzstan",
    "MBBS Georgia",
    "MBBS Russia",
    "NMC approved universities",
    "medical admission consultants",
    "free counseling MBBS",
    "sponsored work visa Europe",
    "FMGE NExT coaching",
  ],
  authors: [{ name: "Global MedAdmit Consultants" }],
  openGraph: {
    type: "website",
    title: "Global MedAdmit Consultants | Study MBBS Abroad at Lowest Fees",
    description:
      "Affordable MBBS abroad in top NMC & WHO-approved universities. Free counseling, admission, visa & post-arrival support.",
    siteName: "Global MedAdmit Consultants",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Global MedAdmit Consultants | Study MBBS Abroad at Lowest Fees",
    description:
      "Affordable MBBS abroad in top NMC & WHO-approved universities. Free counseling, admission & visa support.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
