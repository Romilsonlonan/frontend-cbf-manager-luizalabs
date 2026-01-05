'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { allStatsColumns, categories, fieldPlayerStatKeys } from '@/lib/roster-data';
import { PlayerTable } from '@/components/home/athletes/player-table/PlayerTable';
import { CategoryFilter } from '@/components/roster/category-filter';
import { ColumnSelector } from '@/components/roster/column-selector';
import { ClubFilter } from '@/components/roster/club-filter';
import { PlayerStatsColumn } from '@/lib/definitions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Goal, Shield, Trophy, Users } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { GoalkeeperResponse, FieldPlayerResponse, Player, Club } from '@/lib/types';

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
    }
  }, [token, currentCategory, selectedClubId, onAuthError]);

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando jogadores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // ======================================================
  // 🧩 RENDER
  // ======================================================
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="relative h-48 md:h-64 w-full">
        <Image
          src={bannerImageUrl}
          alt={bannerImageHint}
          fill
          style={{ objectFit: 'cover' }}
          data-ai-hint={bannerImageHint}
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center p-4 bg-black/50 rounded-lg">
            <Trophy className="mx-auto h-12 w-12 text-white" />
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-white mt-2">Aqui o maior campeão é você!</h1>
            <p className="text-lg md:text-xl text-white font-body">Atualização toda a semana!</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="shadow-lg border-none">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Users className="h-6 w-6" />
                Jogadores
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <ClubFilter clubs={clubs} selectedClubId={selectedClubIdString} />
                <CategoryFilter categories={['Todos', ...categories]} currentCategory={currentCategory} />
                {(currentCategory === 'Goleiros' || currentCategory === 'Todos') && (
                  <ColumnSelector 
                    allColumns={selectableGoalkeeperColumns} 
                    selectedColumns={selectedStatColKeys} 
                    label="Col Goleiro"
                  />
                )}
                {(currentCategory === 'Defensores' || currentCategory === 'Meio-Campistas' || currentCategory === 'Atacantes' || currentCategory === 'Todos') && (
                  <ColumnSelector 
                    allColumns={selectableFieldPlayerColumns} 
                    selectedColumns={selectedStatColKeys} 
                    label="Col Jogadores"
                  />
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {currentCategory === 'Todos' ? (
              <>
                {goalkeepers.length > 0 && (
                  <div>
                    <h3 className="font-headline text-xl flex items-center gap-2 mb-4">
                      <Shield className="h-5 w-5 text-primary" />
                      Goleiros
                    </h3>
                    <PlayerTable 
                      players={goalkeepers} 
                      isLoading={loading} 
                      error={error} 
                      columns={goalkeeperColumns}
                    />
                  </div>
                )}
                {fieldPlayers.length > 0 && (
                  <div>
                    <h3 className="font-headline text-xl flex items-center gap-2 mb-4">
                      <Goal className="h-5 w-5 text-primary" />
                      Jogadores de Campo
                    </h3>
                    <PlayerTable 
                      players={fieldPlayers} 
                      isLoading={loading} 
                      error={error} 
                      columns={fieldPlayerColumns}
                    />
                  </div>
                )}
              </>
            ) : currentCategory === 'Goleiros' ? (
              <PlayerTable 
                players={goalkeepers} 
                isLoading={loading} 
                error={error} 
                columns={goalkeeperColumns}
              />
            ) : (
              <PlayerTable 
                players={fieldPlayers} 
                isLoading={loading} 
                error={error} 
                columns={fieldPlayerColumns}
              />
            )}

            {/* Glossário */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                Glossário
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-4 gap-x-4 text-xs text-muted-foreground">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">Nome:</span>
                  <span>Nome</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">POS:</span>
                  <span>Posição</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">Idade:</span>
                  <span>Idade atual do jogador</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">Alt:</span>
                  <span>Altura</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">P:</span>
                  <span>Peso</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">NAC:</span>
                  <span>Nacionalidade</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">J:</span>
                  <span>Jogos</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">SUB:</span>
                  <span>Substitute Appearances</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">G:</span>
                  <span>Total de gols</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">A:</span>
                  <span>Assistências</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">TC:</span>
                  <span>Finalizações</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">CG:</span>
                  <span>Chutes a gol</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">FC:</span>
                  <span>Faltas cometidas</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">FS:</span>
                  <span>Faltas sofridas</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">CA:</span>
                  <span>Cartões amarelos</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">CV:</span>
                  <span>Cartões vermelhos</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">D:</span>
                  <span>Defesas</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground">GS:</span>
                  <span>Gols sofridos</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="text-center py-6 text-sm text-muted-foreground">
        <p>Desenvolvido com paixão pelo Gigante da Colina.</p>
      </footer>
    </div>
  );
}
