'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AddClubModal } from '@/components/home/clubs/add-club-modal/add-club-modal'
import { Plus, Users, Calendar, Trophy, Building, Search } from 'lucide-react'
import { AddAthleteModal } from '@/components/home/clubs/add-athlete-modal/add-athlete-modal'
import { scrapeClubPlayers, getClubs } from '@/lib/api' // Import specific functions
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/context/AuthContext'
import { PlayerResponse, ClubSimpleResponse } from '@/lib/types' // Importa as interfaces PlayerResponse e ClubSimpleResponse
import { useRouter } from 'next/navigation';

// Usar ClubSimpleResponse diretamente para consistência com a API
type Club = ClubSimpleResponse;

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([])
  const [loading, setLoading] = useState(true)
  const [clubModalOpen, setClubModalOpen] = useState(false)
  const [athleteModalOpen, setAthleteModalOpen] = useState(false)
  const { toast } = useToast()
  const { token, logout } = useAuth()
  const router = useRouter();

  const fetchClubs = async () => {
    try {
      setLoading(true)
      const data = await getClubs() // Use the exported getClubs function
      setClubs(data)
    } catch (error) {
      console.error('Erro ao buscar clubes:', error)
      toast({
        title: "Erro",
        description: "Erro ao carregar dados dos clubes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false)
    }
  }

  const handleScrapePlayers = async (clubId: number, clubName: string) => {
    if (!token) {
      toast({
        title: "Erro de Autenticação",
        description: "Você precisa estar logado para raspar dados de jogadores.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Raspagem Iniciada",
      description: `Iniciando raspagem de jogadores para ${clubName}...`,
    });

    const handleAuthError = () => {
      toast({
        title: "Sessão Expirada",
        description: "Sua sessão expirou. Por favor, faça login novamente.",
        variant: "destructive",
      });
      logout();
      router.push('/login');
    };

    try {
      const players: PlayerResponse[] = await scrapeClubPlayers(clubId, token, handleAuthError); // Use the exported scrapeClubPlayers function
      const playerNames = players.map(p => p.name).join(', ');
      toast({
        title: "Sucesso!",
        description: `${players.length} jogadores de ${clubName} foram adicionados/atualizados: ${playerNames}.`,
        variant: "success",
        duration: 9000, // Aumenta a duração para que o usuário possa ler os nomes
      });
      fetchClubs(); // Refresh clubs to potentially show updated player counts
    } catch (error: any) {
      console.error(`Erro ao raspar jogadores para ${clubName}:`, error);
      toast({
        title: "Erro na Raspagem",
        description: error.message || `Falha ao raspar jogadores para ${clubName}.`,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchClubs()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clubes</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => setAthleteModalOpen(true)}
            variant="outline"
            disabled={clubs.length === 0}
            title={clubs.length === 0 ? "Cadastre um clube primeiro" : "Adicionar atleta"}
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Atleta
          </Button>
          <Button onClick={() => setClubModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Clube
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Carregando...</div>
      ) : clubs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">Nenhum clube cadastrado</p>
            <Button onClick={() => setClubModalOpen(true)} className="mt-4">
              Adicionar primeiro clube
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clubs.map((club) => (
            <Card key={club.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  {club.shield_image_url ? (
                    <img
                      src={`http://localhost:8000${club.shield_image_url}`}
                      alt={`Escudo ${club.name}`}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{club.name}</h3>
                    <p className="text-sm text-gray-500">{club.initials}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-400" />
                    <span>{club.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>
                      Fundado em{' '}
                      {club.foundation_date
                        ? new Date(club.foundation_date).toLocaleDateString('pt-BR')
                        : 'Data desconhecida'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-gray-400" />
                    <span>{club.br_titles} títulos brasileiros</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleScrapePlayers(club.id, club.name)}
                    disabled={!club.espn_url}
                    title={!club.espn_url ? "Adicione a URL da ESPN para este clube para raspar jogadores" : `Raspar jogadores de ${club.name}`}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Raspar Jogadores
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddClubModal
        open={clubModalOpen}
        onOpenChange={setClubModalOpen}
        onClubAdded={fetchClubs}
      />

      <AddAthleteModal
        open={athleteModalOpen}
        onOpenChange={setAthleteModalOpen}
      />
    </div>
  )
}
