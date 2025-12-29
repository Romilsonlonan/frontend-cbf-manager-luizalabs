'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { allStatsColumns, categories, playerCategoryMap, baseColumnKeys, baseColumnKeysSet, goalkeeperStatKeys, fieldPlayerStatKeys } from '@/lib/roster-data';
import type { Category, Player } from '@/lib/definitions';
import { PlayerTable } from '@/components/roster/player-table';
import { CategoryFilter } from '@/components/roster/category-filter';
import { ColumnSelector } from '@/components/roster/column-selector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Goal, Shield, Trophy, Users } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api'; // Import the api service
import { GoalkeeperResponse, FieldPlayerResponse } from '@/lib/types'; // Import new types

export default function Home() {
  const searchParams = useSearchParams();
  const { token, onAuthError } = useAuth(); // Get token and onAuthError from AuthContext
  const [goalkeepers, setGoalkeepers] = useState<GoalkeeperResponse[]>([]);
  const [fieldPlayers, setFieldPlayers] = useState<FieldPlayerResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentCategory = searchParams.get('category') || 'Todos';
  const selectedStatColKeys = searchParams.get('columns')?.split(',') || [];

  const fetchPlayers = useCallback(async () => {
    if (!token) {
      setError('Authentication token not found. Please log in.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (currentCategory === 'Goleiros') {
        const data = await api.getGoalkeepers(token, null, '', onAuthError);
        setGoalkeepers(data);
        setFieldPlayers([]); // Clear field players if viewing goalkeepers
      } else if (currentCategory === 'Todos') {
        const gks = await api.getGoalkeepers(token, null, '', onAuthError);
        const fps = await api.getFieldPlayers(token, null, '', '', onAuthError);
        setGoalkeepers(gks);
        setFieldPlayers(fps);
      } else {
        // For 'Defensores', 'Meio-Campistas', 'Atacantes'
        const backendPositionMap: { [key: string]: string } = {
          'Defensores': 'Defensor',
          'Meio-Campistas': 'Meio-Campista',
          'Atacantes': 'Atacante',
        };
        const positionFilter = backendPositionMap[currentCategory] || '';
        const data = await api.getFieldPlayers(token, null, '', positionFilter, onAuthError);
        setFieldPlayers(data);
        setGoalkeepers([]); // Clear goalkeepers if viewing field players
      }
    } catch (err) {
      setError('Failed to fetch players.');
      console.error('Error fetching players:', err);
    } finally {
      setLoading(false);
    }
  }, [token, currentCategory, onAuthError]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const stadiumImage = PlaceHolderImages.find(img => img.id === 'stadium-hero') || { imageUrl: "https://picsum.photos/seed/vasco-stadium/1200/400", imageHint: "soccer stadium"};
  
  const getColumns = (keys: readonly string[]) => {
    return allStatsColumns.filter(c => keys.includes(c.key));
  }
  
  const baseColumns = getColumns(baseColumnKeys);
  // const goalkeepers = players.filter(p => p.position === 'Goleiro'); // No longer needed, state is already separated
  // const fieldPlayers = players.filter(p => p.position !== 'Goleiro'); // No longer needed, state is already separated

  const goalkeeperColumns = [...baseColumns, ...getColumns(goalkeeperStatKeys)];
  const fieldPlayerColumns = [...baseColumns, ...getColumns(fieldPlayerStatKeys)];

  let selectableColumns = allStatsColumns;
  
  if (currentCategory === 'Goleiros') {
    selectableColumns = getColumns(goalkeeperStatKeys);
  } else if (currentCategory === 'Todos') {
    selectableColumns = allStatsColumns.filter(c => !baseColumnKeysSet.has(c.key));
  }
  else {
    selectableColumns = getColumns(fieldPlayerStatKeys);
  }

  // The local filtering is no longer needed as the backend handles it.
  // The 'players' state will already contain the filtered list from the API.
  // const displayedPlayers = players; // No longer a single 'players' array

  // Adjust filtering logic for displaying goalkeepers and field players
  // const displayedGoalkeepers = displayedPlayers.filter(p => p.position === 'Goleiro'); // No longer needed
  // const displayedFieldPlayers = displayedPlayers.filter(p => p.position !== 'Goleiro'); // No longer needed

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p>Carregando jogadores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="relative h-48 md:h-64 w-full">
        <Image
          src={stadiumImage.imageUrl}
          alt="Estádio São Januário"
          fill
          style={{objectFit:"cover"}}
          className="opacity-20"
          data-ai-hint={stadiumImage.imageHint}
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-background via-background/80 to-transparent">
          <div className="text-center">
            <Trophy className="mx-auto h-12 w-12 text-primary" />
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary mt-2">
              Vasco da Gama
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-body">Elenco Principal 2024</p>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Card className="shadow-lg border-none">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Users className="h-6 w-6"/>
                Jogadores
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                 <CategoryFilter categories={['Todos', ...categories]} currentCategory={currentCategory} />
                 <ColumnSelector allColumns={selectableColumns} selectedColumns={selectedStatColKeys} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {currentCategory === 'Todos' ? (
              <>
                {goalkeepers.length > 0 && (
                  <div>
                    <h3 className="font-headline text-xl flex items-center gap-2 mb-4"><Shield className="h-5 w-5 text-primary" />Goleiros</h3>
                    <PlayerTable players={goalkeepers} columns={goalkeeperColumns} />
                  </div>
                )}
                {fieldPlayers.length > 0 && (
                  <div>
                    <h3 className="font-headline text-xl flex items-center gap-2 mb-4"><Goal className="h-5 w-5 text-primary" />Jogadores de Campo</h3>
                    <PlayerTable players={fieldPlayers} columns={fieldPlayerColumns} />
                  </div>
                )}
              </>
            ) : currentCategory === 'Goleiros' ? (
              <PlayerTable players={goalkeepers} columns={[...baseColumns, ...getColumns(selectedStatColKeys.length > 0 ? selectedStatColKeys : goalkeeperStatKeys)]} />
            ) : (
              <PlayerTable players={fieldPlayers} columns={[...baseColumns, ...getColumns(selectedStatColKeys.length > 0 ? selectedStatColKeys : fieldPlayerStatKeys)]} />
            )}
          </CardContent>
        </Card>
      </main>
      
      <footer className="text-center py-6 text-sm text-muted-foreground">
        <p>Desenvolvido com paixão pelo Gigante da Colina.</p>
      </footer>
    </div>
  );
}
