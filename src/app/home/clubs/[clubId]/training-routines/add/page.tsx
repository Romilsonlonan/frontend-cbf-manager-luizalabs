"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getClubDetails, addTrainingRoutine } from "@/lib/api";
import { ClubDetailsResponse } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { AddTrainingRoutineForm } from '@/components/home/clubs/training-routines/AddTrainingRoutineForm';
import { AddTrainingRoutineHeader } from '@/components/home/clubs/training-routines/AddTrainingRoutineHeader';
import { TRAINING_ROUTINE_STRINGS } from '@/constants/training.constants';
import styles from './page.module.css';

/**
 * AddTrainingRoutinePage (Container Component)
 * 
 * Responsibilities:
 * - Data fetching (getClubDetails)
 * - State management (routineName, description, loading, submitting)
 * - Event handling (handleSubmit)
 * - Orchestrating presentation components
 */
export default function AddTrainingRoutinePage() {
  const router = useRouter();
  const params = useParams();
  const clubId = params.clubId as string;

  const [club, setClub] = useState<ClubDetailsResponse | null>(null);
  const [routineName, setRoutineName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const data = await getClubDetails(parseInt(clubId));
        setClub(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (clubId) {
      fetchClub();
    }
  }, [clubId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addTrainingRoutine(parseInt(clubId), { name: routineName, description });
      toast({
        title: TRAINING_ROUTINE_STRINGS.SUCCESS_TOAST_TITLE,
        description: TRAINING_ROUTINE_STRINGS.SUCCESS_TOAST_DESCRIPTION,
      });
      router.push(`/home/clubs/${clubId}/training-routines`);
    } catch (e: any) {
      toast({
        title: TRAINING_ROUTINE_STRINGS.ERROR_TOAST_TITLE,
        description: TRAINING_ROUTINE_STRINGS.ERROR_TOAST_DESCRIPTION(e.message),
        variant: "destructive",
      });
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <AddTrainingRoutineHeader />
        <p className={styles.loadingText}>{TRAINING_ROUTINE_STRINGS.LOADING_CLUB}</p>
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
        <AddTrainingRoutineHeader error={TRAINING_ROUTINE_STRINGS.CLUB_NOT_FOUND} />
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
        onRoutineNameChange={setRoutineName}
        onDescriptionChange={setDescription}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
