'use client';

import React from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { DashboardStats } from '@/components/home/dashboard/DashboardStats';
import { LeaderboardTable } from '@/components/home/dashboard/LeaderboardTable';
import { DashboardLayout } from '@/components/home/dashboard/DashboardLayout';
import { SubscriptionStatus } from '@/components/home/dashboard/SubscriptionStatus';
import { TrialWelcomeModal } from '@/components/home/dashboard/TrialWelcomeModal';
import { PaymentModal } from '@/components/PaymentModal';
import { useDashboardData } from '@/hooks/useDashboardData';

/**
 * DashboardWithLeaderboardPage (Container Component)
 * 
 * Responsibilities:
 * - Orchestrating presentation components
 * - Using custom hook for logic and data management
 */
export default function DashboardWithLeaderboardPage() {
  const {
    totalAthletes,
    totalClubs,
    totalAppointmentsToday,
    sortedAndFilteredTeams,
    loading,
    isScraping,
    dashboardError,
    leaderboardError,
    searchQuery,
    sortConfig,
    isPaymentModalOpen,
    setSearchQuery,
    setIsPaymentModalOpen,
    handleSort,
    refreshLeaderboard,
    refreshDashboard
  } = useDashboardData();

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

  return (
    <DashboardLayout>
      <TrialWelcomeModal onUpgrade={() => setIsPaymentModalOpen(true)} />
      
      <div className="mb-8">
        <DashboardStats 
          totalAthletes={totalAthletes} 
          totalClubs={totalClubs} 
          totalAppointmentsToday={totalAppointmentsToday}
        />
      </div>

      <div className="flex justify-center mb-8">
        <div className="max-w-2xl w-full">
          <SubscriptionStatus onUpgrade={() => setIsPaymentModalOpen(true)} />
        </div>
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={() => {
          setIsPaymentModalOpen(false);
          refreshDashboard();
        }}
      />

      <LeaderboardTable
        data={sortedAndFilteredTeams}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortConfig={sortConfig}
        onSort={handleSort}
        isScraping={isScraping}
        onRefresh={refreshLeaderboard}
        error={leaderboardError}
      />
    </DashboardLayout>
  );
}
