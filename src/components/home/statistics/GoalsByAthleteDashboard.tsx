'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { FieldPlayerResponse, GoalkeeperResponse, Club } from '@/lib/types';
import { Goal } from 'lucide-react';

type StatisticFilter = 'goals' | 'assists' | 'total_shots' | 'shots_on_goal' | 'goals_conceded' | 'saves';

interface GoalsByAthleteDashboardProps {
  selectedClub: string;
}

export function GoalsByAthleteDashboard({ selectedClub }: GoalsByAthleteDashboardProps) {
  const { token, onAuthError } = useAuth();
  const [topPlayers, setTopPlayers] = useState<(FieldPlayerResponse | GoalkeeperResponse)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statisticFilter, setStatisticFilter] = useState<StatisticFilter>('goals');
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const fetchedClubs = await api.getClubs(token!, onAuthError);
        setClubs(fetchedClubs);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };
    if (token) {
      fetchClubs();
    }
  }, [token, onAuthError]);

  const fetchTopPlayers = useCallback(async () => {
    if (!token) {
      setError('Authentication token not found.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const clubId = selectedClub === 'Todos' ? undefined : clubs.find(club => club.name === selectedClub)?.id;
      const data = await api.getTopPlayersByStatistic(token, statisticFilter, clubId, onAuthError);
      setTopPlayers(data);
    } catch (err) {
      console.error('Failed to fetch top players by statistic:', err);
      setError('Failed to load top players.');
    } finally {
      setLoading(false);
    }
  }, [token, statisticFilter, selectedClub, clubs, onAuthError]);

  useEffect(() => {
    fetchTopPlayers();
  }, [fetchTopPlayers]);

  if (loading) {
    return (
      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Goal className="h-6 w-6" />
            Estatísticas por Atleta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Carregando estatísticas...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Goal className="h-6 w-6" />
            Estatísticas por Atleta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const getStatLabel = (stat: StatisticFilter) => {
    switch (stat) {
      case 'goals': return 'Gols';
      case 'assists': return 'Assistências';
      case 'total_shots': return 'Finalizações';
      case 'shots_on_goal': return 'Chutes a Gol';
      case 'goals_conceded': return 'Gols Sofridos';
      case 'saves': return 'Defesas';
      default: return '';
    }
  };

  return (
    <Card className="shadow-lg border-none">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Goal className="h-6 w-6" />
            Estatísticas por Atleta
          </CardTitle>
          <Select value={statisticFilter} onValueChange={(value: StatisticFilter) => setStatisticFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por Estatística" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="goals">Total de Gols (G)</SelectItem>
              <SelectItem value="assists">Assistências (A)</SelectItem>
              <SelectItem value="total_shots">Finalizações (TC)</SelectItem>
              <SelectItem value="shots_on_goal">Chutes a Gol (CG)</SelectItem>
              <SelectItem value="goals_conceded">Gols Sofridos (GS)</SelectItem>
              <SelectItem value="saves">Defesas (D)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {topPlayers.length === 0 ? (
          <p>Nenhum atleta encontrado para a estatística selecionada.</p>
        ) : (
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topPlayers.slice(0, 7)}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey={statisticFilter} fill="#8884d8" name={getStatLabel(statisticFilter)} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
