'use client';

import React from 'react';
import { GoalkeeperResponse, FieldPlayerResponse } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface SinglePlayerTableProps {
  player: GoalkeeperResponse | FieldPlayerResponse;
}

export function SinglePlayerTable({ player }: SinglePlayerTableProps) {
  if (!player) {
    return null;
  }

  const playerDetails = [
    { label: 'ID', value: player.id },
    { label: 'Nome', value: player.name },
    { label: 'Clube', value: player.club?.name || 'N/A' },
    { label: 'Posição', value: player.position },
    { label: 'Idade', value: player.age },
    { label: 'Altura (m)', value: player.height ? player.height.toFixed(2) : 'N/A' },
    { label: 'Peso (kg)', value: player.weight ? player.weight.toFixed(2) : 'N/A' },
    { label: 'Nacionalidade', value: player.nationality },
    { label: 'Número da Camisa', value: player.jersey_number || 'N/A' },
    { label: 'Tipo de Jogador', value: player.player_type || 'N/A' },
    { label: 'Jogos', value: player.games },
    { label: 'Aparições como Substituto', value: player.substitutions },
    { label: 'Assistências', value: player.assists },
    { label: 'Faltas Cometidas', value: player.fouls_committed },
    { label: 'Faltas Sofridas', value: player.fouls_suffered },
    { label: 'Cartões Amarelos', value: player.yellow_cards },
    { label: 'Cartões Vermelhos', value: player.red_cards },
    ...(player.player_type === 'field_player'
      ? [
          { label: 'Gols', value: player.goals },
          { label: 'Chutes', value: player.total_shots },
          { label: 'Chutes a Gol', value: player.shots_on_goal },
        ]
      : [
          { label: 'Defesas', value: player.saves },
          { label: 'Gols Sofridos', value: player.goals_conceded },
        ]),
    // {
    //   label: 'Última Atualização',
    //   value: player.updated_at ? new Date(player.updated_at).toLocaleString() : 'N/A',
    // },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Detalhes do Jogador: {player.name}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Atributo</TableHead>
              <TableHead>Valor</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {playerDetails.map((detail, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{detail.label}</TableCell>
                <TableCell>{detail.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
