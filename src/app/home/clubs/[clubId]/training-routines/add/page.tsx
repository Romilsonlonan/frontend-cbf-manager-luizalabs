"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getClubDetails, addTrainingRoutine } from "@/lib/api";
import { ClubDetailsResponse } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { ADD_TRAINING_ROUTINE_CONSTANTS } from './constants';
import { AddTrainingRoutineView } from './AddTrainingRoutineView';
import { useLoading } from '@/context/LoadingContext';

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
  const { startLoading, stopLoading } = useLoading();

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
    startLoading(); // Inicia o loading antes do submit
    try {
      await addTrainingRoutine(parseInt(clubId), { name: routineName, description });
      toast({
        title: ADD_TRAINING_ROUTINE_CONSTANTS.SUCCESS_TOAST_TITLE,
        description: ADD_TRAINING_ROUTINE_CONSTANTS.SUCCESS_TOAST_DESCRIPTION,
      });
      router.push(`/home/clubs/${clubId}/training-routines`);
      stopLoading(); // Para o loading após o redirecionamento bem-sucedido
    } catch (e: any) {
      toast({
        title: ADD_TRAINING_ROUTINE_CONSTANTS.ERROR_TOAST_TITLE,
        description: ADD_TRAINING_ROUTINE_CONSTANTS.ERROR_TOAST_DESCRIPTION(e.message),
        variant: "destructive",
      });
      setError(e.message);
      stopLoading(); // Para o loading em caso de erro
    } finally {
      setSubmitting(false);
      stopLoading(); // Garante que o loading pare após a tentativa de submit
    }
  };

  return (
    <AddTrainingRoutineView
      club={club}
      routineName={routineName}
      description={description}
      loading={loading}
      submitting={submitting}
      error={error}
      onRoutineNameChange={setRoutineName}
      onDescriptionChange={setDescription}
      onSubmit={handleSubmit}
    />
  );
}
