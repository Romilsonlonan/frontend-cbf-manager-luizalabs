'use client';

import React, { useState, useEffect, useCallback, useMemo, type FC } from 'react';
import Link from 'next/link';

/* =======================
   UI COMPONENTS
======================= */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* =======================
   ICONS
======================= */
import {
  UsersRound,
  Shield,
  BarChart3,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  RefreshCcw, // Added for refresh button
} from "lucide-react";

/* =======================
   APP / DOMAIN
======================= */
import { useAuth } from '@/context/AuthContext';
import { useLoading } from '@/context/LoadingContext';
import { api } from '@/lib/api';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import type { TeamStats, SortKey } from '@/lib/types';
import { teamData as initialTeamData } from '@/lib/mock-data';
import { TeamLogo } from '@/components/icons/team-logos'; // This path might need adjustment if the component doesn't exist
import { cn } from '@/lib/utils';

/* =======================
   SORTABLE HEADER
======================= */
const SortableHeader: FC<{
  columnKey: SortKey;
  label: string;
  onSort: (key: SortKey) => void;
  sortConfig: { key: SortKey; direction: 'asc' | 'desc' };
  className?: string;
}> = ({ columnKey, label, onSort, sortConfig, className }) => {
  const isSorted = sortConfig.key === columnKey;
  const Icon = isSorted
    ? sortConfig.direction === 'desc'
      ? ArrowDown
      : ArrowUp
    : ArrowUpDown;

  return (
    <TableHead
      className={cn("cursor-pointer hover:bg-muted/50", className)}
      onClick={() => onSort(columnKey)}
    >
      <div className="flex items-center gap-2">
        {label}
        <Icon className="h-4 w-4" />
      </div>
    </TableHead>
  );
};

