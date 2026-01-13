"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';
import { ClubDetailsResponse } from "@/lib/types";
import styles from './AddTrainingRoutineForm.module.css';
import { TRAINING_ROUTINE_STRINGS } from '@/constants/training.constants';

interface AddTrainingRoutineFormProps {
  club: ClubDetailsResponse;
  routineName: string;
  description: string;
  submitting: boolean;
  onRoutineNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AddTrainingRoutineForm: React.FC<AddTrainingRoutineFormProps> = ({
  club,
  routineName,
  description,
  submitting,
  onRoutineNameChange,
  onDescriptionChange,
  onSubmit,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{TRAINING_ROUTINE_STRINGS.FORM_CARD_TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className={styles.formContainer}>
          <div className={styles.clubInfo}>
            {club.shield_image_url && (
              <Image
                src={club.shield_image_url}
                alt={`${club.name} shield`}
                width={64}
                height={64}
                className={styles.shield}
              />
            )}
            <h2 className={styles.clubName}>{club.name}</h2>
          </div>
          <div className={styles.fieldGroup}>
            <Label htmlFor="routineName">{TRAINING_ROUTINE_STRINGS.LABEL_ROUTINE_NAME}</Label>
            <Input
              id="routineName"
              value={routineName}
              onChange={(e) => onRoutineNameChange(e.target.value)}
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <Label htmlFor="description">{TRAINING_ROUTINE_STRINGS.LABEL_DESCRIPTION}</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? TRAINING_ROUTINE_STRINGS.BUTTON_SUBMITTING : TRAINING_ROUTINE_STRINGS.BUTTON_SUBMIT}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
