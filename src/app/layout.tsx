import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { BookingProvider } from '../context/BookingContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PYPIRATES | Professional Car Wash & Detailing Services',
  description: 'Experience the ultimate care for your vehicle. Premium car washing, paint restoration, interior detailing, and hydrophobic ceramic coatings.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 antialiased`}>
        <BookingProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}

