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
import { ShieldAlert, Handshake, Goal } from 'lucide-react'; // Using ShieldAlert for cards, Handshake for fouls

type StatisticFilter = 'fouls_suffered' | 'fouls_committed' | 'yellow_cards' | 'red_cards';

type PlayerStats = FieldPlayerResponse | GoalkeeperResponse;

interface FoulsCardsDashboardProps {
  selectedClub: string;
}

export function FoulsCardsDashboard({ selectedClub }: FoulsCardsDashboardProps) {
  const { token, onAuthError } = useAuth();
  const [topPlayers, setTopPlayers] = useState<PlayerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statisticFilter, setStatisticFilter] = useState<StatisticFilter>('fouls_suffered');
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

  const fetchTopPlayersStats = useCallback(async () => {
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
      console.error(`Failed to fetch top players by ${statisticFilter}:`, err);
      setError(`Failed to load top players by ${statisticFilter}.`);
    } finally {
      setLoading(false);
    }
  }, [token, statisticFilter, selectedClub, clubs, onAuthError]);

  useEffect(() => {
    fetchTopPlayersStats();
  }, [fetchTopPlayersStats]);

  const getTitle = () => {
    switch (statisticFilter) {
      case 'fouls_suffered':
        return 'Mais Faltas Sofridas';
      case 'fouls_committed':
        return 'Mais Faltas Cometidas';
      case 'yellow_cards':
        return 'Mais Cartões Amarelos';
      case 'red_cards':
        return 'Mais Cartões Vermelhos';
      default:
        return 'Estatísticas de Faltas e Cartões';
    }
  };

  const getIcon = () => {
    switch (statisticFilter) {
      case 'fouls_suffered':
      case 'fouls_committed':
        return <Handshake className="h-6 w-6" />;
      case 'yellow_cards':
      case 'red_cards':
        return <ShieldAlert className="h-6 w-6" />;
      default:
        return <Goal className="h-6 w-6" />; // Default icon
    }
  };

  if (loading) {
    return (
      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            {getIcon()}
            {getTitle()}
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
            {getIcon()}
            {getTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-none">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            {getIcon()}
            {getTitle()}
          </CardTitle>
          <Select value={statisticFilter} onValueChange={(value: StatisticFilter) => setStatisticFilter(value)}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Filtrar por Estatística" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fouls_suffered">Sofreu Faltas</SelectItem>
              <SelectItem value="fouls_committed">Cometeu Faltas</SelectItem>
              <SelectItem value="yellow_cards">Cartões Amarelos</SelectItem>
              <SelectItem value="red_cards">Cartões Vermelhos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {topPlayers.length === 0 ? (
          <p>Nenhum jogador encontrado para a estatística selecionada.</p>
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
                <Bar dataKey={statisticFilter} fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
