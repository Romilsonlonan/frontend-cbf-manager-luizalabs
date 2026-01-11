'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { allStatsColumns, categories } from '@/lib/roster-data';
import { PlayerStatsColumn } from '@/lib/definitions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useAuth } from '@/context/AuthContext';
import { useLoading } from '@/context/LoadingContext';
import { api } from '@/lib/api';
import { GoalkeeperResponse, FieldPlayerResponse, Club } from '@/lib/types';
import { IsLoading } from '@/components/home/athletes/is-loading/IsLoading';
import { AthletesPageContent } from '@/components/home/athletes/AthletesPageContent';

// ======================================================
// 🔒 ORDEM OFICIAL ESPN — GOLEIROS (FONTE DA VERDADE)
// ======================================================
const GOALKEEPER_ESPN_ORDER = [
  'name', 'position', 'age', 'height', 'weight', 'nationality',
  'games', 'substitutions', 'saves', 'goals_conceded', 'assists',
  'fouls_committed', 'fouls_suffered', 'yellow_cards', 'red_cards',
] as const;

// ======================================================
// 🔒 ORDEM OFICIAL ESPN — JOGADORES DE CAMPO (FONTE DA VERDADE)
// ======================================================
const FIELD_PLAYER_ESPN_ORDER = [
  'name', 'position', 'age', 'height', 'weight', 'nationality',
  'games', 'substitutions', 'goals', 'assists',
  'total_shots', 'shots_on_goal', 'fouls_committed', 'fouls_suffered',
  'yellow_cards', 'red_cards',
] as const;

// ======================================================
// 🧠 Função utilitária — preserva a ordem SEMPRE
// ======================================================
const getColumnsByOrder = (keys: readonly string[]): PlayerStatsColumn[] => {
  return keys
    .map(key => allStatsColumns.find(col => col.key === key))
    .filter((col): col is PlayerStatsColumn => Boolean(col));
};

export default function Home() {
  const searchParams = useSearchParams();
  const { token, onAuthError } = useAuth();
  const { startLoading, stopLoading } = useLoading();

  const [goalkeepers, setGoalkeepers] = useState<GoalkeeperResponse[]>([]);
  const [fieldPlayers, setFieldPlayers] = useState<FieldPlayerResponse[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentCategory = searchParams.get('category') || 'Todos';
  const selectedStatColKeys = searchParams.get('columns')?.split(',') || [];
  const selectedClubIdString = searchParams.get('clubId');
  const selectedClubId = selectedClubIdString && selectedClubIdString !== 'all' ? parseInt(selectedClubIdString) : null;

  // ======================================================
  // 📡 Fetch de dados
  // ======================================================
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
      if (currentCategory === 'Goleiros') {
        const data = await api.getGoalkeepers(token, selectedClubId, '', onAuthError);
        setGoalkeepers(data);
        setFieldPlayers([]);
      } else if (currentCategory === 'Todos') {
        const [gks, fps] = await Promise.all([
          api.getGoalkeepers(token, selectedClubId, '', onAuthError),
          api.getFieldPlayers(token, selectedClubId, '', '', onAuthError),
        ]);
        setGoalkeepers(gks);
        setFieldPlayers(fps);
      } else {
        const backendPositionMap: Record<string, string> = {
          'Defensores': 'Defensor',
          'Meio-Campistas': 'Meio-Campista',
          'Atacantes': 'Atacante',
        };
        const positionFilter = backendPositionMap[currentCategory] || '';
        const data = await api.getFieldPlayers(token, selectedClubId, '', positionFilter, onAuthError);
        setFieldPlayers(data);
        setGoalkeepers([]);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch players.');
    } finally {
      setLoading(false);
      stopLoading();
    }
  }, [token, currentCategory, selectedClubId, onAuthError, startLoading, stopLoading]);

  // ======================================================
  // 📡 Fetch de clubes
  // ======================================================
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

  // ======================================================
  // 🏟️ Hero image
  // ======================================================
  const selectedClub = clubs.find(club => club.id === selectedClubId);
  const bannerImageUrl = selectedClub?.banner_image_url ? `http://localhost:8000${selectedClub.banner_image_url}` : (PlaceHolderImages.find(img => img.id === 'stadium-hero')?.imageUrl ?? 'https://i.ibb.co/5gRwYCCV/torcidas.png');
  const bannerImageHint = selectedClub?.name ? `Banner do clube ${selectedClub.name}` : 'soccer stadium';

  // ======================================================
  // 📊 COLUNAS
  // ======================================================
  const goalkeeperColumns = getColumnsByOrder(
    selectedStatColKeys.length > 0 && (currentCategory === 'Goleiros' || currentCategory === 'Todos')
      ? selectedStatColKeys
      : GOALKEEPER_ESPN_ORDER
  );

  const fieldPlayerColumns = getColumnsByOrder(
    selectedStatColKeys.length > 0 && (currentCategory === 'Defensores' || currentCategory === 'Meio-Campistas' || currentCategory === 'Atacantes' || currentCategory === 'Todos')
      ? selectedStatColKeys
      : FIELD_PLAYER_ESPN_ORDER
  );

  const selectableGoalkeeperColumns = getColumnsByOrder(GOALKEEPER_ESPN_ORDER);
  const selectableFieldPlayerColumns = getColumnsByOrder(FIELD_PLAYER_ESPN_ORDER);

  // ======================================================
  // ⏳ Loading & Error States
  // ======================================================
  if (loading) {
    return <IsLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <AthletesPageContent
      clubs={clubs}
      goalkeepers={goalkeepers}
      fieldPlayers={fieldPlayers}
      currentCategory={currentCategory}
      selectedClubIdString={selectedClubIdString}
      selectedStatColKeys={selectedStatColKeys}
      goalkeeperColumns={goalkeeperColumns}
      fieldPlayerColumns={fieldPlayerColumns}
      selectableGoalkeeperColumns={selectableGoalkeeperColumns}
      selectableFieldPlayerColumns={selectableFieldPlayerColumns}
      bannerImageUrl={bannerImageUrl}
      bannerImageHint={bannerImageHint}
      loading={loading}
      error={error}
    />
  );
}
