'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

// Mock data ampliada para atletas
const athletes = [
  {
    id: '1',
    name: 'Carlos Alberto',
    position: 'Atacante',
    club: 'SC Corinthians',
    age: 28,
    goals: 15,
    salary: 150000,
  },
  {
    id: '2',
    name: 'Bruna Santos',
    position: 'Meio-campo',
    club: 'SE Palmeiras',
    age: 25,
    goals: 7,
    salary: 120000,
  },
  {
    id: '3',
    name: 'Ricardo Lima',
    position: 'Zagueiro',
    club: 'São Paulo FC',
    age: 30,
    goals: 2,
    salary: 100000,
  },
  {
    id: '4',
    name: 'Jonas Pereira',
    position: 'Goleiro',
    club: 'SC Corinthians',
    age: 32,
    goals: 0,
    salary: 90000,
  },
   {
    id: '5',
    name: 'Livia Costa',
    position: 'Atacante',
    club: 'São Paulo FC',
    age: 22,
    goals: 18,
    salary: 180000,
  },
];

const positions = [
  'Atacante',
  'Meio-campo',
  'Zagueiro',
  'Goleiro',
  'Lateral-Direito',
  'Lateral-Esquerdo',
];
const clubs = ['SC Corinthians', 'SE Palmeiras', 'São Paulo FC'];

export default function AthletesPage() {
  const [nameFilter, setNameFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [clubFilter, setClubFilter] = useState('');

  const filteredAthletes = athletes.filter((athlete) => {
    return (
      (nameFilter === '' ||
        athlete.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (positionFilter === '' || athlete.position === positionFilter) &&
      (clubFilter === '' || athlete.club === clubFilter)
    );
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atletas</CardTitle>
        <CardDescription>
          Filtre e gerencie os atletas cadastrados no sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Nome do Jogador"
              className="pl-8"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>
          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Posição" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas as Posições</SelectItem>
              {positions.map((pos) => (
                <SelectItem key={pos} value={pos}>
                  {pos}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={clubFilter} onValueChange={setClubFilter}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Clube" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os Clubes</SelectItem>
              {clubs.map((club) => (
                <SelectItem key={club} value={club}>
                  {club}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Posição</TableHead>
              <TableHead>Clube</TableHead>
              <TableHead className="text-right">Idade</TableHead>
              <TableHead className="text-right">Gols (2025)</TableHead>
              <TableHead className="text-right">Salário</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAthletes.map((athlete) => (
              <TableRow key={athlete.id}>
                <TableCell className="font-medium">{athlete.name}</TableCell>
                <TableCell>{athlete.position}</TableCell>
                <TableCell>{athlete.club}</TableCell>
                <TableCell className="text-right">{athlete.age}</TableCell>
                <TableCell className="text-right">{athlete.goals}</TableCell>
                <TableCell className="text-right">
                  {athlete.salary.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
