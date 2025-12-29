'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Shield, // Clubes
  Goal, // Gols
  Hand, // Defesas
  Calendar, // Idade
  Shirt, // Jogos
  Zap, // Chutes (Finalizações e Chutes a Gol)
  HeartCrack, // Faltas (Cometidas e Sofridas)
  Award, // Cartões (Amarelos e Vermelhos)
  Search,
  CircleDot, // Using CircleDot as a generic icon for assists
  Handshake, // Assistências
  Ruler, // Altura
  Weight, // Peso
  Flag, // Nacionalidade
  ArrowRightLeft, // Substituições
  Crosshair, // Tentativas de Cruzamento
  Target, // Chutes a Gol
  Gavel, // Faltas Cometidas
  Scale, // Faltas Sofridas
  CreditCard, // Cartões Amarelos
  SquareSlash, // Cartões Vermelhos
  ShieldAlert, // Defesas
} from 'lucide-react';
import React from 'react'; // Import React and hooks
import { Position } from '@/lib/types'; // Import types
import { AthletesFiltersPosition } from './athletes-filters-position';
import { AthletesFiltersHeight } from './athletes-filters-height';
import { AthletesFiltersWeight } from './athletes-filters-weight';
import { AthletesFiltersGames } from './athletes-filters-games';
import { AthletesFiltersSubstitutions } from './athletes-filters-substitutions';
import { AthletesFiltersGoals } from './athletes-filters-goals';
import { AthletesFiltersAssists } from './athletes-filters-assists';
import { AthletesFiltersShots } from './athletes-filters-shots';
import { AthletesFiltersShotsOnGoal } from './athletes-filters-shots-on-goal';
import { AthletesFiltersName } from './athletes-filters-name';
import { AthletesFiltersNationality } from './athletes-filters-nationality';
import { AthletesFiltersAge } from './athletes-filters-age';
import { AthletesFiltersGamesDialog } from './athletes-filters-games-dialog';
import { AthletesFiltersSubstitutionsDialog } from './athletes-filters-substitutions-dialog';
import { AthletesFiltersGoalsDialog } from './athletes-filters-goals-dialog';
import { AthletesFiltersShotsDialog } from './athletes-filters-shots-dialog';
import { AthletesFiltersShotsOnGoalDialog } from './athletes-filters-shots-on-goal-dialog';
import { AthletesFiltersFoulsCommittedDialog } from './athletes-filters-fouls-committed-dialog';
import { AthletesFiltersFoulsSufferedDialog } from './athletes-filters-fouls-suffered-dialog';
import { AthletesFiltersYellowCardsDialog } from './athletes-filters-yellow-cards-dialog';
import { AthletesFiltersRedCardsDialog } from './athletes-filters-red-cards-dialog';
import Image from 'next/image'; // Import next/image
import styles from './athletes-filters.module.css'; // Import the CSS module
import commonStyles from './athletes-filters-common.module.css';


type ClubFilterOption = {
  value: string;
  label: string;
};

type AthletesFiltersProps = {
  nameFilter: string;
  setNameFilter: (value: string) => void;
  positionFilter: (Position | 'all')[];
  setPositionFilter: (value: (Position | 'all')[]) => void;
  clubFilter: string;
  setClubFilter: (value: string) => void;
  trainingCenterFilter: string;
  setTrainingCenterFilter: (value: string) => void;
  positions: Position[];
  clubs: ClubFilterOption[];
  trainingCenters: string[];
  ageFilter: [number, number];
  setAgeFilter: (value: [number, number]) => void;
  gamesFilter: [number, number];
  setGamesFilter: (value: [number, number]) => void;
  goalsFilter: [number, number];
  setGoalsFilter: (value: [number, number]) => void;
  assistsFilter: [number, number];
  setAssistsFilter: (value: [number, number]) => void;
  shotsFilter: [number, number];
  setShotsFilter: (value: [number, number]) => void;
  // Removed foulsFilter and cardsFilter as they are replaced by more specific filters
  savesFilter: [number, number];
  setSavesFilter: (value: [number, number]) => void;
  heightFilter: [number, number];
  setHeightFilter: (value: [number, number]) => void;
  weightFilter: [number, number];
  setWeightFilter: (value: [number, number]) => void;
  nationalityFilter: string;
  setNationalityFilter: (value: string) => void;
  substituteAppearancesFilter: [number, number];
  setSubstituteAppearancesFilter: (value: [number, number]) => void;
  shotsOnGoalFilter: [number, number];
  setShotsOnGoalFilter: (value: [number, number]) => void;
  foulsCommittedFilter: [number, number];
  setFoulsCommittedFilter: (value: [number, number]) => void;
  foulsSufferedFilter: [number, number];
  setFoulsSufferedFilter: (value: [number, number]) => void;
  yellowCardsFilter: [number, number];
  setYellowCardsFilter: (value: [number, number]) => void;
  redCardsFilter: [number, number];
  setRedCardsFilter: (value: [number, number]) => void;
  defensesFilter: [number, number]; // Added defensesFilter
  setDefensesFilter: (value: [number, number]) => void; // Added setDefensesFilter
  goalsConcededFilter: [number, number];
  setGoalsConcededFilter: (value: [number, number]) => void;
};

