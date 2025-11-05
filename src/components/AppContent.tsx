'use client';

import React, { ReactNode } from 'react';
import { useLoading } from '@/context/LoadingContext';
import { LoadingSpinner } from './LoadingSpinner';

interface AppContentProps {
  children: React.ReactNode;
}

export function AppContent({ children }: AppContentProps) {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {children}
    </>
  );
}
