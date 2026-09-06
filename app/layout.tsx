import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'ADHIKAAR - Discovery. Verify. Reclaim.',
  description: 'Premium AI-powered unclaimed asset discovery and recovery platform. Discover forgotten assets. Verify ownership. Reclaim what\'s yours.',
  keywords: ['assets', 'unclaimed', 'discovery', 'recovery', 'verification', 'finance'],
  openGraph: {
    title: 'ADHIKAAR',
    description: 'Discover and recover your unclaimed assets',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-forest-dark text-cream antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
