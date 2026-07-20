'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Car,
  Search,
  CheckCircle2,
  Sparkles,
  Star,
  ChevronRight,
  RefreshCw,
  XCircle,
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { BookingStatus, Booking } from '../../types/booking';

export default function HistoryPage() {
  const { bookings, cancelBooking, rateBooking } = useBooking();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Rating Modal state
  const [ratingBookingId, setRatingBookingId] = useState<string | null>(null);
  const [ratingScore, setRatingScore] = useState<number>(5);
  const [reviewText, setReviewText] = useState<string>('');

  const filteredBookings = bookings.filter((b) => {
    // Tab Filter
    if (activeTab === 'active') {
      if (!['confirmed', 'in_progress', 'ready', 'pending'].includes(b.status)) return false;
    } else if (activeTab === 'completed') {
      if (b.status !== 'completed') return false;
    } else if (activeTab === 'cancelled') {
      if (b.status !== 'cancelled') return false;
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchRef = b.referenceCode.toLowerCase().includes(q);
      const matchPlate = b.vehicle.plateNumber.toLowerCase().includes(q);
      const matchModel = `${b.vehicle.make} ${b.vehicle.model}`.toLowerCase().includes(q);
      const matchPkg = b.packageName.toLowerCase().includes(q);
      return matchRef || matchPlate || matchModel || matchPkg;
    }

    return true;
  });

  const handleOpenRatingModal = (booking: Booking) => {
    setRatingBookingId(booking.id);
    setRatingScore(booking.rating || 5);
    setReviewText(booking.review || '');
  };

  const handleSaveRating = (e: React.FormEvent) => {
    e.preventDefault();
    if (ratingBookingId) {
      rateBooking(ratingBookingId, ratingScore, reviewText);
      setRatingBookingId(null);
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'in_progress':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Wash In Progress</span>
          </span>
        );
      case 'ready':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Ready For Pickup</span>
          </span>
        );
      case 'confirmed':
      case 'pending':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#1E40AF] border border-blue-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Confirmed</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1E40AF]" />
            <span>Completed</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#1E40AF] text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Customer Portal</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Booking History</h1>
            <p className="text-slate-600 text-sm">Track active wash progress, view past receipts, and leave service reviews.</p>
          </div>

          <Link
            href="/booking"
            className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-[#1E40AF] font-bold text-sm text-white hover:bg-blue-800 shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book New Car Wash</span>
          </Link>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white border border-slate-100 p-4 rounded-2xl shadow-xs">
          
          {/* Tabs */}
          <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto">
            {[
              { id: 'all', label: 'All Bookings' },
              { id: 'active', label: 'Active & Upcoming' },
              { id: 'completed', label: 'Completed' },
              { id: 'cancelled', label: 'Cancelled' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1E40AF] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reference, vehicle, or package..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-72 pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:border-[#1E40AF] focus:outline-none"
            />
          </div>

        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-100 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Bookings Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No wash appointments match your current filter or search criteria.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-md transition-all shadow-xs space-y-6"
              >
                {/* Card Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1E40AF]">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-black text-[#1E40AF] text-sm">{b.referenceCode}</span>
                        <span className="text-xs text-slate-400">• Booked on {new Date(b.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-base">
                        {b.vehicle.year} {b.vehicle.make} {b.vehicle.model} ({b.vehicle.plateNumber})
                      </h3>
                    </div>
                  </div>

                  <div>{getStatusBadge(b.status)}</div>
                </div>

                {/* Progress Status Bar for Active Appointments */}
                {['confirmed', 'in_progress', 'ready'].includes(b.status) && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Service Timeline Progress</span>
                      <span className="text-[#1E40AF] font-mono">Specialist: {b.technicianName}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className={`h-2 rounded-full ${['confirmed', 'in_progress', 'ready'].includes(b.status) ? 'bg-[#1E40AF]' : 'bg-slate-200'}`} />
                      <div className={`h-2 rounded-full ${['in_progress', 'ready'].includes(b.status) ? 'bg-[#1E40AF] animate-pulse' : 'bg-slate-200'}`} />
                      <div className={`h-2 rounded-full ${b.status === 'ready' ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-500 font-medium pt-1">
                      <span>1. Confirmed</span>
                      <span>2. Foam Wash & Detailing</span>
                      <span>3. Ready for Drive</span>
                    </div>
                  </div>
                )}

                {/* Details Breakdown Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 block font-semibold uppercase">Package & Addons</span>
                    <p className="font-extrabold text-slate-900 text-sm">{b.packageName} (₹{b.packagePrice})</p>
                    {b.selectedAddOns.length > 0 && (
                      <p className="text-slate-500">
                        Addons: {b.selectedAddOns.map((a) => a.name).join(', ')}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 block font-semibold uppercase">Date & Mode</span>
                    <p className="font-bold text-slate-900">{b.date} @ {b.timeSlot}</p>
                    <p className="text-slate-500 capitalize">
                      {b.serviceMode === 'in_shop' ? 'In-Shop Drop-off' : `Doorstep: ${b.serviceAddress}`}
                    </p>
                  </div>

                  <div className="space-y-1 text-left md:text-right">
                    <span className="text-slate-400 block font-semibold uppercase">Total Amount</span>
                    <p className="font-black text-[#1E40AF] text-xl">₹{b.totalAmount}</p>
                    <p className="text-slate-500 uppercase">Paid via {b.paymentMethod.replace('_', ' ')}</p>
                  </div>
                </div>

                {/* Review if completed */}
                {b.status === 'completed' && b.rating && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-3 text-xs">
                    <div className="flex text-amber-400">
                      {[...Array(b.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-600 italic">&ldquo;{b.review}&rdquo;</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <Link
                    href={`/confirmation/${b.referenceCode}`}
                    className="inline-flex items-center space-x-1.5 text-[#1E40AF] hover:text-blue-800 font-bold"
                  >
                    <span>View Digital Pass & Receipt</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center space-x-2">
                    {/* Cancellation Button */}
                    {['confirmed', 'pending'].includes(b.status) && (
                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="px-3.5 py-2 rounded-full bg-rose-100 hover:bg-rose-200 border border-rose-200 text-rose-700 font-bold"
                      >
                        Cancel Appointment
                      </button>
                    )}

                    {/* Rate Wash Button */}
                    {b.status === 'completed' && !b.rating && (
                      <button
                        onClick={() => handleOpenRatingModal(b)}
                        className="px-3.5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-white font-extrabold"
                      >
                        ★ Rate Service
                      </button>
                    )}

                    {/* Re-book Button */}
                    {['completed', 'cancelled'].includes(b.status) && (
                      <Link
                        href={`/booking?package=${b.packageId}`}
                        className="inline-flex items-center space-x-1 px-4 py-2 rounded-full bg-[#1E40AF] hover:bg-blue-800 text-white font-bold"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Re-book Wash</span>
                      </Link>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Rating Modal */}
        {ratingBookingId && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-xl animate-in zoom-in-95 duration-200">
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-slate-900">Rate Your Detailing Experience</h3>
                <p className="text-xs text-slate-500">Your feedback helps our detailers maintain showroom standards.</p>
              </div>

              <form onSubmit={handleSaveRating} className="space-y-4">
                {/* Star Selector */}
                <div className="flex items-center justify-center space-x-2 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatingScore(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= ratingScore
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Feedback</label>
                  <textarea
                    rows={3}
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Tell us what you loved about the foam wash or detailing!"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-[#1E40AF] focus:outline-none"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setRatingBookingId(null)}
                    className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#1E40AF] font-bold text-xs text-white hover:bg-blue-800 shadow-md"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
