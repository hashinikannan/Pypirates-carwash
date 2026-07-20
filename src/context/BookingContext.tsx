'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Booking,
  BookingStatus,
  UserProfile,
  WashPackage,
  AddOn,
  Vehicle,
} from '../types/booking';
import {
  INITIAL_BOOKINGS,
  INITIAL_USER,
  INITIAL_PACKAGES,
  INITIAL_ADDONS,
} from '../data/mockData';

interface BookingContextType {
  bookings: Booking[];
  userProfile: UserProfile;
  isAuthenticated: boolean;
  packages: WashPackage[];
  addOns: AddOn[];
  login: (name: string, email: string, phone?: string) => void;
  signup: (name: string, email: string, phone: string) => void;
  logout: () => void;
  addBooking: (bookingData: Omit<Booking, 'id' | 'referenceCode' | 'createdAt' | 'status'>) => Booking;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  deleteVehicle: (id: string) => void;
  updateProfile: (profileData: Partial<UserProfile>) => void;
  getBookingById: (id: string) => Booking | undefined;
  cancelBooking: (id: string) => void;
  rateBooking: (id: string, rating: number, review: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const LOCAL_STORAGE_BOOKINGS_KEY = 'pypirates_carwash_bookings_v7';
const LOCAL_STORAGE_USER_KEY = 'pypirates_carwash_user_v7';
const LOCAL_STORAGE_AUTH_KEY = 'pypirates_carwash_auth_v7';

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Sync with LocalStorage on mount
  useEffect(() => {
    try {
      const savedBookings = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
      const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      const savedAuth = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }

      if (savedUser) {
        setUserProfile(JSON.parse(savedUser));
      }

      if (savedAuth) {
        setIsAuthenticated(JSON.parse(savedAuth));
      }
    } catch (e) {
      console.error('Error reading from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userProfile));
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(isAuthenticated));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }, [bookings, userProfile, isAuthenticated, isLoaded]);

  const login = (name: string, email: string, phone?: string) => {
    setUserProfile((prev) => ({
      ...prev,
      name: name || 'Valued Customer',
      email: email || prev.email,
      phone: phone || prev.phone,
    }));
    setIsAuthenticated(true);
  };

  const signup = (name: string, email: string, phone: string) => {
    setUserProfile({
      name: name,
      email: email,
      phone: phone,
      defaultAddress: '',
      rewardsPoints: 0,
      vehicles: [],
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  };

  const addBooking = (
    bookingData: Omit<Booking, 'id' | 'referenceCode' | 'createdAt' | 'status'>
  ): Booking => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      referenceCode: `PYP-${randomNum}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      technicianName: 'Assigned Wash Specialist',
    };

    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id || b.referenceCode === id ? { ...b, status } : b))
    );
  };

  const cancelBooking = (id: string) => {
    updateBookingStatus(id, 'cancelled');
  };

  const rateBooking = (id: string, rating: number, review: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, rating, review } : b))
    );
  };

  const addVehicle = (vehicleData: Omit<Vehicle, 'id'>) => {
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: `v-${Date.now()}`,
    };

    setUserProfile((prev) => {
      const updatedVehicles = [...prev.vehicles, newVehicle];
      return { ...prev, vehicles: updatedVehicles };
    });
  };

  const deleteVehicle = (id: string) => {
    setUserProfile((prev) => ({
      ...prev,
      vehicles: prev.vehicles.filter((v) => v.id !== id),
    }));
  };

  const updateProfile = (profileData: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profileData }));
  };

  const getBookingById = (id: string): Booking | undefined => {
    return bookings.find(
      (b) => b.id === id || b.referenceCode.toLowerCase() === id.toLowerCase()
    );
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        userProfile,
        isAuthenticated,
        packages: INITIAL_PACKAGES,
        addOns: INITIAL_ADDONS,
        login,
        signup,
        logout,
        addBooking,
        updateBookingStatus,
        addVehicle,
        deleteVehicle,
        updateProfile,
        getBookingById,
        cancelBooking,
        rateBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
