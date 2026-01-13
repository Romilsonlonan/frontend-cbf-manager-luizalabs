"use client";

import React from 'react';
import styles from './AddTrainingRoutineHeader.module.css';
import { TRAINING_ROUTINE_STRINGS } from '@/constants/training.constants';

interface AddTrainingRoutineHeaderProps {
  clubName?: string;
  error?: string | null;
}

export const AddTrainingRoutineHeader: React.FC<AddTrainingRoutineHeaderProps> = ({ clubName, error }) => {
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.title}>
        {clubName 
          ? TRAINING_ROUTINE_STRINGS.PAGE_TITLE_FOR_CLUB(clubName) 
          : TRAINING_ROUTINE_STRINGS.PAGE_TITLE}
      </h1>
      {error ? (
        <p className={styles.error}>{TRAINING_ROUTINE_STRINGS.ERROR_LOADING_CLUB(error)}</p>
      ) : (
        <p className={styles.description}>{TRAINING_ROUTINE_STRINGS.PAGE_DESCRIPTION}</p>
      )}
    </div>
  );
};
