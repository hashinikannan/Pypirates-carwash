import { WashPackage, AddOn, Booking, UserProfile, Vehicle } from '../types/booking';

export const INITIAL_PACKAGES: WashPackage[] = [
  {
    id: 'basic',
    name: 'Basic Wash',
    tagline: 'Quick & crisp exterior refresher',
    price: 499,
    duration: '30 mins',
    description: 'Perfect for routine maintenance washes to remove light dirt and restore exterior shine.',
    features: [
      'High-pressure pH-neutral foam wash',
      'Hand microfiber wash & micro-dry',
      'Wheel face wash & tire shine',
      'Exterior window & mirror wipe down',
      'Door jambs quick wipe',
    ],
    recommendedFor: 'Weekly maintenance & quick clean',
  },
  {
    id: 'premium',
    name: 'Premium Detail',
    tagline: 'Complete interior & exterior deep wash',
    price: 1499,
    duration: '60 mins',
    description: 'Our signature package! Restores pristine interior comfort and deep exterior glow.',
    popular: true,
    features: [
      'Everything in Basic Wash',
      'Deep interior cabin vacuuming',
      'Dashboard, console & door panel wipe down',
      'Wheel barrel & brake dust deep scrub',
      'Streak-free interior glass polish',
      'Tire gel protective coating',
      'Complimentary citrus air freshener',
    ],
    recommendedFor: 'Bi-weekly deep cleaning & commuting cars',
  },
  {
    id: 'deluxe',
    name: 'Deluxe Spa & Shield',
    tagline: 'Showroom finish with hydrophobic ceramic shield',
    price: 2999,
    duration: '105 mins',
    description: 'Ultimate showroom treatment including hydrophobic paint protection and interior steam sanitization.',
    features: [
      'Everything in Premium Detail',
      'Hydrophobic SiO2 ceramic sealant application',
      'Interior leather conditioning & upholstery steam clean',
      'Engine bay wipe & plastic dressing',
      'Carpet spot extraction & deodorizing',
      'Rain-X hydrophobic windshield treatment',
      'UV protectant on interior trim',
    ],
    recommendedFor: 'Luxury vehicles, pre-sale detailing & seasonal protection',
  },
];

export const INITIAL_ADDONS: AddOn[] = [
  {
    id: 'addon-pet-hair',
    name: 'Pet Hair Extraction',
    price: 399,
    description: 'Specialized rubber brushes & high-suction tools to lift stubborn pet hair.',
    duration: '15 mins',
    category: 'interior',
  },
  {
    id: 'addon-leather',
    name: 'Leather Conditioning & Hydration',
    price: 499,
    description: 'Nourishes leather seats to prevent cracking and restore soft natural texture.',
    duration: '15 mins',
    category: 'interior',
  },
  {
    id: 'addon-ceramic-boost',
    name: 'Ceramic Paint Shield Boost',
    price: 699,
    description: 'Adds up to 3 months of extreme gloss and hydrophobic water-beading protection.',
    duration: '20 mins',
    category: 'protection',
  },
  {
    id: 'addon-engine-bay',
    name: 'Engine Bay Deep Clean',
    price: 799,
    description: 'Degrease and detail engine compartment with protective thermal dressing.',
    duration: '25 mins',
    category: 'exterior',
  },
  {
    id: 'addon-windshield-repellent',
    name: 'Rain-X Glass Repellent',
    price: 349,
    description: 'Hydrophobic coating for all windows for superior rain visibility during storms.',
    duration: '10 mins',
    category: 'protection',
  },
  {
    id: 'addon-steam-sanitize',
    name: 'Odor & Bacterial Steam Sanitize',
    price: 599,
    description: 'High-temperature thermal steam kills 99.9% of bacteria and neutralizes persistent odors.',
    duration: '20 mins',
    category: 'interior',
  },
];

export const INITIAL_GARAGE: Vehicle[] = [];

export const INITIAL_USER: UserProfile = {
  name: 'New Customer',
  email: 'customer@pypirates.com',
  phone: '+91 98765 43210',
  defaultAddress: 'Enter your address',
  rewardsPoints: 0,
  vehicles: [],
};

export const INITIAL_BOOKINGS: Booking[] = [];
