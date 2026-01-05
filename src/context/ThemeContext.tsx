'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  navbarColor: string;
  sidebarColor: string;
  setTheme: (theme: Theme) => void;
  setNavbarColor: (color: string) => void;
  setSidebarColor: (color: string) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // 🔒 Estado inicial determinístico (igual no server e no client)
  const [theme, setTheme] = useState<Theme>('light');
  const [navbarColor, setNavbarColor] = useState('default');
  const [sidebarColor, setSidebarColor] = useState('default');
  const [mounted, setMounted] = useState(false);

  // ✅ Marca quando o componente já está montado no client
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Carrega preferências SOMENTE após mount
  useEffect(() => {
    if (!mounted) return;

    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const savedNavbarColor = localStorage.getItem('navbarColor');
    const savedSidebarColor = localStorage.getItem('sidebarColor');

    if (savedTheme) setTheme(savedTheme);
    if (savedNavbarColor) setNavbarColor(savedNavbarColor);
    if (savedSidebarColor) setSidebarColor(savedSidebarColor);
  }, [mounted]);

  // ✅ Aplica classe dark/light de forma segura
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // 🎨 Aplica cores customizadas com CSS variables
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    const colorMap: Record<string, string> = {
      default: 'var(--background)',
      black: '#000000',
      'dark-blue': 'hsl(var(--primary))',
      gray: '#4a5568',
      lilac: '#c7d2fe',
      purple: '#8b5cf6',
      blue: '#3b82f6',
      green: '#22c55e',
      'dark-green': '#101f0d',
    };

    const getTextColor = (key: string) =>
      key === 'default' ? '#000000' : '#FFFFFF';

    root.style.setProperty(
      '--navbar-bg',
      colorMap[navbarColor] || colorMap.default
    );
    root.style.setProperty(
      '--sidebar-bg',
      colorMap[sidebarColor] || colorMap.default
    );
    root.style.setProperty(
      '--navbar-text-color',
      getTextColor(navbarColor)
    );
    root.style.setProperty(
      '--sidebar-text-color',
      getTextColor(sidebarColor)
    );

    localStorage.setItem('navbarColor', navbarColor);
    localStorage.setItem('sidebarColor', sidebarColor);
  }, [navbarColor, sidebarColor, mounted]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        navbarColor,
        sidebarColor,
        setTheme,
        setNavbarColor,
        setSidebarColor,
        mounted,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// 🔐 Hook seguro
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
