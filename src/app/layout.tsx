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
    default: "GLOBERA International | Study MBBS Abroad at the Lowest Fees",
    template: "%s | GLOBERA International",
  },
  description:
    "Want to study MBBS abroad without the stress? We guide Indian students into NMC & WHO-approved medical universities in Uzbekistan, Kyrgyzstan, Georgia, Russia and Kazakhstan — with free counselling, the lowest fees, full visa help, NEET/FMGE coaching and post-arrival support. No donation, no hidden charges.",
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
  authors: [{ name: "GLOBERA International Private Limited" }],
  openGraph: {
    type: "website",
    title: "GLOBERA International | Study MBBS Abroad — From Dreams to Degrees",
    description:
      "Affordable MBBS abroad in top NMC & WHO-approved universities. Free counseling, admission, visa & post-arrival support.",
    siteName: "GLOBERA International Private Limited",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "GLOBERA International | Study MBBS Abroad — From Dreams to Degrees",
    description:
      "Affordable MBBS abroad in top NMC & WHO-approved universities. Free counseling, admission & visa support.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/logo-1.png",
    shortcut: "/logo-1.png",
    apple: "/logo-1.png",
  },
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
