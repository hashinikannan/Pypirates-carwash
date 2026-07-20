export type VehicleType = 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Van' | 'Luxury';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  plateNumber: string;
  color: string;
  type: VehicleType;
  isDefault?: boolean;
}

export type PackageId = 'basic' | 'premium' | 'deluxe';

export interface WashPackage {
  id: PackageId;
  name: string;
  tagline: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  recommendedFor: string;
  popular?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: string;
  category: 'interior' | 'exterior' | 'protection';
}

export type ServiceMode = 'in_shop' | 'doorstep';

export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'ready' | 'completed' | 'cancelled';

export type PaymentMethod = 'card' | 'cash' | 'apple_pay' | 'google_pay';

export interface Booking {
  id: string;
  referenceCode: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
  vehicle: Vehicle;
  packageId: PackageId;
  packageName: string;
  packagePrice: number;
  selectedAddOns: AddOn[];
  serviceMode: ServiceMode;
  serviceAddress?: string;
  date: string;
  timeSlot: string;
  status: BookingStatus;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  technicianName?: string;
  notes?: string;
  rating?: number;
  review?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  defaultAddress: string;
  rewardsPoints: number;
  vehicles: Vehicle[];
}

export interface AdminStats {
  totalRevenue: number;
  activeBookings: number;
  completedToday: number;
  customerSatisfaction: number;
}
