'use client';

import Image from 'next/image';
import { Trophy, Users, Shield, Goal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayerTable } from '@/components/home/athletes/player-table/PlayerTable';
import { CategoryFilter } from '@/components/roster/category-filter';
import { ColumnSelector } from '@/components/roster/column-selector';
import { ClubFilter } from '@/components/roster/club-filter';
import { Glossary } from '@/components/home/athletes/glossary/Glossary';
import { 
  Club, 
  GoalkeeperResponse, 
  FieldPlayerResponse 
} from '@/lib/types';
import { PlayerStatsColumn } from '@/lib/definitions';
import { categories } from '@/lib/roster-data';

interface AthletesPageContentProps {
  clubs: Club[];
  goalkeepers: GoalkeeperResponse[];
  fieldPlayers: FieldPlayerResponse[];
  currentCategory: string;
  selectedClubIdString: string | null;
  selectedStatColKeys: string[];
  goalkeeperColumns: PlayerStatsColumn[];
  fieldPlayerColumns: PlayerStatsColumn[];
  selectableGoalkeeperColumns: PlayerStatsColumn[];
  selectableFieldPlayerColumns: PlayerStatsColumn[];
  bannerImageUrl: string;
  bannerImageHint: string;
  loading: boolean;
  error: string | null;
}

export function AthletesPageContent({
  clubs,
  goalkeepers,
  fieldPlayers,
  currentCategory,
  selectedClubIdString,
  selectedStatColKeys,
  goalkeeperColumns,
  fieldPlayerColumns,
  selectableGoalkeeperColumns,
  selectableFieldPlayerColumns,
  bannerImageUrl,
  bannerImageHint,
  loading,
  error,
}: AthletesPageContentProps) {
  return (
    <div className="bg-background text-foreground">
      <header className="relative h-80 md:h-[500px] w-full">
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
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-white mt-2">
              Aqui o maior campeão é você!
            </h1>
            <p className="text-lg md:text-xl text-white font-body">
              Atualização toda a semana!
            </p>
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

            <Glossary />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
