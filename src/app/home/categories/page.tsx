
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
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
    trainingCenter: 'CT Dr. Joaquim Grava',
  },
  {
    id: '2',
    name: 'Bruna Santos',
    position: 'Meio-campo',
    club: 'SE Palmeiras',
    age: 25,
    goals: 7,
    salary: 120000,
    trainingCenter: 'Academia de Futebol',
  },
  {
    id: '3',
    name: 'Ricardo Lima',
    position: 'Zagueiro',
    club: 'São Paulo FC',
    age: 30,
    goals: 2,
    salary: 100000,
    trainingCenter: 'CT da Barra Funda',
  },
  {
    id: '4',
    name: 'Jonas Pereira',
    position: 'Goleiro',
    club: 'SC Corinthians',
    age: 32,
    goals: 0,
    salary: 90000,
    trainingCenter: 'CT Dr. Joaquim Grava',
  },
   {
    id: '5',
    name: 'Livia Costa',
    position: 'Atacante',
    club: 'São Paulo FC',
    age: 22,
    goals: 18,
    salary: 180000,
    trainingCenter: 'CT da Barra Funda',
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
const trainingCenters = ['CT Dr. Joaquim Grava', 'Academia de Futebol', 'CT da Barra Funda'];

export default function AthletesPage() {
  const [nameFilter, setNameFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [clubFilter, setClubFilter] = useState('');
  const [trainingCenterFilter, setTrainingCenterFilter] = useState('');

  const filteredAthletes = athletes.filter((athlete) => {
    return (
      (nameFilter === '' ||
        athlete.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (positionFilter === '' || positionFilter === 'all' || athlete.position === positionFilter) &&
      (clubFilter === '' || clubFilter === 'all' || athlete.club === clubFilter) &&
      (trainingCenterFilter === '' || trainingCenterFilter === 'all' || athlete.trainingCenter === trainingCenterFilter)
    );
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Atletas</CardTitle>
        <CardDescription>
          Filtre e analise os atletas cadastrados no sistema.
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
              <SelectItem value="all">Todas as Posições</SelectItem>
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
              <SelectItem value="all">Todos os Clubes</SelectItem>
              {clubs.map((club) => (
                <SelectItem key={club} value={club}>
                  {club}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
           <Select value={trainingCenterFilter} onValueChange={setTrainingCenterFilter}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Centro de Treinamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os CTs</SelectItem>
              {trainingCenters.map((center) => (
                <SelectItem key={center} value={center}>
                  {center}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-shrink-0">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Mais Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filtros Avançados</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>Maior Salário</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Mais Gols</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Posição</TableHead>
              <TableHead>Clube</TableHead>
              <TableHead>Centro de Treinamento</TableHead>
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
                <TableCell>{athlete.trainingCenter}</TableCell>
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
