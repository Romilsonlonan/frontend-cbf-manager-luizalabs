"use client";

import React from 'react';
import styles from './StatisticsLayout.module.css';

interface StatisticsLayoutProps {
  children: React.ReactNode;
}

export const StatisticsLayout: React.FC<StatisticsLayoutProps> = ({ children }) => {
  return (
    <div className={styles.pageContainer}>
      {children}
    </div>
  );
};
