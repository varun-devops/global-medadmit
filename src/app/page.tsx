import Hero from "@/components/sections/Hero";
import ProcessSteps from "@/components/sections/ProcessSteps";
import FeatureRows from "@/components/sections/FeatureRows";
import CountriesPreview from "@/components/sections/CountriesPreview";
import PartnersLogos from "@/components/sections/PartnersLogos";
import BlogSection from "@/components/sections/BlogSection";
import StatsBand from "@/components/sections/StatsBand";
import CtaBand from "@/components/sections/CtaBand";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <ProcessSteps />
      <FeatureRows />
      <CountriesPreview />
      <PartnersLogos />
      <BlogSection />
      <StatsBand />
      <CtaBand />
    </>
  );
}