export function AthletesFilters({
  nameFilter,
  setNameFilter,
  positionFilter,
  setPositionFilter,
  clubFilter,
  setClubFilter,
  trainingCenterFilter,
  setTrainingCenterFilter,
  positions,
  clubs,
  trainingCenters,
  ageFilter,
  setAgeFilter,
  gamesFilter,
  setGamesFilter,
  goalsFilter,
  setGoalsFilter,
  assistsFilter,
  setAssistsFilter,
  shotsFilter,
  setShotsFilter,
  savesFilter,
  setSavesFilter,
  heightFilter,
  setHeightFilter,
  weightFilter,
  setWeightFilter,
  nationalityFilter,
  setNationalityFilter,
  substituteAppearancesFilter,
  setSubstituteAppearancesFilter,
  shotsOnGoalFilter,
  setShotsOnGoalFilter,
  foulsCommittedFilter,
  setFoulsCommittedFilter,
  foulsSufferedFilter,
  setFoulsSufferedFilter,
  yellowCardsFilter,
  setYellowCardsFilter,
  redCardsFilter,
  setRedCardsFilter,
  defensesFilter, // Added defensesFilter
  setDefensesFilter, // Added setDefensesFilter
  goalsConcededFilter,
  setGoalsConcededFilter,
}: AthletesFiltersProps) {
  const handleRangeChange: (
    setter: (value: [number, number]) => void,
    index: 0 | 1,
    e: React.ChangeEvent<HTMLInputElement>,
    currentValue: [number, number]
  ) => void = (setter, index, e, currentValue) => {
    const inputValue = e.target.value;
    let newValue: number;

    if (inputValue === '') {
      // If input is cleared, set to default min/max
      newValue = index === 0 ? 0 : Infinity;
    } else {
      newValue = parseFloat(inputValue);
    }

    if (!isNaN(newValue)) {
      const newRange = [...currentValue] as [number, number];
      newRange[index] = newValue;
      setter(newRange);
    }
  };

  const handleNationalityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNationalityFilter(e.target.value);
  };

  return (
    <div className={styles.mainContainer}>
      <section className={styles.filterSection}>
        <Image
          src="/campolotado.png" // Use local image path
          alt="Campo de Futebol"
          layout="fill" // Fill the parent container
          objectFit="cover" // Cover the area without distortion
          className={styles.backgroundImage}
          priority // Prioritize loading for LCP
        />
        <div className={styles.filterContentWrapper}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full mx-auto">
            <AthletesFiltersName
              nameFilter={nameFilter}
              setNameFilter={setNameFilter}
            />

            <AthletesFiltersPosition
              positionFilter={positionFilter}
              setPositionFilter={setPositionFilter}
            />

            <AthletesFiltersHeight
              heightFilter={heightFilter}
              setHeightFilter={setHeightFilter}
              handleRangeChange={handleRangeChange}
            />

            <AthletesFiltersWeight
              weightFilter={weightFilter}
              setWeightFilter={setWeightFilter}
              handleRangeChange={handleRangeChange}
            />

            {/* Nacionalidade */}
            <AthletesFiltersNationality
              nationalityFilter={nationalityFilter}
              setNationalityFilter={setNationalityFilter}
            />

            <AthletesFiltersAge
              ageFilter={ageFilter}
              setAgeFilter={setAgeFilter}
              handleRangeChange={handleRangeChange}
            />

            {/* Jogos */}
            <AthletesFiltersGamesDialog
              gamesFilter={gamesFilter}
              setGamesFilter={setGamesFilter}
              handleRangeChange={handleRangeChange}
            />

            {/* Substituições */}
            <AthletesFiltersSubstitutionsDialog
              substituteAppearancesFilter={substituteAppearancesFilter}
              setSubstituteAppearancesFilter={setSubstituteAppearancesFilter}
              handleRangeChange={handleRangeChange}
            />

            {/* Gols */}
            <AthletesFiltersGoalsDialog
              goalsFilter={goalsFilter}
              setGoalsFilter={setGoalsFilter}
              handleRangeChange={handleRangeChange}
            />

            {/* Assistências */}
            <AthletesFiltersAssists
              assistsFilter={assistsFilter}
              setAssistsFilter={setAssistsFilter}
              handleRangeChange={handleRangeChange}
            />

            {/* Tentativas de Cruzamento (Shots) */}
            <AthletesFiltersShotsDialog
              shotsFilter={shotsFilter}
              setShotsFilter={setShotsFilter}
              handleRangeChange={handleRangeChange}
            />

            {/* Chutes a Gol */}
            <AthletesFiltersShotsOnGoalDialog
              shotsOnGoalFilter={shotsOnGoalFilter}
              setShotsOnGoalFilter={setShotsOnGoalFilter}
              handleRangeChange={handleRangeChange}
            />

            {/* Faltas Cometidas */}
            <AthletesFiltersFoulsCommittedDialog
              foulsCommittedFilter={foulsCommittedFilter}
              setFoulsCommittedFilter={setFoulsCommittedFilter}
              handleRangeChange={handleRangeChange}
            />

            {/* Faltas Sofridas */}
            <AthletesFiltersFoulsSufferedDialog
              foulsSufferedFilter={foulsSufferedFilter}
              setFoulsSufferedFilter={setFoulsSufferedFilter}
              handleRangeChange={handleRangeChange}
            />

            {/* Cartões Amarelos */}
            <AthletesFiltersYellowCardsDialog
              yellowCardsFilter={yellowCardsFilter}
              setYellowCardsFilter={setYellowCardsFilter}
              handleRangeChange={handleRangeChange}
            />

            {/* Cartões Vermelhos */}
            <AthletesFiltersRedCardsDialog
              redCardsFilter={redCardsFilter}
              setRedCardsFilter={setRedCardsFilter}
              handleRangeChange={handleRangeChange}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
