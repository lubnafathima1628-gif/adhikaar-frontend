'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { LivingBackground } from '@/components/3d/living-background';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      redirect('/discover');
    }
  }, [user]);

  return (
    <div className="min-h-screen flex">
      {/* Left: 3D Living Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-forest">
        <LivingBackground />
      </div>

      {/* Right: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-forest-dark">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
