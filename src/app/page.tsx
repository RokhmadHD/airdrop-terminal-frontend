// src/app/page.tsx

import { FeaturedAirdrops } from "@/components/section/FeaturedAirdrops";
import HeroCanvas from "@/components/section/HeroCanvas";
import HeroSection from "@/components/section/HeroSection";
import { TestimonialsSection } from "@/components/section/TestimonialsSection";

// import { buttonVariants } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";
// import Link from "next/link";

export default function HomePage() {
  return (
    <>
    <HeroSection />
    <HeroCanvas/>
    <FeaturedAirdrops />
    <TestimonialsSection />
    </>
  );
}