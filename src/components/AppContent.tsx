'use client';

import React, { ReactNode, useEffect } from 'react';
import { useLoading } from '@/context/LoadingContext';
import { useAuth } from '@/context/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';

interface AppContentProps {
  children: React.ReactNode;
}

export function AppContent({ children }: AppContentProps) {
  const { isLoading } = useLoading();
  const { loadingUser } = useAuth();

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
      {(isLoading || loadingUser) && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <LoadingSpinner />
        </div>
      )}
      {children}
    </>
  );
}
