import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

export interface NationalityStats {
  name: string;
  value: number;
}

export function useNationalityData(selectedClub: string) {
  const { token, onAuthError } = useAuth();
  const [data, setData] = useState<NationalityStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const clubs = await api.getClubs(token, onAuthError);
      const clubId = selectedClub === 'Todos' ? null : clubs.find(c => c.name === selectedClub)?.id || null;

      const [goalkeepers, fieldPlayers] = await Promise.all([
        api.getGoalkeepers(token, clubId, '', onAuthError),
        api.getFieldPlayers(token, clubId, '', '', onAuthError)
      ]);

      const allPlayers = [...goalkeepers, ...fieldPlayers];
      
      let brasileiros = 0;
      let estrangeiros = 0;

      allPlayers.forEach(player => {
        const nac = player.nationality?.toLowerCase() || '';
        if (nac === 'brasil' || nac === 'brasileiro' || nac === 'brasileira') {
          brasileiros++;
        } else if (nac && nac !== 'n/a' && nac !== '0' && nac !== '—') {
          estrangeiros++;
        }
      });

      setData([
        { name: 'Brasileiros', value: brasileiros },
        { name: 'Estrangeiros', value: estrangeiros },
      ]);
    } catch (err) {
      console.error('Failed to fetch nationality data:', err);
      setError('Falha ao carregar dados de nacionalidade.');
    } finally {
      setLoading(false);
    }
  }, [token, selectedClub, onAuthError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh: fetchData };
}
