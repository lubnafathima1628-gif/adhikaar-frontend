'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/auth-context';
import { DiscoveryProvider } from '@/contexts/discovery-context';
import { AssistantProvider } from '@/contexts/assistant-context';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <DiscoveryProvider>
        <AssistantProvider>
          {children}
        </AssistantProvider>
      </DiscoveryProvider>
    </AuthProvider>
  );
}
