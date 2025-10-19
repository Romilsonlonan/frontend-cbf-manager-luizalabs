
'use client';

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

// Mock data for clubs
const clubs = [
  {
    id: "1",
    name: "SC Corinthians",
    initials: "COR",
    city: "São Paulo",
    shieldId: "club-logo-1",
  },
  {
    id: "2",
    name: "SE Palmeiras",
    initials: "PAL",
    city: "São Paulo",
    shieldId: "club-logo-2",
  },
  {
    id: "3",
    name: "São Paulo FC",
    initials: "SAO",
    city: "São Paulo",
    shieldId: "club-logo-3",
  },
];

export default function ClubsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Clubes</CardTitle>
          <CardDescription>
            Gerencie os clubes cadastrados no sistema.
          </CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Clube
        </Button>
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
