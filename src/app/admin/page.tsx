'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Calendar,
  Wrench,
  Image as ImageIcon,
  MessageSquare,
  Mail,
  Lock,
  Key,
  LogOut,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  Plus,
  Clock,
  Sparkles,
  Phone,
  User,
  Car,
  Tag,
  Check,
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

const ADMIN_STORAGE_KEY = 'pypirates_admin_auth_v1';
const OFFICIAL_EMAIL_1 = 'pypirates.gmail.com';
const OFFICIAL_EMAIL_2 = 'pypirates@gmail.com';
const OFFICIAL_PASSWORD = '877847';

// Initial Contact Enquiries State
interface ContactEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  date: string;
  status: 'new' | 'completed';
}

const INITIAL_ENQUIRIES: ContactEnquiry[] = [
  {
    id: 'enq-101',
    name: 'Rajesh Sharma',
    phone: '+91 98112 33445',
    email: 'rajesh.sharma@example.com',
    message: 'Interested in ceramic coating for my new SUV. Please share slot availability for weekend.',
    date: '20 Jul 2026',
    status: 'new',
  },
  {
    id: 'enq-102',
    name: 'Meera Kapoor',
    phone: '+91 97788 11223',
    email: 'meera.k@example.com',
    message: 'Do you offer doorstep interior steam sanitization in Indiranagar area?',
    date: '19 Jul 2026',
    status: 'completed',
  },
];

// Initial Custom Gallery Items State
interface CustomGalleryItem {
  id: string;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

const INITIAL_GALLERY: CustomGalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Exterior Foam Wash',
    category: 'Exterior Wash',
    beforeImage: '/images/t1_after.png',
    afterImage: '/images/t1_after.png',
    description: 'Snow foam wash & microfiber dry.',
  },
  {
    id: 'gal-2',
    title: 'Ceramic Coating Shield',
    category: 'Ceramic Coating',
    beforeImage: '/images/ceramic_pro.png',
    afterImage: '/images/ceramic_pro.png',
    description: 'Hydrophobic SiO2 ceramic sealant.',
  },
  {
    id: 'gal-3',
    title: 'Interior Steam Spa',
    category: 'Interior Cleaning',
    beforeImage: '/images/interior_spa.png',
    afterImage: '/images/interior_spa.png',
    description: 'Thermal steam extraction & leather spa.',
  },
];

const SERVICE_STATUS_OPTIONS = [
  { label: 'Booking Confirmed', value: 'confirmed' },
  { label: 'Vehicle Received', value: 'received' },
  { label: 'Washing', value: 'washing' },
  { label: 'Interior Cleaning', value: 'cleaning' },
  { label: 'Drying', value: 'drying' },
  { label: 'Quality Inspection', value: 'inspection' },
  { label: 'Ready for Pickup', value: 'ready' },
  { label: 'Delivered', value: 'completed' },
];

const CATEGORY_OPTIONS = [
  'Exterior Wash',
  'Interior Cleaning',
  'Ceramic Coating',
  'Wheel Detailing',
  'Paint Protection',
  'Premium Detailing',
];

