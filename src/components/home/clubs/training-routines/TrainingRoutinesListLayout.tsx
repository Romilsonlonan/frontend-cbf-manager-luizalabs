"use client";

import React from 'react';
import styles from './TrainingRoutinesListLayout.module.css';

interface TrainingRoutinesListLayoutProps {
  children: React.ReactNode;
}

export const TrainingRoutinesListLayout: React.FC<TrainingRoutinesListLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};
