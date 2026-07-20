'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MapPin, ChevronDown, User, ShieldCheck, LayoutDashboard } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDashboardDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Reviews', href: '/#reviews' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs text-slate-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo / Name */}
          <Link href="/" className="flex items-center group">
            <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-[#1E40AF] hover:text-blue-800 transition-colors">
              PYPIRATES
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => {
              const isActive = link.name === 'Home' ? pathname === '/' : false;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-[#1E40AF] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#1E40AF] after:rounded-full'
                      : 'text-slate-600 hover:text-[#1E40AF]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Near Location Button & Portal Dropdown */}
          <div className="flex items-center space-x-3">
            <Link
              href="/#contact"
              className="hidden sm:inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full font-semibold text-sm text-white bg-[#1E40AF] hover:bg-blue-800 shadow-sm shadow-blue-600/20 transition-all duration-200 active:scale-95"
            >
              <MapPin className="w-4 h-4" />
              <span>Near Location</span>
            </Link>

            {/* Dashboard & Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDashboardDropdownOpen(!dashboardDropdownOpen)}
                className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-full font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200"
              >
                <LayoutDashboard className="w-4 h-4 text-[#1E40AF]" />
                <span>Dashboard</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dashboardDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dashboardDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-100 shadow-xl py-2 z-50 animate-in fade-in-50 slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Portal
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setDashboardDropdownOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#1E40AF] hover:bg-blue-50/60 transition-colors"
                  >
                    <User className="w-4 h-4 text-[#1E40AF]" />
                    <div>
                      <span>My Profile</span>
                      <p className="text-[10px] text-slate-400 font-normal">View bookings & garage</p>
                    </div>
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setDashboardDropdownOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#1E40AF] hover:bg-blue-50/60 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#1E40AF]" />
                    <div>
                      <span>Admin Dashboard</span>
                      <p className="text-[10px] text-slate-400 font-normal">Manage bookings & status</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-[#1E40AF] hover:bg-slate-50 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 px-5 py-3 rounded-full font-bold text-slate-800 bg-slate-100"
            >
              <User className="w-4 h-4 text-[#1E40AF]" />
              <span>My Profile</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 px-5 py-3 rounded-full font-bold text-white bg-[#1E40AF]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
