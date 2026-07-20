'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Car,
  MapPin,
  Sparkles,
  Printer,
  QrCode,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
} from 'lucide-react';
import { useBooking } from '../../../context/BookingContext';

export default function ConfirmationPage() {
  const params = useParams();
  const id = params?.id as string;
  const { getBookingById } = useBooking();

  const booking = getBookingById(id);

  if (!booking) {
    return (
      <div className="min-h-[70vh] bg-[#F8FAFC] text-slate-900 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto text-[#1E40AF]">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Booking Reference Not Found</h1>
          <p className="text-sm text-slate-600">
            We couldn&apos;t locate booking reference <span className="font-mono text-[#1E40AF]">{id}</span>.
          </p>
          <div className="pt-4 flex justify-center space-x-3">
            <Link
              href="/history"
              className="px-5 py-2.5 rounded-full bg-[#1E40AF] font-bold text-xs text-white hover:bg-blue-800"
            >
              View Booking History
            </Link>
            <Link
              href="/booking"
              className="px-5 py-2.5 rounded-full bg-slate-200 font-bold text-xs text-slate-800 hover:bg-slate-300"
            >
              Book New Wash
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Animated Success Badge Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center mx-auto shadow-md animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#1E40AF] border border-blue-100">
              Booking Confirmed!
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 pt-2">
              You&apos;re All Set For a PYPIRATES Detailing
            </h1>
            <p className="text-slate-600 text-sm">
              Reference Code:{' '}
              <span className="font-mono font-extrabold text-[#1E40AF] text-base">{booking.referenceCode}</span>
            </p>
          </div>
        </div>

        {/* Main Confirmation Receipt Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Top Status & Pass Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl bg-blue-50 border border-blue-100 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-[#1E40AF]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Appointment Status</p>
                <p className="text-base font-extrabold text-[#1E40AF] capitalize">
                  {booking.status.replace('_', ' ')} • Technician: {booking.technicianName}
                </p>
              </div>
            </div>
            
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
            >
              <Printer className="w-4 h-4 text-[#1E40AF]" />
              <span>Print Pass</span>
            </button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Vehicle & Customer */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-2">
                Vehicle & Customer Info
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-start space-x-3">
                  <Car className="w-4 h-4 text-[#1E40AF] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900 text-sm">
                      {booking.vehicle.year} {booking.vehicle.make} {booking.vehicle.model}
                    </p>
                    <p className="text-slate-500">
                      Plate: <span className="font-mono text-slate-800">{booking.vehicle.plateNumber}</span> • {booking.vehicle.color} ({booking.vehicle.type})
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-1">
                  <ShieldCheck className="w-4 h-4 text-[#1E40AF] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">{booking.user.name}</p>
                    <p className="text-slate-500">{booking.user.email} • {booking.user.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment & Mode */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-2">
                Schedule & Location
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-[#1E40AF] shrink-0" />
                  <div>
                    <span className="text-slate-500 block">Date</span>
                    <span className="font-bold text-slate-900 text-sm">{booking.date}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-[#1E40AF] shrink-0" />
                  <div>
                    <span className="text-slate-500 block">Time Slot</span>
                    <span className="font-bold text-slate-900 text-sm">{booking.timeSlot}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#1E40AF] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-slate-500 block capitalize">
                      Mode: {booking.serviceMode === 'in_shop' ? 'In-Shop Station' : 'Mobile Doorstep'}
                    </span>
                    <span className="font-semibold text-slate-700">
                      {booking.serviceAddress || '742 Park Avenue, Koramangala, Bengaluru'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Pricing & Add-ons Summary */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base">Services Summary</h3>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-900 text-sm">
                <span>{booking.packageName}</span>
                <span>₹{booking.packagePrice}</span>
              </div>

              {booking.selectedAddOns.map((addon) => (
                <div key={addon.id} className="flex items-center justify-between text-slate-600">
                  <span>+ {addon.name} ({addon.category})</span>
                  <span className="text-slate-800">+₹{addon.price}</span>
                </div>
              ))}

              {booking.serviceMode === 'doorstep' && (
                <div className="flex items-center justify-between text-slate-600">
                  <span>Mobile Van Dispatch Fee</span>
                  <span className="text-slate-800">+₹150</span>
                </div>
              )}

              <div className="border-t border-slate-200 pt-3 flex items-center justify-between font-black text-slate-900 text-base">
                <span>Total Paid / Reserved</span>
                <span className="text-[#1E40AF] text-xl">₹{booking.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* QR Code Check-in Pass Card */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <QrCode className="w-5 h-5 text-[#1E40AF]" />
                <h4 className="font-extrabold text-slate-900 text-base">Express Pass Barcode</h4>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                Show this digital barcode when arriving at the station or when our mobile technician arrives.
              </p>
            </div>

            {/* Stylized QR Code */}
            <div className="w-28 h-28 p-2 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
              <div className="w-full h-full border-4 border-slate-900 grid grid-cols-4 gap-1 p-1">
                <div className="bg-slate-900" />
                <div className="bg-[#1E40AF]" />
                <div className="bg-slate-900" />
                <div className="bg-slate-900" />
                <div className="bg-slate-900" />
                <div className="bg-slate-900" />
                <div className="bg-[#1E40AF]" />
                <div className="bg-slate-900" />
                <div className="bg-[#1E40AF]" />
                <div className="bg-slate-900" />
                <div className="bg-slate-900" />
                <div className="bg-[#1E40AF]" />
                <div className="bg-slate-900" />
                <div className="bg-slate-900" />
                <div className="bg-slate-900" />
                <div className="bg-slate-900" />
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <Link
              href="/history"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-[#1E40AF] font-bold text-sm text-white hover:bg-blue-800 shadow-md"
            >
              <span>View In Booking History</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center space-x-2 text-xs text-slate-600">
              <PhoneCall className="w-4 h-4 text-[#1E40AF]" />
              <span>Need help? Call +91 800-PYPIRATES</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
