import { contactInfo } from "@/lib/data";

export default function StructuredData() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Global MedAdmit Consultants",
    description:
      "Medical education consultancy helping students study MBBS abroad in NMC & WHO-approved universities, plus sponsored work-visa assistance.",
    url: base,
    telephone: contactInfo.phone,
    email: contactInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contactInfo.address,
      addressCountry: "IN",
    },
    areaServed: ["Uzbekistan", "Kyrgyzstan", "Georgia", "Russia", "Kazakhstan", "Hungary"],
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
