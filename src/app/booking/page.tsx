'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  Sparkles,
  Zap,
  Building2,
  Car,
  MapPin,
  Truck,
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { PackageId, ServiceMode } from '../../types/booking';

function BookingFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { packages, addBooking, login } = useBooking();

  // Multi-step index (1: Personal & Vehicle Details, 2: Service & Schedule, 3: Review & Confirm)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [createdBookingId, setCreatedBookingId] = useState<string>('');

  // 1. Service Mode State ('in_shop' = Visit Service Center, 'doorstep' = Home Pickup & Drop)
  const [serviceMode, setServiceMode] = useState<ServiceMode>('doorstep');

  // Branch Locations for Visit Service Center
  const branches = [
    {
      id: 'branch-1',
      name: 'PYPIRATES Koramangala Flagship Workshop',
      address: '742 Park Avenue, 100 Ft Road, Koramangala 4th Block, Bengaluru - 560034',
      hours: '8:00 AM - 7:00 PM Daily',
    },
    {
      id: 'branch-2',
      name: 'PYPIRATES Indiranagar Care Center',
      address: '420 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru - 560038',
      hours: '8:00 AM - 7:00 PM Daily',
    },
    {
      id: 'branch-3',
      name: 'PYPIRATES Whitefield Auto Spa',
      address: '88 ITPL Main Road, Near Hope Farm Junction, Whitefield, Bengaluru - 560066',
      hours: '8:00 AM - 7:00 PM Daily',
    },
  ];
  const [selectedBranchId, setSelectedBranchId] = useState<string>(branches[0].id);

  // Customer & Vehicle Information
  const [fullName, setFullName] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [vehicleType, setVehicleType] = useState<string>('Sedan');
  const [vehicleModel, setVehicleModel] = useState<string>('');
  const [vehicleNumber, setVehicleNumber] = useState<string>('');

  const [serviceAddress, setServiceAddress] = useState<string>('');
  const [city, setCity] = useState<string>('Bengaluru');
  const [pinCode, setPinCode] = useState<string>('');

  // 2. Selection Choice
  const presetPkgParam = searchParams.get('package') as PackageId;
  const initialPkgId = (presetPkgParam && ['basic', 'premium', 'deluxe'].includes(presetPkgParam))
    ? presetPkgParam
    : 'premium';
  
  const [selectedPackageId, setSelectedPackageId] = useState<PackageId>(initialPkgId);
  
  const todayStr = new Date().toISOString().split('T')[0];
  const [bookingDate, setBookingDate] = useState<string>(todayStr);
  
  // Available slots
  const availableSlots = [
    '8:00–9:00 AM',
    '9:00–10:00 AM',
    '10:00–11:00 AM',
    '11:00–12:00 PM',
    '1:00–2:00 PM',
    '2:00–3:00 PM',
    '3:00–4:00 PM',
    '4:00–5:00 PM',
    '5:00–6:00 PM',
  ];

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('9:00–10:00 AM');

  // Active package details & branch details
  const activePackage = packages.find((p) => p.id === selectedPackageId) || packages[1];
  const activeBranch = branches.find((b) => b.id === selectedBranchId) || branches[0];
  const totalPrice = activePackage.price;

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedAddress = serviceMode === 'in_shop'
      ? `Visit Center: ${activeBranch.name} (${activeBranch.address})`
      : `Home Pickup Address: ${serviceAddress}, ${city} - ${pinCode}`;

    const created = addBooking({
      user: {
        name: fullName || 'Valued Customer',
        email: email || 'customer@pypirates.com',
        phone: mobileNumber || '+91 98765 43210',
      },
      vehicle: {
        id: `v-${Date.now()}`,
        make: vehicleModel.split(' ')[0] || 'Vehicle',
        model: vehicleModel || 'Model',
        year: '2024',
        plateNumber: vehicleNumber || 'KA01-PYP-100',
        color: 'Standard',
        type: vehicleType as any,
      },
      packageId: activePackage.id,
      packageName: activePackage.name,
      packagePrice: activePackage.price,
      selectedAddOns: [],
      serviceMode: serviceMode,
      serviceAddress: formattedAddress,
      date: bookingDate,
      timeSlot: selectedTimeSlot,
      totalAmount: totalPrice,
      paymentMethod: 'card',
      paymentStatus: 'paid',
      notes: `Service Mode: ${serviceMode === 'in_shop' ? 'Visit Service Center' : 'Home Pickup & Drop'}`,
    });

    if (fullName) {
      login(fullName, email, mobileNumber);
    }

    setCreatedBookingId(created.referenceCode);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#1E40AF] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast Online Booking</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Book Your PYPIRATES Detailing
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Choose your service mode, vehicle info, and preferred appointment slot.
          </p>
        </div>

        {/* Multi-step Progress Bar */}
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
          {[
            { step: 1, label: 'Mode & Vehicle' },
            { step: 2, label: 'Package & Slot' },
            { step: 3, label: 'Review & Confirm' },
          ].map((s) => {
            const isDone = currentStep > s.step;
            const isCurrent = currentStep === s.step;
            return (
              <div key={s.step} className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isDone
                      ? 'bg-[#1E40AF] text-white shadow-xs'
                      : isCurrent
                      ? 'bg-[#1E40AF] text-white ring-4 ring-blue-500/20'
                      : 'bg-white text-slate-400 border border-slate-200'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                </div>
                <span className={`mt-1.5 text-[11px] font-semibold text-center ${
                  isCurrent ? 'text-[#1E40AF]' : 'text-slate-500'
                }`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main Form Container */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm">
          
          {/* STEP 1: Service Mode Selection & Vehicle Details */}
          {currentStep === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Step 1: Choose Service Mode & Contact</h2>
                <p className="text-xs text-slate-500">Select whether you will visit our workshop or opt for doorstep home pickup & drop.</p>
              </div>

              {/* Service Mode Selection Radio Cards */}
              <div className="space-y-3">
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                  Select Service Mode *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Option 1: Visit Service Center */}
                  <div
                    onClick={() => setServiceMode('in_shop')}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start space-x-4 ${
                      serviceMode === 'in_shop'
                        ? 'bg-blue-50/70 border-[#1E40AF] ring-2 ring-blue-500/10'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      serviceMode === 'in_shop' ? 'bg-[#1E40AF] text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-slate-900 text-sm">1. Visit Service Center</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Drive your vehicle directly to our detailing workshop bay.
                      </p>
                    </div>
                  </div>

                  {/* Option 2: Home Pickup & Drop */}
                  <div
                    onClick={() => setServiceMode('doorstep')}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start space-x-4 ${
                      serviceMode === 'doorstep'
                        ? 'bg-blue-50/70 border-[#1E40AF] ring-2 ring-blue-500/10'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      serviceMode === 'doorstep' ? 'bg-[#1E40AF] text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Truck className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-slate-900 text-sm">2. Home Pickup & Drop</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Our valet team picks up your car from your doorstep and drops it back post-service.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Conditional Display Based on Service Mode */}
              {serviceMode === 'in_shop' ? (
                /* Visit Service Center Branch Selection */
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Select Branch Workshop Location *
                  </label>
                  <div className="space-y-2">
                    {branches.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => setSelectedBranchId(b.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                          selectedBranchId === b.id
                            ? 'bg-white border-[#1E40AF] shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${selectedBranchId === b.id ? 'text-[#1E40AF]' : 'text-slate-400'}`} />
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs">{b.name}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">{b.address}</p>
                          <span className="text-[10px] text-emerald-700 font-bold mt-1 block">{b.hours}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Home Pickup & Drop Address Inputs */
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pickup & Drop Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="House/Apartment No, Street, Apartment Name"
                      value={serviceAddress}
                      onChange={(e) => setServiceAddress(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-[#1E40AF] focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bengaluru, Mumbai, Delhi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-[#1E40AF] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">PIN Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 560034"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:border-[#1E40AF] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Personal Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#1E40AF] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#1E40AF] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#1E40AF] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Vehicle Type *</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#1E40AF] focus:bg-white focus:outline-none"
                  >
                    <option value="Hatchback">Hatchback</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV / Compact SUV</option>
                    <option value="Luxury">Luxury / Sports Car</option>
                    <option value="Coupe">Coupe / Convertible</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Vehicle Brand & Model *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tata Harrier / Honda City"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#1E40AF] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Vehicle Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. KA01-AB-1234"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#1E40AF] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center space-x-2 px-7 py-3 rounded-full bg-[#1E40AF] font-bold text-sm text-white hover:bg-blue-800 transition-all shadow-md"
                >
                  <span>Next: Choose Package & Slot</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Service Package, Date & Time Slot */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Step 2: Choose Service Package & Preferred Slot</h2>
                <p className="text-xs text-slate-500">Select your car wash package and pick an available time slot.</p>
              </div>

              {/* Package Selector */}
              <div className="space-y-3">
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                  Service Package:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {packages.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-blue-50/60 border-[#1E40AF] ring-2 ring-blue-500/10'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-extrabold text-slate-900 text-base">{pkg.name}</h3>
                          <span className="font-black text-[#1E40AF] text-lg">₹{pkg.price}</span>
                        </div>
                        <p className="text-xs text-slate-500">{pkg.tagline}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Date */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Preferred Date:
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full sm:w-64 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#1E40AF] focus:outline-none"
                />
              </div>

              {/* Preferred Time Slot Grid */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Available Time Slots:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {availableSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all text-center ${
                          isSelected
                            ? 'bg-[#1E40AF] text-white border-[#1E40AF] shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nav Buttons */}
              <div className="pt-6 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="inline-flex items-center space-x-1 px-5 py-2.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center space-x-2 px-7 py-3 rounded-full bg-[#1E40AF] font-bold text-sm text-white hover:bg-blue-800 shadow-md"
                >
                  <span>Review Before Confirmation</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: Review Before Confirmation */}
          {currentStep === 3 && (
            <form onSubmit={handleConfirmBooking} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Step 3: Review Booking Summary</h2>
                <p className="text-xs text-slate-500">Please review your service mode and details before confirmation.</p>
              </div>

              {/* Summary Cards */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
                
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="font-bold text-slate-500 uppercase">Service Mode</span>
                  <span className="font-extrabold text-slate-900 text-sm flex items-center space-x-1.5">
                    {serviceMode === 'in_shop' ? (
                      <>
                        <Building2 className="w-4 h-4 text-[#1E40AF]" />
                        <span>Visit Service Center</span>
                      </>
                    ) : (
                      <>
                        <Truck className="w-4 h-4 text-[#1E40AF]" />
                        <span>Home Pickup & Drop</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="font-bold text-slate-500 uppercase">Selected Package</span>
                  <span className="font-extrabold text-slate-900 text-base">{activePackage.name}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="font-bold text-slate-500 uppercase">Appointment Date</span>
                  <span className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-[#1E40AF]" />
                    <span>{bookingDate}</span>
                  </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="font-bold text-slate-500 uppercase">Appointment Time</span>
                  <span className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-[#1E40AF]" />
                    <span>{selectedTimeSlot}</span>
                  </span>
                </div>

                <div className="space-y-1 pb-3 border-b border-slate-200">
                  <span className="font-bold text-slate-500 uppercase block">Customer & Vehicle Details</span>
                  <p className="text-slate-800 font-medium">Name: <span className="font-bold text-slate-900">{fullName}</span> ({mobileNumber})</p>
                  <p className="text-slate-800 font-medium">Vehicle: <span className="font-bold text-slate-900">{vehicleModel}</span> ({vehicleType}) • <span className="font-mono">{vehicleNumber}</span></p>
                  {serviceMode === 'in_shop' ? (
                    <p className="text-slate-800 font-medium">Branch Location: <span className="font-bold text-[#1E40AF]">{activeBranch.name}</span> ({activeBranch.address})</p>
                  ) : (
                    <p className="text-slate-800 font-medium">Pickup Address: {serviceAddress}, {city} - {pinCode}</p>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="font-extrabold text-slate-900 uppercase text-sm">Total Price</span>
                  <span className="font-black text-2xl text-[#1E40AF]">₹{totalPrice}</span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="inline-flex items-center space-x-1 px-5 py-2.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Edit Details</span>
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#1E40AF] font-extrabold text-sm text-white hover:bg-blue-800 shadow-lg"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Confirm Booking (₹{totalPrice})</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

      {/* Booking Successful Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full text-center space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Booking Successful!</h2>
              <p className="text-xs text-slate-500 mt-1">Your car wash appointment has been scheduled.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <span className="text-slate-400 font-semibold block">Generated Booking ID:</span>
              <span className="text-xl font-mono font-black text-[#1E40AF]">{createdBookingId}</span>
              <p className="text-[11px] text-slate-500 pt-1">Saved automatically in your Booking History!</p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full py-3 rounded-full bg-[#1E40AF] font-bold text-xs text-white hover:bg-blue-800 shadow-md"
              >
                Go to Customer Dashboard
              </button>
              <button
                onClick={() => router.push('/history')}
                className="w-full py-3 rounded-full bg-slate-100 font-bold text-xs text-slate-700 hover:bg-slate-200"
              >
                View Booking History
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-8 text-slate-600 font-medium">
        Loading PYPIRATES Booking Engine...
      </div>
    }>
      <BookingFormContent />
    </Suspense>
  );
}
