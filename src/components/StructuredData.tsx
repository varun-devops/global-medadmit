import { contactInfo } from "@/lib/data";
import { dictionaries } from "@/lib/i18n/dictionaries";

export default function StructuredData() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const org = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Global MedAdmit Consultants",
    description:
      "Medical education consultancy helping students study MBBS abroad in NMC & WHO-approved universities, with admission, visa, coaching and post-arrival support.",
    url: base,
    telephone: contactInfo.phone,
    email: contactInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contactInfo.address,
      addressCountry: "IN",
    },
    areaServed: ["Uzbekistan", "Kyrgyzstan", "Georgia", "Russia", "Kazakhstan", "Hungary"],
    knowsAbout: ["MBBS Abroad", "NEET Counselling", "FMGE Coaching", "USMLE", "Student Visa"],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dictionaries.en.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
