import React from 'react';
import { Hero } from '../components/Hero';
import { ServicesSection } from '../components/ServicesSection';
import { GallerySection } from '../components/GallerySection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { PricingSection } from '../components/PricingSection';

export default function HomePage() {
  // Git test
  return (
    <div className="space-y-0 bg-[#F8FAFC]">
      <Hero />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <PricingSection />
    </div>
  );
}
