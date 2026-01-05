'use client';

import { useEffect, useState, ReactNode } from 'react';

interface ClientGateProps {
  children: ReactNode;
}

/**
 * Componente que garante que seu conteúdo seja renderizado apenas no lado do cliente.
 * Útil para evitar erros de hidratação (hydration mismatch) no Next.js ao usar
 * componentes que dependem de APIs do navegador ou estados que mudam após a montagem.
 */
export function ClientGate({ children }: ClientGateProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}
