'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getPlayers, updateUserProfile, changePassword, deleteAccount, uploadProfileImage, createPlayer, scrapeAthletes, scrapeClubPlayers } from '@/lib/api';
import { useLoading } from './LoadingContext';

interface User {
  id: number;
  email: string;
  is_active: boolean;
  name?: string; // Adicionado campo de nome
  profile_image_url?: string; // Added profile image URL
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean; // Renamed from isLoggedIn
  token: string | null; // Adicionado token ao contexto
  login: (token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void; // Added function to update user data
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Renamed from isLoggedIn
  const [token, setToken] = useState<string | null>(null); // Estado para o token
  const router = useRouter();
  const { startLoading, stopLoading } = useLoading(); // Global loading context

  const handleAuthError = () => {
    console.log('AuthContext: Authentication error detected, logging out.');
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  const updateUser = (userData: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      return { ...prevUser, ...userData };
    });
  };

  useEffect(() => {
    console.log('AuthContext useEffect: Starting to load user.');
    const loadUser = async () => {
      const storedToken = localStorage.getItem('token');
      console.log('AuthContext useEffect: Stored token found:', storedToken ? 'Yes' : 'No');
      if (storedToken) {
        setToken(storedToken); // Define o token no estado
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
          localStorage.removeItem('token');
          setToken(null);
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      console.log('AuthContext useEffect: Finished loading user.');
    };
    loadUser();
  }, []);

  const login = (newToken: string) => {
    console.log('AuthContext login: Attempting to log in with new token.');
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    getCurrentUser(newToken, startLoading, stopLoading, handleAuthError).then((currentUser: User) => {
      setUser(currentUser);
      console.log('AuthContext login: User fetched and authenticated successfully.');
    }).catch((error: any) => {
      console.error('AuthContext login: Failed to fetch user after login:', error);
      localStorage.removeItem('token');
      setToken(null);
      setIsAuthenticated(false);
      setUser(null);
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null); // Limpa o token no estado
    setIsAuthenticated(false); // Renamed from isLoggedIn
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, token, login, logout, updateUser }}>
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
