
'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { clubs as initialClubs } from '@/lib/mock-data';
import { Club } from '@/lib/types';
import { EntityFormDialog } from '@/components/home/shared/entity-form-dialog/entity-form-dialog';


export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>(initialClubs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddClub = (formData: Record<string, string>) => {
    if (formData.name && formData.initials && formData.city) {
      const newId = (clubs.length + 1).toString();
      const newClub: Club = {
        id: newId,
        name: formData.name,
        initials: formData.initials,
        city: formData.city,
        // shieldId genérico para novos clubes, pode ser melhorado
        shieldId: `club-logo-${Math.floor(Math.random() * 3) + 1}`,
      };
      setClubs([...clubs, newClub]);
      setIsDialogOpen(false);
    }
  };

  const clubFormFields = [
    { id: 'name', label: 'Nome', placeholder: 'Nome do clube' },
    { id: 'initials', label: 'Sigla', placeholder: 'Ex: COR' },
    { id: 'city', label: 'Cidade', placeholder: 'Ex: São Paulo' },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Clubes</CardTitle>
          <CardDescription>
            Gerencie os clubes cadastrados no sistema.
          </CardDescription>
        </div>
        <EntityFormDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          dialogTitle="Adicionar Novo Clube"
          dialogDescription="Preencha as informações para adicionar um novo clube."
          formFields={clubFormFields}
          onSubmit={handleAddClub}
          submitButtonText="Salvar Clube"
        >
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Clube
          </Button>
        </EntityFormDialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Escudo</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Sigla</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clubs.map((club) => {
              const shieldImage = PlaceHolderImages.find(
                (img) => img.id === club.shieldId
              );
              return (
                <TableRow key={club.id}>
                  <TableCell>
                    {shieldImage && (
                      <Image
                        src={shieldImage.imageUrl}
                        width={32}
                        height={32}
                        alt={`Escudo do ${club.name}`}
                        data-ai-hint={shieldImage.imageHint}
                        className="rounded-sm"
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{club.name}</TableCell>
                  <TableCell>{club.initials}</TableCell>
                  <TableCell>{club.city}</TableCell>
                  <TableCell>
                     <Button asChild variant="outline" size="sm">
                        <Link href={`/home/clubs/${club.id}`}>Ver Elenco</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
