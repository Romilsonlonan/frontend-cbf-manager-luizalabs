"use client";

import React from 'react';
import { GoalsByAthleteDashboard } from './GoalsByAthleteDashboard';
import { FoulsCardsDashboard } from './FoulsCardsDashboard';
import { AgeDashboard } from './AgeDashboard';
import { NationalityDonutChart } from './NationalityDonutChart';
import styles from './StatisticsDashboards.module.css';

interface StatisticsDashboardsProps {
  selectedClub: string;
}

export const StatisticsDashboards: React.FC<StatisticsDashboardsProps> = ({ selectedClub }) => {
  return (
    <div className={styles.dashboardsContainer}>
      <div className={styles.topGrid}>
        <GoalsByAthleteDashboard selectedClub={selectedClub} />
        <FoulsCardsDashboard selectedClub={selectedClub} />
      </div>
      <div className="mt-8">
        <NationalityDonutChart selectedClub={selectedClub} />
      </div>
      <AgeDashboard selectedClub={selectedClub} />
    </div>
  );
};
