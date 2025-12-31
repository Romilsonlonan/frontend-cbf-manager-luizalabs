
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { api } from '@/lib/api';
import { Club } from '@/lib/definitions';
import Statistics from '@/components/home/statistics/statistics';
import { GoalsByAthleteDashboard } from '@/components/home/statistics/GoalsByAthleteDashboard';
import { FoulsCardsDashboard } from '@/components/home/statistics/FoulsCardsDashboard';
import { AgeDashboard } from '@/components/home/statistics/AgeDashboard';
import { useAuth } from '@/context/AuthContext';

export default function StatisticsPage() {
  const { token, onAuthError } = useAuth();
  const [selectedClub, setSelectedClub] = useState<string>('Todos');
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    const fetchClubs = async () => {
      if (!token) {
        console.error('Authentication token not found.');
        return;
      }
      try {
        const fetchedClubs = await api.getClubs(token, onAuthError);
        setClubs(fetchedClubs);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };
    fetchClubs();
  }, [token, onAuthError]);

  return (
    <div className="grid gap-8 h-full flex-col">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Estatísticas de Desempenho</CardTitle>
            <CardDescription>
              Análise comparativa dos atletas da temporada 2025.
            </CardDescription>
          </div>
          <Select onValueChange={setSelectedClub} defaultValue="Todos">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecionar Clube" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              {clubs.map((club) => (
                <SelectItem key={club.id} value={club.name}>
                  {club.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GoalsByAthleteDashboard selectedClub={selectedClub} />
        <FoulsCardsDashboard selectedClub={selectedClub} />
      </div>
      <AgeDashboard selectedClub={selectedClub} />
      {/* <Statistics /> */}
    </div>
  );
}
