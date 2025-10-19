
'use client';

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

type AthletesFiltersProps = {
    nameFilter: string;
    setNameFilter: (value: string) => void;
    positionFilter: string;
    setPositionFilter: (value: string) => void;
    clubFilter: string;
    setClubFilter: (value: string) => void;
    trainingCenterFilter: string;
    setTrainingCenterFilter: (value: string) => void;
    positions: string[];
    clubs: string[];
    trainingCenters: string[];
};

export function AthletesFilters({
    nameFilter,
    setNameFilter,
    positionFilter,
    setPositionFilter,
    clubFilter,
    setClubFilter,
    trainingCenterFilter,
    setTrainingCenterFilter,
    positions,
    clubs,
    trainingCenters,
}: AthletesFiltersProps) {
    return (
        <>
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nome do Jogador"
                  className="pl-8"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                />
              </div>
            </div>
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger>
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
              <SelectTrigger>
                <SelectValue placeholder="Clube" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Clubes</SelectItem>
                {clubs.map((club) => (
                  <SelectItem key={club.name} value={club.name}>
                    {club.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={trainingCenterFilter} onValueChange={setTrainingCenterFilter}>
              <SelectTrigger>
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
                <Button variant="outline">
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
        </>
    )
}
