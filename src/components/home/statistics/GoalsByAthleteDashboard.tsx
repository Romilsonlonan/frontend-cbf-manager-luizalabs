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
import { FieldPlayerResponse, Club } from '@/lib/types';
import { Goal } from 'lucide-react';

type PositionFilter = 'Todos' | 'Atacante' | 'Meio-de-Campo' | 'Defensor';

interface GoalsByAthleteDashboardProps {
  selectedClub: string;
}

export function GoalsByAthleteDashboard({ selectedClub }: GoalsByAthleteDashboardProps) {
  const { token, onAuthError } = useAuth();
  const [topGoalScorers, setTopGoalScorers] = useState<FieldPlayerResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [positionFilter, setPositionFilter] = useState<PositionFilter>('Todos');
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

  const fetchTopGoalScorers = useCallback(async () => {
    if (!token) {
      setError('Authentication token not found.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const positionParam = positionFilter === 'Todos' ? undefined : positionFilter;
      const clubId = selectedClub === 'Todos' ? undefined : clubs.find(club => club.name === selectedClub)?.id;
      const data = await api.getTopGoalScorers(token, positionParam, clubId, onAuthError);
      setTopGoalScorers(data);
    } catch (err) {
      console.error('Failed to fetch top goal scorers:', err);
      setError('Failed to load top goal scorers.');
    } finally {
      setLoading(false);
    }
  }, [token, positionFilter, selectedClub, clubs, onAuthError]);

  useEffect(() => {
    fetchTopGoalScorers();
  }, [fetchTopGoalScorers]);

  if (loading) {
    return (
      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Goal className="h-6 w-6" />
            Gols por Atleta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Carregando artilheiros...</p>
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
            Gols por Atleta
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
            <Goal className="h-6 w-6" />
            Gols por Atleta
          </CardTitle>
          <Select value={positionFilter} onValueChange={(value: PositionFilter) => setPositionFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por Posição" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              <SelectItem value="Atacante">Atacantes</SelectItem>
              <SelectItem value="Meio-de-Campo">Meias-de-Campo</SelectItem>
              <SelectItem value="Defensor">Defensores</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {topGoalScorers.length === 0 ? (
          <p>Nenhum artilheiro encontrado para a posição selecionada.</p>
        ) : (
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topGoalScorers.slice(0, 7)}
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
                <Bar dataKey="goals" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
