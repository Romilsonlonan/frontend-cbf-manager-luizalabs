
'use client';

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

// Mock data
const clubs = [
  { id: '1', name: 'SC Corinthians', shieldId: 'club-logo-1' },
  { id: '2', name: 'SE Palmeiras', shieldId: 'club-logo-2' },
  { id: '3', name: 'São Paulo FC', shieldId: 'club-logo-3' },
];

const athletes = [
    { id: '1', name: 'Carlos Alberto', position: 'Atacante', club: 'SC Corinthians', age: 28, avatarId: 'user-avatar' },
    { id: '4', name: 'Jonas Pereira', position: 'Goleiro', club: 'SC Corinthians', age: 32, avatarId: 'user-avatar' },
    { id: '2', name: 'Bruna Santos', position: 'Meio-campo', club: 'SE Palmeiras', age: 25, avatarId: 'user-avatar' },
    { id: '3', name: 'Ricardo Lima', position: 'Zagueiro', club: 'São Paulo FC', age: 30, avatarId: 'user-avatar' },
    { id: '5', name: 'Livia Costa', position: 'Atacante', club: 'São Paulo FC', age: 22, avatarId: 'user-avatar' },
];

const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

export default function ClubDetailsPage() {
  const params = useParams();
  const clubId = params.clubId as string;

  const club = clubs.find((c) => c.id === clubId);
  const clubAthletes = athletes.filter((a) => a.club === club?.name);
  const clubShield = PlaceHolderImages.find((img) => img.id === club?.shieldId);

  if (!club) {
    return <div>Clube não encontrado.</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
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
