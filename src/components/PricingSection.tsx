'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Sparkles, Clock, Zap, ArrowRight } from 'lucide-react';
import { INITIAL_PACKAGES } from '../data/mockData';

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-16 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#1E40AF] text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Choose Your Detailing Package
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            No hidden fees. Every package includes hand microfiber drying and our 100% satisfaction guarantee.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {INITIAL_PACKAGES.map((pkg) => {
            const isPopular = pkg.popular;
            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-white border-2 border-[#1E40AF] shadow-xl lg:-translate-y-2'
                    : 'bg-[#F8FAFC] border border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#1E40AF] text-white font-bold text-xs tracking-wider uppercase shadow-md flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 fill-white" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900">{pkg.name}</h3>
                    <p className="text-xs text-[#1E40AF] font-bold mt-1">{pkg.tagline}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline space-x-2 pb-4 border-b border-slate-200">
                    <span className="text-5xl font-black text-slate-900">₹{pkg.price}</span>
                    <span className="text-xs text-slate-500 font-medium">/ service</span>
                    <div className="ml-auto flex items-center space-x-1 text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-[#1E40AF]" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Included Features:</p>
                    <ul className="space-y-2.5 text-xs text-slate-700">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isPopular ? 'bg-[#1E40AF] text-white' : 'bg-blue-100 text-[#1E40AF]'
                          }`}>
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="pt-6 mt-6 border-t border-slate-200 space-y-3">
                  <p className="text-[11px] text-slate-500 text-center italic">
                    Best for: {pkg.recommendedFor}
                  </p>
                  <Link
                    href={`/booking?package=${pkg.id}`}
                    className={`w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 ${
                      isPopular
                        ? 'bg-[#1E40AF] hover:bg-blue-800 text-white shadow-md'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                    }`}
                  >
                    <span>Book {pkg.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
