'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { allStatsColumns } from '@/lib/roster-data';
import { PlayerStatsColumn } from '@/lib/definitions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { IsLoading } from '@/components/home/athletes/is-loading/IsLoading';
import { AthletesPageContent } from '@/components/home/athletes/AthletesPageContent';
import { PLAYER_COLUMNS } from '@/constants/player-columns';
import { useAthletesData } from '@/hooks/useAthletesData';

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

  const currentCategory = searchParams.get('category') || 'Todos';
  const selectedStatColKeys = useMemo(() => searchParams.get('columns')?.split(',') || [], [searchParams]);
  const selectedClubIdString = searchParams.get('clubId');
  const selectedClubId = useMemo(() => 
    selectedClubIdString && selectedClubIdString !== 'all' ? parseInt(selectedClubIdString) : null
  , [selectedClubIdString]);

  const {
    goalkeepers,
    fieldPlayers,
    clubs,
    loading,
    error,
  } = useAthletesData(currentCategory, selectedClubId);

  // ======================================================
  // 🏟️ Hero image (Memoizada)
  // ======================================================
  const bannerData = useMemo(() => {
    const selectedClub = clubs.find(club => club.id === selectedClubId);
    const url = selectedClub?.banner_image_url 
      ? `http://localhost:8000${selectedClub.banner_image_url}` 
      : (PlaceHolderImages.find(img => img.id === 'stadium-hero')?.imageUrl ?? 'https://i.ibb.co/5gRwYCCV/torcidas.png');
    const hint = selectedClub?.name ? `Banner do clube ${selectedClub.name}` : 'soccer stadium';
    
    return { url, hint };
  }, [clubs, selectedClubId]);

  // ======================================================
  // 📊 COLUNAS (Memoizadas)
  // ======================================================
  const goalkeeperColumns = useMemo(() => getColumnsByOrder(
    selectedStatColKeys.length > 0 && (currentCategory === 'Goleiros' || currentCategory === 'Todos')
      ? selectedStatColKeys
      : PLAYER_COLUMNS.GOALKEEPER
  ), [selectedStatColKeys, currentCategory]);

  const fieldPlayerColumns = useMemo(() => getColumnsByOrder(
    selectedStatColKeys.length > 0 && (currentCategory === 'Defensores' || currentCategory === 'Meio-Campistas' || currentCategory === 'Atacantes' || currentCategory === 'Todos')
      ? selectedStatColKeys
      : PLAYER_COLUMNS.FIELD_PLAYER
  ), [selectedStatColKeys, currentCategory]);

  const selectableGoalkeeperColumns = useMemo(() => getColumnsByOrder(PLAYER_COLUMNS.GOALKEEPER), []);
  const selectableFieldPlayerColumns = useMemo(() => getColumnsByOrder(PLAYER_COLUMNS.FIELD_PLAYER), []);

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
      bannerImageUrl={bannerData.url}
      bannerImageHint={bannerData.hint}
      loading={loading}
      error={error}
    />
  );
}
