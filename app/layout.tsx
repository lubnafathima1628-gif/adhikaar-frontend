import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { LivingBackground } from '@/components/3d/living-background';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ADHIKAAR - Discover. Verify. Reclaim.',
  description: 'Discover and reclaim your unclaimed assets. Simplified recovery process with AI assistance.',
  keywords: ['unclaimed assets', 'recovery', 'verification', 'IEPF', 'EPF', 'insurance'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-forest-dark text-cream overflow-x-hidden`}>
        <div className="relative min-h-screen">
          {/* Animated 3D Background */}
          <LivingBackground />
          
          {/* Content */}
          <div className="relative z-20">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
