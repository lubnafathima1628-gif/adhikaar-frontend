'use client';

import { useAssistantContext } from '@/contexts/assistant-context';

export function useAssistant() {
  return useAssistantContext();
}
