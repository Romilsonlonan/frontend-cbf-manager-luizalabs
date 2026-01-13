'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { Athlete, ClubSimpleResponse as Club, Position } from '@/lib/types';
import { api } from '@/lib/api';
import { useLoading } from '@/context/LoadingContext';
import { useAuth } from '@/context/AuthContext';

import { MainView } from '@/components/home/training-centers/page-components/MainView';
import { AppointmentsView } from '@/components/home/training-centers/page-components/AppointmentsView';
import { ManagementView } from '@/components/home/training-centers/page-components/ManagementView';
import { DetailView } from '@/components/home/training-centers/page-components/DetailView';
import { TrainingCentersLayout } from '@/components/home/training-centers/page-components/TrainingCentersLayout';
import { TRAINING_CENTERS_STRINGS } from '@/constants/training-centers.constants';
import { View, positionMap, positions } from './types';

/**
 * TrainingCentersPage (Container Component)
 * 
 * Responsibilities:
 * - Data fetching (clubs, athletes, progress)
 * - State management (view, selections)
 * - Event handling (navigation, refresh)
 * - Orchestrating specialized view components
 */
export default function TrainingCentersPage() {
  const [view, setView] = useState<View>('main');
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const { startLoading, stopLoading } = useLoading();
  const { token } = useAuth();

  // Refs para manter valores estáveis para callbacks
  const selectedAthleteIdRef = useRef<number | null>(null);
  const selectedAthletePositionRef = useRef<Position | null>(null);

  useEffect(() => {
    selectedAthleteIdRef.current = selectedAthlete?.id || null;
    selectedAthletePositionRef.current = selectedAthlete?.position || null;
  }, [selectedAthlete]);

  const handleBack = () => {
    if (view === 'detail') {
      setView('management');
      setSelectedAthlete(null);
    } else if (view === 'management') {
      if (selectedPosition) {
        setSelectedPosition(null);
      } else if (selectedClub) {
        setSelectedClub(null);
        setView('main');
      } else {
        setView('main');
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (!token) return;

      startLoading();
      try {
        const [clubsData, goalkeepers, fieldPlayers] = await Promise.all([
          api.getClubs(token),
          api.getGoalkeepers(token),
          api.getFieldPlayers(token)
        ]);

        if (!isMounted) return;

        setClubs(clubsData as unknown as Club[]);
        
        const mapAthlete = (a: any, pos: Position): Athlete => ({
          ...a,
          club_id: a.club_id,
          position: pos,
          jersey_number: a.jersey_number,
          bodyFat: a.body_fat,
          muscle: a.muscle_mass,
          labData: {
            hdl: a.hdl || 0,
            ldl: a.ldl || 0,
            totalCholesterol: a.total_cholesterol || 0,
            triglycerides: a.triglycerides || 0,
          }
        });

        const allAthletes: Athlete[] = [
          ...goalkeepers.map(g => mapAthlete(g, 'G')),
          ...fieldPlayers.map(f => {
            let pos: Position = 'M';
            const backendPos = f.position.toLowerCase();
            if (backendPos.includes('atacante')) pos = 'A';
            else if (backendPos.includes('defensor')) pos = 'D';
            else if (backendPos.includes('meio')) pos = 'M';
            
            return mapAthlete(f, pos);
          })
        ];
        setAthletes(allAthletes);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        stopLoading();
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [token, startLoading, stopLoading]);

  const handleSelectClub = (club: Club) => {
    setSelectedClub(club);
    setView('management');
    setSelectedPosition(null);
    setSelectedAthlete(null);
  };

  const handleSelectAthlete = async (athlete: Athlete) => {
    if (!token) {
      setSelectedAthlete(athlete);
      setView('detail');
      return;
    }

    startLoading();
    try {
      const isGoalkeeper = athlete.position === 'G';
      const progress = await api.getAthleteProgress(athlete.id, isGoalkeeper, token);
      
      setSelectedAthlete({
        ...athlete,
        progress: progress.map((p: any) => ({
          week: p.week,
          weight: p.weight,
          bodyFat: p.body_fat,
          muscle: p.muscle_mass
        }))
      });
      setView('detail');
    } catch (error) {
      console.error('Erro ao buscar detalhes do atleta:', error);
      setSelectedAthlete(athlete);
      setView('detail');
    } finally {
      stopLoading();
    }
  };

  const refreshAthleteData = useCallback(async (athleteId: number, position: Position) => {
    if (!token) return;
    
    try {
      const isGoalkeeper = position === 'G';
      const [progress, athletesData] = await Promise.all([
        api.getAthleteProgress(athleteId, isGoalkeeper, token),
        isGoalkeeper ? api.getGoalkeepers(token) : api.getFieldPlayers(token)
      ]);
      
      const updatedAthlete = (athletesData as any[]).find(a => a.id === athleteId);
      
      if (updatedAthlete) {
        setSelectedAthlete({
          ...updatedAthlete,
          position: position,
          bodyFat: updatedAthlete.body_fat,
          muscle: updatedAthlete.muscle_mass,
          labData: {
            hdl: updatedAthlete.hdl || 0,
            ldl: updatedAthlete.ldl || 0,
            totalCholesterol: updatedAthlete.total_cholesterol || 0,
            triglycerides: updatedAthlete.triglycerides || 0,
          },
          progress: progress.map((p: any) => ({
            week: p.week,
            weight: p.weight,
            bodyFat: p.body_fat,
            muscle: p.muscle_mass
          }))
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar dados do atleta:', error);
    }
  }, [token]);

  const handleSaveSuccess = useCallback(() => {
    if (selectedAthleteIdRef.current && selectedAthletePositionRef.current) {
      refreshAthleteData(selectedAthleteIdRef.current, selectedAthletePositionRef.current);
    }
  }, [refreshAthleteData]);

  return (
    <TrainingCentersLayout>
      <AnimatePresence mode="wait">
        {view === 'main' && (
          <MainView 
            athletes={athletes} 
            clubs={clubs} 
            onViewChange={(newView) => {
              if (newView === 'management') {
                setSelectedClub(null);
                setSelectedPosition(null);
                setSelectedAthlete(null);
              }
              setView(newView);
            }} 
          />
        )}
        {view === 'management' && (
          <ManagementView
            selectedClub={selectedClub}
            selectedPosition={selectedPosition}
            clubs={clubs}
            athletes={athletes}
            positions={positions}
            positionMap={positionMap}
            onBack={handleBack}
            onSelectClub={handleSelectClub}
            onSelectPosition={setSelectedPosition}
            onSelectAthlete={handleSelectAthlete}
          />
        )}
        {view === 'appointments' && (
          <AppointmentsView 
            athletes={athletes} 
            onBack={() => setView('main')} 
          />
        )}
        {view === 'detail' && (
          <DetailView
            selectedAthlete={selectedAthlete}
            onBack={handleBack}
            onSaveSuccess={handleSaveSuccess}
          />
        )}
      </AnimatePresence>
    </TrainingCentersLayout>
  );
}
