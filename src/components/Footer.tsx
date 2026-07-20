'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneCall, Globe, Share2, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-100 text-slate-600 border-t border-slate-200 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand Info & Description */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-[#1E40AF]">
                PYPIRATES
              </span>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              The pinnacle of automotive aesthetic care. We redefine car detailing through passion, precision, and the finest products available.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1E40AF] hover:border-[#1E40AF] transition-colors" aria-label="Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1E40AF] hover:border-[#1E40AF] transition-colors" aria-label="Social Share">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="mailto:info@pypirates.com" className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1E40AF] hover:border-[#1E40AF] transition-colors" aria-label="Email Us">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Company */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#services" className="hover:text-[#1E40AF] transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-[#1E40AF] transition-colors">Pricing</Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-[#1E40AF] transition-colors">Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#reviews" className="hover:text-[#1E40AF] transition-colors">Reviews</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#1E40AF] transition-colors">Contact</Link>
              </li>
              <li>
                <span className="text-slate-400 cursor-not-allowed">Privacy Policy</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Phone Action */}
          <div className="space-y-4">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-slate-400 cursor-not-allowed">Terms of Service</span>
              </li>
            </ul>

            <div className="pt-2 flex flex-col space-y-2">
              <a
                href="tel:+18005557974"
                className="w-12 h-12 rounded-full bg-[#1E40AF] text-white flex items-center justify-center shadow-md hover:bg-blue-800 transition-colors ml-auto sm:ml-0"
                aria-label="Call PYPIRATES"
              >
                <PhoneCall className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-2 sm:space-y-0">
          <p>© {new Date().getFullYear()} PYPIRATES. All rights reserved. Premium Car Care Excellence.</p>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">742 Evergreen Terrace, Springfield</span>
            <span className="text-slate-400">+1 (800) 555-PYPIRATES</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
