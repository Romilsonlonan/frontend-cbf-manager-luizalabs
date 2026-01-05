'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex items-center p-4 rounded-lg bg-transparent shadow-none", className)}>
      <Image
        src="https://i.ibb.co/0yBYM9HS/bola.png"
        alt="Loading Spinner"
        width={60}
        height={60}
        className="animate-spin"
        style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
      />
      <p className="ml-3 text-lg font-semibold text-black">Aguarde ...</p>
    </div>
  );
}
