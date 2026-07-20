'use client';

import React, { useState } from 'react';
import {
  User,
  Car,
  Award,
  Plus,
  Trash2,
  Edit2,
  Save,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { VehicleType } from '../../types/booking';

export default function ProfilePage() {
  const { userProfile, updateProfile, addVehicle, deleteVehicle } = useBooking();

  // Edit Profile Form state
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [defaultAddress, setDefaultAddress] = useState(userProfile.defaultAddress);

  // Add Vehicle Modal state
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState<{
    make: string;
    model: string;
    year: string;
    plateNumber: string;
    color: string;
    type: VehicleType;
  }>({
    make: '',
    model: '',
    year: '2024',
    plateNumber: '',
    color: '',
    type: 'Sedan',
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone, defaultAddress });
    setIsEditing(false);
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicle.make || !newVehicle.model || !newVehicle.plateNumber) return;

    addVehicle(newVehicle);
    setShowAddVehicleModal(false);
    setNewVehicle({
      make: '',
      model: '',
      year: '2024',
      plateNumber: '',
      color: '',
      type: 'Sedan',
    });
  };

  // Loyalty rewards calculations
  const currentPoints = userProfile.rewardsPoints;
  const targetPoints = 500;
  const pointsPercentage = Math.min(100, Math.floor((currentPoints / targetPoints) * 100));

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#1E40AF] text-xs font-bold uppercase tracking-wider mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Customer Account</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Profile & Garage</h1>
          <p className="text-slate-600 text-sm">Manage your vehicle garage, update doorstep addresses, and track Wash Perks loyalty points.</p>
        </div>

        {/* Top Loyalty Rewards Banner */}
        <div className="rounded-3xl bg-white border border-slate-100 p-6 sm:p-8 shadow-sm space-y-4 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-[#1E40AF] text-white flex items-center justify-center shadow-md">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-extrabold text-slate-900">Wash Perks Tier: GOLD</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-400 text-slate-900">
                    VIP Member
                  </span>
                </div>
                <p className="text-xs text-slate-500">Earn 10 points for every ₹100 spent on auto detailing.</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-4xl font-black text-[#1E40AF]">{currentPoints}</span>
              <span className="text-xs text-slate-500 block font-medium">Earned Points Balance</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 pt-2 relative z-10">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Next Reward: Free Basic Wash / ₹500 Credit</span>
              <span className="text-[#1E40AF]">{currentPoints} / {targetPoints} pts ({pointsPercentage}%)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
              <div
                className="h-full bg-[#1E40AF] transition-all duration-500"
                style={{ width: `${pointsPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Personal Information Form Card */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm h-fit">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center space-x-2">
                <User className="w-5 h-5 text-[#1E40AF]" />
                <span>Personal Details</span>
              </h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-[#1E40AF] hover:text-blue-800"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900"
                >
                  Cancel
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-[#1E40AF] shrink-0" />
                  <div>
                    <span className="text-slate-400 block">Full Name</span>
                    <span className="font-bold text-slate-900 text-sm">{userProfile.name}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#1E40AF] shrink-0" />
                  <div>
                    <span className="text-slate-400 block">Email Address</span>
                    <span className="font-bold text-slate-900 text-sm">{userProfile.email}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#1E40AF] shrink-0" />
                  <div>
                    <span className="text-slate-400 block">Phone Number</span>
                    <span className="font-bold text-slate-900 text-sm">{userProfile.phone}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-2 border-t border-slate-100">
                  <MapPin className="w-4 h-4 text-[#1E40AF] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block">Default Doorstep Address</span>
                    <span className="font-semibold text-slate-800">{userProfile.defaultAddress}</span>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Default Doorstep Address</label>
                  <textarea
                    rows={2}
                    value={defaultAddress}
                    onChange={(e) => setDefaultAddress(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-[#1E40AF] font-bold text-xs text-white hover:bg-blue-800 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile</span>
                </button>
              </form>
            )}

          </div>

          {/* My Garage Vehicles Manager */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg flex items-center space-x-2">
                  <Car className="w-5 h-5 text-[#1E40AF]" />
                  <span>My Garage ({userProfile.vehicles.length})</span>
                </h3>
                <p className="text-xs text-slate-500">Manage saved vehicles for quick 1-click booking.</p>
              </div>

              <button
                onClick={() => setShowAddVehicleModal(true)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-[#1E40AF] text-xs font-bold text-white hover:bg-blue-800 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Vehicle</span>
              </button>
            </div>

            {/* Garage Vehicles List */}
            <div className="space-y-4">
              {userProfile.vehicles.map((v) => (
                <div
                  key={v.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1E40AF] shrink-0">
                      <Car className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-extrabold text-slate-900 text-base">
                          {v.year} {v.make} {v.model}
                        </h4>
                        {v.isDefault && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-[#1E40AF] border border-blue-200">
                            Primary Car
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        License Plate: <span className="text-slate-800 font-mono font-bold">{v.plateNumber}</span> • {v.color} ({v.type})
                      </p>
                    </div>
                  </div>

                  {/* Delete vehicle button if more than 1 vehicle */}
                  {userProfile.vehicles.length > 1 && (
                    <button
                      onClick={() => deleteVehicle(v.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Remove Vehicle"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Add Vehicle Modal */}
        {showAddVehicleModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-xl animate-in zoom-in-95 duration-200">
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-slate-900">Add Vehicle to Garage</h3>
                <p className="text-xs text-slate-500">Save vehicle details to streamline future car wash appointments.</p>
              </div>

              <form onSubmit={handleAddVehicle} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold uppercase mb-1">Make</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tata"
                      value={newVehicle.make}
                      onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold uppercase mb-1">Model</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Harrier"
                      value={newVehicle.model}
                      onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold uppercase mb-1">Year</label>
                    <input
                      type="text"
                      required
                      placeholder="2024"
                      value={newVehicle.year}
                      onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold uppercase mb-1">License Plate</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. KA01-AB-1234"
                      value={newVehicle.plateNumber}
                      onChange={(e) => setNewVehicle({ ...newVehicle, plateNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold uppercase mb-1">Color</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Daytona Grey"
                      value={newVehicle.color}
                      onChange={(e) => setNewVehicle({ ...newVehicle, color: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold uppercase mb-1">Body Type</label>
                    <select
                      value={newVehicle.type}
                      onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value as VehicleType })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:outline-none"
                    >
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV / Crossover</option>
                      <option value="Truck">Truck / Pickup</option>
                      <option value="Coupe">Coupe / Convertible</option>
                      <option value="Van">Van / Minivan</option>
                      <option value="Luxury">Luxury / Sports Car</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddVehicleModal(false)}
                    className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#1E40AF] font-bold text-xs text-white hover:bg-blue-800 shadow-md"
                  >
                    Add to Garage
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
