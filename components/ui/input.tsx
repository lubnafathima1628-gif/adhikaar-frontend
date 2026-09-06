'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      'flex h-10 w-full rounded border border-charcoal-light bg-forest-dark px-3 py-2 text-sm text-cream placeholder:text-sage-light outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
