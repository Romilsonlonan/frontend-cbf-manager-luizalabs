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
  const { isAuthenticated, loadingUser } = useAuth();
  const { isLoading } = useLoading();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !loadingUser) {
      // If not authenticated and trying to access a protected path, redirect to login
      if (!isAuthenticated && !publicPaths.includes(pathname)) {
        router.push('/login');
      }
      // If authenticated and trying to access login/register, redirect to home
      if (isAuthenticated && publicPaths.includes(pathname)) {
        router.push('/home');
      }
    }
  }, [isAuthenticated, isLoading, loadingUser, pathname, router]);

  // Se estiver carregando o usuário, não renderiza nada para evitar flash de conteúdo protegido.
  // Não bloqueamos a renderização se apenas 'isLoading' for true, pois isso causaria um deadlock
  // se um componente filho disparar um carregamento no seu useEffect (o unmount impediria o stopLoading).
  if (loadingUser) {
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
