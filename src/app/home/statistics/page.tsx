
'use client';

'use client';

'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Club } from '@/lib/definitions';
import { GoalsByAthleteDashboard } from '@/components/home/statistics/GoalsByAthleteDashboard';
import { FoulsCardsDashboard } from '@/components/home/statistics/FoulsCardsDashboard';
import { AgeDashboard } from '@/components/home/statistics/AgeDashboard';
import { useLoading } from '@/context/LoadingContext';
import { useAuth } from '@/context/AuthContext';
import { StatisticsHeader } from '@/components/home/statistics/StatisticsHeader';
import { StatisticsLayout } from '@/components/home/statistics/StatisticsLayout';
import { StatisticsDashboards } from '@/components/home/statistics/StatisticsDashboards';
import { STATISTICS_STRINGS } from '@/constants/statistics.constants';

/**
 * StatisticsPage (Container Component)
 * 
 * Responsibilities:
 * - Data fetching (clubs)
 * - State management (selected club, clubs list)
 * - Orchestrating presentation components and dashboards
 */
export default function StatisticsPage() {
  const { token, onAuthError } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const [selectedClub, setSelectedClub] = useState<string>(STATISTICS_STRINGS.ALL_CLUBS);
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    const fetchClubs = async () => {
      if (!token) {
        console.error(STATISTICS_STRINGS.AUTH_ERROR_LOG);
        return;
      }
      try {
        startLoading();
        const fetchedClubs = await api.getClubs(token, onAuthError);
        setClubs(fetchedClubs);
      } catch (error) {
        console.error(STATISTICS_STRINGS.ERROR_FETCHING_CLUBS, error);
      } finally {
        stopLoading();
      }
    };
    fetchClubs();
  }, [token, onAuthError, startLoading, stopLoading]);

  return (
    <StatisticsLayout>
      <StatisticsHeader 
        clubs={clubs} 
        onClubChange={setSelectedClub} 
      />
      
      <StatisticsDashboards selectedClub={selectedClub} />
    </StatisticsLayout>
  );
}
