'use client';

import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: null | { id: string; email: string; phone: string };
  login: (identifier: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (identifier: string) => {
    // Call backend to send OTP
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier }),
    });
    if (!response.ok) throw new Error('Failed to send OTP');
  },
  verifyOtp: async (otp: string) => {
    const response = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp }),
    });
    if (!response.ok) throw new Error('OTP verification failed');
    const data = await response.json();
    set({ isAuthenticated: true, user: data.user });
  },
  logout: () => set({ isAuthenticated: false, user: null }),
}));
