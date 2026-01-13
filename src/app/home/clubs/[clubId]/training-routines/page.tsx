'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { api } from '@/lib/api';
import { ClubSimpleResponse } from '@/lib/types';
import { TrainingRoutine, NewRoutine, DAYS_OF_WEEK } from './types';
import { TRAINING_ROUTINE_STRINGS } from '@/constants/training.constants';
import { TrainingRoutinesListHeader } from '@/components/home/clubs/training-routines/TrainingRoutinesListHeader';
import { TrainingRoutineCard } from '@/components/home/clubs/training-routines/TrainingRoutineCard';
import { TrainingRoutineModal } from '@/components/home/clubs/training-routines/TrainingRoutineModal';
import { TrainingRoutinesListLayout } from '@/components/home/clubs/training-routines/TrainingRoutinesListLayout';
import { TrainingRoutinesList } from '@/components/home/clubs/training-routines/TrainingRoutinesList';

/**
 * TrainingRoutinesPage (Container Component)
 * 
 * Responsibilities:
 * - Data fetching (routines, club details)
 * - State management (modal, editing, new routine)
 * - Event handling (submit, delete, auth errors)
 * - Orchestrating presentation components
 */
const TrainingRoutinesPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const clubId = params.clubId ? parseInt(params.clubId as string) : null;

  const [routines, setRoutines] = useState<TrainingRoutine[]>([]);
  const [clubDetails, setClubDetails] = useState<ClubSimpleResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState<TrainingRoutine | null>(null);
  const [newRoutine, setNewRoutine] = useState<NewRoutine>({
    day_of_week: '',
    time: '',
    activity: '',
    description: '',
  });

  useEffect(() => {
    if (clubId) {
      fetchRoutines();
      fetchClubDetails(clubId);
    }
    if (searchParams.get('action') === 'add-routine') {
      openCreateModal();
    }
  }, [clubId, searchParams]);

  const handleAuthError = () => {
    localStorage.removeItem('access_token');
    router.push('/login');
    toast({
      title: TRAINING_ROUTINE_STRINGS.AUTH_ERROR_TITLE,
      description: TRAINING_ROUTINE_STRINGS.AUTH_ERROR_DESCRIPTION,
      variant: 'destructive',
    });
  };

  const fetchClubDetails = async (id: number) => {
    try {
      const club = await api.getClubDetails(id);
      setClubDetails(club);
    } catch (error: any) {
      console.error('Error fetching club details:', error);
      if (error.message.includes('Credenciais inválidas') || error.message.includes('No access token found')) {
        handleAuthError();
      } else {
        toast({
          title: TRAINING_ROUTINE_STRINGS.ERROR_TOAST_TITLE,
          description: TRAINING_ROUTINE_STRINGS.FETCH_CLUB_ERROR,
          variant: 'destructive',
        });
      }
    }
  };

  const fetchRoutines = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        handleAuthError();
        return;
      }

      const response = await fetch(`http://localhost:8000/training_routines/?club_id=${clubId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          handleAuthError();
          return;
        }
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const data: TrainingRoutine[] = await response.json();
      setRoutines(data);
    } catch (error) {
      console.error('Error fetching routines:', error);
      toast({
        title: TRAINING_ROUTINE_STRINGS.ERROR_TOAST_TITLE,
        description: TRAINING_ROUTINE_STRINGS.FETCH_ROUTINES_ERROR,
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingRoutine) {
      setEditingRoutine({ ...editingRoutine, [name]: value });
    } else {
      setNewRoutine({ ...newRoutine, [name]: value });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (editingRoutine) {
      setEditingRoutine({ ...editingRoutine, [name]: value });
    } else {
      setNewRoutine({ ...newRoutine, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (!clubId) return;

    const isEdit = !!editingRoutine;
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit
      ? `http://localhost:8000/training_routines/${editingRoutine.id}`
      : 'http://localhost:8000/training_routines/';
    const payload = isEdit
      ? { ...editingRoutine, club_id: clubId }
      : { ...newRoutine, club_id: clubId };

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        handleAuthError();
        return;
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 401) {
          handleAuthError();
          return;
        }
        throw new Error('Failed to save');
      }

      toast({
        title: TRAINING_ROUTINE_STRINGS.SAVE_SUCCESS_TITLE,
        description: TRAINING_ROUTINE_STRINGS.SAVE_SUCCESS_DESCRIPTION(isEdit),
      });
      
      setIsModalOpen(false);
      setEditingRoutine(null);
      setNewRoutine({ day_of_week: '', time: '', activity: '', description: '' });
      fetchRoutines();
    } catch (error: any) {
      console.error('Error saving routine:', error);
      toast({
        title: TRAINING_ROUTINE_STRINGS.ERROR_TOAST_TITLE,
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (routineId: number) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        handleAuthError();
        return;
      }

      const response = await fetch(`http://localhost:8000/training_routines/${routineId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        if (response.status === 401) {
          handleAuthError();
          return;
        }
        throw new Error('Failed to delete');
      }

      toast({
        title: TRAINING_ROUTINE_STRINGS.DELETE_SUCCESS_TITLE,
        description: TRAINING_ROUTINE_STRINGS.DELETE_SUCCESS_DESCRIPTION,
      });
      fetchRoutines();
    } catch (error) {
      console.error('Error deleting routine:', error);
      toast({
        title: TRAINING_ROUTINE_STRINGS.ERROR_TOAST_TITLE,
        description: TRAINING_ROUTINE_STRINGS.DELETE_ERROR_MESSAGE,
        variant: 'destructive',
      });
    }
  };

  const openEditModal = (routine: TrainingRoutine) => {
    setEditingRoutine(routine);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingRoutine(null);
    setNewRoutine({ day_of_week: '', time: '', activity: '', description: '' });
    setIsModalOpen(true);
  };

  const sortedRoutines = useMemo(() => {
    return [...routines].sort((a, b) => {
      const dayA = DAYS_OF_WEEK.indexOf(a.day_of_week);
      const dayB = DAYS_OF_WEEK.indexOf(b.day_of_week);
      if (dayA !== dayB) return dayA - dayB;
      return a.time.localeCompare(b.time);
    });
  }, [routines]);

  return (
    <TrainingRoutinesListLayout>
      <TrainingRoutinesListHeader 
        clubDetails={clubDetails} 
        onAddClick={openCreateModal} 
      />

      <TrainingRoutineModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingRoutine={editingRoutine}
        newRoutine={newRoutine}
        onInputChange={handleInputChange}
        onSelectChange={handleSelectChange}
        onSubmit={handleSubmit}
      />

      <TrainingRoutinesList
        routines={sortedRoutines}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />
    </TrainingRoutinesListLayout>
  );
};

export default TrainingRoutinesPage;
