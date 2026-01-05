'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { Athlete, Club, Position } from '@/lib/types';
import { api } from '@/lib/api';
import { useLoading } from '@/context/LoadingContext';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, ClipboardEdit, UtensilsCrossed, Shield, PersonStanding, Forward, Target } from 'lucide-react';

import { AthleteDataForm } from '@/components/home/training-centers/AthleteDataForm';
import { ProgressDashboard } from '@/components/home/training-centers/ProgressDashboard';
import { NutritionalPlanModal } from '@/components/home/training-centers/NutritionalPlanModal';

type View = 'main' | 'management' | 'detail';

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

export default function Home() {
  const [view, setView] = useState<View>('main');
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const { startLoading, stopLoading } = useLoading();

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
    const fetchData = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      startLoading();
      try {
        const clubsData = await api.getClubs(token);
        setClubs(clubsData as unknown as Club[]);
        
        const goalkeepers = await api.getGoalkeepers(token);
        const fieldPlayers = await api.getFieldPlayers(token);
        
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
          ...fieldPlayers.map(f => mapAthlete(f, f.position as Position))
        ];
        setAthletes(allAthletes);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        stopLoading();
      }
    };

    fetchData();
  }, [startLoading, stopLoading]);

  const handleSelectClub = (club: Club) => {
    setSelectedClub(club);
    setView('management');
    setSelectedPosition(null);
  };

  const handleSelectAthlete = async (athlete: Athlete) => {
    const token = localStorage.getItem('access_token');
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
          onClick={() => setView('management')}
        >
          <CardHeader className="items-center text-center">
            <div className="p-4 bg-accent/20 rounded-full mb-4">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <CardTitle className="font-headline">Gerenciar Atletas</CardTitle>
            <CardDescription>Visualize e selecione atletas por clube.</CardDescription>
          </CardHeader>
        </Card>
        <Card
          className="hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
          onClick={() => {
            if (selectedAthlete) {
              setView('detail');
            } else {
              setView('management');
            }
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
        <NutritionalPlanModal athletes={athletes}>
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
        className="w-full max-w-4xl"
      >
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h2 className="font-headline text-3xl font-bold text-primary ml-4">
            {selectedClub ? `Atletas - ${selectedClub.name}` : 'Selecione um Clube'}
          </h2>
        </div>

        {!selectedClub ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {clubs.map((club) => (
              <Card key={club.id} className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleSelectClub(club)}>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <Image src={club.shield_image_url || '/placeholder-avatar.jpg'} alt={club.name} width={80} height={80} className="rounded-full mb-3" data-ai-hint="club logo" />
                  <p className="font-semibold text-sm">{club.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !selectedPosition ? (
           <div>
             <h3 className="text-xl font-semibold mb-4 text-center text-muted-foreground">Selecione a Posição</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {positions.map(pos => (
                    <Card key={pos.name} className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedPosition(pos.name)}>
                        <CardContent className="p-6 flex flex-col items-center justify-center">
                            <pos.icon className="h-10 w-10 text-primary mb-3" />
                            <p className="font-semibold">{pos.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
           </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-primary">{positionMap[selectedPosition]}s</h3>
            {filteredAthletes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAthletes.map(athlete => (
                  <Card key={athlete.id} className="cursor-pointer hover:border-primary overflow-hidden text-center" onClick={() => handleSelectAthlete(athlete)}>
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        <Image
                          src="https://i.ibb.co/M5gD2pfw/homem.png"
                          alt="Ilustração de um atleta"
                          width={100}
                          height={100}
                          className="rounded-full object-cover border-4 border-primary"
                          data-ai-hint="athlete illustration"
                        />
                      </div>
                      <CardTitle className="text-lg mb-2">{athlete.name}</CardTitle>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong>Idade:</strong> {athlete.age} anos</p>
                        <p><strong>Altura:</strong> {athlete.height} cm</p>
                        <p><strong>Peso:</strong> {athlete.weight} kg</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground mt-8">Nenhum atleta encontrado para esta posição.</p>
            )}
          </div>
        )}
      </motion.div>
    )
  };

  const renderDetailView = () => (
    selectedAthlete && (
      <motion.div
        key="detail"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl"
      >
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className='ml-4'>
            <h2 className="font-headline text-3xl font-bold text-primary">{selectedAthlete.name}</h2>
            <p className='text-muted-foreground'>ID do Atleta: {selectedAthlete.id}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2">
            <ProgressDashboard athlete={selectedAthlete} />
          </div>
          <div className="lg:col-span-2">
            <AthleteDataForm athlete={selectedAthlete} />
          </div>
        </div>
      </motion.div>
    )
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-12 md:p-24 bg-background font-body">
      <AnimatePresence mode="wait">
        {view === 'main' && renderMainView()}
        {view === 'management' && renderManagementView()}
        {view === 'detail' && renderDetailView()}
      </AnimatePresence>
    </main>
  );
}