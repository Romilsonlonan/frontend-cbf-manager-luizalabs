
'use client';

import { useState, useEffect, useCallback } from 'react';
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
import { PlusCircle, Webhook, CalendarDays } from 'lucide-react';
import { clubs } from '@/lib/mock-data'; // Manter para mock de clubes, mas atletas virão da API
import { EntityFormDialog } from '@/components/home/shared/entity-form-dialog/entity-form-dialog';
import { api, clubsApi } from '@/lib/api'; // Importar api e clubsApi
import { useAuth } from '@/context/AuthContext'; // Para obter o token
import { useLoading } from '@/context/LoadingContext'; // Para gerenciar o loading
import { useToast } from '@/hooks/use-toast'; // Para exibir notificações
import { Input } from '@/components/ui/input'; // Para o campo de URL
import Link from 'next/link';

const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

interface Player {
  id: number;
  name: string;
  position: string;
  age: number;
  height: number;
  weight: number;
  nationality: string;
  games: number;
  substitute_appearances: number;
  goals: number;
  assists: number;
  shots: number;
  shots_on_goal: number;
  fouls_committed: number;
  fouls_suffered: number;
  yellow_cards: number;
  red_cards: number;
  defenses: number;
  goals_conceded: number;
  salary: number;
  injuries_count: number;
  wrong_passes: number;
  correct_passes: number;
  club_id: number;
}

export default function ClubDetailsPage() {
  const params = useParams();
  const clubId = params.clubId as string;
  const { token } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const { toast } = useToast();

  const [isAddPlayerDialogOpen, setIsAddPlayerDialogOpen] = useState(false);
  const [scrapeUrl, setScrapeUrl] = useState(
    'https://www.espn.com.br/futebol/time/elenco/_/id/3454/ordenar/position/dir/desce/bra.cr_vasco_da_gama'
  );
  const [clubDetails, setClubDetails] = useState<any>(null); // Usar 'any' por enquanto, idealmente um tipo ClubResponse
  const [clubAthletes, setClubAthletes] = useState<Player[]>([]);

  const fetchClubDetails = useCallback(async () => {
    if (!token || !clubId) return;
    startLoading();
    try {
      // Aqui você precisaria de uma função na api.ts para buscar detalhes de um clube com jogadores
      // Por enquanto, vamos mockar ou adaptar se houver uma rota get_club_with_players
      const response = await fetch(`http://localhost:8000/clubs/${clubId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Falha ao buscar detalhes do clube');
      }
      const data = await response.json();
      setClubDetails(data);
      setClubAthletes(data.players || []);
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: `Falha ao carregar detalhes do clube: ${error.message}`,
        variant: 'destructive',
      });
      console.error('Erro ao buscar detalhes do clube:', error);
    } finally {
      stopLoading();
    }
  }, [clubId, token, startLoading, stopLoading, toast]);

  useEffect(() => {
    fetchClubDetails();
  }, [fetchClubDetails]);

  if (!clubDetails) {
    return <div>Carregando detalhes do clube...</div>;
  }

  const handleAddPlayer = (formData: Record<string, string>) => {
    console.log('Novo jogador adicionado:', { ...formData, club: clubDetails.name });
    // Lógica para adicionar o novo jogador via API
    setIsAddPlayerDialogOpen(false);
    fetchClubDetails(); // Recarregar dados após adicionar
  };

  const handleScrapeAthletes = async () => {
    if (!token || !clubId || !scrapeUrl) {
      toast({
        title: 'Aviso',
        description: 'Token de autenticação, ID do clube ou URL de scraping ausentes.',
        variant: 'destructive',
      });
      return;
    }

    startLoading();
    try {
      const scrapedData = await clubsApi.scrapeAthletes(clubId, scrapeUrl, token);
      toast({
        title: 'Sucesso',
        description: `Scraping concluído! ${scrapedData.length} atletas atualizados/adicionados.`,
      });
      fetchClubDetails(); // Recarregar dados após scraping
    } catch (error: any) {
      toast({
        title: 'Erro no Scraping',
        description: `Falha ao realizar scraping: ${error.message}`,
        variant: 'destructive',
      });
      console.error('Erro ao realizar scraping:', error);
    } finally {
      stopLoading();
    }
  };

  const playerFormFields = [
    { id: 'name', label: 'Nome', placeholder: 'Nome completo do atleta' },
    { id: 'position', label: 'Posição', placeholder: 'Ex: Atacante' },
    { id: 'age', label: 'Idade', type: 'number', placeholder: 'Ex: 25' },
    // Adicionar outros campos conforme o schema PlayerCreate, se necessário para cadastro manual completo
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div className='flex flex-row items-center gap-4'>
          {clubDetails.shield_image_url && (
            <Image
              src={`http://localhost:8000${clubDetails.shield_image_url}`}
              width={64}
              height={64}
              alt={`Escudo do ${clubDetails.name}`}
            />
          )}
          <div>
            <CardTitle className="text-3xl">{clubDetails.name}</CardTitle>
            <CardDescription>Lista de atletas do clube.</CardDescription>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Input
              type="text"
              placeholder="URL para scraping da ESPN"
              value={scrapeUrl}
              onChange={(e) => setScrapeUrl(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleScrapeAthletes}>
              <Webhook className="mr-2 h-4 w-4" />
              Scrapear Atletas
            </Button>
          </div>
          <Link href={`/home/clubs/${clubId}/training-routines?action=add-routine`}>
            <Button className="w-full">
              <CalendarDays className="mr-2 h-4 w-4" />
              Adicionar Rotina de Treinamento
            </Button>
          </Link>
          <Button onClick={() => setIsAddPlayerDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Jogador
          </Button>
          <EntityFormDialog
            isOpen={isAddPlayerDialogOpen}
            onOpenChange={setIsAddPlayerDialogOpen}
            dialogTitle={`Adicionar Novo Jogador ao ${clubDetails.name}`}
            dialogDescription="Preencha as informações para adicionar um novo atleta ao elenco."
            formFields={playerFormFields}
            onSubmit={handleAddPlayer}
            submitButtonText="Salvar Jogador"
            initialValues={{ club: clubDetails.name }}
            readOnlyFields={['club']}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Posição</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Altura</TableHead>
              <TableHead>Peso</TableHead>
              <TableHead>Nacionalidade</TableHead>
              <TableHead>Jogos</TableHead>
              <TableHead>Substituições</TableHead>
              <TableHead>Gols</TableHead>
              <TableHead>Assistências</TableHead>
              <TableHead>CA</TableHead>
              <TableHead>CV</TableHead>
              <TableHead>Defesas</TableHead>
              <TableHead>Gols Sofridos</TableHead>
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
                <TableCell>{athlete.age}</TableCell>
                <TableCell>{athlete.height} m</TableCell>
                <TableCell>{athlete.weight} kg</TableCell>
                <TableCell>{athlete.nationality}</TableCell>
                <TableCell>{athlete.games}</TableCell>
                <TableCell>{athlete.substitute_appearances}</TableCell>
                <TableCell>{athlete.goals}</TableCell>
                <TableCell>{athlete.assists}</TableCell>
                <TableCell>{athlete.yellow_cards}</TableCell>
                <TableCell>{athlete.red_cards}</TableCell>
                <TableCell>{athlete.defenses}</TableCell>
                <TableCell>{athlete.goals_conceded}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
