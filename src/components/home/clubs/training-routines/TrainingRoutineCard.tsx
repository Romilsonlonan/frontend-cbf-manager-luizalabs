"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrainingRoutine } from '@/app/home/clubs/[clubId]/training-routines/types';
import { TRAINING_ROUTINE_STRINGS } from '@/constants/training.constants';
import styles from './TrainingRoutineCard.module.css';

interface TrainingRoutineCardProps {
  routine: TrainingRoutine;
  onEdit: (routine: TrainingRoutine) => void;
  onDelete: (id: number) => void;
}

export const TrainingRoutineCard: React.FC<TrainingRoutineCardProps> = ({
  routine,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle>{routine.activity}</CardTitle>
        <p className={styles.time}>{routine.time}</p>
      </CardHeader>
      <CardContent>
        <p className={styles.description}>{routine.description}</p>
        <div className={styles.actions}>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(routine)}
          >
            {TRAINING_ROUTINE_STRINGS.BUTTON_EDIT}
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => onDelete(routine.id)}
          >
            {TRAINING_ROUTINE_STRINGS.BUTTON_DELETE}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
