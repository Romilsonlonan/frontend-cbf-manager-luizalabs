"use client";

import React from 'react';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <main className={styles.main}>
      <div className={styles.dashboardContainer}>
        {children}
      </div>
    </main>
  );
};
