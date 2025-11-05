'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  navbarColor: string;
  sidebarColor: string;
  setTheme: (theme: string) => void;
  setNavbarColor: (color: string) => void;
  setSidebarColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('light');
  const [navbarColor, setNavbarColor] = useState('default');
  const [sidebarColor, setSidebarColor] = useState('default');

  useEffect(() => {
    // Load saved theme preferences from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
    const savedNavbarColor = localStorage.getItem('navbarColor');
    if (savedNavbarColor) setNavbarColor(savedNavbarColor);
    const savedSidebarColor = localStorage.getItem('sidebarColor');
    if (savedSidebarColor) setSidebarColor(savedSidebarColor);
  }, []);

  useEffect(() => {
    // Apply theme class to document element
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const colorMap: { [key: string]: string } = {
      'default': 'var(--background)', // Use a default background from Tailwind
      'black': '#000000',
      'dark-blue': 'hsl(var(--primary))', // Changed to use primary button color
      'gray': '#4a5568',
      'lilac': '#c7d2fe',
      'purple': '#8b5cf6',
      'blue': '#3b82f6', // Added blue color
    };

    document.documentElement.style.setProperty('--navbar-bg', colorMap[navbarColor] || colorMap['default']);
    document.documentElement.style.setProperty('--sidebar-bg', colorMap[sidebarColor] || colorMap['default']);

    // Set text colors based on background color
    const getTextColor = (bgColorKey: string) => {
      // If the background is 'default' (likely light), text should be black. Otherwise, white.
      return bgColorKey === 'default' ? '#000000' : '#FFFFFF';
    };

    document.documentElement.style.setProperty('--navbar-text-color', getTextColor(navbarColor));
    document.documentElement.style.setProperty('--sidebar-text-color', getTextColor(sidebarColor));
  }, [navbarColor, sidebarColor]);

  return (
    <ThemeContext.Provider value={{ theme, navbarColor, sidebarColor, setTheme, setNavbarColor, setSidebarColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
