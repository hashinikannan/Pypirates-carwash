'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Car,
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Plus,
  Lock,
  LogOut,
  Phone,
  Bell,
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function MyProfilePage() {
  const { userProfile, bookings, isAuthenticated, login, logout } = useBooking();

  // Form Inputs: Name & Mobile Number
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');

  const handleProfileLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !phoneInput.trim()) return;
    login(nameInput.trim(), `${nameInput.trim().toLowerCase().replace(/\s+/g, '')}@pypirates.com`, phoneInput.trim());
  };

  // Find active booking (in_progress, confirmed, ready)
  const activeBooking = bookings.find((b) =>
    ['confirmed', 'in_progress', 'ready', 'pending'].includes(b.status)
  );

  // Timeline steps definition
  const timelineSteps = [
    { key: 'confirmed', label: 'Booking Confirmed' },
    { key: 'received', label: 'Vehicle Received' },
    { key: 'washing', label: 'Washing' },
    { key: 'cleaning', label: 'Interior Cleaning' },
    { key: 'inspection', label: 'Quality Inspection' },
    { key: 'ready', label: 'Ready for Pickup' },
  ];

  // Calculate timeline index based on status
  const getTimelineIndex = (status?: string) => {
    switch (status) {
      case 'confirmed':
        return 1;
      case 'in_progress':
        return 3;
      case 'ready':
        return 5;
      case 'completed':
        return 6;
      default:
        return 0;
    }
  };

  const currentTimelineIndex = activeBooking ? getTimelineIndex(activeBooking.status) : 0;

  // 1. Render Name & Number Access Gate if NOT Authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1E40AF] mx-auto flex items-center justify-center shadow-xs">
              <User className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Access My Profile
            </h1>
            <p className="text-slate-500 text-xs">
              Please enter your name and mobile number to open your profile & track live bookings.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleProfileLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:bg-white focus:outline-none font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Mobile Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="Enter your 10-digit mobile number"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:bg-white focus:outline-none font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#1E40AF] hover:bg-blue-800 text-white font-extrabold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Access My Profile</span>
            </button>
          </form>

          <p className="text-[11px] text-slate-400 text-center">
            🔒 Protected by PYPIRATES Customer Profile System
          </p>

        </div>
      </div>
    );
  }

  // 2. Render Clean Customer Profile Page
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Customer Profile Banner (No Wash Perk Points Box) */}
        <div className="rounded-3xl bg-white border border-slate-100 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1E40AF] text-white font-black text-2xl flex items-center justify-center shadow-md overflow-hidden shrink-0 border-2 border-white">
              {userProfile.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Customer Profile: {userProfile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#1E40AF] border border-blue-100">
                  Verified Customer
                </span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#1E40AF]" />
                <span className="font-semibold text-slate-800">{userProfile.phone}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto justify-end pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
            <button
              onClick={logout}
              className="inline-flex items-center space-x-1.5 px-5 py-3 rounded-full font-bold text-xs text-rose-600 bg-rose-50 hover:bg-rose-100 transition-all border border-rose-100"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Notifications Bar */}
        <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center space-x-3 text-xs text-slate-700">
          <Bell className="w-5 h-5 text-[#1E40AF] shrink-0 animate-bounce" />
          <div className="flex-1">
            <span className="font-bold text-[#1E40AF]">Notifications: </span>
            {activeBooking ? (
              <span>Your order <strong>{activeBooking.referenceCode}</strong> is currently being serviced in Bay 1.</span>
            ) : (
              <span>No active alerts. Schedule your next car wash detailing service anytime.</span>
            )}
          </div>
        </div>

        {/* Current Booking & Live Service Progress */}
        <div className="rounded-3xl bg-white border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6">
          {activeBooking ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-[#1E40AF] border border-blue-100">
                      Current Booking Status: {activeBooking.status.toUpperCase()}
                    </span>
                    <span className="font-mono font-bold text-slate-500 text-xs">Ref: {activeBooking.referenceCode}</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                    {activeBooking.packageName}
                  </h2>
                </div>

                <div className="flex items-center space-x-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div className="text-center px-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Queue Number</span>
                    <span className="text-xl font-mono font-black text-[#1E40AF]">Q-001</span>
                  </div>
                  <div className="h-8 w-[1px] bg-slate-200" />
                  <div className="text-center px-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Est. Completion Time</span>
                    <span className="text-sm font-bold text-slate-900 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-[#1E40AF]" />
                      <span>15 Mins</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Progress Timeline Bar */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                  Service Progress Timeline:
                </h3>

                <div className="relative pt-2">
                  <div className="hidden md:grid grid-cols-6 gap-2 text-center relative z-10">
                    {timelineSteps.map((step, idx) => {
                      const stepNum = idx + 1;
                      const isCompleted = stepNum <= currentTimelineIndex;
                      const isCurrent = stepNum === currentTimelineIndex;

                      return (
                        <div key={step.key} className="flex flex-col items-center">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold transition-all ${
                              isCompleted
                                ? 'bg-[#1E40AF] text-white shadow-xs'
                                : isCurrent
                                ? 'bg-[#1E40AF] text-white ring-4 ring-blue-500/20'
                                : 'bg-slate-100 text-slate-400 border border-slate-200'
                            }`}
                          >
                            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : stepNum}
                          </div>
                          <span className={`mt-2 text-[11px] font-semibold leading-tight ${
                            isCurrent ? 'text-[#1E40AF] font-bold' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                          }`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1E40AF] mx-auto flex items-center justify-center font-bold">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">No Active Wash in Queue</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Schedule your detailing service to track live vehicle progress and queue status here.
              </p>
              <div className="pt-2">
                <Link
                  href="/booking"
                  className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-full font-bold text-xs text-white bg-[#1E40AF] hover:bg-blue-800 shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Book Detailing Service</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 2-Column Grid: Vehicle Details & Recommended Treatment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Vehicle Details Card */}
          <div className="lg:col-span-6 bg-white border border-slate-100 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
                <Car className="w-5 h-5 text-[#1E40AF]" />
                <span>Vehicle Details</span>
              </h3>
              <span className="text-xs text-slate-500 font-semibold">
                {userProfile.vehicles.length} Saved in Garage
              </span>
            </div>

            {userProfile.vehicles.length === 0 ? (
              <div className="p-6 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <Car className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs text-slate-600 font-semibold">No vehicle details saved yet.</p>
                <Link
                  href="/profile"
                  className="text-xs text-[#1E40AF] font-bold hover:underline block"
                >
                  + Add vehicle details
                </Link>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#1E40AF] flex items-center justify-center font-extrabold shrink-0">
                  <Car className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-extrabold text-slate-900 text-base">
                      {userProfile.vehicles[0].year} {userProfile.vehicles[0].make} {userProfile.vehicles[0].model}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Plate: <span className="font-mono text-slate-800 font-bold">{userProfile.vehicles[0].plateNumber}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Recommended Care Service Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-3xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-[#1E40AF] text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>Recommended Detailing Treatment</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Hydrophobic SiO2 Ceramic Shield</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Protect your vehicle clearcoat from rain spots, dust adhesion, and harsh sun rays with our signature ceramic shield treatment.
              </p>
            </div>

            <div className="pt-3 border-t border-blue-100 flex items-center justify-between">
              <span className="text-xs font-bold text-[#1E40AF]">Starting at ₹1,499</span>
              <Link
                href="/booking?package=premium"
                className="inline-flex items-center space-x-1 px-4 py-2 rounded-full bg-[#1E40AF] text-white text-xs font-bold hover:bg-blue-800 transition-colors"
              >
                <span>Book Treatment</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
