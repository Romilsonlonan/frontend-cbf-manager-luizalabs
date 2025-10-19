
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
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { athletes, positions, clubs, trainingCenters } from '@/lib/mock-data';
import { Athlete } from '@/lib/types';
import { AthletesFilters } from '@/components/home/athletes/athletes-filters/athletes-filters';
import { EntityFormDialog } from '@/components/home/shared/entity-form-dialog/entity-form-dialog';

export default function AthletesPage() {
  const [nameFilter, setNameFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [clubFilter, setClubFilter] = useState('');
  const [trainingCenterFilter, setTrainingCenterFilter] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredAthletes = athletes.filter((athlete) => {
    return (
      (nameFilter === '' ||
        athlete.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (positionFilter === '' || positionFilter === 'all' || athlete.position === positionFilter) &&
      (clubFilter === '' || clubFilter === 'all' || athlete.club === clubFilter) &&
      (trainingCenterFilter === '' || trainingCenterFilter === 'all' || athlete.trainingCenter === trainingCenterFilter)
    );
  });

  const handleAddAthlete = (formData: Record<string, string>) => {
    console.log('Novo atleta adicionado:', formData);
    // Aqui você adicionaria a lógica para adicionar o atleta aos dados
    setIsDialogOpen(false);
  };

  const athleteFormFields = [
    { id: 'name', label: 'Nome', placeholder: 'Nome completo do atleta' },
    { id: 'position', label: 'Posição', placeholder: 'Ex: Atacante' },
    { id: 'club', label: 'Clube', placeholder: 'Ex: SC Corinthians' },
    { id: 'trainingCenter', label: 'CT', placeholder: 'Ex: CT Dr. Joaquim Grava' },
    { id: 'age', label: 'Idade', type: 'number', placeholder: 'Ex: 25' },
    { id: 'goals', label: 'Gols', type: 'number', placeholder: 'Ex: 10' },
    { id: 'salary', label: 'Salário', type: 'number', placeholder: 'Ex: 100000' },
  ];

  return (
    <div className="h-full">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Análise de Atletas</CardTitle>
          <CardDescription>
            Filtre e analise os atletas cadastrados no sistema.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 p-0 overflow-y-auto">
          <div className="flex flex-col sm:flex-row gap-4 px-6 pt-0 pb-6 border-b">
            <AthletesFilters
                nameFilter={nameFilter}
                setNameFilter={setNameFilter}
                positionFilter={positionFilter}
                setPositionFilter={setPositionFilter}
                clubFilter={clubFilter}
                setClubFilter={setClubFilter}
                trainingCenterFilter={trainingCenterFilter}
                setTrainingCenterFilter={setTrainingCenterFilter}
                positions={positions}
                clubs={clubs}
                trainingCenters={trainingCenters}
            />
            <EntityFormDialog
              isOpen={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              dialogTitle="Adicionar Novo Atleta"
              dialogDescription="Preencha as informações do atleta para adicioná-lo ao sistema."
              formFields={athleteFormFields}
              onSubmit={handleAddAthlete}
              submitButtonText="Salvar Atleta"
            >
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Atleta
                </Button>
            </EntityFormDialog>
          </div>
          <ScrollArea className="flex-1 h-px">
            <div className='px-6'>
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
                  {filteredAthletes.map((athlete: Athlete) => (
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
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
