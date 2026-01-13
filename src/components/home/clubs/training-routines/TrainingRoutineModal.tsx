"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrainingRoutine, NewRoutine, DAYS_OF_WEEK } from '@/app/home/clubs/[clubId]/training-routines/types';
import { TRAINING_ROUTINE_STRINGS } from '@/constants/training.constants';
import styles from './TrainingRoutineModal.module.css';

interface TrainingRoutineModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingRoutine: TrainingRoutine | null;
  newRoutine: NewRoutine;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onSubmit: () => void;
}

export const TrainingRoutineModal: React.FC<TrainingRoutineModalProps> = ({
  isOpen,
  onOpenChange,
  editingRoutine,
  newRoutine,
  onInputChange,
  onSelectChange,
  onSubmit,
}) => {
  const currentData = editingRoutine || newRoutine;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingRoutine ? TRAINING_ROUTINE_STRINGS.MODAL_TITLE_EDIT : TRAINING_ROUTINE_STRINGS.MODAL_TITLE_CREATE}
          </DialogTitle>
        </DialogHeader>
        <div className={styles.modalBody}>
          <div className={styles.fieldRow}>
            <Label htmlFor="day_of_week" className={styles.label}>
              {TRAINING_ROUTINE_STRINGS.LABEL_DAY_OF_WEEK}
            </Label>
            <Select
              name="day_of_week"
              value={currentData.day_of_week}
              onValueChange={(value) => onSelectChange('day_of_week', value)}
            >
              <SelectTrigger className={styles.input}>
                <SelectValue placeholder={TRAINING_ROUTINE_STRINGS.PLACEHOLDER_DAY} />
              </SelectTrigger>
              <SelectContent>
                {DAYS_OF_WEEK.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className={styles.fieldRow}>
            <Label htmlFor="time" className={styles.label}>
              {TRAINING_ROUTINE_STRINGS.LABEL_TIME}
            </Label>
            <Input
              id="time"
              name="time"
              value={currentData.time}
              onChange={onInputChange}
              className={styles.input}
              placeholder={TRAINING_ROUTINE_STRINGS.PLACEHOLDER_TIME}
            />
          </div>
          <div className={styles.fieldRow}>
            <Label htmlFor="activity" className={styles.label}>
              {TRAINING_ROUTINE_STRINGS.LABEL_ACTIVITY}
            </Label>
            <Input
              id="activity"
              name="activity"
              value={currentData.activity}
              onChange={onInputChange}
              className={styles.input}
              placeholder={TRAINING_ROUTINE_STRINGS.PLACEHOLDER_ACTIVITY}
            />
          </div>
          <div className={styles.fieldRow}>
            <Label htmlFor="description" className={styles.label}>
              {TRAINING_ROUTINE_STRINGS.LABEL_DESCRIPTION}
            </Label>
            <Input
              id="description"
              name="description"
              value={currentData.description}
              onChange={onInputChange}
              className={styles.input}
              placeholder={TRAINING_ROUTINE_STRINGS.PLACEHOLDER_DESCRIPTION}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSubmit}>
            {editingRoutine ? TRAINING_ROUTINE_STRINGS.BUTTON_SAVE_CHANGES : TRAINING_ROUTINE_STRINGS.BUTTON_SUBMIT}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
