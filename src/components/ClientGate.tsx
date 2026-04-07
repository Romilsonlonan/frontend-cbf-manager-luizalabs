'use client';

import { useEffect, useState, ReactNode } from 'react';

interface ClientGateProps {
  children: ReactNode;
}

/**
 * Componente que garante que seu conteúdo seja renderizado apenas no lado do cliente.
 * Útil para evitar erros de hidratação (hydration mismatch) no Next.js ao usar
 * componentes que dependem de APIs do navegador ou estados que mudam após a montagem.
 * 
 * Também previne o flash branco inicial mostrando um loader enquanto o JavaScript carrega.
 */
export function ClientGate({ children }: ClientGateProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setHasMounted(true);
    // Hide initial loader immediately on mount
    setShowLoader(false);
  }, []);

  return (
    <>
      {/* Initial loader to prevent white flash - only shown briefly on mount */}
      {showLoader && (
        <div 
          className="initial-loader"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium text-foreground/70">Carregando...</span>
          </div>
        </div>
      )}
      {hasMounted && children}
    </>
  );
}
