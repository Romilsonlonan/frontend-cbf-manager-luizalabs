'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLoading } from '@/context/LoadingContext';

interface AuthGuardProps {
  children: ReactNode;
}

const publicPaths = ['/login', '/register']; // Paths that don't require authentication

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const { isLoading } = useLoading();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) { // Renamed from loading
      // If not authenticated and trying to access a protected path, redirect to login
      if (!isAuthenticated && !publicPaths.includes(pathname)) { // Renamed from isLoggedIn
        router.push('/login');
      }
      // If authenticated and trying to access login/register, redirect to home
      if (isAuthenticated && publicPaths.includes(pathname)) { // Renamed from isLoggedIn
        router.push('/home');
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Se estiver carregando, não renderiza nada (o AppContent já mostra o spinner)
  if (isLoading) {
    return null;
  }

  // Se não estiver autenticado e tentar acessar uma rota protegida, não renderiza os filhos
  if (!isAuthenticated && !publicPaths.includes(pathname)) {
    return null;
  }

  // Se estiver autenticado e tentar acessar login/register, não renderiza os filhos (será redirecionado)
  if (isAuthenticated && publicPaths.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
}
