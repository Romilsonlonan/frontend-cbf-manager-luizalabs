'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { Athlete, ClubSimpleResponse as Club, Position } from '@/lib/types';
import { api } from '@/lib/api';
import { useLoading } from '@/context/LoadingContext';
import { useAuth } from '@/context/AuthContext';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, ClipboardEdit, UtensilsCrossed, Shield, PersonStanding, Forward, Target, User, Calendar as CalendarIcon } from 'lucide-react';

import { AthleteDataForm } from '@/components/home/training-centers/AthleteDataForm';
import { ProgressDashboard } from '@/components/home/training-centers/ProgressDashboard';
import { NutritionalPlanModal } from '@/components/home/training-centers/NutritionalPlanModal';
import { AppointmentCalendar } from '@/components/home/training-centers/AppointmentCalendar';

type View = 'main' | 'management' | 'detail' | 'appointments';

const positionMap: Record<Position, string> = {
  'A': 'Atacante',
  'D': 'Defensor',
  'M': 'Meio-campo',
  'G': 'Goleiro',
};

const positions: { name: Position, label: string, icon: React.FC<any> }[] = [
  { name: 'A', label: 'Atacante', icon: Forward },
  { name: 'D', label: 'Defensor', icon: Shield },
  { name: 'M', label: 'Meio-campo', icon: PersonStanding },
  { name: 'G', label: 'Goleiro', icon: Target },
];

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

  const renderMainView = () => (
    <motion.div
      key="main"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold" style={{ color: '#101f0d' }}>Gestão de Performance</h1>
        <p className="text-muted-foreground text-lg mt-2">Centro de treinamento esportivo de alta performance.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          className="hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
          onClick={() => setView('appointments')}
        >
          <CardHeader className="items-center text-center">
            <div className="p-4 bg-accent/20 rounded-full mb-4">
              <CalendarIcon className="h-8 w-8 text-accent" />
            </div>
            <CardTitle className="font-headline">Agenda de Consultas</CardTitle>
            <CardDescription>Marque e gerencie consultas nutricionais.</CardDescription>
          </CardHeader>
        </Card>
        <Card
          className="hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
          onClick={() => {
            setView('management');
            setSelectedClub(null);
            setSelectedPosition(null);
            setSelectedAthlete(null);
          }}
        >
          <CardHeader className="items-center text-center">
            <div className="p-4 bg-accent/20 rounded-full mb-4">
              <ClipboardEdit className="h-8 w-8 text-accent" />
            </div>
            <CardTitle className="font-headline">Dados dos Atletas</CardTitle>
            <CardDescription>Adicione ou edite dados e acompanhe o progresso.</CardDescription>
          </CardHeader>
        </Card>
        <NutritionalPlanModal athletes={athletes} clubs={clubs}>
            <Card className="hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-accent/20 rounded-full mb-4">
                  <UtensilsCrossed className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="font-headline">Plano Alimentar</CardTitle>
                <CardDescription>Cadastre novos planos nutricionais para atletas.</CardDescription>
              </CardHeader>
            </Card>
        </NutritionalPlanModal>
      </div>

      <div className="mt-12 relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-accent/10 group">
        <Image
          src="https://i.ibb.co/WWKv8MLN/Empenho-Atletas.webp"
          alt="Empenho dos Atletas"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
          <div className="text-white">
            <h3 className="text-2xl font-bold font-headline">Empenho e Performance</h3>
            <p className="text-white/80">Monitoramento contínuo para resultados de elite.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderAppointmentsView = () => (
    <motion.div
      key="appointments"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="relative flex items-center justify-center mb-8">
        <Button variant="ghost" size="icon" onClick={() => setView('main')} className="absolute left-0">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h2 className="font-headline text-4xl font-bold text-accent text-center px-12">
          Agenda de Consultas
        </h2>
      </div>
      <AppointmentCalendar athletes={athletes} />
    </motion.div>
  );

  const renderManagementView = () => {
    const clubAthletes = selectedClub ? athletes.filter(a => a.club_id === selectedClub.id) : [];
    const filteredAthletes = selectedPosition ? clubAthletes.filter(a => a.position === selectedPosition) : [];

    return (
      <motion.div
        key={selectedClub ? `management-club-${selectedClub.id}` : "management-clubs"}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl mx-auto"
      >
        <div className="relative flex items-center justify-center mb-12">
          <Button variant="ghost" size="icon" onClick={handleBack} className="absolute left-0">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h2 className="font-headline text-4xl font-bold text-accent text-center px-12">
            {selectedClub ? `Atletas - ${selectedClub.name}` : 'Selecione um Clube'}
          </h2>
        </div>

        {!selectedClub ? (
          clubs.length === 0 ? (
            <div className="text-center py-12 bg-accent/5 rounded-xl border-2 border-dashed border-accent/20">
              <Shield className="h-12 w-12 text-accent/20 mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum clube encontrado.</p>
              <p className="text-xs text-muted-foreground/60 mt-2">Certifique-se de que os clubes estão cadastrados corretamente.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {clubs.map((club, index) => (
                <Card key={`club-${club.id}-${index}`} className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleSelectClub(club)}>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <div className="relative w-20 h-20 mb-3 flex items-center justify-center bg-accent/10 rounded-full">
                      {club.shield_image_url ? (
                        <Image
                          src={club.shield_image_url.startsWith('http') ? club.shield_image_url : `http://localhost:8000${club.shield_image_url}`}
                          alt={club.name}
                          fill
                          className="rounded-full object-cover"
                          data-ai-hint="club logo"
                        />
                      ) : (
                        <Shield className="h-10 w-10 text-accent/40" />
                      )}
                    </div>
                    <p className="font-semibold text-sm">{club.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        ) : !selectedPosition ? (
          <div className="py-8 flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-10 text-center text-muted-foreground uppercase tracking-widest">Selecione a Posição</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
              {positions.map((pos, index) => (
                <Card
                  key={`position-${pos.name}-${index}`}
                  className="text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 hover:border-accent group bg-card/50 backdrop-blur-sm"
                  onClick={() => setSelectedPosition(pos.name)}
                >
                  <CardContent className="p-12 flex flex-col items-center justify-center">
                    <div className="p-8 bg-accent/10 group-hover:bg-accent/20 rounded-full mb-8 transition-all duration-300 group-hover:scale-110">
                      <pos.icon className="h-20 w-20 text-accent" />
                    </div>
                    <p className="font-bold text-2xl text-primary group-hover:text-accent transition-colors">{pos.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center text-muted-foreground">
              Atletas - {positionMap[selectedPosition]}
            </h3>
            {filteredAthletes.length === 0 ? (
              <div className="text-center py-12 bg-accent/5 rounded-xl border-2 border-dashed border-accent/20">
                <p className="text-muted-foreground">Nenhum atleta encontrado para esta posição.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAthletes.map((athlete, index) => (
                  <Card key={`athlete-${athlete.id}-${index}`} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleSelectAthlete(athlete)}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-12 h-12 flex items-center justify-center bg-accent/10 rounded-full overflow-hidden">
                          {athlete.image_url ? (
                            <Image
                              src={athlete.image_url}
                              alt={athlete.name}
                              fill
                              className="rounded-full object-cover"
                            />
                          ) : (
                            <User className="h-8 w-8 text-accent/40" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{athlete.name}</p>
                          <p className="text-sm text-muted-foreground">{athlete.position} • {athlete.age} anos</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
    );
  };

  const renderDetailView = () => {
    if (!selectedAthlete) return null;

    return (
      <motion.div
        key="detail"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl"
      >
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h2 className="font-headline text-3xl font-bold text-accent ml-4">
            Detalhes do Atleta
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AthleteDataForm 
            athlete={selectedAthlete} 
            onSaveSuccess={handleSaveSuccess} 
          />
          <ProgressDashboard athlete={selectedAthlete} />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {view === 'main' && renderMainView()}
        {view === 'management' && renderManagementView()}
        {view === 'appointments' && renderAppointmentsView()}
        {view === 'detail' && renderDetailView()}
      </AnimatePresence>
    </div>
  );
}
