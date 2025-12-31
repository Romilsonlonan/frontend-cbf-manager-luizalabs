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
  Line, // Adicionado para a linha
  Dot,  // Adicionado para as bolinhas
} from 'recharts';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { FieldPlayerResponse, GoalkeeperResponse, Club } from '@/lib/types';
import { CalendarDays } from 'lucide-react';

type AgeFilter = 'oldest' | 'youngest';

type PlayerStats = FieldPlayerResponse | GoalkeeperResponse;

interface AgeDashboardProps {
  selectedClub: string;
}

export function AgeDashboard({ selectedClub }: AgeDashboardProps) {
  const { token, onAuthError } = useAuth();
  const [topPlayers, setTopPlayers] = useState<PlayerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ageFilter, setAgeFilter] = useState<AgeFilter>('oldest');
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

  const fetchTopPlayersByAge = useCallback(async () => {
    if (!token) {
      setError('Authentication token not found.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const clubId = selectedClub === 'Todos' ? undefined : clubs.find(club => club.name === selectedClub)?.id;
      const data = await api.getTopPlayersByAge(token, ageFilter, clubId, onAuthError);
      setTopPlayers(data);
    } catch (err) {
      console.error(`Failed to fetch top players by age (${ageFilter}):`, err);
      setError(`Failed to load top players by age (${ageFilter}).`);
    } finally {
      setLoading(false);
    }
  }, [token, ageFilter, selectedClub, clubs, onAuthError]);

  useEffect(() => {
    fetchTopPlayersByAge();
  }, [fetchTopPlayersByAge]);

  const getTitle = () => {
    return ageFilter === 'oldest' ? 'Jogadores Mais Velhos' : 'Jogadores Mais Novos';
  };

  if (loading) {
    return (
      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <CalendarDays className="h-6 w-6" />
            {getTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Carregando jogadores...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <CalendarDays className="h-6 w-6" />
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
            <CalendarDays className="h-6 w-6" />
            {getTitle()}
          </CardTitle>
          <Select value={ageFilter} onValueChange={(value: AgeFilter) => setAgeFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por Idade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oldest">Mais Velhos</SelectItem>
              <SelectItem value="youngest">Mais Novos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {topPlayers.length === 0 ? (
          <p>Nenhum jogador encontrado para o filtro de idade selecionado.</p>
        ) : (
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topPlayers.slice(0, 7)}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="age" fill="#007bff" /> {/* Blue color for age */}
                <Line type="monotone" dataKey="age" stroke="#00008B" strokeWidth={2} dot={{ r: 4, fill: '#00008B' }} /> {/* Linha azul escura com bolinhas */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
