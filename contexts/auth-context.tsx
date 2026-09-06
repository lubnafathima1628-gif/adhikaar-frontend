'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  id: string;
  phone?: string;
  email?: string;
  language: string;
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (identifier: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  logout: () => Promise<void>;
  setLanguage: (language: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check stored session on mount
  React.useEffect(() => {
    const checkSession = async () => {
      try {
        const stored = localStorage.getItem('adhikaar_user');
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch (err) {
        console.error('Session check failed:', err);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = useCallback(async (identifier: string) => {
    setLoading(true);
    setError(null);
    try {
      // Call backend POST /auth/register
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier }),
      });

      if (!response.ok) throw new Error('Registration failed');
      // OTP sent, UI will prompt for verification
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyOtp = useCallback(async (otp: string) => {
    setLoading(true);
    setError(null);
    try {
      // Call backend POST /auth/verify-otp
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });

      if (!response.ok) throw new Error('OTP verification failed');

      const userData: User = await response.json();
      setUser(userData);
      localStorage.setItem('adhikaar_user', JSON.stringify(userData));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      localStorage.removeItem('adhikaar_user');
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const setLanguage = useCallback((language: string) => {
    if (user) {
      const updated = { ...user, language };
      setUser(updated);
      localStorage.setItem('adhikaar_user', JSON.stringify(updated));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, verifyOtp, logout, setLanguage }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}
