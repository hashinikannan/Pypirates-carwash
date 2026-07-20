'use client';

import React from 'react';
import Image from 'next/image';

export const GallerySection: React.FC = () => {
  const transformations = [
    {
      id: 1,
      serviceName: 'Exterior Wash',
      image: '/images/t1_after.png',
      description: 'pH-neutral snow foam wash removing stubborn road dust & grime.',
    },
    {
      id: 2,
      serviceName: 'Ceramic Coating',
      image: '/images/ceramic_pro.png',
      description: 'Hydrophobic SiO2 ceramic shield restoring deep reflections.',
    },
    {
      id: 3,
      serviceName: 'Interior Deep Cleaning',
      image: '/images/interior_spa.png',
      description: 'Thermal steam extraction & leather conditioning spa.',
    },
    {
      id: 4,
      serviceName: 'Wheel Detailing',
      image: '/images/wheel_armor.png',
      description: 'Iron remover wheel scrub with hydrophobic tire dressing.',
    },
    {
      id: 5,
      serviceName: 'Paint Protection',
      image: '/images/exterior_precision.png',
      description: 'Multi-stage paint correction removing micro-scratches.',
    },
    {
      id: 6,
      serviceName: 'Premium Detailing',
      image: '/images/hero.png',
      description: 'Complete bumper-to-bumper interior & exterior restoration.',
    },
  ];

  return (
    <section id="gallery" className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E40AF]">
            BEFORE & AFTER GALLERY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            The PYPIRATES Transformation
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Explore side-by-side before and after service results delivered on exact vehicles by our detailing team.
          </p>
        </div>

        {/* 6 Transformation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transformations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col justify-between"
            >
              {/* Service Title */}
              <div className="px-6 py-4 border-b border-slate-100 bg-white">
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#1E40AF] transition-colors">
                  {item.serviceName}
                </h3>
              </div>

              {/* Two Separate Side-by-Side Images (Exact Same Car & Angle) */}
              <div className="grid grid-cols-2 gap-2 p-4 bg-slate-50/50">
                
                {/* BEFORE Image (Left) */}
                <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
                  <Image
                    src={item.image}
                    alt={`${item.serviceName} Before`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-90 brightness-75 blur-[0.3px]"
                  />
                  {/* Dirt / Grime Overlay */}
                  <div className="absolute inset-0 bg-[#3a2818]/40 mix-blend-multiply pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-amber-950/20 to-transparent pointer-events-none" />
                  
                  {/* Small "Before" Label */}
                  <span className="absolute top-2.5 left-2.5 bg-slate-900/90 text-amber-300 border border-amber-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
                    Before
                  </span>
                </div>

                {/* AFTER Image (Right) */}
                <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden border border-blue-200 bg-slate-100">
                  <Image
                    src={item.image}
                    alt={`${item.serviceName} After`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Small "After" Label */}
                  <span className="absolute top-2.5 right-2.5 bg-[#1E40AF] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
                    After
                  </span>
                </div>

              </div>

              {/* Short One-Line Description & Service Title below */}
              <div className="px-6 py-4 border-t border-slate-100 bg-white space-y-1">
                <span className="text-xs font-bold text-[#1E40AF] uppercase tracking-wider block">
                  {item.serviceName}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
