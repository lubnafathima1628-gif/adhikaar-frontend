'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDiscovery } from '@/hooks/use-discovery';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronRight, HelpCircle } from 'lucide-react';

const CATEGORY_FIELDS: Record<string, Array<{ name: string; label: string; type: string; required: boolean }>> = {
  bank: [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
    { name: 'bankName', label: 'Bank Name (if known)', type: 'text', required: false },
  ],
  insurance: [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
    { name: 'companyName', label: 'Insurance Company (if known)', type: 'text', required: false },
  ],
  investments: [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
    { name: 'companyName', label: 'Company Name (if known)', type: 'text', required: false },
  ],
  pf: [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
    { name: 'employerName', label: 'Employer Name (if known)', type: 'text', required: false },
  ],
  property: [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
    { name: 'location', label: 'Property Location', type: 'text', required: false },
  ],
  benefits: [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
    { name: 'schemeType', label: 'Benefit Type (if known)', type: 'text', required: false },
  ],
  other: [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
    { name: 'details', label: 'Tell us more', type: 'text', required: false },
  ],
};

interface DiscoveryFormProps {
  category: string;
}

export function DiscoveryForm({ category }: DiscoveryFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({
    rememberDetails: 'yes',
  });
  const [loading, setLoading] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const { updateDiscovery, submitDiscovery } = useDiscovery();
  const router = useRouter();

  const fields = CATEGORY_FIELDS[category] || CATEGORY_FIELDS.other;

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    updateDiscovery({ [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitDiscovery(formData);
      router.push('/search');
    } catch (err) {
      console.error('Discovery submission failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cream mb-2">What do you remember?</h1>
          <p className="text-sage">
            Share the details you remember. Leave blank what you don't recall.
          </p>
        </div>

        <Card className="bg-forest-dark/80 backdrop-blur-sm border-charcoal-light/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Remember Details Toggle */}
            <div className="mb-6 p-4 bg-forest/50 rounded-lg border border-charcoal-light">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberDetails === 'no'}
                  onChange={(e) =>
                    handleInputChange('rememberDetails', e.target.checked ? 'no' : 'yes')
                  }
                  className="w-4 h-4 rounded border-sage"
                />
                <span className="text-sm text-cream font-medium">
                  I don't remember the details
                </span>
              </label>
              <p className="text-xs text-sage-light mt-2">
                Our AI assistant will ask you guided questions to help discover your assets.
              </p>
            </div>

            {/* Conditional Rendering */}
            {formData.rememberDetails === 'no' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-teal/10 border border-teal/30 rounded-lg text-center"
              >
                <p className="text-cream mb-4">
                  Our assistant will guide you through the discovery process with personalized questions.
                </p>
                <Button
                  type="button"
                  onClick={() => setShowAssistant(true)}
                  className="bg-teal hover:bg-teal-light text-cream"
                >
                  Start Guided Discovery
                </Button>
              </motion.div>
            ) : (
              <>
                {/* Form Fields */}
                {fields.map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <label className="block text-sm font-medium text-sage mb-2">
                      {field.label}
                      {!field.required && (
                        <span className="text-xs text-sage-light ml-2 font-normal">
                          (optional)
                        </span>
                      )}
                    </label>
                    <Input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      required={field.required}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  </motion.div>
                ))}

                {/* Assistant Help Button */}
                <button
                  type="button"
                  onClick={() => setShowAssistant(true)}
                  className="flex items-center space-x-2 text-sm text-teal hover:text-teal-light transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Need help? Talk to our assistant</span>
                </button>
              </>
            )}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex space-x-4 pt-6 border-t border-charcoal-light"
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-teal hover:bg-teal-light text-cream flex items-center justify-center space-x-2"
              >
                <span>{loading ? 'Searching...' : 'Search Assets'}</span>
                {!loading && <ChevronRight className="w-4 h-4" />}
              </Button>
            </motion.div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
