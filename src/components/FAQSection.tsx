'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is the difference between In-Shop and Doorstep Mobile Wash?',
      answer: 'With In-Shop wash, you bring your vehicle to our state-of-the-art facility where we use specialized hydraulic lifts, high-pressure foam cannons, and dedicated drying bays. With Doorstep Mobile Wash, our fully-equipped service van brings clean softened water, electricity generators, and detailing gear right to your home driveway or workplace parking space!',
    },
    {
      question: 'How long does a typical detailing session take?',
      answer: 'Basic Wash takes roughly 30 minutes. Premium Detail takes around 60 minutes. Deluxe Spa & Shield takes approximately 90–105 minutes depending on vehicle size and optional add-ons selected.',
    },
    {
      question: 'What weather conditions permit Doorstep Mobile washing?',
      answer: 'We operate rain or shine! If there is heavy rainfall or severe weather, our mobile dispatch team will contact you 1 hour before your slot to offer a complimentary reschedule or transfer to our indoor facility.',
    },
    {
      question: 'How does the loyalty rewards points system ("Wash Perks") work?',
      answer: 'Every ₹100 you spend on PYPIRATES bookings earns you 10 Wash Perk points! Once you reach 350 points, you unlock a free Basic Wash coupon or ₹500 discount credit automatically applied to your next booking.',
    },
    {
      question: 'Can I cancel or modify my appointment after booking?',
      answer: 'Yes! You can modify your vehicle details, add extra services, or cancel your appointment free of charge up to 2 hours before your scheduled time slot directly from your "My Bookings" page.',
    },
  ];

  return (
    <section id="faq" className="py-16 bg-[#F8FAFC] border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#1E40AF] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to know about our car wash packages, doorstep mobile service, and rewards.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden transition-colors shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-base sm:text-lg text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#1E40AF] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
