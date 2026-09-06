'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function MagneticButton({ children, className, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = 100;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const x = Math.cos(angle) * distance * 0.1;
    const y = Math.sin(angle) * distance * 0.1;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.2s ease-out',
      }}
      className={cn(
        'px-6 py-3 rounded font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
