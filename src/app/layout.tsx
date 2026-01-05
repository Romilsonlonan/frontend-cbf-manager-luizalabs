import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';

import { AuthProvider } from '@/context/AuthContext';
import { LoadingProvider } from '@/context/LoadingContext';
import { ThemeProvider } from '@/context/ThemeContext';

import { AuthGuard } from '@/components/AuthGuard';
import { AppContent } from '@/components/AppContent';
import { ClientGate } from '@/components/ClientGate';

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
                <AuthGuard>
                  <AppContent>{children}</AppContent>
                </AuthGuard>
              </AuthProvider>
            </ThemeProvider>
          </LoadingProvider>
        </ClientGate>

        <Toaster />
      </body>
    </html>
  );
}