export default function AdminPage() {
  const { bookings, updateBookingStatus } = useBooking();
  
  // Admin Login State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Active Admin Tab (1: Booking Management, 2: Service Status, 3: Gallery, 4: Reviews, 5: Contact Requests)
  const [activeTab, setActiveTab] = useState<'bookings' | 'status' | 'gallery' | 'reviews' | 'enquiries'>('bookings');

  // Selected Booking Details Modal
  const [selectedBookingModal, setSelectedBookingModal] = useState<any | null>(null);

  // Contact Enquiries State
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>(INITIAL_ENQUIRIES);

  // Custom Gallery Items State
  const [galleryItems, setGalleryItems] = useState<CustomGalleryItem[]>(INITIAL_GALLERY);

  // Gallery Upload Form Inputs
  const [newImageTitle, setNewImageTitle] = useState('');
  const [newImageCategory, setNewImageCategory] = useState(CATEGORY_OPTIONS[0]);
  const [newBeforeImage, setNewBeforeImage] = useState('/images/t1_after.png');
  const [newAfterImage, setNewAfterImage] = useState('/images/hero.png');
  const [newImageDesc, setNewImageDesc] = useState('');

  // Initial Reviews List State (Empty for new company)
  const [reviewsList, setReviewsList] = useState<any[]>([]);

  // Sync saved Admin Login & LocalStorage items on mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (savedAuth) setIsAdminAuthenticated(JSON.parse(savedAuth));

      const savedEnquiries = localStorage.getItem('pypirates_enquiries');
      if (savedEnquiries) setEnquiries(JSON.parse(savedEnquiries));

      const savedGallery = localStorage.getItem('pypirates_gallery');
      if (savedGallery) setGalleryItems(JSON.parse(savedGallery));

      const savedReviews = localStorage.getItem('pypirates_admin_reviews_v2');
      if (savedReviews) setReviewsList(JSON.parse(savedReviews));
    } catch (e) {
      console.error('Error loading admin state from localStorage', e);
    }
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('pypirates_enquiries', JSON.stringify(enquiries));
      localStorage.setItem('pypirates_gallery', JSON.stringify(galleryItems));
      localStorage.setItem('pypirates_admin_reviews_v2', JSON.stringify(reviewsList));
    } catch (e) {
      console.error('Error saving admin state', e);
    }
  }, [enquiries, galleryItems, reviewsList]);

  // Login Handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const formattedEmail = emailInput.trim().toLowerCase();
    const formattedPassword = passwordInput.trim();

    if (
      (formattedEmail === OFFICIAL_EMAIL_1 || formattedEmail === OFFICIAL_EMAIL_2) &&
      formattedPassword === OFFICIAL_PASSWORD
    ) {
      setIsAdminAuthenticated(true);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(true));
    } else {
      setErrorMessage('Invalid Official Mail ID or Password. Please verify credentials.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  };

  // 1. Booking Actions
  const handleAcceptBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'confirmed' as any);
  };

  const handleRejectBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'cancelled' as any);
  };

  // 3. Gallery Upload Handler
  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageTitle.trim()) return;

    const newItem: CustomGalleryItem = {
      id: `gal-${Date.now()}`,
      title: newImageTitle.trim(),
      category: newImageCategory,
      beforeImage: newBeforeImage,
      afterImage: newAfterImage,
      description: newImageDesc.trim() || 'Professional car wash & detailing transformation.',
    };

    setGalleryItems([newItem, ...galleryItems]);
    setNewImageTitle('');
    setNewImageDesc('');
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGalleryItems(galleryItems.filter((g) => g.id !== id));
  };

  // 4. Review Delete Handler
  const handleDeleteReview = (id: string) => {
    setReviewsList(reviewsList.filter((r) => r.id !== id));
  };

  // 5. Contact Request Mark Completed Handler
  const handleMarkEnquiryCompleted = (id: string) => {
    setEnquiries(
      enquiries.map((e) => (e.id === id ? { ...e, status: 'completed' } : e))
    );
  };

  // Render Admin Login Screen if not authenticated
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#1E40AF] mx-auto flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              PYPIRATES Admin Login
            </h1>
            <p className="text-slate-500 text-xs">
              Enter official email ID and administrator password to manage operations.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Official Mail ID *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="pypirates.gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:bg-white focus:outline-none font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Admin Password *</label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Enter admin password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:bg-white focus:outline-none font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#1E40AF] hover:bg-blue-800 text-white font-extrabold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Sign In to Admin Panel</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Clean Minimal Admin Dashboard
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      
      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E40AF] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg text-slate-900 leading-none">PYPIRATES Admin</h1>
              <p className="text-[11px] text-slate-500 mt-0.5">Control Panel • pypirates.gmail.com</p>
            </div>
          </div>

          <button
            onClick={handleAdminLogout}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>

        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs Bar (5 Modules Only) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          {[
            { id: 'bookings', label: '1. Booking Management', icon: Calendar },
            { id: 'status', label: '2. Service Status', icon: Wrench },
            { id: 'gallery', label: '3. Gallery Management', icon: ImageIcon },
            { id: 'reviews', label: '4. Review Management', icon: MessageSquare },
            { id: 'enquiries', label: '5. Contact Requests', icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                  isSelected
                    ? 'bg-[#1E40AF] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* MODULE 1: BOOKING MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-xl font-extrabold text-slate-900">1. Booking Management</h2>
              <p className="text-xs text-slate-500">View customer bookings, accept or reject requests, and view details.</p>
            </div>

            {bookings.length === 0 ? (
              <div className="p-10 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <Calendar className="w-8 h-8 text-[#1E40AF] mx-auto" />
                <h3 className="font-bold text-slate-900 text-sm">No Bookings Found</h3>
                <p className="text-xs text-slate-500">Incoming bookings will appear here in real-time.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Booking ID</th>
                      <th className="py-3 px-4">Customer Name</th>
                      <th className="py-3 px-4">Phone Number</th>
                      <th className="py-3 px-4">Vehicle Name</th>
                      <th className="py-3 px-4">Vehicle Number</th>
                      <th className="py-3 px-4">Selected Service</th>
                      <th className="py-3 px-4">Booking Date & Time</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 px-4 font-mono font-bold text-[#1E40AF]">
                          {b.referenceCode}
                        </td>
                        <td className="py-4 px-4 font-bold text-slate-900">{b.user.name}</td>
                        <td className="py-4 px-4">{b.user.phone}</td>
                        <td className="py-4 px-4 font-semibold">{b.vehicle.make} {b.vehicle.model}</td>
                        <td className="py-4 px-4 font-mono text-slate-600">{b.vehicle.plateNumber}</td>
                        <td className="py-4 px-4 font-bold text-slate-900">{b.packageName}</td>
                        <td className="py-4 px-4">
                          <p className="font-medium text-slate-900">{b.date}</p>
                          <p className="text-slate-400 text-[11px]">{b.timeSlot}</p>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                            b.status === 'pending'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : b.status === 'cancelled'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : b.status === 'ready' || b.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-blue-50 text-[#1E40AF] border-blue-200'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right space-x-2">
                          {b.status === 'pending' ? (
                            <>
                              <button
                                onClick={() => handleAcceptBooking(b.id)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors shadow-xs"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleRejectBooking(b.id)}
                                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] transition-colors shadow-xs"
                              >
                                Reject
                              </button>
                            </>
                          ) : b.status === 'cancelled' ? (
                            <span className="inline-block px-3 py-1 rounded-lg bg-rose-100 text-rose-800 font-bold text-[11px]">
                              Rejected
                            </span>
                          ) : (
                            <span className="inline-block px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                              Accepted
                            </span>
                          )}

                          <button
                            onClick={() => setSelectedBookingModal(b)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] transition-colors"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* MODULE 2: SERVICE STATUS MANAGEMENT */}
        {activeTab === 'status' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-xl font-extrabold text-slate-900">2. Service Status Management</h2>
              <p className="text-xs text-slate-500">Update vehicle washing progress for accepted orders. Automatically synced with Customer Dashboard.</p>
            </div>

            {bookings.filter((b) => b.status !== 'pending' && b.status !== 'cancelled').length === 0 ? (
              <div className="p-10 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <Wrench className="w-8 h-8 text-[#1E40AF] mx-auto" />
                <h3 className="font-bold text-slate-900 text-sm">No Accepted Vehicles in Service</h3>
                <p className="text-xs text-slate-500">Accept incoming customer bookings under &quot;1. Booking Management&quot; to update their live service status.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings
                  .filter((b) => b.status !== 'pending' && b.status !== 'cancelled')
                  .map((b) => (
                    <div
                      key={b.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-[#1E40AF] text-xs">{b.referenceCode}</span>
                          <h3 className="font-extrabold text-slate-900 text-base">{b.vehicle.make} {b.vehicle.model} ({b.vehicle.plateNumber})</h3>
                        </div>
                        <p className="text-xs text-slate-600">
                          Customer: <span className="font-bold">{b.user.name}</span> • Service: <span className="font-bold text-[#1E40AF]">{b.packageName}</span>
                        </p>
                      </div>

                      <div className="flex items-center space-x-3 w-full md:w-auto">
                        <label className="text-xs font-bold text-slate-700 whitespace-nowrap">Current Status:</label>
                        <select
                          value={b.status}
                          onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                          className="w-full md:w-64 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-extrabold text-slate-900 focus:border-[#1E40AF] focus:outline-none"
                        >
                          {SERVICE_STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* MODULE 3: GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            
            {/* Upload Gallery Form */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="pb-4 border-b border-slate-100">
                <h2 className="text-xl font-extrabold text-slate-900">3. Gallery Management</h2>
                <p className="text-xs text-slate-500">Upload Before & After photos or new gallery items. Automatically displayed on Gallery page.</p>
              </div>

              <form onSubmit={handleAddGalleryItem} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Service Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ceramic Protection Polish"
                      value={newImageTitle}
                      onChange={(e) => setNewImageTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Select Category *</label>
                    <select
                      value={newImageCategory}
                      onChange={(e) => setNewImageCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:outline-none font-medium"
                    >
                      {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Before Image URL *</label>
                    <input
                      type="text"
                      required
                      placeholder="/images/t1_after.png or image URL"
                      value={newBeforeImage}
                      onChange={(e) => setNewBeforeImage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">After Image URL *</label>
                    <input
                      type="text"
                      required
                      placeholder="/images/hero.png or image URL"
                      value={newAfterImage}
                      onChange={(e) => setNewAfterImage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Description</label>
                  <input
                    type="text"
                    placeholder="Short description of the service transformation"
                    value={newImageDesc}
                    onChange={(e) => setNewImageDesc(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#1E40AF] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#1E40AF] text-white font-bold text-xs hover:bg-blue-800 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload & Publish to Gallery</span>
                </button>
              </form>
            </div>

            {/* Existing Gallery List */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="font-extrabold text-slate-900 text-base">Published Gallery Items ({galleryItems.length})</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {galleryItems.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-[#1E40AF]">
                        {item.category}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteGalleryItem(item.id)}
                      className="w-full py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs flex items-center justify-center space-x-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Photo</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* MODULE 4: REVIEW MANAGEMENT */}
        {activeTab === 'reviews' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-xl font-extrabold text-slate-900">4. Review Management</h2>
              <p className="text-xs text-slate-500">View customer reviews and delete inappropriate submissions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reviewsList.map((r) => (
                <div key={r.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-slate-900 text-sm">{r.name}</h3>
                      <span className="text-[11px] text-amber-500 font-bold">★ {r.rating}.0</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{r.car} • {r.date}</p>
                    <p className="text-xs text-slate-600 italic leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                  </div>

                  <button
                    onClick={() => handleDeleteReview(r.id)}
                    className="w-full py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs flex items-center justify-center space-x-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Inappropriate Review</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 5: CONTACT REQUESTS */}
        {activeTab === 'enquiries' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-xl font-extrabold text-slate-900">5. Contact Requests & Customer Enquiries</h2>
              <p className="text-xs text-slate-500">Manage customer messages and mark enquiries as completed.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Customer Name</th>
                    <th className="py-3 px-4">Phone Number</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Message</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {enquiries.map((e) => (
                    <tr key={e.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-900">{e.name}</td>
                      <td className="py-4 px-4">{e.phone}</td>
                      <td className="py-4 px-4">{e.email}</td>
                      <td className="py-4 px-4 font-medium text-slate-800 max-w-xs">{e.message}</td>
                      <td className="py-4 px-4 text-slate-500">{e.date}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                          e.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        {e.status === 'new' ? (
                          <button
                            onClick={() => handleMarkEnquiryCompleted(e.id)}
                            className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center space-x-1 ml-auto"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Mark Completed</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-semibold italic">Resolved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Booking Details Modal */}
      {selectedBookingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-lg">
                Booking Details ({selectedBookingModal.referenceCode})
              </h3>
              <button
                onClick={() => setSelectedBookingModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <p><span className="font-bold text-slate-900">Customer:</span> {selectedBookingModal.user.name} ({selectedBookingModal.user.phone})</p>
              <p><span className="font-bold text-slate-900">Email:</span> {selectedBookingModal.user.email}</p>
              <p><span className="font-bold text-slate-900">Vehicle:</span> {selectedBookingModal.vehicle.make} {selectedBookingModal.vehicle.model} ({selectedBookingModal.vehicle.plateNumber})</p>
              <p><span className="font-bold text-slate-900">Service Package:</span> {selectedBookingModal.packageName} (₹{selectedBookingModal.totalAmount})</p>
              <p><span className="font-bold text-slate-900">Schedule:</span> {selectedBookingModal.date} at {selectedBookingModal.timeSlot}</p>
              <p><span className="font-bold text-slate-900">Address:</span> {selectedBookingModal.serviceAddress || 'In-Shop Station'}</p>
              <p><span className="font-bold text-slate-900">Notes:</span> {selectedBookingModal.notes || 'None'}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedBookingModal(null)}
                className="px-5 py-2.5 rounded-full bg-[#1E40AF] text-white font-bold text-xs"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
