'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { CategorySelector } from '@/components/discovery/category-selector';
import { LivingBackground } from '@/components/3d/living-background';
import { Navigation } from '@/components/navigation/navigation';

export default function DiscoverPage() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      redirect('/login');
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-forest-dark flex items-center justify-center">
        <div className="text-cream">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forest-dark relative overflow-hidden">
      <LivingBackground />
      <Navigation />
      <CategorySelector />
    </div>
  );
}
