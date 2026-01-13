'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLoading } from '@/context/LoadingContext';
import { api } from '@/lib/api';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import type { TeamStats, SortKey } from '@/lib/types';
import { DashboardStats } from '@/components/home/dashboard/DashboardStats';
import { LeaderboardTable } from '@/components/home/dashboard/LeaderboardTable';
import { DashboardLayout } from '@/components/home/dashboard/DashboardLayout';
import { HOME_STRINGS } from '@/constants/home.constants';

/**
 * DashboardWithLeaderboardPage (Container Component)
 * 
 * Responsibilities:
 * - Data fetching (dashboard stats, leaderboard)
 * - State management (totals, leaderboard data, sorting, searching)
 * - Event handling (refresh, sort, search)
 * - Orchestrating presentation components
 */
export default function DashboardWithLeaderboardPage() {
  /* ---------- Dashboard State ---------- */
  const { token, onAuthError } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const [totalAthletes, setTotalAthletes] = useState<number | null>(null);
  const [totalClubs, setTotalClubs] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState<string | null>(null);

  /* ---------- Leaderboard State ---------- */
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({
    key: 'p',
    direction: 'desc',
  });
  const [isScraping, setIsScraping] = useState(false); // New state for scraping loading
  const [leaderboardData, setLeaderboardData] = useState<TeamStats[]>([]); // Inicializa vazio para evitar dados estáticos
  const [leaderboardError, setLeaderboardError] = useState<string | null>(null);

  const fetchLeaderboardData = useCallback(async () => {
    if (!token) {
      setLeaderboardError('Authentication token not found.');
      return;
    }
    setIsScraping(true);
    setLeaderboardError(null);
    try {
      const data = await api.scrapeBrasileiraoLeaderboard(token, onAuthError);
      setLeaderboardData(data);
    } catch (err) {
      console.error('Failed to scrape leaderboard data:', err);
      setLeaderboardError('Falha ao atualizar a classificação do Brasileirão.');
    } finally {
      setIsScraping(false);
    }
  }, [token, onAuthError]);

  const fetchDashboardData = useCallback(async () => {
    if (!token) {
      setDashboardError('Authentication token not found.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      startLoading();
      const athletesCount = await api.getTotalAthletesCount(token, onAuthError);
      const clubsCount = await api.getTotalClubsCount(token, onAuthError);

      setTotalAthletes(athletesCount);
      setTotalClubs(clubsCount);
    } catch (err) {
      console.error(err);
      setDashboardError('Falha ao carregar dados do painel.');
    } finally {
      setLoading(false);
      stopLoading();
    }
  }, [token, onAuthError, startLoading, stopLoading]);

  useEffect(() => {
    fetchDashboardData();
    fetchLeaderboardData(); // Also fetch leaderboard data on component mount
  }, [fetchDashboardData, fetchLeaderboardData]);

  const handleRefreshLeaderboard = useCallback(async () => {
    await fetchLeaderboardData();
  }, [fetchLeaderboardData]);

  /* =======================
     LEADERBOARD LOGIC
  ======================= */
  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAndFilteredTeams = useMemo(() => {
    const filtered = [...leaderboardData].filter(team =>
      (team.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      // Prioriza a ordenação baseada no sortConfig se necessário, 
      // mas aqui mantemos a lógica padrão de classificação de futebol
      if (b.p !== a.p) return b.p - a.p;
      if (b.v !== a.v) return b.v - a.v;
      if (b.sg !== a.sg) return b.sg - a.sg;
      if (b.gp !== a.gp) return b.gp - a.gp;
      return (a.name || '').localeCompare(b.name || '');
    });

    return filtered;
  }, [searchQuery, leaderboardData, sortConfig]);

  /* =======================
     LOADING / ERROR
  ======================= */
  if (loading) {
    return (
      <div className="grid place-items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (dashboardError) {
    return <p className="text-red-500 p-10">{dashboardError}</p>;
  }

  /* =======================
     RENDER
  ======================= */
  return (
    <DashboardLayout>
      <DashboardStats 
        totalAthletes={totalAthletes} 
        totalClubs={totalClubs} 
      />

      <LeaderboardTable
        data={leaderboardData}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortConfig={sortConfig}
        onSort={handleSort}
        isScraping={isScraping}
        onRefresh={handleRefreshLeaderboard}
        error={leaderboardError}
      />
    </DashboardLayout>
  );
}
