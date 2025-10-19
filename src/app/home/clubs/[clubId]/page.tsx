
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { athletesInClubs, clubs } from '@/lib/mock-data';
import { EntityFormDialog } from '@/components/home/shared/entity-form-dialog/entity-form-dialog';

const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

export default function ClubDetailsPage() {
  const params = useParams();
  const clubId = params.clubId as string;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const club = clubs.find((c) => c.id === clubId);
  const clubAthletes = athletesInClubs.filter((a) => a.club === club?.name);
  const clubShield = PlaceHolderImages.find((img) => img.id === club?.shieldId);

  if (!club) {
    return <div>Clube não encontrado.</div>;
  }

  const handleAddPlayer = (formData: Record<string, string>) => {
    console.log('Novo jogador adicionado:', { ...formData, club: club.name });
    // Lógica para adicionar o novo jogador
    setIsDialogOpen(false);
  };
  
  const playerFormFields = [
    { id: 'name', label: 'Nome', placeholder: 'Nome completo do atleta' },
    { id: 'position', label: 'Posição', placeholder: 'Ex: Atacante' },
    { id: 'age', label: 'Idade', type: 'number', placeholder: 'Ex: 25' },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div className='flex flex-row items-center gap-4'>
            {clubShield && (
              <Image
                src={clubShield.imageUrl}
                width={64}
                height={64}
                alt={`Escudo do ${club.name}`}
                data-ai-hint={clubShield.imageHint}
              />
            )}
            <div>
              <CardTitle className="text-3xl">{club.name}</CardTitle>
              <CardDescription>Lista de atletas do clube.</CardDescription>
            </div>
        </div>
        <EntityFormDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            dialogTitle={`Adicionar Novo Jogador ao ${club.name}`}
            dialogDescription="Preencha as informações para adicionar um novo atleta ao elenco."
            formFields={playerFormFields}
            onSubmit={handleAddPlayer}
            submitButtonText="Salvar Jogador"
            initialValues={{ club: club.name }}
            readOnlyFields={['club']}
          >
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Jogador
            </Button>
          </EntityFormDialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Posição</TableHead>
              <TableHead className="text-right">Idade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clubAthletes.map((athlete) => (
              <TableRow key={athlete.id}>
                <TableCell>
                  <Avatar>
                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={athlete.name} />}
                    <AvatarFallback>{athlete.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{athlete.name}</TableCell>
                <TableCell>{athlete.position}</TableCell>
                <TableCell className="text-right">{athlete.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
