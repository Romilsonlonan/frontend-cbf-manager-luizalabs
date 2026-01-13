"use client";

import React from 'react';
import styles from './TrainingCentersLayout.module.css';

interface TrainingCentersLayoutProps {
  children: React.ReactNode;
}

export const TrainingCentersLayout: React.FC<TrainingCentersLayoutProps> = ({ children }) => {
  return (
    <div className={styles.trainingCentersContainer}>
      {children}
    </div>
  );
};
