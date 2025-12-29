'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import type { Player, PlayerStatsColumn } from '@/lib/definitions';

type SortKey = Exclude<keyof Player, 'id' | 'imageUrl'> | null;
type SortDirection = 'asc' | 'desc' | null;

interface PlayerTableProps {
  players: Player[];
  columns: PlayerStatsColumn[];
}

export function PlayerTable({ players, columns }: PlayerTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const sortedPlayers = [...players].sort((a, b) => {
    if (!sortKey || !sortDirection) return 0;

    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const handleSort = (key: Exclude<keyof Player, 'id' | 'imageUrl'>) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">Foto</TableHead>
            {columns.map((column) => (
              <TableHead key={column.key}>
                {column.isSortable ? (
                  <Button
                    variant="ghost"
                    onClick={() => handleSort(column.key)}
                    className="px-0 hover:bg-transparent"
                  >
                    {column.name}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  column.name
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPlayers.map((player) => (
            <TableRow key={player.id}>
              <TableCell>
                <Image
                  src={player.imageUrl || '/placeholder-avatar.jpg'}
                  alt={player.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={`${player.id}-${column.key}`}>
                  {player[column.key as keyof Player]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
