'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, Download, Share2, AlertCircle, CheckCircle } from 'lucide-react';

interface Asset {
  id: string;
  type: string;
  name: string;
  amount: string;
  status: 'verified' | 'unverified' | 'pending';
  source: string;
  discoveredDate: string;
  details: Record<string, string>;
}

interface ResultsDisplayProps {
  assets: Asset[];
  totalAmount: string;
  matchScore: number;
}

const STATUS_CONFIG = {
  verified: {
    color: 'text-sage',
    bg: 'bg-sage/10',
    icon: CheckCircle,
    label: 'Verified',
  },
  unverified: {
    color: 'text-gold',
    bg: 'bg-gold/10',
    icon: AlertCircle,
    label: 'Needs Verification',
  },
  pending: {
    color: 'text-teal',
    bg: 'bg-teal/10',
    icon: AlertCircle,
    label: 'Pending Review',
  },
};

export function ResultsDisplay({
  assets,
  totalAmount,
  matchScore,
}: ResultsDisplayProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedAssets, setSelectedAssets] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedAssets);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedAssets(newSelected);
  };

  return (
    <div className="relative z-10 min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Summary Card */}
        <Card className="bg-gradient-to-br from-teal/20 to-sage/20 border-teal/30 mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-sage mb-2">Total Assets Found</p>
                <p className="text-3xl font-bold text-cream">{assets.length}</p>
              </div>
              <div>
                <p className="text-sm text-sage mb-2">Total Amount</p>
                <p className="text-3xl font-bold text-gold">{totalAmount}</p>
              </div>
              <div>
                <p className="text-sm text-sage mb-2">Confidence Score</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-2 bg-forest/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-teal to-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${matchScore}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <span className="text-cream font-bold">{matchScore}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assets List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-cream mb-6">Your Discovered Assets</h2>

          <AnimatePresence>
            {assets.map((asset, index) => {
              const isExpanded = expandedId === asset.id;
              const isSelected = selectedAssets.has(asset.id);
              const statusConfig = STATUS_CONFIG[asset.status];
              const StatusIcon = statusConfig.icon;

              return (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card
                    className={`transition-all cursor-pointer ${
                      isSelected
                        ? 'border-teal bg-teal/5'
                        : 'hover:border-teal/50'
                    }`}
                  >
                    <div
                      className="p-6 flex items-center space-x-4"
                      onClick={() => toggleExpand(asset.id)}
                    >
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(asset.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-5 h-5 rounded border-sage cursor-pointer"
                      />

                      {/* Asset Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-cream">
                            {asset.name}
                          </h3>
                          <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            <span>{statusConfig.label}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-sage">
                          <span>Type: {asset.type}</span>
                          <span>Source: {asset.source}</span>
                          <span>Found: {asset.discoveredDate}</span>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gold">{asset.amount}</p>
                        <motion.div
                          animate={isExpanded ? { rotate: 180 } : { rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-teal" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-charcoal-light"
                        >
                          <div className="p-6 bg-forest/30">
                            <h4 className="text-sm font-semibold text-cream mb-4">
                              Details
                            </h4>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              {Object.entries(asset.details).map(([key, value]) => (
                                <div key={key}>
                                  <p className="text-xs text-sage-light mb-1">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </p>
                                  <p className="text-sm text-cream">{value}</p>
                                </div>
                              ))}
                            </div>

                            <div className="flex space-x-3">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 text-xs"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download Documents
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="flex-1 text-xs"
                              >
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex space-x-4 mt-12 sticky bottom-6"
        >
          <Button
            variant="outline"
            className="flex-1"
          >
            Export Report
          </Button>
          <Button
            className="flex-1 bg-teal hover:bg-teal-light text-cream"
            disabled={selectedAssets.size === 0}
          >
            Claim Selected Assets ({selectedAssets.size})
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
