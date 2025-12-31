'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UsersRound, Shield, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { LoadingSpinner } from '@/components/LoadingSpinner'; // Assuming you have a LoadingSpinner component

export default function DashboardPage() {
  const { token, onAuthError } = useAuth();
  const [totalAthletes, setTotalAthletes] = useState<number | null>(null);
  const [totalClubs, setTotalClubs] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    if (!token) {
      setError('Authentication token not found.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const athletesCount = await api.getTotalAthletesCount(token, onAuthError);
      setTotalAthletes(athletesCount);

      const clubsCount = await api.getTotalClubsCount(token, onAuthError);
      setTotalClubs(clubsCount);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Falha ao carregar dados do painel.');
    } finally {
      setLoading(false);
    }
  }, [token, onAuthError]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Painel de Controle</h1>
          <p className="text-muted-foreground">
            Visão geral do seu sistema de gerenciamento de atletas.
          </p>
        </div>
        <div className="grid place-items-center h-48">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Painel de Controle</h1>
          <p className="text-muted-foreground">
            Visão geral do seu sistema de gerenciamento de atletas.
          </p>
        </div>
        <div className="grid place-items-center h-48">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Painel de Controle</h1>
        <p className="text-muted-foreground">
          Visão geral do seu sistema de gerenciamento de atletas.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Atletas</CardTitle>
            <UsersRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAthletes !== null ? totalAthletes : '...'}</div>
            <p className="text-xs text-muted-foreground">
              Total de atletas cadastrados
            </p>
            <Button asChild size="sm" className="mt-4">
                <Link href="/home/athletes">Ver Atletas</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clubes</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClubs !== null ? totalClubs : '...'}</div>
            <p className="text-xs text-muted-foreground">
              Clubes parceiros
            </p>
             <Button asChild size="sm" className="mt-4">
                <Link href="/home/clubs">Ver Clubes</Link>
            </Button>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Estatísticas</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2025</div>
            <p className="text-xs text-muted-foreground">
              Análise de dados da temporada
            </p>
             <Button asChild size="sm" className="mt-4">
                <Link href="/home/statistics">Ver Estatísticas</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
