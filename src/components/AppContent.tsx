'use client';

import React, { ReactNode, useEffect } from 'react';
import { useLoading } from '@/context/LoadingContext';
import { LoadingSpinner } from './LoadingSpinner';

interface AppContentProps {
  children: React.ReactNode;
}

export function AppContent({ children }: AppContentProps) {
  const { isLoading } = useLoading();

  useEffect(() => {
    // Solução Anti-Cache para lidar com o botão voltar do navegador
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {children}
    </>
  );
}
