'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      id: 'exterior-precision',
      title: 'Exterior Precision',
      price: 'Starting from ₹1,499',
      image: '/images/exterior_precision.png',
      aspect: 'aspect-[4/3] md:aspect-[16/10]',
    },
    {
      id: 'interior-spa',
      title: 'Interior Spa',
      price: 'Starting from ₹2,499',
      image: '/images/interior_spa.png',
      aspect: 'aspect-[4/3] md:aspect-[16/10]',
    },
    {
      id: 'wheel-armor',
      title: 'Wheel Armor',
      price: 'Starting from ₹1,299',
      image: '/images/wheel_armor.png',
      aspect: 'aspect-[4/3] md:aspect-[16/10]',
    },
    {
      id: 'ceramic-pro',
      title: 'Ceramic Pro',
      price: 'Starting from ₹4,999',
      image: '/images/ceramic_pro.png',
      aspect: 'aspect-[4/3] md:aspect-[16/10]',
    },
  ];

  return (
    <section id="services" className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E40AF]">
              OUR EXPERTISE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              Premium Care Solutions
            </h2>
          </div>

          <div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed lg:pl-6">
              From ceramic coatings to deep interior rejuvenation, we offer a comprehensive suite of detailing services designed for the discerning owner.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid Layout matching design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href="/booking"
              className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block"
            >
              <div className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden bg-slate-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient overlay for clear text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Content at Bottom Left */}
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 drop-shadow-sm">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm font-medium">
                    {service.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
