'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

type AssistantMode = 'portal' | 'recovery' | 'hidden';

interface AssistantContextType {
  isOpen: boolean;
  mode: AssistantMode;
  messages: AssistantMessage[];
  loading: boolean;
  toggleAssistant: () => void;
  setMode: (mode: AssistantMode) => void;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export function AssistantProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AssistantMode>('hidden');
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleAssistant = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setMode('portal');
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: AssistantMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const endpoint = mode === 'recovery' ? '/api/chat/recovery' : '/api/chat/portal';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, mode }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const assistantMessage: AssistantMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: data.response,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Assistant error:', err);
    } finally {
      setLoading(false);
    }
  }, [mode]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <AssistantContext.Provider
      value={{
        isOpen,
        mode,
        messages,
        loading,
        toggleAssistant,
        setMode,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
}

export function useAssistantContext() {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error('useAssistantContext must be used within AssistantProvider');
  }
  return context;
}
