"use client";

import React from 'react';
import { AddTrainingRoutineForm } from '@/components/home/clubs/training-routines/AddTrainingRoutineForm';
import { AddTrainingRoutineHeader } from '@/components/home/clubs/training-routines/AddTrainingRoutineHeader';
import { ADD_TRAINING_ROUTINE_CONSTANTS } from './constants';
import { AddTrainingRoutineViewProps } from './types';
import styles from './page.module.css';

/**
 * AddTrainingRoutineView (Presentation Component)
 * 
 * Responsibilities:
 * - Rendering the UI
 * - Displaying loading and error states
 * - Organizing the layout of the page
 */
export const AddTrainingRoutineView: React.FC<AddTrainingRoutineViewProps> = ({
  club,
  routineName,
  description,
  loading,
  submitting,
  error,
  onRoutineNameChange,
  onDescriptionChange,
  onSubmit,
}) => {
  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <AddTrainingRoutineHeader />
        <p className={styles.loadingText}>{ADD_TRAINING_ROUTINE_CONSTANTS.LOADING_CLUB}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageContainer}>
        <AddTrainingRoutineHeader error={error} />
      </div>
    );
  }

  if (!club) {
    return (
      <div className={styles.pageContainer}>
        <AddTrainingRoutineHeader error={ADD_TRAINING_ROUTINE_CONSTANTS.CLUB_NOT_FOUND} />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <AddTrainingRoutineHeader clubName={club.name} />

      <AddTrainingRoutineForm
        club={club}
        routineName={routineName}
        description={description}
        submitting={submitting}
        onRoutineNameChange={onRoutineNameChange}
        onDescriptionChange={onDescriptionChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};