/* =======================
   PAGE
======================= */
export default function DashboardWithLeaderboardPage() {
  /* ---------- Dashboard State ---------- */
  const { token, onAuthError } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const [totalAthletes, setTotalAthletes] = useState<number | null>(null);
  const [totalClubs, setTotalClubs] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState<string | null>(null);

  /* ---------- Leaderboard State ---------- */
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({
    key: 'p',
    direction: 'desc',
  });
  const [isScraping, setIsScraping] = useState(false); // New state for scraping loading
  const [leaderboardData, setLeaderboardData] = useState<TeamStats[]>([]); // Inicializa vazio para evitar dados estáticos
  const [leaderboardError, setLeaderboardError] = useState<string | null>(null);

  const fetchLeaderboardData = useCallback(async () => {
    if (!token) {
      setLeaderboardError('Authentication token not found.');
      return;
    }
    setIsScraping(true);
    setLeaderboardError(null);
    try {
      const data = await api.scrapeBrasileiraoLeaderboard(token, onAuthError);
      setLeaderboardData(data);
    } catch (err) {
      console.error('Failed to scrape leaderboard data:', err);
      setLeaderboardError('Falha ao atualizar a classificação do Brasileirão.');
    } finally {
      setIsScraping(false);
    }
  }, [token, onAuthError]);

  const fetchDashboardData = useCallback(async () => {
    if (!token) {
      setDashboardError('Authentication token not found.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      startLoading();
      const athletesCount = await api.getTotalAthletesCount(token, onAuthError);
      const clubsCount = await api.getTotalClubsCount(token, onAuthError);

      setTotalAthletes(athletesCount);
      setTotalClubs(clubsCount);
    } catch (err) {
      console.error(err);
      setDashboardError('Falha ao carregar dados do painel.');
    } finally {
      setLoading(false);
      stopLoading();
    }
  }, [token, onAuthError, startLoading, stopLoading]);

  useEffect(() => {
    fetchDashboardData();
    fetchLeaderboardData(); // Also fetch leaderboard data on component mount
  }, [fetchDashboardData, fetchLeaderboardData]);

  const handleRefreshLeaderboard = useCallback(async () => {
    await fetchLeaderboardData();
  }, [fetchLeaderboardData]);

  /* =======================
     LEADERBOARD LOGIC
  ======================= */
  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAndFilteredTeams = useMemo(() => {
    const filtered = [...leaderboardData].filter(team =>
      (team.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      // Prioriza a ordenação baseada no sortConfig se necessário, 
      // mas aqui mantemos a lógica padrão de classificação de futebol
      if (b.p !== a.p) return b.p - a.p;
      if (b.v !== a.v) return b.v - a.v;
      if (b.sg !== a.sg) return b.sg - a.sg;
      if (b.gp !== a.gp) return b.gp - a.gp;
      return (a.name || '').localeCompare(b.name || '');
    });

    return filtered;
  }, [searchQuery, leaderboardData, sortConfig]);

  const getPositionClass = (index: number) => {
    const total = sortedAndFilteredTeams.length;
    if (index < 4) return 'border-l-4 border-chart-2';
    if (index < 6) return 'border-l-4 border-chart-4';
    if (index >= total - 4) return 'border-l-4 border-destructive';
    return 'border-l-4 border-transparent';
  };

  /* =======================
     LOADING / ERROR
  ======================= */
  if (loading) {
    return (
      <div className="grid place-items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (dashboardError) {
    return <p className="text-red-500 p-10">{dashboardError}</p>;
  }

  /* =======================
     RENDER
  ======================= */
  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 md:p-10">
      <div className="container mx-auto flex flex-col gap-12">

        {/* =======================
           DASHBOARD
        ======================= */}
        <section className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Painel de Controle</h1>
            <p className="text-muted-foreground">
              Visão geral do sistema de gerenciamento de atletas.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Atletas</CardTitle>
                <UsersRound className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalAthletes}</div>
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
                <div className="text-2xl font-bold">{totalClubs}</div>
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
                <Button asChild size="sm" className="mt-4">
                  <Link href="/home/statistics">Ver Estatísticas</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* =======================
           LEADERBOARD
        ======================= */}
        <section>
          {leaderboardError && (
            <div className="bg-destructive/15 text-destructive p-4 rounded-md mb-4 flex items-center justify-between">
              <span>{leaderboardError}</span>
              <Button variant="ghost" size="sm" onClick={handleRefreshLeaderboard}>Tentar novamente</Button>
            </div>
          )}
          <Card className="shadow-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl font-bold">Brasileirão Leaderboard</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefreshLeaderboard}
                  disabled={isScraping}
                >
                  {isScraping ? (
                    <LoadingSpinner className="mr-2 h-4 w-4" />
                  ) : (
                    <RefreshCcw className="mr-2 h-4 w-4" />
                  )}
                  Atualizar
                </Button>
              </div>
              <CardDescription>Classificação do campeonato brasileiro</CardDescription>

              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar time..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Time</TableHead>
                      <SortableHeader columnKey="p" label="P" onSort={handleSort} sortConfig={sortConfig} />
                      <SortableHeader columnKey="j" label="J" onSort={handleSort} sortConfig={sortConfig} />
                      <SortableHeader columnKey="v" label="V" onSort={handleSort} sortConfig={sortConfig} />
                      <SortableHeader columnKey="e" label="E" onSort={handleSort} sortConfig={sortConfig} />
                      <SortableHeader columnKey="d" label="D" onSort={handleSort} sortConfig={sortConfig} />
                      <SortableHeader columnKey="gp" label="GP" onSort={handleSort} sortConfig={sortConfig} />
                      <SortableHeader columnKey="gc" label="GC" onSort={handleSort} sortConfig={sortConfig} />
                      <SortableHeader columnKey="sg" label="SG" onSort={handleSort} sortConfig={sortConfig} />
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {sortedAndFilteredTeams.map((team, index) => (
                      <TableRow key={team.name || `team-${index}`}>
                        <TableCell className={getPositionClass(index)}>{index + 1}</TableCell>
                        <TableCell className="flex items-center gap-3">
                          <TeamLogo teamName={team.name} className="h-6 w-6" />
                          <span className="font-semibold">{team.name}</span>
                        </TableCell>
                        <TableCell className="font-bold">{team.p}</TableCell>
                        <TableCell>{team.j}</TableCell>
                        <TableCell>{team.v}</TableCell>
                        <TableCell>{team.e}</TableCell>
                        <TableCell>{team.d}</TableCell>
                        <TableCell>{team.gp}</TableCell>
                        <TableCell>{team.gc}</TableCell>
                        <TableCell>{team.sg}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Glossário */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                  Glossário
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground min-w-[35px]">J:</span>
                    <span>Jogos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground min-w-[35px]">V:</span>
                    <span>Vitórias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground min-w-[35px]">E:</span>
                    <span>Empate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground min-w-[35px]">D:</span>
                    <span>Derrotas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground min-w-[35px]">GP:</span>
                    <span>Gols pró</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground min-w-[35px]">GC:</span>
                    <span>Gols contra</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground min-w-[35px]">SG:</span>
                    <span>Saldo de gols</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground min-w-[35px]">PTS:</span>
                    <span>Pontos</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </main>
  );
}
