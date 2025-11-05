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

  // Always render children. The AppContent component (which wraps AuthGuard's children)
  // already handles the global loading state with a spinner.
  // The redirection logic in useEffect will handle unauthorized access.
  return <>{children}</>;
}
