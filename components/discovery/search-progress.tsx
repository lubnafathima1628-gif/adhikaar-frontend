'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDiscovery } from '@/hooks/use-discovery';

const SEARCH_STAGES = [
  { id: 'identity', label: 'Identity Normalization', duration: 2 },
  { id: 'sources', label: 'Connecting to Sources', duration: 2 },
  { id: 'matching', label: 'Matching Records', duration: 2 },
  { id: 'verification', label: 'Verification', duration: 2 },
  { id: 'explanation', label: 'Preparing Insights', duration: 2 },
];

export function SearchProgress() {
  const [currentStage, setCurrentStage] = useState(0);
  const { session } = useDiscovery();

  useEffect(() => {
    if (currentStage < SEARCH_STAGES.length) {
      const timer = setTimeout(() => {
        setCurrentStage((prev) => prev + 1);
      }, SEARCH_STAGES[currentStage].duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStage]);

  const progress = ((currentStage) / SEARCH_STAGES.length) * 100;

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cream mb-2">Discovering Your Assets</h1>
          <p className="text-sage">This may take a moment. We're connecting across multiple sources.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="relative h-1 bg-forest/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-teal to-teal-light"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Stages */}
        <div className="space-y-4">
          {SEARCH_STAGES.map((stage, index) => {
            const isActive = index === currentStage;
            const isCompleted = index < currentStage;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isActive
                    ? 'border-teal bg-teal/10'
                    : isCompleted
                    ? 'border-sage bg-sage/5'
                    : 'border-charcoal-light bg-forest/30'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {isCompleted && (
                    <div className="w-6 h-6 rounded-full bg-sage flex items-center justify-center text-xs text-cream font-bold">
                      ✓
                    </div>
                  )}
                  {isActive && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-6 h-6 rounded-full border-2 border-teal border-t-transparent"
                    />
                  )}
                  {!isCompleted && !isActive && (
                    <div className="w-6 h-6 rounded-full border-2 border-charcoal-light" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      isActive || isCompleted ? 'text-cream' : 'text-sage-light'
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Status Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-sage-light mt-8"
        >
          Your privacy is protected. We only access authorized sources with your consent.
        </motion.p>
      </motion.div>
    </div>
  );
}
