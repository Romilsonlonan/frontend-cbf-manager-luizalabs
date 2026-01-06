'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLoading } from '@/context/LoadingContext';

export function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading(); // Start loading when route changes
    // We need to stop loading when the new page is ready.
    // This is a heuristic: stop after a short delay.
    const timer = setTimeout(() => {
      stopLoading();
    }, 300); // Adjust delay as needed

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, searchParams, startLoading, stopLoading]);

  return null; // This component doesn't render anything visible
}
