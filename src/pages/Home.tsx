import Hero from "@/sections/Hero";
import DiscountedCars from "@/sections/DiscountedCars";
import BrandStrip from "@/sections/BrandStrip";
import Services from "@/sections/Services";
import Requirements from "@/sections/Requirements";
import HowItWorks from "@/sections/HowItWorks";
import Testimonials from "@/sections/Testimonials";
import FAQ from "@/sections/FAQ";
import CTABanner from "@/sections/CTABanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <DiscountedCars />
      <BrandStrip />
      <Services />
      <Requirements />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </main>
  );
}
