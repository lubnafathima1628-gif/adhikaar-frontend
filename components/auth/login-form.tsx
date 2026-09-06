'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';

export function LoginForm() {
  const [identifier, setIdentifier] = useState('');
  const [step, setStep] = useState<'identifier' | 'otp'>('identifier');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, verifyOtp } = useAuth();
  const router = useRouter();

  const handleSubmitIdentifier = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(identifier);
      setStep('otp');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await verifyOtp(otp);
      router.push('/discover');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-cream mb-2">ADHIKAAR</h1>
        <p className="text-sm text-sage">DISCOVERY. VERIFY. RECLAIM.</p>
        <p className="text-cream-dark mt-4 text-base">
          Enter your recovery journey. Discover what belongs to you.
        </p>
      </div>

      {step === 'identifier' ? (
        <form onSubmit={handleSubmitIdentifier} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-sage mb-2">
              Phone or Email
            </label>
            <Input
              type="text"
              placeholder="Enter your phone or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full"
              required
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-teal hover:bg-teal-light text-cream"
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-sage mb-2">
              Enter OTP
            </label>
            <Input
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.slice(0, 6))}
              maxLength={6}
              className="w-full text-center text-2xl tracking-widest"
              required
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          <Button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-teal hover:bg-teal-light text-cream"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </Button>

          <button
            type="button"
            onClick={() => {
              setStep('identifier');
              setOtp('');
              setError('');
            }}
            className="w-full text-sage hover:text-sage-light text-sm"
          >
            Back
          </button>
        </form>
      )}

      <div className="mt-8 pt-6 border-t border-charcoal-light">
        <p className="text-xs text-sage-light text-center">
          By continuing, you agree to our privacy policy and terms of service.
        </p>
      </div>
    </motion.div>
  );
}
