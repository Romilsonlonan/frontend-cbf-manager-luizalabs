"use client";

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { TrainingRoutine, DAYS_OF_WEEK } from '@/app/home/clubs/[clubId]/training-routines/types';
import { TRAINING_ROUTINE_STRINGS } from '@/constants/training.constants';
import { TrainingRoutineCard } from './TrainingRoutineCard';
import styles from './TrainingRoutinesList.module.css';

interface TrainingRoutinesListProps {
  routines: TrainingRoutine[];
  onEdit: (routine: TrainingRoutine) => void;
  onDelete: (id: number) => void;
}

export const TrainingRoutinesList: React.FC<TrainingRoutinesListProps> = ({
  routines,
  onEdit,
  onDelete,
}) => {
  return (
    <ScrollArea className={styles.scrollArea}>
      {DAYS_OF_WEEK.map((day) => {
        const routinesForDay = routines.filter((routine) => routine.day_of_week === day);
        if (routinesForDay.length === 0) return null;

        return (
          <div key={day} className={styles.daySection}>
            <h2 className={styles.dayTitle}>{day}</h2>
            <Separator className={styles.separator} />
            <div className={styles.grid}>
              {routinesForDay.map((routine) => (
                <TrainingRoutineCard
                  key={routine.id}
                  routine={routine}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        );
      })}
      {routines.length === 0 && (
        <p className={styles.emptyMessage}>{TRAINING_ROUTINE_STRINGS.EMPTY_LIST_MESSAGE}</p>
      )}
    </ScrollArea>
  );
};
