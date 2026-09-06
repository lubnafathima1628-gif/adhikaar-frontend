'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface DiscoverySession {
  id: string;
  category: string;
  data: Record<string, any>;
  status: 'init' | 'searching' | 'completed' | 'error';
  results?: PotentialAsset[];
  error?: string;
}

export interface PotentialAsset {
  id: string;
  category: string;
  institution: string;
  matchConfidence: number;
  lastUpdated: string;
  evidence: string[];
  requiresVerification: boolean;
}

interface DiscoveryContextType {
  session: DiscoverySession | null;
  startDiscovery: (category: string) => void;
  updateDiscovery: (data: Record<string, any>) => void;
  submitDiscovery: (data: Record<string, any>) => Promise<void>;
  clearSession: () => void;
}

const DiscoveryContext = createContext<DiscoveryContextType | undefined>(undefined);

export function DiscoveryProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<DiscoverySession | null>(null);

  const startDiscovery = useCallback((category: string) => {
    setSession({
      id: `session-${Date.now()}`,
      category,
      data: {},
      status: 'init',
    });
  }, []);

  const updateDiscovery = useCallback((data: Record<string, any>) => {
    setSession((prev) =>
      prev ? { ...prev, data: { ...prev.data, ...data } } : null
    );
  }, []);

  const submitDiscovery = useCallback(async (data: Record<string, any>) => {
    if (!session) return;

    setSession((prev) => prev ? { ...prev, status: 'searching' } : null);

    try {
      // Call backend POST /discovery/search
      const response = await fetch('/api/discovery/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.id,
          category: session.category,
          ...data,
        }),
      });

      if (!response.ok) throw new Error('Search failed');

      const results = await response.json();
      setSession((prev) =>
        prev
          ? {
              ...prev,
              status: 'completed',
              results: results.potentialAssets || [],
            }
          : null
      );
    } catch (err) {
      setSession((prev) =>
        prev
          ? {
              ...prev,
              status: 'error',
              error: err instanceof Error ? err.message : 'Search failed',
            }
          : null
      );
      throw err;
    }
  }, [session]);

  const clearSession = useCallback(() => {
    setSession(null);
  }, []);

  return (
    <DiscoveryContext.Provider
      value={{ session, startDiscovery, updateDiscovery, submitDiscovery, clearSession }}
    >
      {children}
    </DiscoveryContext.Provider>
  );
}

export function useDiscoveryContext() {
  const context = useContext(DiscoveryContext);
  if (!context) {
    throw new Error('useDiscoveryContext must be used within DiscoveryProvider');
  }
  return context;
}
