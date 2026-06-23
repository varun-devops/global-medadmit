import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import SiteShell from "@/components/SiteShell";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GLOBERA International | Study MBBS Abroad at the Lowest Fees",
    template: "%s | GLOBERA International",
  },
  description:
    "Want to study MBBS in Europe without the stress? We guide students into NMC & WHO-approved medical universities in Ukraine, Hungary, Romania, Moldova, Latvia, Serbia and more — with free counselling, the lowest fees, full visa help and post-arrival support. No donation, no hidden charges.",
  keywords: [
    "MBBS abroad",
    "study medicine abroad",
    "MBBS Ukraine",
    "MBBS Hungary",
    "MBBS Romania",
    "MBBS Europe",
    "NMC approved universities",
    "medical admission consultants",
    "free counseling MBBS",
    "sponsored work visa Europe",
    "FMGE NExT coaching",
  ],
  authors: [{ name: "GLOBERA International Private Limited" }],
  creator: "GLOBERA International Private Limited",
  publisher: "GLOBERA International Private Limited",
  applicationName: "GLOBERA International",
  category: "education",
  formatDetection: { telephone: true, email: true, address: true },
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
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
