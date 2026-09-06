'use client';

import { create } from 'zustand';

interface DiscoveryState {
  session: {
    category: string | null;
    formData: Record<string, string>;
    results: any[];
  };
  startDiscovery: (category: string) => void;
  updateDiscovery: (data: Record<string, string>) => void;
  submitDiscovery: (formData: Record<string, string>) => Promise<void>;
}

export const useDiscovery = create<DiscoveryState>((set) => ({
  session: {
    category: null,
    formData: {},
    results: [],
  },
  startDiscovery: (category: string) =>
    set((state) => ({
      session: { ...state.session, category },
    })),
  updateDiscovery: (data: Record<string, string>) =>
    set((state) => ({
      session: {
        ...state.session,
        formData: { ...state.session.formData, ...data },
      },
    })),
  submitDiscovery: async (formData: Record<string, string>) => {
    const response = await fetch('/api/discovery/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error('Discovery search failed');
    const results = await response.json();
    set((state) => ({
      session: { ...state.session, results },
    }));
  },
}));
