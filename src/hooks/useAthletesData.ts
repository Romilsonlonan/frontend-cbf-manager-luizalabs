import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { GoalkeeperResponse, FieldPlayerResponse, Club } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { useLoading } from '@/context/LoadingContext';

export const useAthletesData = (currentCategory: string, selectedClubId: number | null) => {
  const { token, onAuthError } = useAuth();
  const { startLoading, stopLoading } = useLoading();

  const [goalkeepers, setGoalkeepers] = useState<GoalkeeperResponse[]>([]);
  const [fieldPlayers, setFieldPlayers] = useState<FieldPlayerResponse[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlayers = useCallback(async () => {
    if (!token) {
      setError('Authentication token not found.');
      setLoading(false);
      return;
    }

    setLoading(true);
    startLoading();
    setError(null);

    try {
      const fetchStrategy: Record<string, () => Promise<void>> = {
        'Goleiros': async () => {
          const data = await api.getGoalkeepers(token, selectedClubId, '', onAuthError);
          setGoalkeepers(data);
          setFieldPlayers([]);
        },
        'Todos': async () => {
          const [gks, fps] = await Promise.all([
            api.getGoalkeepers(token, selectedClubId, '', onAuthError),
            api.getFieldPlayers(token, selectedClubId, '', '', onAuthError),
          ]);
          setGoalkeepers(gks);
          setFieldPlayers(fps);
        },
        'Defensores': async () => {
          const data = await api.getFieldPlayers(token, selectedClubId, '', 'Defensor', onAuthError);
          setFieldPlayers(data);
          setGoalkeepers([]);
        },
        'Meio-Campistas': async () => {
          const data = await api.getFieldPlayers(token, selectedClubId, '', 'Meio-Campista', onAuthError);
          setFieldPlayers(data);
          setGoalkeepers([]);
        },
        'Atacantes': async () => {
          const data = await api.getFieldPlayers(token, selectedClubId, '', 'Atacante', onAuthError);
          setFieldPlayers(data);
          setGoalkeepers([]);
        },
      };

      const strategy = fetchStrategy[currentCategory] || fetchStrategy['Todos'];
      await strategy();
    } catch (err) {
      console.error(err);
      setError('Failed to fetch players.');
    } finally {
      setLoading(false);
      stopLoading();
    }
  }, [token, currentCategory, selectedClubId, onAuthError, startLoading, stopLoading]);

  const fetchClubs = useCallback(async () => {
    if (!token) return;

    try {
      const data = await api.getClubs(token, onAuthError);
      setClubs(data);
    } catch (err) {
      console.error('Erro ao buscar clubes:', err);
    }
  }, [token, onAuthError]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  return {
    goalkeepers,
    fieldPlayers,
    clubs,
    loading,
    error,
    refetch: fetchPlayers,
  };
};
