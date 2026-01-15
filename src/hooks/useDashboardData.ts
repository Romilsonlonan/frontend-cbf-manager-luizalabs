import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLoading } from '@/context/LoadingContext';
import { api } from '@/lib/api';
import type { TeamStats, SortKey } from '@/lib/types';
import { HOME_STRINGS } from '@/constants/home.constants';

export function useDashboardData() {
  const { token, onAuthError } = useAuth();
  const { startLoading, stopLoading } = useLoading();

  /* ---------- Stats State ---------- */
  const [totalAthletes, setTotalAthletes] = useState<number | null>(null);
  const [totalClubs, setTotalClubs] = useState<number | null>(null);
  const [totalAppointmentsToday, setTotalAppointmentsToday] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState<string | null>(null);

  /* ---------- Leaderboard State ---------- */
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({
    key: 'p',
    direction: 'desc',
  });
  const [isScraping, setIsScraping] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<TeamStats[]>([]);
  const [leaderboardError, setLeaderboardError] = useState<string | null>(null);

  /* ---------- UI State ---------- */
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const fetchLeaderboardData = useCallback(async () => {
    if (!token) {
      setLeaderboardError(HOME_STRINGS.AUTH_ERROR_LOG);
      return;
    }
    setIsScraping(true);
    setLeaderboardError(null);
    try {
      const data = await api.scrapeBrasileiraoLeaderboard(token, onAuthError);
      setLeaderboardData(data);
    } catch (err) {
      console.error('Failed to scrape leaderboard data:', err);
      setLeaderboardError(HOME_STRINGS.ERROR_LEADERBOARD);
    } finally {
      setIsScraping(false);
    }
  }, [token, onAuthError]);

  const fetchDashboardData = useCallback(async () => {
    if (!token) {
      setDashboardError(HOME_STRINGS.AUTH_ERROR_LOG);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      startLoading();
      const [athletesCount, clubsCount] = await Promise.all([
        api.getTotalAthletesCount(token, onAuthError),
        api.getTotalClubsCount(token, onAuthError)
      ]);

      const today = new Date().toISOString().split('T')[0];
      const appointments = await api.getAppointments(token, today, today);

      setTotalAthletes(athletesCount);
      setTotalClubs(clubsCount);
      setTotalAppointmentsToday(appointments.length);
    } catch (err) {
      console.error(err);
      setDashboardError(HOME_STRINGS.ERROR_DASHBOARD);
    } finally {
      setLoading(false);
      stopLoading();
    }
  }, [token, onAuthError, startLoading, stopLoading]);

  useEffect(() => {
    fetchDashboardData();
    fetchLeaderboardData();
  }, [fetchDashboardData, fetchLeaderboardData]);

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
      if (b.p !== a.p) return b.p - a.p;
      if (b.v !== a.v) return b.v - a.v;
      if (b.sg !== a.sg) return b.sg - a.sg;
      if (b.gp !== a.gp) return b.gp - a.gp;
      return (a.name || '').localeCompare(b.name || '');
    });

    return filtered;
  }, [searchQuery, leaderboardData]);

  return {
    // Data
    totalAthletes,
    totalClubs,
    totalAppointmentsToday,
    sortedAndFilteredTeams,
    leaderboardData,
    
    // Status
    loading,
    isScraping,
    dashboardError,
    leaderboardError,
    
    // UI State
    searchQuery,
    sortConfig,
    isPaymentModalOpen,
    
    // Actions
    setSearchQuery,
    setIsPaymentModalOpen,
    handleSort,
    refreshLeaderboard: fetchLeaderboardData,
    refreshDashboard: fetchDashboardData
  };
}
