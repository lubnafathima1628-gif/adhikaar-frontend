'use client';

import { useDiscoveryContext } from '@/contexts/discovery-context';

export function useDiscovery() {
  return useDiscoveryContext();
}
