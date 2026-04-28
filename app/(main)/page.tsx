import Hero from "@/components/Hero";
import HowItWorks from "@/components/How-It-Works";
import PricingSection from "@/components/PricingSection";
import Testimonial from "@/components/Testimonial";
import Image from "next/image";

export default function Home() {
  return (
    <main className="pt-25">
      <Hero />
      <HowItWorks />
      <PricingSection />
      <Testimonial />
    </main>
  );
}
