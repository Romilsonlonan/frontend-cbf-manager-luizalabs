import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext';
import { AuthGuard } from '@/components/AuthGuard';
import { LoadingProvider } from '@/context/LoadingContext';
import { AppContent } from '@/components/AppContent';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: "CBF Manager",
  description: "Sistema de Gestão da CBF",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <LoadingProvider>
          <ThemeProvider>
            <AuthProvider>
              <AuthGuard>
                <AppContent>{children}</AppContent>
              </AuthGuard>
            </AuthProvider>
          </ThemeProvider>
        </LoadingProvider>
        <Toaster />
      </body>
    </html>
  );
}
