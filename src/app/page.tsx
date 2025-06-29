// src/app/page.tsx

import { FeaturedAirdrops } from "@/components/section/FeaturedAirdrops";
import HeroSection from "@/components/section/HeroSection";
import { TestimonialsSection } from "@/components/section/TestimonialsSection";
export default function HomePage() {
  return (
    <>
    <HeroSection />
    <FeaturedAirdrops />
    <TestimonialsSection />
    </>
  );
}