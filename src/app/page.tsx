import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import CountriesPreview from "@/components/sections/CountriesPreview";
import UniversitiesPreview from "@/components/sections/UniversitiesPreview";
import WorkVisaBanner from "@/components/sections/WorkVisaBanner";
import Testimonials from "@/components/sections/Testimonials";
import CtaBand from "@/components/sections/CtaBand";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <Services />
      <WhyUs />
      <CountriesPreview />
      <UniversitiesPreview />
      <WorkVisaBanner />
      <Testimonials />
      <CtaBand />
    </>
  );
}
