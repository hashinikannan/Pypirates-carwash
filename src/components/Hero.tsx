'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Droplets, Award, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const featureCards = [
    {
      icon: Users,
      iconBg: 'bg-blue-100 text-[#1E40AF]',
      title: 'Experienced Staff',
      description: 'Voted experts with years of high-end detailing experience.',
    },
    {
      icon: Droplets,
      iconBg: 'bg-blue-100 text-[#1E40AF]',
      title: 'Eco-Friendly',
      description: 'Biodegradable products that protect your car and the planet.',
    },
    {
      icon: Award,
      iconBg: 'bg-orange-100 text-orange-600',
      title: 'Quality Service',
      description: 'A commitment to precision and a flawless showroom finish.',
    },
  ];

  return (
    <section className="relative pt-4 pb-12 overflow-hidden bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Main Banner Box */}
        <div className="relative rounded-3xl overflow-hidden bg-white shadow-md border border-slate-100 min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex flex-col justify-center">
          
          {/* Background / Right Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero.png"
              alt="Professional Car Wash & Detailing"
              fill
              priority
              className="object-cover object-right sm:object-center"
            />
            {/* Blue Gradient Overlay on the Left Side */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent w-full lg:w-3/5 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent z-10 lg:hidden" />
          </div>

          {/* Left Content Container */}
          <div className="relative z-20 max-w-xl px-6 sm:px-10 py-10 lg:py-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E3A8A] leading-tight tracking-tight">
              Professional Car Wash & Detailing Services
            </h1>
            
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Experience the ultimate care for your vehicle. We combine eco-friendly products with expert precision to restore your car&apos;s showroom shine.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full font-semibold text-sm text-white bg-[#1E40AF] hover:bg-blue-800 shadow-md shadow-blue-700/20 hover:shadow-lg transition-all duration-200"
              >
                <span>Book Now</span>
              </Link>
              
              <Link
                href="/#services"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full font-semibold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-all duration-200"
              >
                <span>View Services</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Feature Cards Grid directly below Hero */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {featureCards.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start space-x-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${feature.iconBg}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
