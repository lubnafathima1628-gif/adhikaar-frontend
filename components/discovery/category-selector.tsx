'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDiscovery } from '@/hooks/use-discovery';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Banknote,
  Shield,
  TrendingUp,
  Briefcase,
  Home,
  Award,
  MoreHorizontal,
} from 'lucide-react';

const ASSET_CATEGORIES = [
  {
    id: 'bank',
    label: 'Bank / Deposits',
    icon: Banknote,
    color: 'from-teal to-teal-dark',
    description: 'Unclaimed deposits, savings accounts',
  },
  {
    id: 'insurance',
    label: 'Insurance',
    icon: Shield,
    color: 'from-sage to-moss',
    description: 'Insurance claims, policy benefits',
  },
  {
    id: 'investments',
    label: 'Investments / IEPF',
    icon: TrendingUp,
    color: 'from-gold to-gold-light',
    description: 'Shares, IEPF unclaimed dividend',
  },
  {
    id: 'pf',
    label: 'EPF / PF',
    icon: Briefcase,
    color: 'from-teal-light to-teal',
    description: 'Employee provident fund, pension',
  },
  {
    id: 'property',
    label: 'Property',
    icon: Home,
    color: 'from-moss to-sage',
    description: 'Land, real estate benefits',
  },
  {
    id: 'benefits',
    label: 'Government Benefits',
    icon: Award,
    color: 'from-sage-light to-sage',
    description: 'Subsidies, schemes, grants',
  },
  {
    id: 'other',
    label: 'Other / Future Assets',
    icon: MoreHorizontal,
    color: 'from-charcoal-light to-charcoal',
    description: 'Uncategorized assets',
  },
];

export function CategorySelector() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { startDiscovery } = useDiscovery();
  const router = useRouter();

  const handleSelectCategory = (categoryId: string) => {
    startDiscovery(categoryId);
    router.push(`/discover/${categoryId}`);
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-cream mb-3">
            What do you want to discover?
          </h1>
          <p className="text-lg text-sage max-w-2xl mx-auto">
            You don't need to remember every detail. Start with what you remember.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ASSET_CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            const isHovered = hoveredId === category.id;

            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => handleSelectCategory(category.id)}
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 transition-opacity duration-300 group-hover:opacity-30`}
                />

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent"
                  style={{
                    borderImageSource: `linear-gradient(135deg, rgba(90, 159, 168, 0.5), rgba(107, 142, 127, 0)`,
                  }}
                  animate={isHovered ? { opacity: 1 } : { opacity: 0.3 }}
                />

                {/* Glass effect background */}
                <div className="absolute inset-0 bg-forest/40 backdrop-blur-sm rounded-2xl" />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                  {/* Icon */}
                  <motion.div
                    animate={isHovered ? { scale: 1.2, y: -10 } : { scale: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4"
                  >
                    <div className={`p-3 rounded-full bg-gradient-to-br ${category.color}`}>
                      <Icon className="w-8 h-8 text-cream" />
                    </div>
                  </motion.div>

                  {/* Label */}
                  <h2 className="text-lg font-semibold text-cream mb-2">
                    {category.label}
                  </h2>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={isHovered ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs text-sage-light"
                  >
                    {category.description}
                  </motion.p>

                  {/* Arrow indicator */}
                  <motion.div
                    animate={isHovered ? { x: 5, opacity: 1 } : { x: -5, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-teal"
                  >
                    →
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
