import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';

import { AuthProvider } from '@/context/AuthContext';
import { LoadingProvider } from '@/context/LoadingContext';
import { ThemeProvider } from '@/context/ThemeContext';

import { AuthGuard } from '@/components/AuthGuard';
import { AppContent } from '@/components/AppContent';
import { ClientGate } from '@/components/ClientGate';
import { PageLoader } from '@/components/PageLoader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'CBF Manager',
  description: 'Sistema de Gestão da CBF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ClientGate>
          <LoadingProvider>
            <ThemeProvider>
              <AuthProvider>
                <AppContent>
                  <Suspense fallback={null}>
                    <PageLoader />
                  </Suspense>
                  <AuthGuard>{children}</AuthGuard>
                </AppContent>
              </AuthProvider>
            </ThemeProvider>
          </LoadingProvider>
        </ClientGate>

        <Toaster />
      </body>
    </html>
  );
}
