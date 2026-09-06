'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { LivingBackground } from '@/components/3d/living-background';
import { Navigation } from '@/components/navigation/navigation';
import { ResultsDashboard } from '@/components/results/results-dashboard';

export default function ResultsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

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
      <ResultsDashboard />
    </div>
  );
}
