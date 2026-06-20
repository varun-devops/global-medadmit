import Hero from "@/components/sections/Hero";
import StairSteps from "@/components/sections/StairSteps";
import Services from "@/components/sections/Services";
import FeatureRows from "@/components/sections/FeatureRows";
import Coaching from "@/components/sections/Coaching";
import StatsGraph from "@/components/sections/StatsGraph";
import CountriesPreview from "@/components/sections/CountriesPreview";
import UniversitiesPreview from "@/components/sections/UniversitiesPreview";
import WhyUs from "@/components/sections/WhyUs";
import PartnersLogos from "@/components/sections/PartnersLogos";
import Testimonials from "@/components/sections/Testimonials";
import SeoIntro from "@/components/sections/SeoIntro";
import BlogSection from "@/components/sections/BlogSection";
import Faq from "@/components/sections/Faq";
import StatsBand from "@/components/sections/StatsBand";
import CtaBand from "@/components/sections/CtaBand";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <StairSteps />
      <Services />
      <FeatureRows />
      <Coaching />
      <StatsGraph />
      <CountriesPreview />
      <UniversitiesPreview />
      <WhyUs />
      <PartnersLogos />
      <Testimonials />
      <SeoIntro />
      <BlogSection />
      <Faq />
      <StatsBand />
      <CtaBand />
    </>
  );
}
