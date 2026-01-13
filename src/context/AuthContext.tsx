'use client';

import React, { createContext, useState, useContext, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, updateUserProfile, changePassword, deleteAccount, uploadProfileImage, scrapeAthletes, scrapeClubPlayers } from '@/lib/api';
import { useLoading } from './LoadingContext';

interface User {
  id: number;
  email: string;
  is_active: boolean;
  name?: string; // Adicionado campo de nome
  profile_image_url?: string; // Added profile image URL
  subscription_status?: string; // Added subscription status
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  loadingUser: boolean; // Added loadingUser state
  login: (token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  onAuthError: () => void; // Adicionado
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true); // Initialize loadingUser as true
  const router = useRouter();
  const { startLoading, stopLoading } = useLoading();

  const handleAuthError = useCallback(() => {
    console.log('AuthContext: Authentication error detected, logging out.');
    localStorage.removeItem('access_token');
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
    setLoadingUser(false); // Set loading to false on error
    router.push('/login');
  }, [router]);

  const updateUser = useCallback((userData: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      return { ...prevUser, ...userData };
    });
  }, []);

  useEffect(() => {
    console.log('AuthContext useEffect: Starting to load user.');
    setLoadingUser(true); // Start loading
    const loadUser = async () => {
      const storedToken = localStorage.getItem('access_token');
      console.log('AuthContext useEffect: Stored token found:', storedToken ? 'Yes' : 'No');
      if (storedToken) {
        // Verificação básica de expiração de JWT para evitar flicker de "conectado" com token expirado
        try {
          const payloadBase64 = storedToken.split('.')[1];
          if (payloadBase64) {
            const payload = JSON.parse(window.atob(payloadBase64));
            if (payload.exp && payload.exp * 1000 < Date.now()) {
              console.log('AuthContext: Token expirado detectado proativamente.');
              handleAuthError();
              return;
            }
          }
        } catch (e) {
          console.error('Erro ao decodificar token:', e);
        }

        setToken(storedToken);
        try {
          const currentUser: User = await getCurrentUser(storedToken, startLoading, stopLoading, handleAuthError);
          setUser(currentUser);
          setIsAuthenticated(true);
          console.log('AuthContext useEffect: User loaded and authenticated.');
        } catch (error: any) {
          if (error.message?.includes('Token inválido') || error.message?.includes('Could not validate credentials')) {
            console.log('AuthContext useEffect: Session expired, redirecting to login.');
          } else {
            console.error('AuthContext useEffect: Error loading user:', error);
          }
          localStorage.removeItem('access_token');
          setToken(null);
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      setLoadingUser(false); // Finish loading
      console.log('AuthContext useEffect: Finished loading user.');
    };
    loadUser();
  }, []);

  const login = useCallback((newToken: string) => {
    console.log('AuthContext login: Attempting to log in with new token.');
    setLoadingUser(true); // Start loading on login
    localStorage.setItem('access_token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    getCurrentUser(newToken, startLoading, stopLoading, handleAuthError).then((currentUser: User) => {
      setUser(currentUser);
      console.log('AuthContext login: User fetched and authenticated successfully.');
      setLoadingUser(false); // Finish loading on successful login
    }).catch((error: any) => {
      console.error('AuthContext login: Failed to fetch user after login:', error);
      localStorage.removeItem('access_token');
      setToken(null);
      setIsAuthenticated(false);
      setUser(null);
      setLoadingUser(false); // Finish loading on failed login
    });
  }, [startLoading, stopLoading, handleAuthError]);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
    setLoadingUser(false); // Set loading to false on logout
    router.push('/login');
  }, [router]);

  const authValue = useMemo(() => ({
    user,
    isAuthenticated,
    token,
    loadingUser,
    login,
    logout,
    updateUser,
    onAuthError: handleAuthError
  }), [user, isAuthenticated, token, loadingUser, login, logout, updateUser, handleAuthError]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
