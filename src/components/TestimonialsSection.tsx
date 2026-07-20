'use client';

import React from 'react';
import { Star, MessageSquarePlus, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const TestimonialsSection: React.FC = () => {
  const reviews: any[] = [];

  return (
    <section id="reviews" className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E40AF]">
            CUSTOMER REVIEWS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            What Our Customers Say
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Verified feedback from vehicle owners using PYPIRATES car wash & detailing services.
          </p>
        </div>

        {/* Clean Empty State for New Company */}
        {reviews.length === 0 ? (
          <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-[#1E40AF] flex items-center justify-center mx-auto shadow-xs">
              <Sparkles className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-50 text-[#1E40AF] text-xs font-extrabold border border-blue-100 uppercase tracking-wider">
                <span>Brand New Detailing Launch</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Be the First Customer to Leave a Review!
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                As a newly launched premium car wash auto spa, we welcome all initial feedback. Book your service today and share your experience with us!
              </p>
            </div>

            <div className="pt-2 flex justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center space-x-2 px-7 py-3 rounded-full bg-[#1E40AF] font-bold text-xs text-white hover:bg-blue-800 shadow-md transition-all"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Book Wash & Leave First Review</span>
              </Link>
            </div>
          </div>
        ) : null}

      </div>
    </section>
  );
};
